// src/custom.d.ts
import { Request } from 'express';
import { Document } from 'mongoose';
import { IUser } from './models/userModel'; // Importe a interface IUser do seu modelo de usuário


// Estender a interface Request do Express para incluir a propriedade 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}
