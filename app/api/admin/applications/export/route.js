import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { liveLocalDevApplications } from '@/lib/mockApplications';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const session = getSession();
  if (!session) return new Response('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const scope = searchParams.get('scope') || 'all'; // 'new' | 'range' | 'all'
  const since = searchParams.get('since'); // ISO date string
  const from = searchParams.get('from');   // YYYY-MM-DD
  const to = searchParams.get('to');       // YYYY-MM-DD

  let allRows = [];
  try {
    allRows = await sql`
      select id, full_name, email, phone, position, portfolio_link, message, resume_name,
             (resume_data is not null and length(resume_data) > 0) as has_resume, created_at
      from job_applications
      order by created_at desc
    `;
  } catch (sqlErr) {
    console.warn('admin applications export SQL query warning:', sqlErr.message);
  }

  if ((!allRows || allRows.length === 0) && process.env.NODE_ENV !== 'production') {
    allRows = [...liveLocalDevApplications];
  }

  const rows = allRows.filter((r) => {
    const rowDate = new Date(r.created_at);
    if (scope === 'new' && since) {
      const sinceDate = new Date(since);
      if (rowDate <= sinceDate) return false;
    }
    if (scope === 'range') {
      if (from) {
        const fromDate = new Date(`${from}T00:00:00`);
        if (rowDate < fromDate) return false;
      }
      if (to) {
        const toDate = new Date(`${to}T23:59:59.999`);
        if (rowDate > toDate) return false;
      }
    }
    return true;
  });

  const headers = [
    'ID',
    'Candidate Name',
    'Position Applied',
    'Email Address',
    'Phone / WhatsApp',
    'Portfolio Link',
    'Resume Attached',
    'Resume Filename',
    'Cover Note / Message',
    'Application Date',
  ];

  const csvRows = [headers.join(',')];

  rows.forEach((r) => {
    const line = [
      r.id,
      r.full_name,
      r.position || 'General',
      r.email,
      r.phone,
      r.portfolio_link || '',
      r.has_resume ? 'Yes' : 'No',
      r.resume_name || '',
      r.message || '',
      r.created_at ? new Date(r.created_at).toLocaleString() : '',
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',');
    csvRows.push(line);
  });

  const todayStr = new Date().toISOString().split('T')[0];
  let filename = `propkads-job-applications-all-${todayStr}.csv`;
  if (scope === 'new') {
    filename = `propkads-new-job-applications-${todayStr}.csv`;
  } else if (scope === 'range' && from && to) {
    filename = `propkads-job-applications-${from}-to-${to}.csv`;
  }

  return new Response(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
