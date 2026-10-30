import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  User, 
  Wifi, 
  BrainCircuit, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Edit3, 
  Lightbulb, 
  BookOpen, 
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';
import { ApprenticeProfile, ApprenticeCharacterization } from '../../types/induction';
import { SenaLogo } from '../common/SenaLogo';

interface CharacterizationModuleProps {
  apprentice: ApprenticeProfile;
  onSaveCharacterization: (characterization: ApprenticeCharacterization) => void;
  onNavigateToNext: () => void;
}

const VAK_QUESTIONS = [
  {
    id: 'vak-1',
    scenario: 'Cuando vas a aprender a usar un nuevo software o herramienta de taller, ¿cuál es tu primera reacción?',
    options: [
      { text: 'Busco un diagrama, infografía o video explicativo con capturas visuales de la interfaz.', style: 'Visual' },
      { text: 'Prefiero que el instructor o un compañero me lo explique verbalmente paso a paso.', style: 'Auditivo' },
      { text: 'Comienzo a interactuar directamente con la herramienta, tocando y experimentando en la práctica.', style: 'Kinestésico' },
      { text: 'Leo detenidamente el manual técnico, la guía en PDF o la documentación escrita.', style: 'Lecto-Escritor' }
    ]
  },
  {
    id: 'vak-2',
    scenario: 'Para preparar una evaluación o sustentar una evidencia de aprendizaje en el SENA:',
    options: [
      { text: 'Diseño mapas conceptuales, esquemas con colores y cuadros sinópticos.', style: 'Visual' },
      { text: 'Repaso en voz alta, debato con compañeros o escucho grabaciones y podcasts.', style: 'Auditivo' },
      { text: 'Construyo maquetas, escribo código de prueba, realizo simulaciones o camino mientras repaso.', style: 'Kinestésico' },
      { text: 'Hago resúmenes extensos por escrito, listas estructuradas y fichas de lectura.', style: 'Lecto-Escritor' }
    ]
  },
  {
    id: 'vak-3',
    scenario: 'En un ambiente de formación SENA, te sientes más cómodo y productivo cuando:',
    options: [
      { text: 'El instructor proyecta diapositivas claras, infografías y ejemplos gráficos en pantalla.', style: 'Visual' },
      { text: 'Se realizan debates grupales, mesas redondas y explicaciones orales detalladas.', style: 'Auditivo' },
      { text: 'Se trabaja en talleres de práctica real, laboratorios y proyectos colaborativos aplicados.', style: 'Kinestésico' },
      { text: 'Nos entregan la guía de aprendizaje completa y fuentes bibliográficas escritas.', style: 'Lecto-Escritor' }
    ]
  },
  {
    id: 'vak-4',
    scenario: 'Cuando tienes una duda técnica sobre un tema complejo del programa:',
    options: [
      { text: 'Pido ver un ejemplo visual terminado o un diagrama del resultado esperado.', style: 'Visual' },
      { text: 'Hablo con el instructor o asisto a una sesión de asesoría virtual para conversar la duda.', style: 'Auditivo' },
      { text: 'Intento resolverlo por ensayo y error cometiendo fallos hasta dar con la solución práctica.', style: 'Kinestésico' },
      { text: 'Busco artículos, foros técnicos especializados y libros de texto para leer la solución.', style: 'Lecto-Escritor' }
    ]
  }
];

