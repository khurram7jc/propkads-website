import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const position = formData.get('position');
    const portfolioLink = formData.get('portfolioLink');
    const message = formData.get('message');
    const resumeFile = formData.get('resume');

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    let resumeName = null;
    let resumeSize = null;
    let resumeType = null;
    let resumeData = null;

    if (resumeFile && typeof resumeFile === 'object' && resumeFile.name) {
      resumeName = resumeFile.name;
      resumeSize = resumeFile.size;
      resumeType = resumeFile.type || 'application/octet-stream';
      try {
        const arrayBuffer = await resumeFile.arrayBuffer();
        resumeData = Buffer.from(arrayBuffer).toString('base64');
      } catch (fileErr) {
        console.warn('File read warning:', fileErr.message);
      }
    }

    // Save to database
    try {
      await sql`
        insert into job_applications (
          full_name, email, phone, position, portfolio_link, message, resume_name, resume_size, resume_type, resume_data
        )
        values (
          ${fullName}, ${email}, ${phone}, ${position || null}, ${portfolioLink || null}, ${message || null},
          ${resumeName}, ${resumeSize}, ${resumeType}, ${resumeData}
        )
      `;
    } catch (dbErr) {
      console.warn('DB save warning:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully.',
    });
  } catch (err) {
    console.error('careers application route error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process application.' },
      { status: 500 }
    );
  }
}
