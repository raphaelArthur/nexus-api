// src/models/familyDataModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IFamilyData extends Document {
  userId: mongoose.Types.ObjectId;  // Referência ao usuário
  householdMembers: number;  // Quantas pessoas moram no domicílio
  childrenUnder10: number;   // Quantas são crianças menores de 10 anos
  youthBetween11And21: number; // Quantas são jovens entre 11 e 21 anos
  adultsBetween21And65: number; // Quantas são adultos entre 21 e 65 anos
  elderlyOver65: number;     // Quantas são idosos acima de 65 anos
  maleMembers: number;       // Quantos homens
  femaleMembers: number;     // Quantas mulheres
  othersMembers: number;     // Quantos se identificam como outros
  receiveSocialBenefits: boolean; // Recebem benefícios sociais?
  socialBenefits?: string[];  // Benefícios sociais recebidos (múltipla escolha)
  contributingMembers: number; // Quantos membros contribuem para a renda familiar
  familyIncome: number;       // Valor total da renda familiar
  incomeSources: string[];    // Fontes de renda (múltipla escolha)
}

const familyDataSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  householdMembers: { type: Number, required: true },
  childrenUnder10: { type: Number, required: true },
  youthBetween11And21: { type: Number, required: true },
  adultsBetween21And65: { type: Number, required: true },
  elderlyOver65: { type: Number, required: true },
  maleMembers: { type: Number, required: true },
  femaleMembers: { type: Number, required: true },
  othersMembers: { type: Number, required: true },
  receiveSocialBenefits: { type: Boolean, required: true },
  socialBenefits: { 
    type: [String], 
    required: function(this: IFamilyData) { return this.receiveSocialBenefits === true; }
  },  
  contributingMembers: { type: Number, required: true },
  familyIncome: { type: Number, required: true },
  incomeSources: { type: [String], required: true }  // Múltipla escolha
});

const FamilyData = mongoose.model<IFamilyData>('FamilyData', familyDataSchema);
export default FamilyData;
