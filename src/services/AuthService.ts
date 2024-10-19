// src/services/AuthService.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/userModel';
import TokenService from './TokenService';
import { IUserService } from '../interfaces/IUserService';

class AuthService implements IUserService {
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, uf, city, address, geolocation, gender, age, photo, race, schoolAccess, scholarity, organizationMembership, organizationCategory, password, role } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400).json({ message: 'Este email já cadastrado.' });
        return;
      }

      const hashedPassword = await this.hashPassword(password);

      // Criação de um novo usuário com os campos atualizados
      const user: IUser = await User.create({
        name,
        email,
        uf,
        city,
        address,
        geolocation,
        gender,
        age,
        race,
        schoolAccess,
        scholarity,
        organizationMembership,
        organizationCategory,
        photo,
        password: hashedPassword,
        role,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: TokenService.generateToken(user._id.toString()),
        });
      } else {
        res.status(400).json({ message: 'Não foi possível completar o cadastro do usuário.' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Não foi possível completar o cadastro do usuário.' });
    }

  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user && (await this.comparePassword(password, user.password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: TokenService.generateToken(user._id.toString()),
        });
      } else {
        res.status(401).json({ message: 'Usuário não cadastrado ou senha incorreta.' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Não foi possível completar a operação.' });
    }

  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id;  // Obtém o ID do usuário autenticado do middleware de autenticação
      const { name, uf, city, address, geolocation, gender, age, race, schoolAccess, scholarity, organizationMembership, organizationCategory } = req.body; // Dados que podem ser atualizados

      // Verificar se o usuário existe
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      // Campos permitidos para atualização
      const updateData = {
        ...(name && { name }),
        ...(uf && { uf }),
        ...(city && { city }),
        ...(address && { address }),
        ...(geolocation && { geolocation }),
        ...(gender && { gender }),
        ...(age && { age }),
        ...(race && { race }),
        ...(schoolAccess && { schoolAccess }),
        ...(scholarity && { scholarity }),
        ...(organizationMembership && { organizationMembership }),
        ...(organizationCategory && { organizationCategory }),
      };

      // Atualizar e retornar o usuário atualizado
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

      if (!updatedUser) {
        res.status(404).json({ message: 'Não foi possível atualizar as informações.' });
        return;
      }

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        uf: updatedUser.uf,
        city: updatedUser.city,
        address: updatedUser.address,
        geolocation: updatedUser.geolocation,
        gender: updatedUser.gender,
        age: updatedUser.age,
        race: updatedUser.race,
        schoolAccess: updatedUser.schoolAccess,
        scholarity: updatedUser.scholarity,
        organizationMembership: updatedUser.organizationMembership,
        organizationCategory: updatedUser.organizationCategory
      });
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Não foi possível atualizar as informações. Por favor tente novamente mais tarde.', error: error.message });
    }
  }


  async resetPassword(req: Request, res: Response): Promise<void> {
    // Implementação de reset de senha via token
  }

  async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userIdToView = req.params.userId; // ID do usuário que se deseja visualizar
      const authenticatedUserId = req.user?._id.toString(); // ID do usuário autenticado

      // Se o ID do usuário a ser visualizado é o mesmo que o usuário autenticado
      if (!userIdToView || userIdToView === authenticatedUserId?.toString()) {
        // Recupera o perfil do usuário autenticado
        const user = await User.findById(authenticatedUserId).select('-password');

        if (!user) {
          res.status(404).json({ message: 'Usuário não encontrado' });
          return;
        }

        res.status(200).json(user);
        return;
      }

      // Verifica se o usuário autenticado tem permissão para visualizar outro perfil
      if (req.user && req.user.role < 100) {
        res.status(403).json({ message: 'Acesso negado! Apenas pesquisadores ou o administrador do sistema pode visualizar outros perfis de usuário.' });
        return;
      }

      // Caso o usuário autenticado tenha permissão, recupera o perfil do outro usuário
      const user = await User.findById(userIdToView).select('-password');

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado.' });
        return;
      }

      res.status(200).json(user);
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro interno.', error: error.message });
    }
  }

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;

      if (req.user && req.user.role < 100) {
        res.status(403).json({ message: 'Acesso negado! Apenas pesquisadores ou o administrador do sistema pode visualizar outros usuários' });
        return;
      }

      const users = await User.find({})
        .select('-password')
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));

      const totalUsers = await User.countDocuments();

      res.status(200).json({
        users,
        totalPages: Math.ceil(totalUsers / Number(limit)),
        currentPage: Number(page),
      });
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro interno.', error: error.message });
    }
  }



  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      // Verifica se há um userId nos parâmetros da URL (exclusão por admin)
      const userId = req.params.userId 

      // Verifica se o usuário existe
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      // Verifique se o usuário autenticado é administrador
      if (req.user?.role !== 1000) {
        res.status(403).json({ message: 'Acesso negado! Apenas o administrador do sistema pode remover um usuário.' });
        return;
      }

      // Exclui o usuário encontrado
      await User.findByIdAndDelete(userId);

      res.status(200).json({ message: 'Usuário removido com sucesso.' });
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro interno.', error: error.message });
    }
  }



  async updateUserRole(req: Request, res: Response): Promise<void> {
    try {
      const { userId, newRole } = req.body; // Obtém o ID do usuário e a nova permissão do corpo da requisição

      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      user.role = newRole; // Atualiza a permissão do usuário

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro interno', error: error.message });
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default new AuthService();
