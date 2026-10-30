export type UserRole = 'apprentice' | 'instructor' | 'directivo';

export type InductionModuleTab = 
  | 'characterization'
  | 'institutional'
  | 'rights'
  | 'duties'
  | 'procedures'
  | 'simulator'
  | 'evaluation'
  | 'certificate'
  | 'instructor-dashboard';

export interface ApprenticeCharacterization {
  completedAt: string;
  // 1. Sociodemográfico
  stratum: 1 | 2 | 3 | 4 | 5 | 6;
  vulnerableGroup: 
    | 'Ninguno / Población General' 
    | 'Víctima del Conflicto Armado' 
    | 'Campesino / Sector Rural' 
    | 'Comunidades Negras / Afrocolombianas / Raizales' 
    | 'Población Indígena' 
    | 'Persona con Discapacidad' 
    | 'Madre / Padre Cabeza de Familia' 
    | 'Jóvenes en Paz / Alta Vulnerabilidad';
  employmentStatus: 
    | 'Desempleado buscando empleo' 
    | 'Empleado formal tiempo completo' 
    | 'Trabajador independiente / informal' 
    | 'Dedicación exclusiva a estudio' 
    | 'Emprendedor con unidad productiva';
  householdDependents: number;
  
  // 2. Acceso a Tecnología y Conectividad
  primaryDevice: 
    | 'Portátil propio' 
    | 'Computador de escritorio en casa' 
    | 'Tablet' 
    | 'Teléfono inteligente (Smartphone)' 
    | 'Sin equipo propio (Depende de salas SENA / Café internet)';
  internetConnection: 
    | 'Banda ancha fija en hogar (Fibra/Cable)' 
    | 'Datos móviles limitados (Prepago/Recargas)' 
    | 'Plan de datos ilimitado pospago' 
    | 'Sin conexión continua en casa (Usa WiFi SENA / Biblioteca)';
  digitalSkillLevel: 
    | 'Básico (Navegación web y mensajería)' 
    | 'Intermedio (Ofimática, Teams, LMS Zajuna)' 
    | 'Avanzado (Programación, diseño técnico o análisis)';
  hasPersonalWorkspace: boolean;

  // 3. Diagnóstico de Estilo de Aprendizaje (Test VAK)
  dominantLearningStyle: 'Visual' | 'Auditivo' | 'Kinestésico' | 'Lecto-Escritor';
  vakScores: {
    visual: number;
    auditory: number;
    kinesthetic: number;
    readingWriting: number;
  };
  weeklyStudyHoursAvailable: number;
  primaryMotivation: 
    | 'Conseguir mi primer empleo formal' 
    | 'Mejorar ingresos y ascender laboralmente' 
    | 'Crear mi propia empresa / unidad productiva' 
    | 'Continuar ciclo universitario (cadena de formación)';

  // 4. Bienestar al Aprendiz y Apoyos Socioeconómicos
  requiresEconomicSupport: boolean;
  supportRequestedTypes: string[];
  healthEmergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface SenaSymbol {
  id: string;
  name: string;
  meaning: string;
  elements: { name: string; description: string }[];
  funFact: string;
}

export interface SenaValue {
  name: string;
  concept: string;
  applicationInLearning: string;
  iconName: string;
}

export interface ApprenticeRight {
  id: string;
  number: number;
  title: string;
  summary: string;
  fullText: string;
  legalArticle: string;
  category: 'formacion' | 'bienestar' | 'representacion' | 'debido_proceso';
  realLifeExample: string;
  advice: string;
}

export interface ApprenticeDuty {
  id: string;
  number: number;
  title: string;
  summary: string;
  fullText: string;
  legalArticle: string;
  category: 'academico' | 'disciplinario' | 'seguridad' | 'convivencia';
  consequenceIfViolated: string;
  practicalTip: string;
}

export interface ProcedureGuide {
  id: string;
  title: string;
  type: 'aplazamiento' | 'traslado' | 'reingreso' | 'retiro_voluntario' | 'desercion';
  definition: string;
  requirements: string[];
  durationLimit: string;
  impactOrSanction: string;
  stepByStep: string[];
}

export interface ProductiveStageOption {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  requirements: string[];
  popularIn: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  category: 'Inasistencia' | 'Plagio / Fraude' | 'Convivencia' | 'Seguridad / EPP' | 'Uso de Instalaciones';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  regulatoryExplanation: string;
  classification: 'Falta Leve' | 'Falta Grave' | 'Falta Gravísima' | 'Situación Administrativa';
  dueProcess: string;
}

export interface EvaluationQuestion {
  id: string;
  category: 'institucional' | 'derechos' | 'deberes' | 'procedimientos' | 'etapa_productiva';
  categoryLabel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  articleReference: string;
}

export interface EvaluationResult {
  completedAt: string;
  totalQuestions: number;
  score: number; // percentage 0 - 100
  correctCount: number;
  passed: boolean; // >= 70%
  categoryBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
  timeSpentSeconds: number;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface ApprenticeProfile {
  id: string;
  fullName: string;
  documentType: 'C.C.' | 'T.I.' | 'C.E.' | 'P.E.P.';
  documentNumber: string;
  email: string;
  phone: string;
  fichaId: string;
  programName: string;
  centerName: string;
  regionalName: string;
  modulesCompleted: string[];
  characterization?: ApprenticeCharacterization;
  evaluationResult?: EvaluationResult;
  certificateCode?: string;
  issueDate?: string;
}

export interface FichaGroup {
  id: string; // e.g., '2824901'
  programName: string;
  programLevel: 'Tecnólogo' | 'Técnico' | 'Operario' | 'Especialización Tecnológica';
  centerName: string;
  regionalName: string;
  leadInstructor: string;
  startDate: string;
  totalApprentices: number;
}

export interface RegulationArticle {
  number: number;
  title: string;
  summary: string;
  fullText: string;
  chapterNumber: number;
  chapterTitle: string;
  is2026Amended?: boolean;
  tags: string[];
  practicalImplication: string;
}

export interface RegulationChapter {
  number: number;
  romanNumeral: string;
  title: string;
  articleRange: string;
  description: string;
  coreHighlights: string[];
  articles: RegulationArticle[];
}

export interface RegulationProhibition {
  id: string;
  number: number;
  title: string;
  conduct: string;
  gravity: 'Leve' | 'Grave' | 'Gravísima';
  regulatoryArticle: string;
  consequences: string;
  preventionAdvice: string;
}
