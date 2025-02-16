import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Client } from '@notionhq/client';

const NOTION_CLIENT_ID = process.env.NEXT_PUBLIC_NOTION_CLIENT_ID;
const NOTION_CLIENT_SECRET = process.env.NOTION_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/notion/callback`;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const userId = searchParams.get('state');

  if (!code || !userId) {
    return NextResponse.redirect('/dashboard?error=missing_parameters');
  }

  try {
    // Exchange the code for an access token using Notion's OAuth endpoint
    const tokenResponse = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${NOTION_CLIENT_ID}:${NOTION_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28' // Include Notion API version
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Notion token exchange failed:', tokenData);
      throw new Error(`Failed to get access token: ${tokenData.error}`);
    }

    // Initialize Notion client with the new access token
    const notion = new Client({
      auth: tokenData.access_token,
      notionVersion: '2022-06-28' // Specify Notion API version
    });

    // Verify the token works by making a test API call
    try {
      await notion.users.list({});
    } catch (error) {
      console.error('Failed to verify Notion token:', error);
      throw new Error('Token verification failed');
    }

    // Store the integration in Supabase
    const { error: dbError } = await supabase
      .from('user_integrations')
      .upsert({
        user_id: userId,
        provider: 'notion',
        access_token: tokenData.access_token,
        workspace_id: tokenData.workspace_id,
        bot_id: tokenData.bot_id,
        workspace_name: tokenData.workspace_name,
        workspace_icon: tokenData.workspace_icon,
        token_type: tokenData.token_type, // Should be 'bearer'
        duplicated_template_id: tokenData.duplicated_template_id,
        request_id: tokenData.request_id,
        token_expires_at: null // Notion OAuth tokens don't expire
      }, {
        onConflict: 'user_id,provider'
      });

    if (dbError) {
      console.error('Failed to store Notion integration:', dbError);
      throw dbError;
    }

    return NextResponse.redirect('/dashboard?success=true');
  } catch (error) {
    console.error('Error in Notion callback:', error);
    return NextResponse.redirect('/dashboard?error=token_exchange_failed');
  }
} 