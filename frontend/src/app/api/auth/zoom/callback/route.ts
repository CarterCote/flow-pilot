import { NextRequest, NextResponse } from 'next/server';

const ZOOM_CLIENT_ID = process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/zoom/callback`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/dashboard?error=missing_code');
  }

  try {
    const tokenResponse = await fetch('https://zoom.us/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    // Here you would typically store the token in your database
    // For now, we'll just redirect back to dashboard
    return NextResponse.redirect('/dashboard?success=true');

  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.redirect('/dashboard?error=token_exchange_failed');
  }
} 