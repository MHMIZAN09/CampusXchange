import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


export const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  backendUrl: process.env.BACKEND_URL,
  frontendUrl: process.env.FRONTEND_URL,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET!,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET!,
  jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
  jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,
};
