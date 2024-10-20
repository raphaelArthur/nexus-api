import express from 'express';
import FamilyDataController from '@controllers/FamilyDataController';

import { protect } from '@middlewares/authMiddleware';

const router = express.Router();

// Rota para criar ou atualizar os dados da familia do usuário autenticado
router.post('/family-data', protect, FamilyDataController.upsertFamilyData);

// Rota para obter informações da familia de um usuário específico
router.get('/family-data/:userId?', protect, FamilyDataController.getFamilyData);;

// Rota para excluir os dados da família de usuário autenticado
router.delete('/family-data', protect, FamilyDataController.deleteFamilyData);


export default router;
