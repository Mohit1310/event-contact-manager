import React, { useState } from "react";

interface Contact {
  _id?: string;
  name: string;
  phone: string;
  eventId?: string;
}

interface ContactFormProps {
  eventId: string | undefined;
  onContactAdded?: () => void;
  initialContact?: Contact;
  onContactUpdated?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  eventId,
  onContactAdded,
  initialContact,
  onContactUpdated,
}) => {
  const [contact, setContact] = useState<Contact>(
    initialContact || { name: "", phone: "" }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      initialContact &&
      typeof initialContact._id === "string" &&
      initialContact._id.trim() !== ""
    ) {
      // Update existing contact
      await fetch(`/api/contacts?id=${initialContact._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      onContactUpdated?.();
    } else {
      // Create new contact
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, eventId }),
      });
      setContact({ name: "", phone: "" });
      onContactAdded?.();
    }
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
