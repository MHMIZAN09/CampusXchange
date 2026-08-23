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


export const authController = {
  registerStudent,
};
