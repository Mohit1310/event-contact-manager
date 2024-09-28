// src/components/ContactForm.tsx
import { useState } from 'react';

interface ContactFormProps {
  eventId: string;
  onContactAdded: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  eventId,
  onContactAdded,
}) => {
  const [contact, setContact] = useState({ name: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...contact, eventId }),
    });
    setContact({ name: '', phone: '' });
    onContactAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
        placeholder="Contact Name"
        required
        className="border p-2 mr-2"
      />
      <input
        type="tel"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        placeholder="Phone Number"
        required
        className="border p-2 mr-2"
      />
      <button
        type="submit"
        disabled={!eventId}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
