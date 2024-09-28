// src/components/EventList.tsx
interface Event {
  _id: string;
  name: string;
}

interface EventListProps {
  events: Event[];
  onEventSelected: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventSelected }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Events</h2>
      <select
        onChange={(e) => onEventSelected(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventList;
