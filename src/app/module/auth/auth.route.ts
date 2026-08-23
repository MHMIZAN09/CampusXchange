import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router()


router.post('/register', authController.registerStudent);

router.post('/login', authController.loginStudent);


router.post("/email-verify", (req, res) => {
  // Handle email verification logic here
  res.send('Email verification endpoint');
});

router.post("/forgot-password", (req, res) => {
  // Handle forgot password logic here
  res.send('Forgot password endpoint');
});

router.post("/reset-password", (req, res) => {
  // Handle reset password logic here
  res.send('Reset password endpoint');
});

router.post("/refresh-token", (req, res) => {
  // Handle refresh token logic here
  res.send('Refresh token endpoint');
});

router.get("/me", (req, res) => {
  // Handle fetching user profile logic here
  res.send('User profile endpoint');
});

export const authRoutes = router;
