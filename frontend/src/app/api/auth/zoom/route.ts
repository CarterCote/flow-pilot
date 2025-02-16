import { NextResponse } from 'next/server';

const ZOOM_CLIENT_ID = process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/zoom/callback`;

export async function GET() {
  const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${ZOOM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  
  return NextResponse.json({ authUrl });
} 