export const CharacterizationModule: React.FC<CharacterizationModuleProps> = ({
  apprentice,
  onSaveCharacterization,
  onNavigateToNext
}) => {
  // Existing characterization or default form state
  const existing = apprentice.characterization;
  const [isEditing, setIsEditing] = useState<boolean>(!existing);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [stratum, setStratum] = useState<1 | 2 | 3 | 4 | 5 | 6>(existing?.stratum || 2);
  const [vulnerableGroup, setVulnerableGroup] = useState<ApprenticeCharacterization['vulnerableGroup']>(
    existing?.vulnerableGroup || 'Ninguno / Población General'
  );
  const [employmentStatus, setEmploymentStatus] = useState<ApprenticeCharacterization['employmentStatus']>(
    existing?.employmentStatus || 'Dedicación exclusiva a estudio'
  );
  const [householdDependents, setHouseholdDependents] = useState<number>(existing?.householdDependents ?? 0);

  // Technology & Connectivity
  const [primaryDevice, setPrimaryDevice] = useState<ApprenticeCharacterization['primaryDevice']>(
    existing?.primaryDevice || 'Portátil propio'
  );
  const [internetConnection, setInternetConnection] = useState<ApprenticeCharacterization['internetConnection']>(
    existing?.internetConnection || 'Banda ancha fija en hogar (Fibra/Cable)'
  );
  const [digitalSkillLevel, setDigitalSkillLevel] = useState<ApprenticeCharacterization['digitalSkillLevel']>(
    existing?.digitalSkillLevel || 'Intermedio (Ofimática, Teams, LMS Zajuna)'
  );
  const [hasPersonalWorkspace, setHasPersonalWorkspace] = useState<boolean>(existing?.hasPersonalWorkspace ?? true);

  // Diagnostic Test Answers (defaults to 0, 0, 0, 0)
  const [vakAnswers, setVakAnswers] = useState<Record<number, string>>({
    0: 'Visual',
    1: 'Kinestésico',
    2: 'Kinestésico',
    3: 'Visual'
  });
  const [weeklyStudyHoursAvailable, setWeeklyStudyHoursAvailable] = useState<number>(
    existing?.weeklyStudyHoursAvailable || 30
  );
  const [primaryMotivation, setPrimaryMotivation] = useState<ApprenticeCharacterization['primaryMotivation']>(
    existing?.primaryMotivation || 'Conseguir mi primer empleo formal'
  );

  // Bienestar & Apoyos
  const [requiresEconomicSupport, setRequiresEconomicSupport] = useState<boolean>(
    existing?.requiresEconomicSupport ?? true
  );
  const [selectedSupports, setSelectedSupports] = useState<string[]>(
    existing?.supportRequestedTypes || ['Apoyo de Sostenimiento FIC']
  );
  const [emergencyName, setEmergencyName] = useState<string>(
    existing?.healthEmergencyContact?.name || 'María Morales'
  );
  const [emergencyPhone, setEmergencyPhone] = useState<string>(
    existing?.healthEmergencyContact?.phone || '311 204 9831'
  );
  const [emergencyRel, setEmergencyRel] = useState<string>(
    existing?.healthEmergencyContact?.relationship || 'Madre / Acudiente'
  );

  // Compute dominant style and scores
  const calculateVak = () => {
    const counts: Record<string, number> = {
      Visual: 0,
      Auditivo: 0,
      Kinestésico: 0,
      'Lecto-Escritor': 0
    };
    Object.values(vakAnswers).forEach(style => {
      if (counts[style] !== undefined) counts[style] += 1;
    });

    const total = Math.max(1, Object.values(counts).reduce((a, b) => a + b, 0));
    const scores = {
      visual: Math.round((counts['Visual'] / total) * 100),
      auditory: Math.round((counts['Auditivo'] / total) * 100),
      kinesthetic: Math.round((counts['Kinestésico'] / total) * 100),
      readingWriting: Math.round((counts['Lecto-Escritor'] / total) * 100)
    };

    let dominant: 'Visual' | 'Auditivo' | 'Kinestésico' | 'Lecto-Escritor' = 'Visual';
    let max = -1;
    (Object.keys(counts) as ('Visual' | 'Auditivo' | 'Kinestésico' | 'Lecto-Escritor')[]).forEach(k => {
      if (counts[k] > max) {
        max = counts[k];
        dominant = k;
      }
    });

    return { dominant, scores };
  };

  const handleToggleSupport = (supportType: string) => {
    setSelectedSupports(prev => 
      prev.includes(supportType)
        ? prev.filter(s => s !== supportType)
        : [...prev, supportType]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const { dominant, scores } = calculateVak();

    const charData: ApprenticeCharacterization = {
      completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      stratum,
      vulnerableGroup,
      employmentStatus,
      householdDependents,
      primaryDevice,
      internetConnection,
      digitalSkillLevel,
      hasPersonalWorkspace,
      dominantLearningStyle: dominant,
      vakScores: scores,
      weeklyStudyHoursAvailable,
      primaryMotivation,
      requiresEconomicSupport,
      supportRequestedTypes: requiresEconomicSupport ? selectedSupports : [],
      healthEmergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relationship: emergencyRel
      }
    };

    onSaveCharacterization(charData);
    setIsEditing(false);
  };

  const currentVak = calculateVak();

  // Recommendations tailored to dominant style
  const getStyleRecommendations = (style: string) => {
    switch (style) {
      case 'Visual':
        return [
          'Utiliza mapas conceptuales, diagramas de flujo y código de colores en tus apuntes.',
          'Solicita a tus instructores demostraciones visuales y diagramas de arquitectura técnica.',
          'Apóyate en infografías y tutoriales en video disponibles en el LMS Zajuna y biblioteca virtual.',
          'Revisa el material de estudio en formato digital en pantallas de alta resolución.'
        ];
      case 'Auditivo':
        return [
          'Participa activamente en debates, mesas redondas y grupos de discusión con compañeros.',
          'Graba resúmenes orales de los conceptos clave o explícale los temas a otra persona.',
          'Escucha podcasts técnicos y explicaciones de instructores con atención concentrada.',
          'Evita ambientes con ruido blanco o música con letra distractora durante el estudio.'
        ];
      case 'Kinestésico':
        return [
          'Aprovecha al máximo las horas en los ambientes de aprendizaje y laboratorios del SENA.',
          'Aprende construyendo prototipos, proyectos prácticos y casos de estudio reales.',
          'Realiza pausas activas cada 45 minutos para mantener la concentración y oxigenación.',
          'Simula los flujos de trabajo antes de redactar informes teóricos.'
        ];
      case 'Lecto-Escritor':
        return [
          'Lee a profundidad las guías de aprendizaje y la bibliografía técnica recomendada.',
          'Toma notas detalladas por escrito y elabora tus propios glosarios de términos técnicos.',
          'Consulta manuales oficiales, normas técnicas colombianas e internacionales (ISO/ICONTEC).',
          'Sustenta tus evidencias mediante informes estructurados con citas de fuentes verificadas.'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Module Title Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900]">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#39A900] dark:text-emerald-400">
                Fase Previa Obligatoria de Inducción
              </span>
              {existing && !isEditing && (
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-[#007832] dark:text-emerald-300 px-2 py-0.5 rounded">
                  ✓ Diligenciada
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
              Caracterización del Aprendiz SENA
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Instrumento institucional de recolección sociodemográfica, tecnológica, de estilos de aprendizaje y bienestar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {existing && !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modificar Respuestas</span>
            </button>
          ) : null}
          <button
            onClick={() => window.print()}
            className="no-print flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Ficha</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE: OFFICIAL CHARACTERIZATION SHEET */}
      {existing && !isEditing ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-6">
            {/* Sheet Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
              <div className="flex items-center gap-3">
                <SenaLogo variant="official" className="w-12 h-12" />
                <div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Servicio Nacional de Aprendizaje SENA · Dirección de Formación Profesional
                  </div>
                  <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
                    Ficha de Caracterización Inicial del Aprendiz
                  </h2>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Registro de fecha: <span className="font-semibold text-slate-700 dark:text-slate-300">{existing.completedAt}</span>
                  </div>
                </div>
              </div>
              <div className="text-right sm:border-l sm:border-slate-200 sm:dark:border-slate-800 sm:pl-4">
                <div className="text-xs font-semibold text-slate-400">Código de Ficha</div>
                <div className="text-base font-bold font-mono text-[#005e26] dark:text-emerald-400">{apprentice.fichaId}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{apprentice.programName}</div>
              </div>
            </div>

            {/* General Apprentice Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Nombre Completo:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{apprentice.fullName}</p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Documento:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100">{apprentice.documentType} {apprentice.documentNumber}</p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Correo Electrónico:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100 truncate">{apprentice.email}</p>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Regional & Centro:</span>
                <p className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{apprentice.regionalName}</p>
              </div>
            </div>

            {/* Core Diagnostic Section: Learning Style (VAK) */}
            <div className="p-6 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-[#39A900]" />
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    Estilo de Aprendizaje Predominante: <span className="text-[#007832] dark:text-emerald-400 font-extrabold">{existing.dominantLearningStyle}</span>
                  </h3>
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                  Dedicación estimada: {existing.weeklyStudyHoursAvailable} horas/semana
                </div>
              </div>

              {/* Progress Bar of Styles */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Desglose Diagnóstico VAK:</span>
                  <div className="flex gap-4 font-semibold">
                    <span className="text-emerald-700 dark:text-emerald-400">Visual: {existing.vakScores.visual}%</span>
                    <span className="text-blue-700 dark:text-blue-400">Auditivo: {existing.vakScores.auditory}%</span>
                    <span className="text-amber-700 dark:text-amber-400">Kinestésico: {existing.vakScores.kinesthetic}%</span>
                    <span className="text-purple-700 dark:text-purple-400">Lecto-Escritor: {existing.vakScores.readingWriting}%</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                  <div style={{ width: `${existing.vakScores.visual}%` }} className="bg-[#39A900] h-full" title={`Visual ${existing.vakScores.visual}%`} />
                  <div style={{ width: `${existing.vakScores.auditory}%` }} className="bg-blue-500 h-full" title={`Auditivo ${existing.vakScores.auditory}%`} />
                  <div style={{ width: `${existing.vakScores.kinesthetic}%` }} className="bg-amber-500 h-full" title={`Kinestésico ${existing.vakScores.kinesthetic}%`} />
                  <div style={{ width: `${existing.vakScores.readingWriting}%` }} className="bg-purple-500 h-full" title={`Lecto-Escritor ${existing.vakScores.readingWriting}%`} />
                </div>
              </div>

              {/* Pedagogical Recommendations */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Recomendaciones pedagógicas personalizadas para tu formación:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {getStyleRecommendations(existing.dominantLearningStyle).map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white dark:bg-slate-900/80 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Detail Columns: Socioeconomic, Technology, Welfare */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Col 1: Socioeconomic */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-heading font-bold text-sm">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Condición Sociodemográfica</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Estrato Residencial:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Estrato {existing.stratum}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Grupo de Atención Especial:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{existing.vulnerableGroup}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Situación Ocupacional:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{existing.employmentStatus}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Personas a cargo económicamente:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{existing.householdDependents} personas</p>
                  </div>
                </div>
              </div>

              {/* Col 2: Technology & Connectivity */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-heading font-bold text-sm">
                  <Wifi className="w-4 h-4 text-[#39A900]" />
                  <span>Tecnología y Conectividad</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Dispositivo Principal de Estudio:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{existing.primaryDevice}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Acceso a Internet:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{existing.internetConnection}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Habilidades Digitales:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{existing.digitalSkillLevel}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Espacio de estudio en casa:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{existing.hasPersonalWorkspace ? 'Cuenta con espacio propio' : 'Requiere usar ambientes SENA'}</p>
                  </div>
                </div>
              </div>

              {/* Col 3: Bienestar & Apoyos */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-heading font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  <span>Bienestar y Apoyos</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Solicitud de Apoyo de Sostenimiento:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {existing.requiresEconomicSupport ? 'Sí (Priorizado para evaluación)' : 'No requiere en este momento'}
                    </p>
                  </div>
                  {existing.supportRequestedTypes.length > 0 && (
                    <div>
                      <span className="text-slate-400 dark:text-slate-500">Programas de Apoyo Solicitados:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {existing.supportRequestedTypes.map((t, i) => (
                          <span key={i} className="text-[11px] font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Contacto de Emergencia Médica:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {existing.healthEmergencyContact.name} ({existing.healthEmergencyContact.relationship}) - {existing.healthEmergencyContact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions to Proceed */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                <span>Esta caracterización ha sido vinculada a tu expediente de la Ficha {apprentice.fichaId}.</span>
              </div>

              <button
                onClick={onNavigateToNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2d8500] text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Continuar a Módulo 1: Identidad & Símbolos SENA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE FORM WIZARD */
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xs space-y-8">
          {/* Step Indicator */}
          <div className="grid grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`text-left p-2 rounded-lg transition-colors ${
                currentStep === 1 
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-bold text-[#39A900]">Paso 1</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Sociodemográfico</div>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`text-left p-2 rounded-lg transition-colors ${
                currentStep === 2 
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-bold text-[#39A900]">Paso 2</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Tecnología & Conexión</div>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className={`text-left p-2 rounded-lg transition-colors ${
                currentStep === 3 
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-bold text-[#39A900]">Paso 3</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Diagnóstico VAK</div>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className={`text-left p-2 rounded-lg transition-colors ${
                currentStep === 4 
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] font-bold text-[#39A900]">Paso 4</div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">Bienestar & Apoyos</div>
            </button>
          </div>

          {/* STEP 1: Sociodemográfico */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                  Paso 1: Información Sociodemográfica y Vulnerabilidad
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Esta información permite al SENA focalizar apoyos económicos, psicosociales y de conectividad según tu situación.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Estrato Socioeconómico de Residencia:
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {([1, 2, 3, 4, 5, 6] as const).map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setStratum(num)}
                        className={`py-2 text-center rounded-lg text-xs font-bold border transition-all ${
                          stratum === num
                            ? 'bg-[#39A900] text-white border-[#39A900] shadow-xs'
                            : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Personas que dependen económicamente de ti:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={householdDependents}
                    onChange={(e) => setHouseholdDependents(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Situación Ocupacional Actual:
                  </label>
                  <select
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value as ApprenticeCharacterization['employmentStatus'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Dedicación exclusiva a estudio">Dedicación exclusiva a estudio</option>
                    <option value="Desempleado buscando empleo">Desempleado buscando empleo</option>
                    <option value="Trabajador independiente / informal">Trabajador independiente / informal</option>
                    <option value="Empleado formal tiempo completo">Empleado formal tiempo completo</option>
                    <option value="Emprendedor con unidad productiva">Emprendedor con unidad productiva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Grupo Poblacional / Enfoque Diferencial:
                  </label>
                  <select
                    value={vulnerableGroup}
                    onChange={(e) => setVulnerableGroup(e.target.value as ApprenticeCharacterization['vulnerableGroup'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Ninguno / Población General">Ninguno / Población General</option>
                    <option value="Víctima del Conflicto Armado">Víctima del Conflicto Armado</option>
                    <option value="Campesino / Sector Rural">Campesino / Sector Rural</option>
                    <option value="Comunidades Negras / Afrocolombianas / Raizales">Comunidades Negras / Afrocolombianas / Raizales</option>
                    <option value="Población Indígena">Población Indígena</option>
                    <option value="Persona con Discapacidad">Persona con Discapacidad</option>
                    <option value="Madre / Padre Cabeza de Familia">Madre / Padre Cabeza de Familia</option>
                    <option value="Jóvenes en Paz / Alta Vulnerabilidad">Jóvenes en Paz / Alta Vulnerabilidad</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#39A900] text-white text-xs font-bold hover:bg-[#2d8500] transition-colors"
                >
                  <span>Siguiente: Tecnología & Conectividad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Tecnología & Conectividad */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                  Paso 2: Acceso a Tecnología y Conectividad
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Identificamos si requieres préstamos de equipos portátiles o cupos prioritarios en las salas de cómputo del Centro.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Dispositivo Principal con el que desarrollarás tu formación:
                  </label>
                  <select
                    value={primaryDevice}
                    onChange={(e) => setPrimaryDevice(e.target.value as ApprenticeCharacterization['primaryDevice'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Portátil propio">Portátil propio</option>
                    <option value="Computador de escritorio en casa">Computador de escritorio en casa</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Teléfono inteligente (Smartphone)">Teléfono inteligente (Smartphone)</option>
                    <option value="Sin equipo propio (Depende de salas SENA / Café internet)">Sin equipo propio (Depende de salas SENA / Café internet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Tipo de Conexión a Internet en tu vivienda:
                  </label>
                  <select
                    value={internetConnection}
                    onChange={(e) => setInternetConnection(e.target.value as ApprenticeCharacterization['internetConnection'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Banda ancha fija en hogar (Fibra/Cable)">Banda ancha fija en hogar (Fibra/Cable)</option>
                    <option value="Plan de datos ilimitado pospago">Plan de datos ilimitado pospago</option>
                    <option value="Datos móviles limitados (Prepago/Recargas)">Datos móviles limitados (Prepago/Recargas)</option>
                    <option value="Sin conexión continua en casa (Usa WiFi SENA / Biblioteca)">Sin conexión continua en casa (Usa WiFi SENA / Biblioteca)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nivel de Competencias Digitales Inicial:
                  </label>
                  <select
                    value={digitalSkillLevel}
                    onChange={(e) => setDigitalSkillLevel(e.target.value as ApprenticeCharacterization['digitalSkillLevel'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Básico (Navegación web y mensajería)">Básico (Navegación web y mensajería)</option>
                    <option value="Intermedio (Ofimática, Teams, LMS Zajuna)">Intermedio (Ofimática, Teams, LMS Zajuna)</option>
                    <option value="Avanzado (Programación, diseño técnico o análisis)">Avanzado (Programación, diseño técnico o análisis)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ¿Cuentas con un espacio adecuado e iluminado para estudiar en casa?
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="radio"
                        checked={hasPersonalWorkspace === true}
                        onChange={() => setHasPersonalWorkspace(true)}
                        className="text-[#39A900] focus:ring-[#39A900]"
                      />
                      <span>Sí, cuento con escritorio o mesa de estudio</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="radio"
                        checked={hasPersonalWorkspace === false}
                        onChange={() => setHasPersonalWorkspace(false)}
                        className="text-[#39A900] focus:ring-[#39A900]"
                      />
                      <span>No, debo compartir espacio familiar</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#39A900] text-white text-xs font-bold hover:bg-[#2d8500] transition-colors"
                >
                  <span>Siguiente: Diagnóstico de Aprendizaje VAK</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Diagnóstico VAK */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                  Paso 3: Diagnóstico de Estilo de Aprendizaje (Modelo VAK)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Responde con naturalidad a estas 4 situaciones cotidianas para que el equipo de instructores oriente sus estrategias pedagógicas.
                </p>
              </div>

              <div className="space-y-4">
                {VAK_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {idx + 1}. {q.scenario}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = vakAnswers[idx] === opt.style;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => setVakAnswers(prev => ({ ...prev, [idx]: opt.style }))}
                            className={`p-3 rounded-lg text-left text-xs transition-all border ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/70 border-[#39A900] text-[#007832] dark:text-emerald-300 font-semibold shadow-2xs'
                                : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                                Opción {String.fromCharCode(65 + optIdx)}
                              </span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />}
                            </div>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Study dedication & Motivation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Horas de dedicación semanal estimadas para estudio autónomo:
                  </label>
                  <select
                    value={weeklyStudyHoursAvailable}
                    onChange={(e) => setWeeklyStudyHoursAvailable(parseInt(e.target.value) || 20)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value={15}>15 horas semanales (2 horas/día)</option>
                    <option value={25}>25 horas semanales (3-4 horas/día)</option>
                    <option value={35}>35 horas semanales (5 horas/día)</option>
                    <option value={45}>45+ horas semanales (Tiempo completo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Motivación Principal al ingresar al SENA:
                  </label>
                  <select
                    value={primaryMotivation}
                    onChange={(e) => setPrimaryMotivation(e.target.value as ApprenticeCharacterization['primaryMotivation'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Conseguir mi primer empleo formal">Conseguir mi primer empleo formal</option>
                    <option value="Mejorar ingresos y ascender laboralmente">Mejorar ingresos y ascender laboralmente</option>
                    <option value="Crear mi propia empresa / unidad productiva">Crear mi propia empresa / unidad productiva</option>
                    <option value="Continuar ciclo universitario (cadena de formación)">Continuar ciclo universitario (cadena de formación)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#39A900] text-white text-xs font-bold hover:bg-[#2d8500] transition-colors"
                >
                  <span>Siguiente: Bienestar & Apoyos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Bienestar & Apoyos */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                  Paso 4: Solicitudes de Bienestar al Aprendiz y Contacto de Emergencia
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  El Plan Nacional Integral de Bienestar al Aprendiz contempla incentivos económicos, monitoreo de salud y acompañamiento integral.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresEconomicSupport}
                      onChange={(e) => setRequiresEconomicSupport(e.target.checked)}
                      className="w-4 h-4 text-[#39A900] rounded focus:ring-[#39A900]"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        ¿Requieres solicitar Apoyo de Sostenimiento o Beneficios de Bienestar?
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Marca esta casilla si tu situación socioeconómica amerita postulación formal a las convocatorias de Centro.
                      </div>
                    </div>
                  </label>

                  {requiresEconomicSupport && (
                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Selecciona los tipos de apoyo que necesitas priorizar:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          'Apoyo de Sostenimiento FIC',
                          'Apoyo de Sostenimiento Regular',
                          'Subsidio de Transporte / Alimentación',
                          'Monitoría Académica',
                          'Acompañamiento Psicosocial',
                          'Orientación Vocacional y Salud Integral'
                        ].map((support) => (
                          <label key={support} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSupports.includes(support)}
                              onChange={() => handleToggleSupport(support)}
                              className="w-3.5 h-3.5 text-[#39A900] rounded focus:ring-[#39A900]"
                            />
                            <span className="text-slate-800 dark:text-slate-200">{support}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Emergency Contact */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span>Contacto de Emergencia Médica y Salud Ocupacional</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Nombre completo acudiente/familiar:
                      </label>
                      <input
                        type="text"
                        required
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Teléfono / Celular de contacto:
                      </label>
                      <input
                        type="tel"
                        required
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        Parentesco o relación:
                      </label>
                      <input
                        type="text"
                        required
                        value={emergencyRel}
                        onChange={(e) => setEmergencyRel(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <div className="flex items-center gap-2">
                  {existing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      Cancelar Edición
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-bold shadow-md transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Guardar y Generar Ficha Oficial</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
