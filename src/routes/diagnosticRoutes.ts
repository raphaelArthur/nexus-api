// src/routes/diagnosticRoutes.ts
import express from 'express';
import { protect } from '@middlewares/authMiddleware';
import DiagnosticController from '@controllers/DiagnosticController';

const router = express.Router();

router.post('', protect, DiagnosticController.upsertDiagnostic); // Criar ou atualizar diagnóstico
router.get('', protect, DiagnosticController.getDiagnostic); // Buscar diagnóstico
router.delete('', protect, DiagnosticController.deleteDiagnostic); // Deletar diagnóstico

export default router;
