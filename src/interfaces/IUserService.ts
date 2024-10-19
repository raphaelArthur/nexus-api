// src/interfaces/IUserService.ts
import { Request, Response } from 'express';

export interface IUserService {
  registerUser(req: Request, res: Response): Promise<void>;
  loginUser(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
}
