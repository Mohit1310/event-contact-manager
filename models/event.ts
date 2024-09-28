import mongoose, { Model } from 'mongoose';

interface IEvent {
  name: string;
}

const EventSchema = new mongoose.Schema<IEvent>({
  name: { type: String, required: true },
});

const Event =
  (mongoose.models.Event as Model<IEvent>) ||
  mongoose.model<IEvent>('Event', EventSchema);

export default Event;
