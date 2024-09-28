// src/components/ContactList.tsx
interface Contact {
  _id: string;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id} className="mb-1">
            {contact.name}: {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
