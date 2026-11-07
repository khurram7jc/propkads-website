import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      fullName,
      companyName,
      phone,
      city,
      inventoryType,
      leadCategory,
      projectName,
      unitInterest,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    // Ensure multi-project & category columns exist safely without affecting existing data
    await sql`alter table leads add column if not exists lead_category text default 'client'`;
    await sql`alter table leads add column if not exists project_name text`;
    await sql`alter table leads add column if not exists unit_interest text`;

    const resolvedCategory =
      leadCategory === 'project' || Boolean(projectName) ? 'project' : 'client';

    await sql`
      insert into leads (
        full_name,
        company_name,
        phone,
        city,
        inventory_type,
        lead_category,
        project_name,
        unit_interest
      )
      values (
        ${fullName},
        ${companyName || null},
        ${phone},
        ${city || null},
        ${inventoryType || null},
        ${resolvedCategory},
        ${projectName || null},
        ${unitInterest || null}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact route error:', err);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}
