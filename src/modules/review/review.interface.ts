import { Types } from 'mongoose';

export type TReview = {
  teacherId: Types.ObjectId;
  studentId: Types.ObjectId;
  studentName: string;
  studentPhoto: string;
  rating: number;
  comment: string;
};
