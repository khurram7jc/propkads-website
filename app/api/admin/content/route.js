import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const rows = await sql`select key, value from site_content order by key`;
  return NextResponse.json({ success: true, content: rows });
}

export async function PUT(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { key, value } = await req.json();
  await sql`
    insert into site_content (key, value, updated_at)
    values (${key}, ${value}, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()
  `;
  return NextResponse.json({ success: true });
}
