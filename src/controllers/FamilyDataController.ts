// src/controllers/AuthController.ts
import { Request, Response } from 'express';
import FamilyDataService from '../services/FamilyDataService';

class FamilyDataController {
  async upsertFamilyData(req: Request, res: Response): Promise<void> {
    await FamilyDataService.upsertFamilyData(req, res);
  }

  async getFamilyData(req: Request, res: Response): Promise<void> {
    await FamilyDataService.getFamilyData(req, res);
  }

  async deleteFamilyData(req: Request, res: Response): Promise<void> {
    await FamilyDataService.deleteFamilyData(req, res);
  }

}
export default new FamilyDataController();
