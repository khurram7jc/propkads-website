import nodemailer from 'nodemailer';

const PERMISSION_LABELS = {
  leads: 'Client Leads',
  project_leads: 'Project Leads',
  applications: 'Job Applications',
  blogs: 'News & Blogs',
  newsletter: 'Newsletter',
};

export async function sendVerificationEmail({ to, name, token, origin, permissions }) {
  let baseUrl = 'https://propkads.com';
  if (origin && !origin.includes('0.0.0.0')) {
    baseUrl = origin;
  } else if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes('0.0.0.0')) {
    baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  }
  const verifyLink = `${baseUrl}/admin/verify?token=${encodeURIComponent(token)}`;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Propkads Portal" <${user || 'no-reply@propkads.com'}>`;

  if (!host || !user || !pass) {
    return {
      sent: false,
      reason: 'smtp_not_configured',
      verifyLink,
    };
  }

  // Determine human-readable permission list
  let accessSummary = 'Team Member';
  let assignedLabels = [];

  const rawPerms = Array.isArray(permissions) ? permissions : (permissions ? [permissions] : []);
  const allKeys = Object.keys(PERMISSION_LABELS);

  if (rawPerms.includes('all') || (allKeys.length > 0 && allKeys.every(k => rawPerms.includes(k)))) {
    accessSummary = 'Full Access';
    assignedLabels = ['Full Access (All Sections)'];
  } else if (rawPerms.length > 0) {
    assignedLabels = rawPerms
      .map(k => PERMISSION_LABELS[k] || k)
      .filter(Boolean);
    if (assignedLabels.length > 0) {
      accessSummary = assignedLabels.join(', ');
    }
  }

  if (assignedLabels.length === 0) {
    assignedLabels = ['Standard Access'];
  }

  const subject = accessSummary === 'Team Member'
    ? 'Verify your email - Propkads Team Portal Invitation'
    : `Verify your email - Propkads Portal (${accessSummary} Access)`;

  const permissionsPillsHtml = assignedLabels
    .map(label => `<span style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 13px; font-weight: 600; padding: 4px 12px; border-radius: 20px; border: 1px solid #bbf7d0; margin-right: 6px; margin-bottom: 6px;">✓ ${label}</span>`)
    .join('');

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const text = `Hello ${name || 'Team Member'},\n\nYou have been invited to join the Propkads Admin & Lead Management Portal.\n\nAssigned Access Permissions:\n${assignedLabels.map(l => `• ${l}`).join('\n')}\n\nPlease verify your email and activate your account by visiting this link:\n${verifyLink}\n\nThis link will expire in 7 days. If you did not expect this invitation, you can safely ignore this email.\n\nPropkads Team Portal\nhttps://propkads.com`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #0F172A; margin: 0 0 6px 0;">Propkads Team Portal</h2>
          <p style="color: #64748b; font-size: 14px; margin: 0;">Account Invitation & Verification</p>
        </div>
        <p style="color: #334155; font-size: 15px; line-height: 1.5;">
          Hello <strong>${name || 'Team Member'}</strong>,
        </p>
        <p style="color: #334155; font-size: 15px; line-height: 1.5;">
          You have been invited to join the <strong>Propkads Admin & Lead Management Portal</strong> with assigned access to the following section(s):
        </p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px; margin: 18px 0;">
          <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
            Assigned Section Permissions:
          </div>
          <div>
            ${permissionsPillsHtml}
          </div>
        </div>
        <p style="color: #334155; font-size: 14px; line-height: 1.5;">
          Please click the button below to verify your email address and activate your account:
        </p>
        <div style="text-align: center; margin: 26px 0;">
          <a href="${verifyLink}" style="background-color: #14A750; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block;">
            Verify Email & Activate Account
          </a>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
          If the button above does not work, copy and paste this link into your browser:<br/>
          <a href="${verifyLink}" style="color: #14A750; word-break: break-all;">${verifyLink}</a>
        </p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
          This link will expire in 7 days. If you did not expect this invitation, you can safely ignore this email.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return { sent: true, verifyLink };
  } catch (err) {
    console.error('Failed to send verification email:', err);
    return { sent: false, error: err.message, verifyLink };
  }
}

