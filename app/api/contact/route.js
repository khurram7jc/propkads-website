import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sendLeadNotificationEmail } from '@/lib/email';

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

    // In local development, also store in memory so admin panel shows it instantly
    if (process.env.NODE_ENV !== 'production') {
      try {
        const leadObj = {
          id: Date.now(),
          full_name: fullName,
          company_name: companyName || '',
          phone,
          city: city || '',
          inventory_type: inventoryType || '',
          lead_category: resolvedCategory,
          project_name: projectName || null,
          unit_interest: unitInterest || null,
          status: 'New',
          next_followup_date: null,
          next_action_type: null,
          created_at: new Date().toISOString(),
        };
        if (resolvedCategory === 'project') {
          const { addLocalDevProjectLead } = await import('@/lib/mockProjectLeads');
          addLocalDevProjectLead(leadObj);
        } else {
          const { addLocalDevLead } = await import('@/lib/mockClientLeads');
          addLocalDevLead(leadObj);
        }
      } catch (mockErr) {
        console.error('Failed to store local dev lead:', mockErr);
      }
    }

    // Send instant lead alert to propkads@gmail.com
    try {
      await sendLeadNotificationEmail({
        fullName,
        companyName,
        phone,
        city,
        inventoryType,
        leadCategory: resolvedCategory,
        projectName,
        unitInterest,
      });
    } catch (emailErr) {
      console.error('Lead notification email dispatch error:', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact route error:', err);
    return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
  }
}
