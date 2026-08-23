import bcrypt from 'bcryptjs';

import { config } from '../../config';
import { prisma } from '../../lib/prisma';

import type { IStudentRegisterPayload } from './auth.interface';

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

export const authService = {
  registerStudentFromDB,
};
