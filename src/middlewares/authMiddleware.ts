// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel'; // Importe IUser para tipagem

// Definição do tipo para o token decodificado
interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrair o token do cabeçalho de autorização
      token = req.headers.authorization.split(' ')[1];

      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // Buscar o usuário pelo ID e atribuí-lo à requisição
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401).json({ message: 'Não autorizado! Usuário não encontrado' });
        return;
      }

      req.user = user as IUser; // Definir o tipo explicitamente para IUser

      next();
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado! Token inválido' });
    }
  } else {
    res.status(401).json({ message: 'Não autorizado! Você não informou nenhum Token.' });
  }
};

