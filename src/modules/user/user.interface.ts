import { Model, Types } from 'mongoose';

export type TUserRole = 'teacher' | 'student' | 'admin';
export type TUserStatus = 'pending' | 'active' | 'rejected';
// user data type================================
export type TUser = {
  email: string;
  password: string;
  role: TUserRole;
  isVerified: boolean;
  status: TUserStatus;
};

// user login data type=============================
export type TLogin = {
  email: string;
  password: string;
};

// email verification data type======================
export type TVerifiedToken = {
  userId: Types.ObjectId;
  token: string;
  createAt: Date;
};

export type TPasswords = {
  userId: Types.ObjectId;
  current: string;
  previous: string;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    planePassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
