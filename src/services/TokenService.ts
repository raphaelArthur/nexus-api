// src/services/TokenService.ts
import jwt from 'jsonwebtoken';

class TokenService {
  generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
  }
}

export default new TokenService();
