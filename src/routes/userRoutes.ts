// src/routes/userRoutes.ts
import express from 'express';
import AuthController from '../controllers/AuthController';
import { protect } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/adminMiddleware';

const router = express.Router();

// Rota para atualizar os dados do usuário autenticado
router.put('/update', protect, AuthController.updateUser);

// Rota para obter informações do usuário autenticado ou de outro usuário
router.get('/profile/:userId?', protect, AuthController.getUserProfile);

// Rota para excluir a conta do usuário autenticado
router.delete('/delete', protect, AuthController.deleteUser);

// Rota para excluir outro usuário (restrita a administradores)
router.delete('/delete/:userId', protect, isAdmin, AuthController.deleteUser);

// Rota para atualizar a permissão do usuário (restrita a administradores)
router.put('/update-role', protect, isAdmin, AuthController.updateUserRole);

// Rota para listar todos os usuários com paginação (restrita a usuários com role >= 100)
router.get('/list', protect, AuthController.listUsers);

export default router;