export async function sendLeadNotificationEmail(lead) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Propkads Portal" <${user || 'no-reply@propkads.com'}>`;
  const to = process.env.LEAD_NOTIFICATION_EMAIL || 'propkads@gmail.com';

  if (!host || !user || !pass) {
    console.warn('SMTP not configured; lead notification email skipped.');
    return { sent: false, reason: 'smtp_not_configured' };
  }

  const isProject = lead.leadCategory === 'project' || Boolean(lead.projectName);
  const categoryLabel = isProject ? 'Project Buyer Lead' : 'Client (Developer) Lead';
  const name = lead.fullName || 'Anonymous Prospect';
  const company = lead.companyName || '';
  const phone = lead.phone || 'N/A';
  const city = lead.city || 'N/A';
  const propType = lead.inventoryType || lead.unitInterest || 'Not Specified';
  const project = lead.projectName || '';

  // Clean phone for direct WhatsApp link
  const cleanPhone = phone.replace(/\D/g, '');
  let waPhone = cleanPhone;
  if (waPhone.startsWith('0')) {
    waPhone = '92' + waPhone.substring(1);
  }
  const waLink = waPhone ? `https://wa.me/${waPhone}` : null;

  const subject = `🔔 New ${categoryLabel}: ${name}${propType && propType !== 'Not Specified' ? ` (${propType})` : ''}`;

  const text = `New Lead Received on Propkads!

Category: ${categoryLabel}
Name: ${name}
Company / Project: ${company || 'N/A'}
Phone: ${phone}
City: ${city}
Property Type: ${propType}
${project ? `Project: ${project}\n` : ''}
Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)

View in Admin Portal: https://propkads.com/admin
`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #0F172A;">
      <div style="border-bottom: 2px solid #14A750; padding-bottom: 16px; margin-bottom: 20px;">
        <div style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 12px; margin-bottom: 8px;">
          ${categoryLabel}
        </div>
        <h2 style="margin: 0; font-size: 20px; color: #0F172A; font-weight: 700;">
          New Lead Received!
        </h2>
        <p style="margin: 4px 0 0; font-size: 13px; color: #64748B;">
          A prospect just submitted an inquiry on the Propkads website.
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tbody>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: 600; width: 140px;">Full Name</td>
            <td style="padding: 10px 0; color: #0F172A; font-weight: 700; font-size: 15px;">${name}</td>
          </tr>
          ${company ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Company / Firm</td>
            <td style="padding: 10px 0; color: #0F172A; font-weight: 500;">${company}</td>
          </tr>` : ''}
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Phone Number</td>
            <td style="padding: 10px 0; color: #0F172A; font-weight: 600;">
              <a href="tel:${phone}" style="color: #0F172A; text-decoration: none;">${phone}</a>
              ${waLink ? ` &nbsp;•&nbsp; <a href="${waLink}" style="color: #25D366; text-decoration: none; font-weight: 600;">💬 Open WhatsApp</a>` : ''}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Property Type</td>
            <td style="padding: 10px 0; color: #0F172A; font-weight: 600;">
              <span style="display: inline-block; background-color: #f1f5f9; color: #334155; padding: 3px 10px; border-radius: 6px; font-size: 13px;">
                ${propType}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: 600;">City / Location</td>
            <td style="padding: 10px 0; color: #0F172A; font-weight: 500;">${city}</td>
          </tr>
          ${project ? `
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Project</td>
            <td style="padding: 10px 0; color: #0F172A; font-weight: 600;">${project}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #64748B; font-weight: 600;">Received Time</td>
            <td style="padding: 10px 0; color: #64748B; font-size: 13px;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)</td>
          </tr>
        </tbody>
      </table>

      <div style="text-align: center; margin: 24px 0 16px;">
        <a href="https://propkads.com/admin" style="background-color: #14A750; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">
          Open Admin Dashboard →
        </a>
      </div>

      <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
        Propkads Real Estate Marketing & Sales Portal • <a href="https://propkads.com" style="color: #94a3b8; text-decoration: none;">propkads.com</a>
      </div>
    </div>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return { sent: true };
  } catch (err) {
    console.error('Failed to send lead notification email:', err);
    return { sent: false, error: err.message };
  }
}
