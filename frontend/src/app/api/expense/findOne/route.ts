import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const response = await fetch(`http://${process.env.NEST_HOST}:3001/expense/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies().get('token')?.value || ''}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
