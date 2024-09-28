// src/components/EventForm.tsx
import { useState } from 'react';

interface EventFormProps {
  onEventAdded: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onEventAdded }) => {
  const [eventName, setEventName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: eventName }),
    });
    setEventName('');
    onEventAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event Name"
        required
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
