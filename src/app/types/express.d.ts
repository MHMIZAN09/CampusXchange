export interface RequestUser {
  email: string;
  userId: string;
  role: Role;
}
declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}
