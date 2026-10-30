import { Schema, model } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    class: { type: String, required: true },
    subject: { type: [String], required: true },
    medium: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    gender: { type: String, required: true },
    daysPerWeek: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    whatsApp: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Post = model('Post', postSchema);
