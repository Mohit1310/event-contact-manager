import { NextResponse } from "next/server";

import connectDb from "@/lib/connectDb";
import Contact from "@/models/contact";

export async function GET(request: Request) {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const contacts = await Contact.find({ eventId });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDb();
  try {
    const body = await request.json();
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 400 }
    );
  }
}
