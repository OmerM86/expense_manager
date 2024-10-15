import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  cookies().delete('token');
  return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}
