import mongoose, { Document, Schema, Model } from "mongoose";

interface EventType extends Document {
  name: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image: string;
  organizer: string;
  attendees: string[];
}

const eventTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true, default: [] },
    organizer: { type: String, required: true },
    attendees: { type: [String], required: true, default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v;
        delete ret.createdAt;
      },
    },
  }
);

const EventModel = mongoose.model<EventType>("Event", eventTypeSchema);

export default EventModel;
