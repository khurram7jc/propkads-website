import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, companyName, phone, city, inventoryType } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    await sql`
      insert into leads (full_name, company_name, phone, city, inventory_type)
      values (${fullName}, ${companyName || null}, ${phone}, ${city || null}, ${inventoryType || null})
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact route error:', err);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}
