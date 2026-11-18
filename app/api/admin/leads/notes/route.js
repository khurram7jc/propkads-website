import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

let localDevNotes = [
  { id: 1, lead_id: 1, author_name: 'Khurram Mushtaq', note: 'Called client, discussed high-rise 3D walkthrough quotation. Client requested revised rates.', created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, lead_id: 2, author_name: 'Khurram Mushtaq', note: 'Sent portfolio deck on WhatsApp. Scheduled follow-up for proposal review.', created_at: new Date(Date.now() - 3600000 * 5).toISOString() },
];

export async function GET(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const leadId = searchParams.get('leadId');
  if (!leadId) return NextResponse.json({ success: false, error: 'Missing leadId.' }, { status: 400 });

  let rows = await sql`select * from lead_notes where lead_id = ${leadId} order by created_at desc`;
  if ((!rows || rows.length === 0) && process.env.NODE_ENV !== 'production') {
    rows = localDevNotes.filter((n) => n.lead_id === Number(leadId));
  }
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

  if (process.env.NODE_ENV !== 'production') {
    localDevNotes.unshift({
      id: Date.now(),
      lead_id: Number(leadId),
      author_name: session.name || 'Team',
      note,
      created_at: new Date().toISOString(),
    });
  }

  return NextResponse.json({ success: true });
}
