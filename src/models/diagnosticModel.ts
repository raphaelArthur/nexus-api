import mongoose, { Schema, Document } from 'mongoose';

// Interface para Segurança Energética
export interface IEnergeticSecurity {
    energySources: string[]; // Quais são as principais fontes de energia da casa/lote?
    otherEnergySources?: string; // Outras fontes de energia
    energyCostImpact: string; // Quanto da renda familiar e destinado a pagar a conta de energia?
    productionEnergySources: string[]; // Quais são as fontes de energia da sua área de produção?
    otherProductionEnergySources?: string; // Outra fonte de energia da sua área de produção
    energyCutImpact: string; // Qual é o impacto da queda de energia na produção?
    beneficiaryTSEE: boolean; // Você ou alguém da família é beneficiário da Tarifa Social de Energia Elétrica (TSEE)?
    mainConcernedPersonEnergy: string; // Qual pessoa da família têm MAIOR preocupação com a economia no consumo de energia?
}

// Interface para Segurança Hídrica
export interface IWaterSecurity {
    waterSources: string[]; // Quais são as principais fontes de acesso à água para a sua atividade produtiva?
    otherWaterSources?: string; // Outra fonte de acesso à agua para a sua atividade produtiva
    cisternTypeWaterSource?: string; // Tipo da cisterna como fonte de acesso à agua para a sua atividade produtiva
    waterShortageFrequencyProduction: string; // No intervalo de um mês, com que frequência costuma faltar água para a produção?
    affectedByDrought: boolean; // Você foi afetado pela seca nos últimos 5 anos?
    reasonsNotAffected?: string; // Por quais razões acredita que não foi afetado?
    droughtEffects?: string[]; // Como a última seca afetou a vida da família? Indique os efeitos da seca  
    othersDroughtEffects?: string; //Outros efeitos causados pela seca
    mainConcernedPersonWater: string; // Qual pessoa da família têm MAIOR preocupação com a economia no consumo de água?
}

// Interface para Segurança Alimentar
export interface IFoodSecurity {
    hasBackyard: boolean; // Na sua casa, você possui um quintal onde produz alimentos?
    backyardPlants?: string[]; // O que é plantado no quintal de casa? 
    otherBackyardPlants?: string; // Outros tipos de plantação no quintal de casa
    responsibleForBackyard?: string; // Quem é a PRINCIPAL pessoa responsável pelo cuidado e trabalho no quintal de casa?
    backyardPractices?: string; // Quais tipos de práticas são aplicadas no quintal de casa?
    backyardProductionDestination?: string; // Qual o principal destino da produção do quintal de casa?
    hasProductivePlot: boolean; // Você possui um lote produtivo ou uma área de produção?
    plotType?: string; //  Qual o tipo de área do seu lote produtivo?
    plotProduction?: string[]; // O que é produzido na área ou lote produtivo?
    otherPlotProduction?: string; // Outras coisas produzinas na área ou lote produtivo
    responsibleForPlot?: string; // Quem é a PRINCIPAL pessoa responsável pelo trabalho na área do lote produtivo?
    plotPractices?: string[]; // Quais tipos de práticas são aplicadas na produção da área/lote produtivo?
    productionSeason?: string; // Em qual época do ano tem maior produção na área do lote produtivo?
    plotProductionDestination?: string; // Qual o principal destino da produção da área do lote produtivo?
}

// Interface para Segurança Socioambiental
export interface IEnvironmentalSecurity {
    observedClimateChange: string; // Você considera que houve uma mudança nas temperaturas da região nos ultimos anos?
    climateChangeEffects?: string; // Esta mudança de temperatura vem impactando a produção da sua família?
    rainfallChangeInRecentYears: string; // Você considera que houve uma mudança nas chuvas da região nos ultimos anos?
    precipitationImpactOnFamilyProduction?: string; // Esta mudança na precipitação vem impactando a produção da sua família?
    properWasteCollectionInCommunity: boolean; // Na sua comunidade, agrovila ou aldeia a coleta de lixo é corretamente feita?   
    excessivePesticidesUse: boolean; // Você observa que para a produção de alimentos na sua região existe um uso excessivo de agrotóxicos?
    waterPollutionBySewage: boolean; // Você acha que na sua região ou localidade existe poluição de águas por esgoto doméstico?
    beneficiaries?: string[]; // Por favor, marcar as opções das quais você é beneficiário e possui
    otherBeneficiaries?: string; // Outros benefícios
    landSituationResidence: string; // Qual é a situação da terra onde você reside?
    landSituationProduction: string; // Qual é a situação da terra onde você produz?
    householdResponsibilities: {
        mealPreparation: string[],
        groceryShopping: string[],
        houseCleaning: string[],
        careForPeople: string[],
        farmWork: string[],
        backyardWork: string[],
        billPayments: string[],
        bankVisits: string[],
        animalCare: string[]
    }; // Responsabilidades da casa (distribuição das tarefas)
}

// Interface para o Diagnóstico Geral
export interface IDiagnostic extends Document {
    userId: mongoose.Types.ObjectId;
    energeticSecurity: IEnergeticSecurity;
    waterSecurity: IWaterSecurity;
    foodSecurity: IFoodSecurity;
    environmentalSecurity: IEnvironmentalSecurity;
}

