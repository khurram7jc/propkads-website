import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const leadId = searchParams.get('leadId');
  if (!leadId) return NextResponse.json({ success: false, error: 'Missing leadId.' }, { status: 400 });

  const rows = await sql`select * from lead_notes where lead_id = ${leadId} order by created_at desc`;
  return NextResponse.json({ success: true, notes: rows });
}

export async function POST(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { leadId, note } = await req.json();
  if (!leadId || !note) {
    return NextResponse.json({ success: false, error: 'Missing fields.' }, { status: 400 });
  }

  await sql`
    insert into lead_notes (lead_id, author_name, note)
    values (${leadId}, ${session.name}, ${note})
  `;
  return NextResponse.json({ success: true });
}
