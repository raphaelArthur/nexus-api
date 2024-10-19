import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  async registerUser(req: Request, res: Response): Promise<void> {
    await AuthService.registerUser(req, res);
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    await AuthService.loginUser(req, res);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    await AuthService.resetPassword(req, res);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    await AuthService.updateUser(req, res);
  }

  async getUserProfile(req: Request, res: Response): Promise<void> {
    await AuthService.getUserProfile(req, res);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    await AuthService.deleteUser(req, res);
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    await AuthService.updateUserRole(req, res);
  }

  async listUsers(req: Request, res: Response): Promise<void> {
    await AuthService.listUsers(req, res);
  }

}

export default new AuthController();
