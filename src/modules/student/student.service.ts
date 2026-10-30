import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (payload: TStudent) => {
  const { email, password } = payload;

  const user = await User.create({
    email,
    password,
    role: 'student',
    isVerified: true, // email verification skip
  });

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, try again!',
    );
  }

  const studentData = {
    userId: user._id,
    name: payload.name,
    email: payload.email,
    whatsApp: payload.whatsApp,
    photo: payload.photo,
    schoolOrCollage: payload.schoolOrCollage,
  };

  const result = await Student.create(studentData);

  if (!result) {
    await User.findByIdAndDelete(user._id);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create student record 🤕. Please, try again!',
    );
  }

  return result;
};

const getStudentByEmailFromDB = async (email: string) => {
  const result = await Student.findOne({ email });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found 🤕.');
  }
  return result;
};

const updateStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
): Promise<TStudent> => {
  const { password, ...updateData } = payload;

  if (password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot update the password 🤕.',
    );
  }

  const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedStudent) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Student not found 🤕. Please, try again!',
    );
  }

  return updatedStudent as TStudent;
};

export const studentServices = {
  createStudentIntoDB,
  getStudentByEmailFromDB,
  updateStudentIntoDB,
};
