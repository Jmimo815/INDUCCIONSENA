import React, { useState, useMemo } from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  FileCheck, 
  Eye, 
  BarChart3, 
  GraduationCap, 
  Building2, 
  Award,
  BookOpen,
  X,
  TrendingUp,
  FileSpreadsheet,
  BrainCircuit,
  Laptop,
  HeartHandshake,
  Lightbulb,
  LogOut
} from 'lucide-react';
import { FichaGroup, ApprenticeProfile, EvaluationQuestion } from '../../types/induction';
import { EVALUATION_QUESTIONS } from '../../data/senaData';
import { SenaLogo } from '../common/SenaLogo';
import { User } from 'firebase/auth';
import { GoogleSheetsSyncBar } from '../common/GoogleSheetsSyncBar';

interface InstructorDashboardProps {
  fichas: FichaGroup[];
  selectedFichaId: string;
  onSelectFicha: (fichaId: string) => void;
  apprentices: ApprenticeProfile[];
  onAddApprentice: (apprentice: ApprenticeProfile) => void;
  onViewApprenticeCertificate: (apprentice: ApprenticeProfile) => void;
  onExitToLanding?: () => void;
  googleUser?: User | null;
  spreadsheetId?: string | null;
  spreadsheetUrl?: string | null;
  spreadsheetName?: string | null;
  isGoogleSyncing?: boolean;
  lastGoogleSyncTime?: string | null;
  onGoogleLogin?: () => Promise<void>;
  onGoogleLogout?: () => Promise<void>;
  onGoogleSync?: () => Promise<void>;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  fichas,
  selectedFichaId,
  onSelectFicha,
  apprentices,
  onAddApprentice,
  onViewApprenticeCertificate,
  onExitToLanding,
  googleUser,
  spreadsheetId,
  spreadsheetUrl,
  spreadsheetName,
  isGoogleSyncing = false,
  lastGoogleSyncTime,
  onGoogleLogin,
  onGoogleLogout,
  onGoogleSync
}) => {
  const [activeInstructorTab, setActiveInstructorTab] = useState<'list' | 'cohort-vak'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aprobado' | 'en_progreso' | 'refuerzo' | 'sin_iniciar'>('all');
  const [selectedApprenticeDetail, setSelectedApprenticeDetail] = useState<ApprenticeProfile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New apprentice form state
  const [newFullName, setNewFullName] = useState('');
  const [newDocType, setNewDocType] = useState<'C.C.' | 'T.I.' | 'C.E.' | 'P.E.P.'>('C.C.');
  const [newDocNumber, setNewDocNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const currentFicha = fichas.find(f => f.id === selectedFichaId) || fichas[0];

  // Apprentices of current ficha
  const fichaApprentices = useMemo(() => {
    return apprentices.filter(a => a.fichaId === selectedFichaId);
  }, [apprentices, selectedFichaId]);

  // Statistics
  const stats = useMemo(() => {
    const total = fichaApprentices.length;
    let approved = 0;
    let needsReinforcement = 0;
    let inProgress = 0;
    let notStarted = 0;
    let totalScoreSum = 0;
    let evaluatedCount = 0;

    fichaApprentices.forEach(a => {
      if (a.evaluationResult) {
        evaluatedCount++;
        totalScoreSum += a.evaluationResult.score;
        if (a.evaluationResult.passed) {
          approved++;
        } else {
          needsReinforcement++;
        }
      } else if (a.modulesCompleted.length > 0) {
        inProgress++;
      } else {
        notStarted++;
      }
    });

    const approvalRate = evaluatedCount > 0 ? Math.round((approved / evaluatedCount) * 100) : 0;
    const avgScore = evaluatedCount > 0 ? Math.round(totalScoreSum / evaluatedCount) : 0;

    return {
      total,
      approved,
      needsReinforcement,
      inProgress,
      notStarted,
      evaluatedCount,
      approvalRate,
      avgScore
    };
  }, [fichaApprentices]);

  // Filtered apprentices
  const filteredApprentices = useMemo(() => {
    return fichaApprentices.filter(a => {
      const matchesSearch = 
        a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.documentNumber.includes(searchQuery) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (statusFilter === 'aprobado') {
        matchesStatus = a.evaluationResult?.passed === true;
      } else if (statusFilter === 'refuerzo') {
        matchesStatus = a.evaluationResult?.passed === false;
      } else if (statusFilter === 'en_progreso') {
        matchesStatus = !a.evaluationResult && a.modulesCompleted.length > 0;
      } else if (statusFilter === 'sin_iniciar') {
        matchesStatus = !a.evaluationResult && a.modulesCompleted.length === 0;
      }

      return matchesSearch && matchesStatus;
    });
  }, [fichaApprentices, searchQuery, statusFilter]);

  // CSV Export for Academic Coordination
  const handleExportCSV = () => {
    const headers = [
      "Ficha",
      "Programa",
      "Tipo Documento",
      "Número Documento",
      "Nombre Completo",
      "Correo Electrónico",
      "Teléfono",
      "Módulos Completados",
      "Evaluación Presentada",
      "Puntaje (%)",
      "Juicio Inducción",
      "Código Certificado",
      "Fecha Certificación"
    ];

    const rows = fichaApprentices.map(a => {
      const res = a.evaluationResult;
      return [
        `"${a.fichaId}"`,
        `"${a.programName}"`,
        `"${a.documentType}"`,
        `"${a.documentNumber}"`,
        `"${a.fullName}"`,
        `"${a.email}"`,
        `"${a.phone}"`,
        `"${a.modulesCompleted.length}/5"`,
        res ? `"Sí"` : `"No"`,
        res ? `"${res.score}%"` : `""`,
        res ? (res.passed ? `"APROBADO"` : `"NO COMPETENTE"`) : `"PENDIENTE"`,
        `"${a.certificateCode || ''}"`,
        `"${a.issueDate || (res ? res.completedAt : '')}"`
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Acta_Induccion_SENA_Ficha_${selectedFichaId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newDocNumber) return;

    const newApp: ApprenticeProfile = {
      id: `app-${Date.now()}`,
      fullName: newFullName,
      documentType: newDocType,
      documentNumber: newDocNumber,
      email: newEmail || `${newFullName.toLowerCase().replace(/\s+/g, '')}@misena.edu.co`,
      phone: newPhone || '300 000 0000',
      fichaId: selectedFichaId,
      programName: currentFicha.programName,
      centerName: currentFicha.centerName,
      regionalName: currentFicha.regionalName,
      modulesCompleted: []
    };

    onAddApprentice(newApp);
    setNewFullName('');
    setNewDocNumber('');
    setNewEmail('');
    setNewPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Cohort Selector */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-[#005e26] rounded-2xl text-white p-6 sm:p-8 shadow-sm">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <SenaLogo variant="white" className="w-80 h-80" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
              <span>Gestión de Formación Profesional</span>
              <span aria-hidden="true">·</span>
              <span>Panel del Instructor Líder de Inducción</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-2">
              Control y Seguimiento del Proceso de Inducción
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Monitorea en tiempo real la apropiación de derechos, deberes y normatividad SENA de los aprendices de tu ficha, consulta estadísticas de resultados y genera actas oficiales.
            </p>
          </div>

          {/* Ficha switcher control & Exit button */}
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/15 w-full lg:w-80 shrink-0 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider block">
                Ficha Activa:
              </span>
              {onExitToLanding && (
                <button
                  onClick={onExitToLanding}
                  className="flex items-center gap-1 text-[11px] font-semibold text-rose-200 hover:text-white bg-rose-500/25 hover:bg-rose-500/40 px-2 py-0.5 rounded border border-rose-400/40 transition-all cursor-pointer"
                  title="Salir al Portal Principal de Roles"
                >
                  <LogOut className="w-3 h-3 text-rose-300" />
                  <span>Salir</span>
                </button>
              )}
            </div>
            <select
              value={selectedFichaId}
              onChange={(e) => onSelectFicha(e.target.value)}
              className="w-full bg-white text-slate-900 px-3 py-2 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            >
              {fichas.map(f => (
                <option key={f.id} value={f.id}>
                  Ficha {f.id} - {f.programLevel} {f.programName.slice(0, 32)}...
                </option>
              ))}
            </select>
            <div className="text-[10px] text-slate-300">
              {currentFicha.centerName} · {currentFicha.regionalName}
            </div>
          </div>
        </div>
      </div>

      {/* Google Sheets & Drive Cloud Sync Bar */}
      {onGoogleLogin && onGoogleLogout && onGoogleSync && (
        <GoogleSheetsSyncBar
          currentUser={googleUser || null}
          spreadsheetId={spreadsheetId || null}
          spreadsheetUrl={spreadsheetUrl || null}
          spreadsheetName={spreadsheetName || null}
          isSyncing={isGoogleSyncing}
          lastSyncTime={lastGoogleSyncTime || null}
          onLogin={onGoogleLogin}
          onLogout={onGoogleLogout}
          onCreateOrSync={onGoogleSync}
        />
      )}

      {/* Metric Cards (Zero-pill clean layout) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Aprendices</span>
            <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
              {stats.total}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">en la ficha</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Evaluados: {stats.evaluatedCount}</span>
            <span>Pendientes: {stats.total - stats.evaluatedCount}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Aprobados (Competentes)</span>
            <CheckCircle2 className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-[#005e26] dark:text-emerald-400">
              {stats.approved}
            </span>
            <span className="text-xs font-semibold text-[#007832] dark:text-emerald-300">
              ({stats.approvalRate}%)
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-[#007832] dark:text-emerald-400">
            Certificados digitales emitidos
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Requieren Refuerzo</span>
            <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-amber-600 dark:text-amber-400">
              {stats.needsReinforcement}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">aprendices</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-300">
            Puntaje menor al 70%
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Promedio de Apropiación</span>
            <TrendingUp className="w-4 h-4 text-sky-500 dark:text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-black text-slate-900 dark:text-white">
              {stats.avgScore}%
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">promedio</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Nivel global de la ficha
          </div>
        </div>
      </div>

      {/* Subtab Switcher: List vs Cohort VAK Characterization */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          onClick={() => setActiveInstructorTab('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeInstructorTab === 'list'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-[#39A900]" />
          <span>Listado y Juicios Evaluativos ({fichaApprentices.length})</span>
        </button>

        <button
          onClick={() => setActiveInstructorTab('cohort-vak')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeInstructorTab === 'cohort-vak'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-blue-500" />
          <span>Diagnóstico de Ficha: Estilos VAK & Conectividad</span>
        </button>
      </div>

      {activeInstructorTab === 'cohort-vak' ? (
        /* COHORT VAK & PEDAGOGICAL DIAGNOSIS VIEW */
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-[#39A900]" />
                  <span>Perfil de Aprendizaje de la Ficha {selectedFichaId}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Análisis consolidado para la adaptación metodológica de las Guías de Aprendizaje y talleres de formación.
                </p>
              </div>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                {fichaApprentices.filter(a => !!a.characterization).length} de {fichaApprentices.length} aprendices caracterizados
              </div>
            </div>

            {/* VAK Distribution for this Ficha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  name: 'Visual', 
                  count: fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Visual').length,
                  tip: 'Apóyate en diagramas, mapas conceptuales y capturas de pantalla de la interfaz.',
                  border: 'border-emerald-200 dark:border-emerald-800',
                  bg: 'bg-emerald-50/60 dark:bg-emerald-950/30',
                  color: 'text-[#007832] dark:text-emerald-400'
                },
                { 
                  name: 'Kinestésico', 
                  count: fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Kinestésico').length,
                  tip: 'Maximiza el tiempo en laboratorios y ambientes con proyectos de software reales.',
                  border: 'border-amber-200 dark:border-amber-800',
                  bg: 'bg-amber-50/60 dark:bg-amber-950/30',
                  color: 'text-amber-700 dark:text-amber-400'
                },
                { 
                  name: 'Auditivo', 
                  count: fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Auditivo').length,
                  tip: 'Fomenta debates técnicos, exposiciones orales y asesorías grupales de dudas.',
                  border: 'border-blue-200 dark:border-blue-800',
                  bg: 'bg-blue-50/60 dark:bg-blue-950/30',
                  color: 'text-blue-700 dark:text-blue-400'
                },
                { 
                  name: 'Lecto-Escritor', 
                  count: fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Lecto-Escritor').length,
                  tip: 'Provee guías en PDF exhaustivas y referencias a documentación técnica oficial.',
                  border: 'border-purple-200 dark:border-purple-800',
                  bg: 'bg-purple-50/60 dark:bg-purple-950/30',
                  color: 'text-purple-700 dark:text-purple-400'
                }
              ].map(st => (
                <div key={st.name} className={`p-4 rounded-xl border ${st.border} ${st.bg} space-y-2`}>
                  <div className={`text-xs font-bold ${st.color}`}>Estilo {st.name}</div>
                  <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {st.count} <span className="text-xs font-normal text-slate-500">aprendices</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.tip}
                  </p>
                </div>
              ))}
            </div>

            {/* Connectivity and Welfare Alerts for the Instructor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>Equipamiento Técnico de los Aprendices</span>
                </div>
                <div className="space-y-2 text-xs">
                  {fichaApprentices.map(app => {
                    const char = app.characterization;
                    return (
                      <div key={app.id} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{app.fullName}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {char ? `${char.primaryDevice} · ${char.internetConnection.split('(')[0]}` : 'Sin caracterizar'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  <span>Enlace con Bienestar al Aprendiz</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <p>
                    Aprendices que manifestaron requerir apoyos socioeconómicos (FIC / Regular) en su caracterización:
                  </p>
                  <div className="space-y-1.5">
                    {fichaApprentices
                      .filter(a => a.characterization?.requiresEconomicSupport)
                      .map(app => (
                        <div key={app.id} className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 flex items-center justify-between">
                          <span className="font-semibold text-slate-900 dark:text-white">{app.fullName}</span>
                          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                            {app.characterization?.supportRequestedTypes.join(', ') || 'Apoyo requerido'}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>

      {/* Main Table Controls & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, documento o correo..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]/40 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Filter by status */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'all' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todos ({fichaApprentices.length})
          </button>
          <button
            onClick={() => setStatusFilter('aprobado')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'aprobado' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Aprobados ({stats.approved})
          </button>
          <button
            onClick={() => setStatusFilter('refuerzo')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'refuerzo' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Refuerzo ({stats.needsReinforcement})
          </button>
          <button
            onClick={() => setStatusFilter('en_progreso')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              statusFilter === 'en_progreso' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            En Curso ({stats.inProgress})
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
            title="Exportar acta en formato CSV compatible con Excel"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Aprendiz</span>
          </button>
        </div>
      </div>

      {/* Apprentices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Caracterización (VAK)</th>
                <th className="py-3 px-4">Progreso Módulos</th>
                <th className="py-3 px-4">Evaluación</th>
                <th className="py-3 px-4">Estado Inducción</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApprentices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No se encontraron aprendices en esta ficha con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredApprentices.map((app) => {
                  const res = app.evaluationResult;
                  const char = app.characterization;
                  const modulesRatio = `${app.modulesCompleted.length}/5`;

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{app.fullName}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{app.email}</div>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-700 dark:text-slate-300">
                        {app.documentType} {app.documentNumber}
                      </td>

                      <td className="py-3 px-4">
                        {char ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
                            {char.dominantLearningStyle} (Estr. {char.stratum})
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 italic text-[11px]">
                            Pendiente
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="bg-[#39A900] h-full"
                              style={{ width: `${(app.modulesCompleted.length / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">{modulesRatio}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {res ? (
                          <div className="flex items-center gap-1.5">
                            <span className={`font-black text-sm ${res.passed ? 'text-[#005e26] dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                              {res.score}%
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                              ({res.correctCount}/{res.totalQuestions})
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">No presentada</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {res ? (
                          res.passed ? (
                            <span className="text-[11px] font-bold text-[#007832] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                              <CheckCircle2 className="w-3 h-3 text-[#39A900] dark:text-emerald-400" />
                              Aprobado
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                              <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              Refuerzo
                            </span>
                          )
                        ) : app.modulesCompleted.length > 0 ? (
                          <span className="text-[11px] font-medium text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                            <Clock className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                            En Curso
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded w-max block">
                            Sin Iniciar
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {res && (
                            <button
                              onClick={() => setSelectedApprenticeDetail(app)}
                              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md transition-colors"
                              title="Ver detalle de evaluación"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}

                          {res?.passed && (
                            <button
                              onClick={() => onViewApprenticeCertificate(app)}
                              className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-[#007832] dark:text-emerald-400 rounded-md transition-colors"
                              title="Ver o reimprimir certificado digital"
                            >
                              <FileCheck className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}

      {/* Modal: Add Apprentice */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                Registrar Aprendiz en Ficha {selectedFichaId}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApprentice} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="Ej: Daniel Esteban Pardo Castro"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Tipo Doc.</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as unknown as ApprenticeProfile['documentType'])}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="C.C.">C.C.</option>
                    <option value="T.I.">T.I.</option>
                    <option value="C.E.">C.E.</option>
                    <option value="P.E.P.">P.E.P.</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Número de Documento *</label>
                  <input
                    type="text"
                    required
                    value={newDocNumber}
                    onChange={(e) => setNewDocNumber(e.target.value)}
                    placeholder="Ej: 1023948571"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Correo Electrónico (MiSena)</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Ej: dpardo571@misena.edu.co"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Teléfono Móvil</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Ej: 312 900 1122"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white rounded-lg font-bold shadow-xs"
                >
                  Registrar Aprendiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Evaluation Detail Viewer */}
      {selectedApprenticeDetail && selectedApprenticeDetail.evaluationResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                  Detalle de Inducción: {selectedApprenticeDetail.fullName}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {selectedApprenticeDetail.documentType} {selectedApprenticeDetail.documentNumber} · Ficha {selectedApprenticeDetail.fichaId}
                </p>
              </div>
              <button
                onClick={() => setSelectedApprenticeDetail(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Puntaje</span>
                <span className={`text-xl font-heading font-black ${
                  selectedApprenticeDetail.evaluationResult.passed ? 'text-[#005e26] dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                }`}>
                  {selectedApprenticeDetail.evaluationResult.score}%
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Aciertos</span>
                <span className="text-xl font-heading font-black text-slate-900 dark:text-white">
                  {selectedApprenticeDetail.evaluationResult.correctCount}/{selectedApprenticeDetail.evaluationResult.totalQuestions}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Estado</span>
                <span className={`text-xs font-bold block mt-1 ${
                  selectedApprenticeDetail.evaluationResult.passed ? 'text-[#007832] dark:text-emerald-400' : 'text-amber-800 dark:text-amber-300'
                }`}>
                  {selectedApprenticeDetail.evaluationResult.passed ? 'APROBADO' : 'REFUERZO'}
                </span>
              </div>
            </div>

            {/* Characterization Snapshot */}
            {selectedApprenticeDetail.characterization ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#007832] dark:text-emerald-300 flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4 text-[#39A900]" />
                    <span>Estilo VAK: {selectedApprenticeDetail.characterization.dominantLearningStyle} (Estrato {selectedApprenticeDetail.characterization.stratum})</span>
                  </span>
                  <span className="text-[11px] text-slate-500">{selectedApprenticeDetail.characterization.weeklyStudyHoursAvailable} h/sem</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Equipo:</span> {selectedApprenticeDetail.characterization.primaryDevice} · {selectedApprenticeDetail.characterization.internetConnection.split('(')[0]}
                </div>
                {selectedApprenticeDetail.characterization.requiresEconomicSupport && (
                  <div className="text-[11px] text-amber-800 dark:text-amber-300">
                    <span className="font-semibold">Apoyo solicitado:</span> {selectedApprenticeDetail.characterization.supportRequestedTypes.join(', ')}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs text-slate-500 italic">
                El aprendiz aún no ha diligenciado el instrumento de Caracterización Inicial.
              </div>
            )}

            {/* Competency breakdown */}
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">Desglose por Competencia:</span>
              <div className="space-y-2">
                {Object.entries(selectedApprenticeDetail.evaluationResult.categoryBreakdown).map(([catKey, catVal]) => (
                  <div key={catKey} className="flex items-center justify-between text-xs p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="capitalize text-slate-700 dark:text-slate-300 font-medium">{catKey.replace('_', ' ')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{catVal.percentage}% ({catVal.correct}/{catVal.total})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              {selectedApprenticeDetail.evaluationResult.passed && (
                <button
                  onClick={() => {
                    const app = selectedApprenticeDetail;
                    setSelectedApprenticeDetail(null);
                    onViewApprenticeCertificate(app);
                  }}
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Ver Certificado Oficial</span>
                </button>
              )}
              <button
                onClick={() => setSelectedApprenticeDetail(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
