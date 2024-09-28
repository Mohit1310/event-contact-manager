import connectDb from '@/lib/connectDb';
import Event from '@/models/event';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDb();
  try {
    const events = await Event.find({});
    return NextResponse.json(events);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

export async function POST(req: Request) {
  await connectDb();
  try {
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json(event);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
