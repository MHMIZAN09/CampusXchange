import bcrypt from 'bcryptjs';

import { type SignOptions } from "jsonwebtoken";
import { config } from '../../config';
import { prisma } from '../../lib/prisma';
import { jwtUtils } from '../../utils/jwt';
import type { IStudentLoginPayload, IStudentRegisterPayload } from './auth.interface';

const registerStudentFromDB = async (
  payload: IStudentRegisterPayload
) => {
  const { password, role, profile } = payload;

  const email = payload.email.trim().toLowerCase();

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcryptSaltRounds)
  );

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,

      profiles: {
        create: {
          fullName: profile.fullName,
          studentId: profile.studentId,
          gender: profile.gender,
          university: profile.university,
        },
      },
    },

    omit: {
      password: true,
    },

    include: {
      profiles: true,
    },
  });

  return newUser;
};


const loginStudentFromDB = async (payload: IStudentLoginPayload) => {
  const { password } = payload;

  const email = payload.email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }
  if (user.status === "BLOCKED" || user.status === "SUSPENDED") {
    throw new Error('User is blocked or suspended.');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid password. Please try again.');
  }


  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwtAccessTokenSecret,
    config.jwtAccessTokenExpiresIn as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwtRefreshTokenSecret,
    config.jwtRefreshTokenExpiresIn as SignOptions,
  );
  return {
    accessToken,
    refreshToken,
  };
}

export const authService = {
  registerStudentFromDB,
  loginStudentFromDB,
};
