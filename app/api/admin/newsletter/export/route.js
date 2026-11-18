import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { liveLocalDevSubscribers } from '@/lib/mockNewsletter';

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
    allRows = await sql`select * from newsletter_subscribers order by created_at desc`;
  } catch (sqlErr) {
    console.warn('admin newsletter export SQL query warning:', sqlErr.message);
  }

  if ((!allRows || allRows.length === 0) && process.env.NODE_ENV !== 'production') {
    allRows = liveLocalDevSubscribers;
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

  const headers = ['ID', 'Subscriber Email', 'Subscribed At'];
  const csvRows = [headers.join(',')];

  rows.forEach((r) => {
    const line = [
      r.id,
      r.email,
      r.created_at ? new Date(r.created_at).toLocaleString() : '',
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',');
    csvRows.push(line);
  });

  const todayStr = new Date().toISOString().split('T')[0];
  let filename = `propkads-newsletter-subscribers-all-${todayStr}.csv`;
  if (scope === 'new') {
    filename = `propkads-new-newsletter-subscribers-${todayStr}.csv`;
  } else if (scope === 'range' && from && to) {
    filename = `propkads-newsletter-subscribers-${from}-to-${to}.csv`;
  }

  return new Response(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
