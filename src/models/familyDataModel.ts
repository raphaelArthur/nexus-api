// src/models/familyDataModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IFamilyData extends Document {
  userId: mongoose.Types.ObjectId;  // Referência ao usuário
  householdMembers: number;  // Quantas pessoas moram em seu lote/residência?
  childrenUnder10: number;   // Quantos moradores são crianças (menores de 10 anos)
  youthBetween11And21: number; // Quantos moradores são jovens (entre 11 e 21 anos)?
  adultsBetween21And65: number; // Quantos moradores são adultos (entre 21 e 65 anos)?
  elderlyOver65: number;     // Quantos moradores são idosos com mais de 65 anos?
  maleMembers: number;       // Quantos homens
  femaleMembers: number;     // Quantas mulheres
  othersMembers: number;     // Quantos se identificam como outros
  receiveSocialBenefits: boolean; // Você ou algum membro da sua família recebe benefícios sociais?
  socialBenefits?: string[];  // Selecione o(s) benefício(s)
  contributingMembers: number; // Quantos membros da sua família contribuem com a renda familiar mensal?
  familyIncome: number;       // Quanto soma mensalmente o valor da renda dos familiares que contribuem com a renda familiar?
  incomeSources: string[];    // Quais são as principais fontes de renda familiar?
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
