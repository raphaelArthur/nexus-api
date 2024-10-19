import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';
import TokenService from './TokenService';
import { IFamilyDataService } from '../interfaces/IFamilyDataService';
import FamilyData from '../models/familyDataModel';

class FamilyDataController {
  // Criar ou atualizar dados da família
  async upsertFamilyData(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id?.toString();
      const {
        householdMembers,
        childrenUnder10,
        youthBetween11And21,
        adultsBetween21And65,
        elderlyOver65,
        maleMembers,
        femaleMembers,
        receiveSocialBenefits,
        socialBenefits,
        contributingMembers,
        familyIncome,
        incomeSources
      } = req.body;

      const familyData = await FamilyData.findOneAndUpdate(
        { userId },
        {
          userId,
          householdMembers,
          childrenUnder10,
          youthBetween11And21,
          adultsBetween21And65,
          elderlyOver65,
          maleMembers,
          femaleMembers,
          receiveSocialBenefits,
          socialBenefits,
          contributingMembers,
          familyIncome,
          incomeSources
        },
        { new: true, upsert: true }  // Atualiza se existe, insere se não
      );

      res.status(200).json(familyData);
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro ao salvar os dados da família.', error: error.message });
    }
  }

  // Buscar dados da família
  async getFamilyData(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user._id || !req.user.role) {
        res.status(401).json({ message: 'Usuário não autenticado.' });
        return;
      }

      const { _id: authenticatedUserId, role: authenticatedUserRole } = req.user;  // Extrai o ID e role do usuário autenticado
      const { userId: familyUserId } = req.params;  // ID do usuário que deseja visualizar os dados

      // Se o usuário está tentando acessar os dados de outra família e não tem permissão, bloqueia
      if (familyUserId && familyUserId !== authenticatedUserId.toString() && authenticatedUserRole < 100) {
        res.status(403).json({ message: 'Acesso negado. Você não tem permissão para visualizar dados de outras famílias.' });
        return;
      }

      // Define o ID da família a ser buscada (própria ou de outro usuário, se permitido)
      const userIdToFetch = familyUserId || authenticatedUserId;

      // Busca os dados da família
      const familyData = await FamilyData.findOne({ userId: userIdToFetch });

      // Se não encontrar dados da família, retorna erro
      if (!familyData) {
        res.status(404).json({ message: 'Dados da família não encontrados.' });
        return;
      }

      // Retorna os dados da família
      res.status(200).json(familyData);
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro ao buscar os dados da família.', error: error.message });
    }
  }

  // Deletar dados da família
  async deleteFamilyData(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?._id?.toString();
      const familyData = await FamilyData.findOneAndDelete({ userId });

      if(!familyData) {
        res.status(404).json({ message: 'Dados da família não encontrados.' });
        return;
      }
      
      res.status(200).json({ message: 'Dados da família deletados com sucesso.' });
    } catch (error: Error | any) {
      res.status(500).json({ message: 'Erro ao deletar os dados da família.', error: error.message });
    }
  }
}

export default new FamilyDataController();