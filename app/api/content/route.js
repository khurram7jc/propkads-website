import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const rows = await sql`select key, value from site_content`;
    const map = {};
    rows.forEach((r) => (map[r.key] = r.value));
    return NextResponse.json({ success: true, content: map });
  } catch (err) {
    console.error('content route error:', err);
    return NextResponse.json({ success: false, content: {} }, { status: 500 });
  }
}
