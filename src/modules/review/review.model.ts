import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    teacherId: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    studentName: { type: String, required: true },
    studentPhoto: { type: String, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

// one student can review one teacher once
reviewSchema.index({ teacherId: 1, studentId: 1 }, { unique: true });

export const Review = model('Review', reviewSchema);
