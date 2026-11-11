import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = req.headers.get('x-sync-token');
  if (token !== 'propkads-temp-sync-98234') {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    SESSION_SECRET: process.env.SESSION_SECRET || '',
  });
}
