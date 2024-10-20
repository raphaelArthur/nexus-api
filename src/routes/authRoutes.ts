// src/routes/authRoutes.ts
import express from 'express';
import AuthController from '@controllers/AuthController';

const router = express.Router();

router.post('/register', AuthController.registerUser.bind(AuthController));
router.post('/login', AuthController.loginUser.bind(AuthController));

export default router;
