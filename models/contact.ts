import mongoose, { Model } from 'mongoose';

interface IContact {
  name: string;
  phone: string;
  eventId: mongoose.Types.ObjectId;
}

const ContactSchema = new mongoose.Schema<IContact>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
});

const Contact =
  (mongoose.models.Contact as Model<IContact>) ||
  mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
