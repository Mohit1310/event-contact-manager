import { NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb';
import Contact from '@/models/contact';
import vCardsJS from 'vcards-js';
import Event from '@/models/event';

export async function GET(request: Request) {
  await connectDb();
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      );
    }

    const contacts = await Contact.find({ eventId });

    const vCardCollection = contacts
      .map((contact) => {
        const vCard = vCardsJS();
        vCard.firstName = `${event.name} - ${contact.name}`;
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
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
