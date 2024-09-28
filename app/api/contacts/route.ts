// src/app/api/contacts/route.ts
import { NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb';
import Contact from '@/models/contact';

export async function GET(request: Request) {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const contacts = await Contact.find({ eventId });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await connectDb();
  try {
    const body = await request.json();
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
