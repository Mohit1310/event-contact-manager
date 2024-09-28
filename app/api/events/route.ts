import { NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb';
import Event from '@/models/event';

export async function GET() {
  await connectDb();
  try {
    const events = await Event.find({});
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDb();
  try {
    const body = await request.json();
    const event = await Event.create(body);
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
