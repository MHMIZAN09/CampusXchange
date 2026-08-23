import type { Gender, Role } from '../../../generated/prisma/enums';

export interface IStudentRegisterPayload {
  email: string;
  password: string;
  role: Role;
  profile: {
    fullName: string;
    studentId: string;
    gender: Gender;
    university: string;
  }
}


export interface IStudentLoginPayload {
  email: string;
  password: string;
}

export interface IStudentForgotPasswordPayload {
  email: string;
}

export interface IStudentResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}


export interface IRequestUser {
  userId: string;
  email: string;
  role: Role;
}
