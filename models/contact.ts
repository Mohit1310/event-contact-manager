import mongoose, { Document, Schema } from 'mongoose';

export interface Contact extends Document {
  name: { type: string; required: true };
  phone: { type: string; required: true };
  eventId: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Event';
    required: true;
  };
}

const contactSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model<Contact>('Contact', contactSchema);

export default Contact;
