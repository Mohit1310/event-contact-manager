import mongoose, { Document, model, models, Schema } from 'mongoose';

export interface Event extends Document {
  name: { type: string; required: true };
}

const eventSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = models.Event || model<Event>('events', eventSchema);

export default Event;
