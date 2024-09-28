// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import EventForm from '@/components/EventForm';
import ContactForm from '@/components/ContactForm';
import EventList from '@/components/EventList';
import ContactList from '@/components/ContactList';

interface Event {
  _id: string;
  name: string;
}

interface Contact {
  _id: string;
  name: string;
  phone: string;
  eventId: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data);
  };

  const fetchContacts = async (eventId: string) => {
    const res = await fetch(`/api/contacts?eventId=${eventId}`);
    const data = await res.json();
    setContacts(data);
  };

  const handleEventAdded = () => {
    fetchEvents();
  };

  const handleContactAdded = () => {
    if (selectedEvent) {
      fetchContacts(selectedEvent._id);
    }
  };

  const handleEventSelected = (event: Event) => {
    setSelectedEvent(event);
    fetchContacts(event._id);
  };

  const exportContacts = () => {
    if (selectedEvent) {
      window.location.href = `/api/export?eventId=${selectedEvent?._id}`;
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Event Contacts App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <EventForm onEventAdded={handleEventAdded} />
          <EventList events={events} onEventSelected={handleEventSelected} />
        </div>
        <div>
          <ContactForm
            eventId={selectedEvent?._id}
            onContactAdded={handleContactAdded}
          />
          <ContactList contacts={contacts} />
          <button
            onClick={exportContacts}
            disabled={!selectedEvent}
            className="mt-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
          >
            Export Contacts (.vcf)
          </button>
        </div>
      </div>
    </main>
  );
}
