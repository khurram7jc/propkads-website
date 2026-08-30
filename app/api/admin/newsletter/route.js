import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const rows = await sql`select * from newsletter_subscribers order by created_at desc`;
  return NextResponse.json({ success: true, subscribers: rows });
}
