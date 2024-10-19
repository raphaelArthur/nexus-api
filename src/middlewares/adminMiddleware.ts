// src/middleware/adminMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Middleware para verificar se o usuário é administrador
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 1000) { 
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado! Você não possui permissão para acessar esta funcionalidade.' });
  }
};