// Schema para Segurança Energética
const energeticSecuritySchema: Schema = new Schema({
    energySources: { type: [String], required: true },
    otherEnergySources: {
        type: String,
        required: function (this: IEnergeticSecurity) { return this.energySources.includes("Outro(s)") }
    },
    energyCostImpact: { type: String, required: true },
    productionEnergySources: { type: [String], required: true },
    otherProductionEnergySources: {
        type: String,
        required: function (this: IEnergeticSecurity) { return this.productionEnergySources.includes("Outro(s)") }
    },
    energyCutImpact: { type: String, required: true },
    beneficiaryTSEE: { type: Boolean, required: true },
    mainConcernedPersonEnergy: { type: String, required: true },
});

// Schema para Segurança Hídrica
const waterSecuritySchema: Schema = new Schema({
    waterSources: { type: [String], required: true },
    otherWaterSources: {
        type: String,
        required: function (this: IWaterSecurity) { return this.waterSources.includes("Outro(s)") }
    },
    cisternTypeWaterSource: {
        type: String,
        required: function (this: IWaterSecurity) { return this.waterSources.includes("Cisterna") }
    },
    waterShortageFrequencyProduction: { type: String, required: true },
    affectedByDrought: { type: Boolean, required: true },
    reasonsNotAffected: {
        type: String,
        required: function (this: IWaterSecurity) { return this.affectedByDrought === false }
    },
    droughtEffects: {
        type: [String],
        required: function (this: IWaterSecurity) { return this.affectedByDrought === true }
    },
    othersDroughtEffects: {
        type: String,
        required: function (this: IWaterSecurity) { return this.droughtEffects?.includes("Outro(s)") }
    },
    mainConcernedPersonWater: { type: String, required: true },
});

// Schema para Segurança Alimentar
const foodSecuritySchema: Schema = new Schema({
    hasBackyard: { type: Boolean, required: true },
    backyardPlants: {
        type: [String],
        required: function (this: IFoodSecurity) { return this.hasBackyard === true }
    },
    otherBackyardPlants: {
        type: String,
        required: function (this: IFoodSecurity) { return this.backyardPlants?.includes("Outro(s)") }
    },
    responsibleForBackyard: {
        type: String,
        required: function (this: IFoodSecurity) { return this.hasBackyard === true }
    },
    backyardPractices: {
        type: String,
        required: function (this: IFoodSecurity) { return this.hasBackyard === true }
    },
    backyardProductionDestination: {
        type: String,
        required: function (this: IFoodSecurity) { return this.hasBackyard === true }
    },
    hasProductivePlot: { type: Boolean, required: true },
    plotType: {
        type: String,
        required: function (this: IFoodSecurity) { return this.hasProductivePlot === true }
    },
    plotProduction: {
        type: [String],
        required: function (this: IFoodSecurity) { return this.hasProductivePlot === true }
    },
    otherPlotProduction: {
        type: String,
        required: function (this: IFoodSecurity) { return this.plotProduction?.includes("Outro(s)") }
    },
    responsibleForPlot: {
        type: String,
        required: function (this: IFoodSecurity) { return this.hasProductivePlot === true }
    },
    plotPractices: { 
        type: [String], 
        required: function (this: IFoodSecurity) { return this.hasProductivePlot === true } 
    },
    productionSeason: { 
        type: String, 
        required: function (this: IFoodSecurity) { return this.hasProductivePlot === true } 
    },
    plotProductionDestination: { 
        type: String, 
        required: function (this: IFoodSecurity) { return this.hasProductivePlot === true } 
    },
});

// Schema para Segurança Socioambiental
const environmentalSecuritySchema: Schema = new Schema({
    observedClimateChange: { type: String, required: true },
    climateChangeEffects: { type: String,  required: function (this: IEnvironmentalSecurity) { return this.observedClimateChange !== "Não" } },
    rainfallChangeInRecentYears: { type: String, required: true },
    precipitationImpactOnFamilyProduction: { type: String },
    properWasteCollectionInCommunity: { type: Boolean, required: true },
    excessivePesticidesUse: { type: Boolean, required: true },
    waterPollutionBySewage: { type: Boolean, required: true },
    beneficiaries: { type: [String] },
    otherBeneficiaries: { type: String, required: function (this: IEnvironmentalSecurity) { return this.beneficiaries?.includes("Outro(s)") } },
    landSituationResidence: { type: String, required: true },
    landSituationProduction: { type: String, required: true },
    householdResponsibilities: {
        mealPreparation: [{ type: String, required: true }],
        groceryShopping: [{ type: String, required: true }],
        houseCleaning: [{ type: String, required: true }],
        careForPeople: [{ type: String, required: true }],
        farmWork: [{ type: String, required: true }],
        backyardWork: [{ type: String, required: true }],
        billPayments: [{ type: String, required: true }],
        bankVisits: [{ type: String, required: true }],
        animalCare: [{ type: String, required: true }],
    },
});

// Schema Principal de Diagnóstico
const diagnosticSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', requiredd: true },
    energeticSecurity: energeticSecuritySchema,
    waterSecurity: waterSecuritySchema,
    foodSecurity: foodSecuritySchema,
    environmentalSecurity: environmentalSecuritySchema,
});

const Diagnostic = mongoose.model<IDiagnostic>('Diagnostic', diagnosticSchema);
export default Diagnostic;