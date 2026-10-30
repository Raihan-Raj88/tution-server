import { Types } from 'mongoose';

export type TTeacher = {
  name: string;
  university: string;
  whatsApp: string;
  email: string;
  classRange: string;
  description: string;
  password: string;
  photo: string;
  studentIDPhoto: string;
  subjects: string[];
  division: string;
  district: string;
  medium: string;
  experience: string;
  gender: string;
  salary: string;
};
export type TTeacherSchema = {
  name: string;
  university: string;
  whatsApp: string;
  email: string;
  classRange: string;
  description: string;
  photo: string;
  studentIDPhoto: string;
  subjects: string[];
  userId: Types.ObjectId;
  division: string;
  district: string;
  medium: string;
  experience: string;
  gender: string;
  salary: string;
};
