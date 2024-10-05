import React, { useState } from "react";

import ContactForm from "./ContactForm";

interface Contact {
  _id: string;
  name: string;
  phone: string;
  eventId?: string;
}

interface ContactListProps {
  contacts: Contact[];
  eventId: string | undefined;
  onContactAdded?: () => void;
  onContactUpdated: () => void;
  onContactDeleted: () => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  eventId,
  onContactAdded,
  onContactUpdated,
  onContactDeleted,
}) => {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleDelete = async (id: string) => {
    await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
    onContactDeleted();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Contacts</h2>
      <ContactForm
        eventId={eventId}
        onContactAdded={onContactAdded}
        onContactUpdated={onContactUpdated}
      />
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id} className="mb-2">
            {editingContact?._id === contact._id ? (
              <ContactForm
                eventId={eventId}
                initialContact={contact}
                onContactUpdated={() => {
                  setEditingContact(null);
                  onContactUpdated();
                }}
              />
            ) : (
              <div className="flex justify-between items-center">
                <span>
                  {contact.name}: {contact.phone}
                </span>
                <div>
                  <button
                    onClick={() => setEditingContact(contact)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
