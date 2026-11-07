import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req) {
  const session = getSession();
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing application id' }, { status: 400 });
    }

    const rows = await sql`
      select resume_name, resume_type, resume_data
      from job_applications
      where id = ${id}
      limit 1
    `;

    if (!rows || rows.length === 0 || !rows[0].resume_data) {
      return NextResponse.json({ success: false, error: 'Resume not found for this application' }, { status: 404 });
    }

    const { resume_name, resume_type, resume_data } = rows[0];
    const fileBuffer = Buffer.from(resume_data, 'base64');
    const filename = resume_name || `resume-${id}.pdf`;
    const contentType = resume_type || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (err) {
    console.error('resume download error:', err);
    return NextResponse.json({ success: false, error: 'Server error downloading file' }, { status: 500 });
  }
}
