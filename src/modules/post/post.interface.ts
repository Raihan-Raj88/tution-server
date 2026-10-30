import { Types } from 'mongoose';

export type TPost = {
  userId: Types.ObjectId;
  whatsApp: string;
  title: string;
  class: string;
  subject: string[];
  medium: string;
  description: string;
  division: string;
  district: string;
  salary: string;
  gender: string;
  daysPerWeek: string;
};
