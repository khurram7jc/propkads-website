import nodemailer from 'nodemailer';

export async function sendVerificationEmail({ to, name, token, origin }) {
  const baseUrl = origin || process.env.NEXT_PUBLIC_APP_URL || 'https://propkads.com';
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

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const text = `Hello ${name || 'Team Member'},\n\nYou have been invited to join the Propkads Admin & Lead Management Portal.\n\nPlease verify your email and activate your account by visiting this link:\n${verifyLink}\n\nThis link will expire in 7 days. If you did not expect this invitation, you can safely ignore this email.\n\nPropkads Team Portal\nhttps://propkads.com`;

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
          You have been invited to join the <strong>Propkads Admin & Lead Management Portal</strong>.
          Please click the button below to verify your email address and activate your account.
        </p>
        <div style="text-align: center; margin: 30px 0;">
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
      subject: 'Verify your email - Propkads Team Portal Invitation',
      text,
      html,
    });

    return { sent: true, verifyLink };
  } catch (err) {
    console.error('Failed to send verification email:', err);
    return { sent: false, error: err.message, verifyLink };
  }
}
