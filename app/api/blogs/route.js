import { NextResponse } from 'next/server';
import { getBlogs } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.error('API /api/blogs error:', err);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
