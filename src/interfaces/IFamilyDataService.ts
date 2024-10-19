// src/interfaces/IUserService.ts
import { Request, Response } from 'express';

export interface IFamilyDataService {
    upsertFamilyData(req: Request, res: Response): Promise<void>;
    getFamilyData(req: Request, res: Response): Promise<void>;
    deleteFamilyData(req: Request, res: Response): Promise<void>;
}
