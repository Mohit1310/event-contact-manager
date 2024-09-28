// src/app/api/export/route.ts
import { NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb';
import Contact from '@/models/contact';
import vCardsJS from 'vcards-js';

export async function GET(request: Request) {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const contacts = await Contact.find({ eventId });

    const vCardCollection = contacts
      .map((contact) => {
        const vCard = vCardsJS();
        vCard.firstName = contact.name;
        vCard.cellPhone = contact.phone;
        return vCard.getFormattedString();
      })
      .join('\n');

    return new NextResponse(vCardCollection, {
      status: 200,
      headers: {
        'Content-Type': 'text/vcard',
        'Content-Disposition': `attachment; filename="contacts_event_${eventId}.vcf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
