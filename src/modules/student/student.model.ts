import { Schema, model } from 'mongoose';
import { TStudentSchema } from './student.interface';

const studentSchema = new Schema<TStudentSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    schoolOrCollage: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: 'https://i.ibb.co/6b4nDXS/default-avatar.png',
    },
  },
  {
    timestamps: true,
  },
);

export const Student = model('Student', studentSchema);
