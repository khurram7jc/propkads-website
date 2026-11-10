import { cookies } from 'next/headers';
import crypto from 'crypto';

export const COOKIE_NAME = 'propkads_session';
const SEVEN_DAYS_MS = 60 * 60 * 24 * 7 * 1000;

function sign(payloadB64) {
  const secret = process.env.SESSION_SECRET || 'propkads-dev-session-secret-key-2025';
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('hex');
}

export function createSessionToken(user) {
  let parsedPermissions = [];
  if (user.role === 'admin') {
    parsedPermissions = ['all'];
  } else if (Array.isArray(user.permissions)) {
    parsedPermissions = user.permissions;
  } else if (typeof user.permissions === 'string') {
    try {
      parsedPermissions = JSON.parse(user.permissions);
    } catch {
      parsedPermissions = user.permissions.split(',').map((s) => s.trim());
    }
  }

  const payload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: parsedPermissions,
    exp: Date.now() + SEVEN_DAYS_MS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || !token.includes('.')) return null;
  const [payloadB64, signature] = token.split('.');
  const expected = sign(payloadB64);
  if (expected !== signature) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Use inside API routes / server components only (Node.js runtime, not middleware/edge)
export function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
