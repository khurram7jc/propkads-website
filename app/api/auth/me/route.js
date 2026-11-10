import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const displayName = session.name === 'Khurram' ? 'Khurram Mushtaq' : session.name;
  return NextResponse.json({
    success: true,
    user: {
      id: session.userId,
      name: displayName,
      email: session.email,
      role: session.role,
      permissions: session.permissions || (session.role === 'admin' ? ['all'] : []),
    },
  });
}
