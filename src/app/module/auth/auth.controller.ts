import type { Request, Response } from 'express';
import httpStatus from 'http-status';
import { authService } from './auth.service';

const registerStudent = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await authService.registerStudentFromDB(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      httpCode: httpStatus.CREATED,
      message: 'Student registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      httpCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message || 'Internal Server Error',
      data: null,
    });
  }
}

const loginStudent = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await authService.loginStudentFromDB(payload);
    const { accessToken, refreshToken } = result;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });



    res.status(httpStatus.OK).json({
      success: true,
      httpCode: httpStatus.OK,
      message: 'Student login successfully',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      httpCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message || 'Internal Server Error',
      data: null,
    });
  }
}


export const authController = {
  registerStudent,
  loginStudent,
};
