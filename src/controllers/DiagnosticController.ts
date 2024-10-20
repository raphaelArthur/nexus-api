import { Request, Response } from 'express';
import Diagnostic, { IEnergeticSecurity, IWaterSecurity, IFoodSecurity, IEnvironmentalSecurity } from '@models/diagnosticModel';

class DiagnosticController {
    // Criar ou atualizar diagnóstico
    async upsertDiagnostic(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id; // Pega o ID do usuário autenticado
            const diagnosticData = req.body; // Dados enviados no corpo da requisição

            // Inicializa um objeto vazio para as atualizações
            let updateData: any = {};

            // Verifica qual subdocumento foi enviado e adiciona ao objeto de atualização
            if (diagnosticData.energeticSecurity) {
                const energeticData: IEnergeticSecurity = diagnosticData.energeticSecurity;
                updateData['energeticSecurity'] = energeticData;
            }

            if (diagnosticData.waterSecurity) {
                const waterData: IWaterSecurity = diagnosticData.waterSecurity;
                updateData['waterSecurity'] = waterData;
            }

            if (diagnosticData.foodSecurity) {
                const foodData: IFoodSecurity = diagnosticData.foodSecurity;
                updateData['foodSecurity'] = foodData;
            }

            if (diagnosticData.environmentalSecurity) {
                const environmentalData: IEnvironmentalSecurity = diagnosticData.environmentalSecurity;
                updateData['environmentalSecurity'] = environmentalData;
            }

            // Se nenhum subdocumento foi enviado, retorna um erro
            if (Object.keys(updateData).length === 0) {
                res.status(400).json({ message: 'Nenhum dado de diagnóstico foi fornecido para atualizar.' });
                return;
            }

            // Atualiza ou cria o diagnóstico do usuário com base no subdocumento enviado
            const diagnostic = await Diagnostic.findOneAndUpdate(
                { userId },
                { $set: updateData },
                { new: true, upsert: true, runValidators: true }
            );

            res.status(200).json(diagnostic);
        } catch (error: Error | any) {
            res.status(500).json({ message: 'Erro ao salvar os dados do diagnóstico.', error: error.message });
        }
    }

    // Buscar diagnóstico do usuário
    async getDiagnostic(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id; // ID do usuário autenticado
            const diagnostic = await Diagnostic.findOne({ userId });

            if (!diagnostic) {
                res.status(404).json({ message: 'Diagnóstico não encontrado.' });
                return;
            }

            res.status(200).json(diagnostic);
        } catch (error: Error | any) {
            res.status(500).json({ message: 'Erro ao buscar os dados do diagnóstico.', error: error.message });
        }
    }

    // Deletar diagnóstico
    async deleteDiagnostic(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?._id; // Obtém o ID do usuário autenticado

            // Tenta encontrar e deletar o diagnóstico
            const diagnostic = await Diagnostic.findOneAndDelete({ userId });

            // Se o diagnóstico não for encontrado, retorna uma mensagem apropriada
            if (!diagnostic) {
                res.status(404).json({ message: 'Diagnóstico não encontrado.' });
                return
            }

            // Se foi encontrado e deletado, retorna uma mensagem de sucesso
            res.status(200).json({ message: 'Diagnóstico deletado com sucesso.' });
        } catch (error: Error | any) {
            res.status(500).json({ message: 'Erro ao deletar os dados do diagnóstico.', error: error.message });
        }
    }
}
  

export default new DiagnosticController();
