import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    // Neon DB se saari leads recent order mein fetch hongi
    const leads = await sql`SELECT * FROM contact_enquiries ORDER BY created_at DESC;`;
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}
