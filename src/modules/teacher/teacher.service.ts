import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User, VerifiedToken } from '../user/user.model';
import { TTeacher } from './teacher.interface';
import { Teacher } from './teacher.model';
import queryBuilderClass from '../../app/builder/queryBuilderClass';

const createTeacherIntoDB = async (payload: TTeacher) => {
  const { email, password } = payload;

  const user = await User.create({
    email,
    password,
    role: 'teacher',
    isVerified: true, // email verification skip
  });

  if (!user) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Failed to create 🤕. Please, Try again!',
    );
  }

  const result = await Teacher.create({
    name: payload.name,
    university: payload.university,
    whatsApp: payload.whatsApp,
    email: payload.email,
    classRange: payload.classRange,
    description: payload.description,
    photo: payload.photo,
    studentIDPhoto: payload.studentIDPhoto,
    subjects: payload.subjects,
    userId: user._id,
    district: payload.district,
    division: payload.division,
    medium: payload.medium,
    experience: payload.experience,
    gender: payload.gender,
    salary: payload.salary,
  });

  return result;
};

const getAllTeachersFromDB = async (queries: Record<string, unknown>) => {
  // only show teachers whose user account is active (admin approved)
  const activeUsers = await User.find({ role: 'teacher', status: 'active' }).select('_id');
  const activeUserIds = activeUsers.map((u) => u._id);

  const queriesData = new queryBuilderClass(
    Teacher.find({ userId: { $in: activeUserIds } }),
    queries,
  )
    .filter()
    .sort()
    .paginate();
  const result = await queriesData.modelQuery;
  return result;
};

const getTeacherByIDFromDB = async (id: string) => {
  const teacher = await Teacher.findById(id);
  if (!teacher) return null;

  // check if user is active
  const user = await User.findOne({ _id: teacher.userId, status: 'active' });
  if (!user) return null;

  return teacher;
};

const getOneTeacherByUserIdFromDB = async (id: string) => {
  const result = await Teacher.findOne({ userId: id });
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Teacher not found 🤕. Please, Try again!',
    );
  }
  return result;
};

const updateTeacherIntoDB = async (
  id: string,
  payload: Record<string, TTeacher>,
) => {
  const { email, password } = payload;
  if (email || password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email and Password can not be updated 🤕. Please, Try again!',
    );
  }

  const result = await Teacher.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update 🤕. Please, Try again!',
    );
  }
  return result;
};

export const teacherServices = {
  createTeacherIntoDB,
  getAllTeachersFromDB,
  getTeacherByIDFromDB,
  getOneTeacherByUserIdFromDB,
  updateTeacherIntoDB,
};
