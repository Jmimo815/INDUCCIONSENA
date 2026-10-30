import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  PieChart, 
  TrendingUp, 
  FileSpreadsheet, 
  ShieldCheck, 
  Search, 
  Download, 
  HeartHandshake, 
  Laptop, 
  BrainCircuit, 
  Scale, 
  FileCheck,
  Clock,
  Sparkles,
  LogOut
} from 'lucide-react';
import { ApprenticeProfile, FichaGroup } from '../../types/induction';
import { SenaLogo } from '../common/SenaLogo';
import { User } from 'firebase/auth';
import { GoogleSheetsSyncBar } from '../common/GoogleSheetsSyncBar';

interface DirectivoDashboardProps {
  apprentices: ApprenticeProfile[];
  fichas: FichaGroup[];
  selectedFichaId: string;
  onSelectFicha: (fichaId: string) => void;
  onViewApprentice: (apprentice: ApprenticeProfile) => void;
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

export const DirectivoDashboard: React.FC<DirectivoDashboardProps> = ({
  apprentices,
  fichas,
  selectedFichaId,
  onSelectFicha,
  onViewApprentice,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVulnerability, setFilterVulnerability] = useState<string>('all');
  const [filterSupport, setFilterSupport] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'learning-styles' | 'vulnerability' | 'due-process'>('overview');

  // Aggregated calculations
  const total = apprentices.length;
  const characterized = apprentices.filter(a => !!a.characterization);
  const characterizedPct = Math.round((characterized.length / total) * 100);

  const certified = apprentices.filter(a => a.evaluationResult?.passed);
  const certifiedPct = Math.round((certified.length / total) * 100);

  // Connectivity gap: relies on smartphone or has limited mobile data or no pc
  const digitalGapCount = characterized.filter(a => 
    a.characterization?.primaryDevice === 'Teléfono inteligente (Smartphone)' ||
    a.characterization?.primaryDevice === 'Sin equipo propio (Depende de salas SENA / Café internet)' ||
    a.characterization?.internetConnection.includes('Datos móviles limitados') ||
    a.characterization?.internetConnection.includes('Sin conexión continua')
  ).length;
  const digitalGapPct = characterized.length ? Math.round((digitalGapCount / characterized.length) * 100) : 0;

  // Economic support requests
  const supportRequestsCount = characterized.filter(a => a.characterization?.requiresEconomicSupport).length;

  // Learning styles distribution across characterized cohort
  const styleCounts: Record<string, number> = {
    Visual: 0,
    Auditivo: 0,
    Kinestésico: 0,
    'Lecto-Escritor': 0
  };
  characterized.forEach(a => {
    if (a.characterization?.dominantLearningStyle) {
      styleCounts[a.characterization.dominantLearningStyle] = (styleCounts[a.characterization.dominantLearningStyle] || 0) + 1;
    }
  });

  // Filtered apprentices list
  const filteredApprentices = apprentices.filter(a => {
    const matchesSearch = 
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.documentNumber.includes(searchTerm) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVuln = 
      filterVulnerability === 'all' || 
      (a.characterization && a.characterization.vulnerableGroup === filterVulnerability);

    const matchesSupport = 
      filterSupport === 'all' ||
      (filterSupport === 'yes' && a.characterization?.requiresEconomicSupport) ||
      (filterSupport === 'no' && !a.characterization?.requiresEconomicSupport) ||
      (filterSupport === 'fic' && a.characterization?.supportRequestedTypes.includes('Apoyo de Sostenimiento FIC'));

    return matchesSearch && matchesVuln && matchesSupport;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Strategic Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#00471d] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2.5 shrink-0">
              <SenaLogo variant="official" className="w-full h-full filter brightness-200" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Building2 className="w-3 h-3" />
                <span>Panel Estratégico · Subdirección de Centro & Bienestar</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mt-1">
                Tablero de Control de Inducción y Caracterización
              </h1>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Consolidado de necesidades sociodemográficas, estilos de aprendizaje y seguimiento normativo (Acuerdo 0009 / Acuerdo 2 de 2026).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onExitToLanding && (
              <button
                onClick={onExitToLanding}
                className="no-print flex items-center gap-1.5 px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/35 text-rose-200 hover:text-white rounded-lg text-xs font-semibold border border-rose-400/30 transition-all cursor-pointer"
                title="Salir al Portal Principal de Roles"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-300" />
                <span>Salir</span>
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="no-print flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold border border-white/20 transition-all"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>Exportar Reporte Ejecutivo</span>
            </button>
          </div>
        </div>

        {/* 5 Strategic KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-emerald-200 text-xs font-medium">
              <span>Total Aprendices</span>
              <Users className="w-4 h-4 opacity-75" />
            </div>
            <div className="text-2xl font-bold font-heading text-white mt-1">{total}</div>
            <div className="text-[10px] text-emerald-300/80 mt-0.5">En 2 Fichas activas</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-emerald-200 text-xs font-medium">
              <span>Caracterizados</span>
              <FileSpreadsheet className="w-4 h-4 opacity-75" />
            </div>
            <div className="text-2xl font-bold font-heading text-emerald-300 mt-1">{characterizedPct}%</div>
            <div className="text-[10px] text-emerald-200/80 mt-0.5">{characterized.length} de {total} aprendices</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-emerald-200 text-xs font-medium">
              <span>Brecha Digital</span>
              <Laptop className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-2xl font-bold font-heading text-amber-300 mt-1">{digitalGapPct}%</div>
            <div className="text-[10px] text-amber-200/80 mt-0.5">{digitalGapCount} requieren salas SENA</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-emerald-200 text-xs font-medium">
              <span>Apoyos Solicitados</span>
              <HeartHandshake className="w-4 h-4 opacity-75" />
            </div>
            <div className="text-2xl font-bold font-heading text-white mt-1">{supportRequestsCount}</div>
            <div className="text-[10px] text-emerald-300/80 mt-0.5">Focalización FIC / Regular</div>
          </div>

          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-emerald-200 text-xs font-medium">
              <span>Certificados Inducción</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-emerald-300 mt-1">{certifiedPct}%</div>
            <div className="text-[10px] text-emerald-200/80 mt-0.5">{certified.length} de {total} aprobados</div>
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

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <PieChart className="w-4 h-4 text-[#39A900]" />
          <span>Visión General & Bienestar</span>
        </button>

        <button
          onClick={() => setActiveTab('learning-styles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'learning-styles'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-blue-500" />
          <span>Matriz de Estilos de Aprendizaje (VAK)</span>
        </button>

        <button
          onClick={() => setActiveTab('vulnerability')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'vulnerability'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-amber-500" />
          <span>Poblaciones & Apoyo de Sostenimiento FIC</span>
        </button>

        <button
          onClick={() => setActiveTab('due-process')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'due-process'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 text-purple-500" />
          <span>Garantías Debido Proceso (Art. 48 Reforma 2026)</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: VAK Breakdown */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#39A900]" />
                <span>Estilos Predominantes</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">{characterized.length} caracterizados</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Visual', count: styleCounts['Visual'], color: 'bg-[#39A900]', textColor: 'text-[#007832] dark:text-emerald-400' },
                { label: 'Kinestésico', count: styleCounts['Kinestésico'], color: 'bg-amber-500', textColor: 'text-amber-700 dark:text-amber-400' },
                { label: 'Auditivo', count: styleCounts['Auditivo'], color: 'bg-blue-500', textColor: 'text-blue-700 dark:text-blue-400' },
                { label: 'Lecto-Escritor', count: styleCounts['Lecto-Escritor'], color: 'bg-purple-500', textColor: 'text-purple-700 dark:text-purple-400' }
              ].map(st => {
                const pct = characterized.length ? Math.round((st.count / characterized.length) * 100) : 0;
                return (
                  <div key={st.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{st.label}</span>
                      <span className={st.textColor}>{pct}% ({st.count})</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${st.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              El {styleCounts['Visual'] >= styleCounts['Kinestésico'] ? 'enfoque visual' : 'enfoque kinestésico'} predomina en la cohorte. Se recomienda priorizar ambientes de formación con talleres aplicados y apoyo gráfico.
            </p>
          </div>

          {/* Card 2: Digital Gap and Needs */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>Equipamiento & Conectividad</span>
              </h3>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                Alerta de Brecha
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Portátil Propio</div>
                  <div className="text-[11px] text-slate-500">Autonomía completa en casa</div>
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {characterized.filter(a => a.characterization?.primaryDevice === 'Portátil propio').length}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-amber-900 dark:text-amber-300">Dependen de Smartphone o Salas SENA</div>
                  <div className="text-[11px] text-amber-700 dark:text-amber-400">Requieren préstamo de equipos en biblioteca</div>
                </div>
                <span className="font-bold text-sm text-amber-700 dark:text-amber-400">
                  {digitalGapCount}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Banda Ancha Fija en Hogar</div>
                  <div className="text-[11px] text-slate-500">Fibra óptica o cable residencial</div>
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {characterized.filter(a => a.characterization?.internetConnection.includes('Banda ancha')).length}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              Coordinación Académica debe programar 2 bloques semanales de acceso libre a salas de cómputo para los aprendices en situación de vulnerabilidad tecnológica.
            </p>
          </div>

          {/* Card 3: Bienestar Priority */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                <span>Demandas de Bienestar</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">{supportRequestsCount} solicitudes</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Apoyo Sostenimiento FIC', count: characterized.filter(a => a.characterization?.supportRequestedTypes.includes('Apoyo de Sostenimiento FIC')).length },
                { name: 'Apoyo Sostenimiento Regular', count: characterized.filter(a => a.characterization?.supportRequestedTypes.includes('Apoyo de Sostenimiento Regular')).length },
                { name: 'Subsidio Transporte / Alimentación', count: characterized.filter(a => a.characterization?.supportRequestedTypes.includes('Subsidio de Transporte / Alimentación')).length },
                { name: 'Monitorías Académicas', count: characterized.filter(a => a.characterization?.supportRequestedTypes.includes('Monitoría Académica')).length }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                  <span className="font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
              <div className="font-bold">Acción de Bienestar al Aprendiz:</div>
              <div className="text-[11px] mt-0.5">Se inicia cruce con el sistema de convocatorias de Apoyo de Sostenimiento FIC del Centro.</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEARNING STYLES DETAIL */}
      {activeTab === 'learning-styles' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Diagnóstico Pedagógico de Cohorte: Modelo VAK
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Datos levantados en el instrumento de caracterización para guiar la planeación curricular de los instructores técnicos.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {characterized.length} de {total} aprendices diagnosticados
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
              <div className="text-xs font-bold text-[#007832] dark:text-emerald-400">ESTILO VISUAL</div>
              <div className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                {styleCounts['Visual']} <span className="text-xs font-normal text-slate-500">aprendices</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Aprende mediante diagramas, esquemas, videos técnicos y mapas conceptuales.
              </p>
              <div className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 pt-2 border-t border-emerald-200 dark:border-emerald-800">
                Estrategia: Infografías y demostraciones en proyector.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30 space-y-2">
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400">ESTILO KINESTÉSICO</div>
              <div className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                {styleCounts['Kinestésico']} <span className="text-xs font-normal text-slate-500">aprendices</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Aprende haciendo, experimentando y construyendo código o prototipos reales.
              </p>
              <div className="text-[10px] font-bold text-amber-800 dark:text-amber-300 pt-2 border-t border-amber-200 dark:border-amber-800">
                Estrategia: Talleres prácticos y retos en laboratorio.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
              <div className="text-xs font-bold text-blue-700 dark:text-blue-400">ESTILO AUDITIVO</div>
              <div className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                {styleCounts['Auditivo']} <span className="text-xs font-normal text-slate-500">aprendices</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Aprende a través de explicaciones verbales, debates y preguntas guiadas.
              </p>
              <div className="text-[10px] font-bold text-blue-800 dark:text-blue-300 pt-2 border-t border-blue-200 dark:border-blue-800">
                Estrategia: Mesas redondas y retroalimentación oral.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-2">
              <div className="text-xs font-bold text-purple-700 dark:text-purple-400">ESTILO LECTO-ESCRITOR</div>
              <div className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                {styleCounts['Lecto-Escritor']} <span className="text-xs font-normal text-slate-500">aprendices</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Aprende leyendo guías de aprendizaje completas y redactando resúmenes técnicos.
              </p>
              <div className="text-[10px] font-bold text-purple-800 dark:text-purple-300 pt-2 border-t border-purple-200 dark:border-purple-800">
                Estrategia: Manuales técnicos y normas escritas.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VULNERABILITY */}
      {activeTab === 'vulnerability' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs">
          <div>
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
              Poblaciones de Especial Atención Constitucional
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enfoque diferencial para la asignación prioritaria de Apoyos de Sostenimiento FIC y planes de bienestar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Estratos 1 y 2</div>
              <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {characterized.filter(a => a.characterization && a.characterization.stratum <= 2).length}
                <span className="text-xs font-normal text-slate-400 ml-1">aprendices</span>
              </div>
              <p className="text-[11px] text-slate-500">Prioridad 1 para subsidios de alimentación y transporte.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Víctimas / Campesinos / Rural</div>
              <div className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">
                {characterized.filter(a => 
                  a.characterization?.vulnerableGroup === 'Campesino / Sector Rural' || 
                  a.characterization?.vulnerableGroup === 'Víctima del Conflicto Armado'
                ).length}
                <span className="text-xs font-normal text-slate-400 ml-1">aprendices</span>
              </div>
              <p className="text-[11px] text-slate-500">Postulación directa a convocatorias Fondo FIC del SENA.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs text-slate-500 dark:text-slate-400">Madres / Padres Cabeza de Hogar</div>
              <div className="text-2xl font-bold font-heading text-blue-600 dark:text-blue-400">
                {characterized.filter(a => a.characterization?.vulnerableGroup === 'Madre / Padre Cabeza de Familia').length}
                <span className="text-xs font-normal text-slate-400 ml-1">aprendices</span>
              </div>
              <p className="text-[11px] text-slate-500">Articulación con convenios de salas de cuidado infantil.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DUE PROCESS AND ART. 48 REFORM */}
      {activeTab === 'due-process' && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Garantías del Debido Proceso · Acuerdo 0009 de 2024 & Reforma Acuerdo 2 de 2026
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Seguimiento institucional a los Comités de Evaluación y prevalencia de medidas pedagógicas formativas (Art. 48).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
              <div className="font-bold text-[#007832] dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Prevalencia Formativa</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                100% de casos académicos canalizados primero a través de <strong>Planes de Mejoramiento Concertados</strong> con instructor antes de comité sancionatorio.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
              <div className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Notificación Digital Certificada</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Citaciones enviadas con mínimo 3 a 5 días hábiles a la cuenta oficial <strong>@misena.edu.co</strong> con anexo completo de informe de novedades.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
              <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Acompañamiento del Vocero</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Garantía obligatoria de asistencia con el vocero electo de ficha o representante de aprendices del Centro de Formación.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Roster of Apprentices with Filter & Search */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
              Registro Consolidado de Aprendices en Inducción
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Consulta en tiempo real el estado de caracterización, estilo de aprendizaje y aprobación.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">Filtrar por:</span>
          
          <select
            value={filterSupport}
            onChange={(e) => setFilterSupport(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="all">Todos los estados de apoyo</option>
            <option value="fic">Solicitan Apoyo FIC</option>
            <option value="yes">Requieren Apoyo Económico</option>
            <option value="no">Sin solicitud de apoyo</option>
          </select>

          <select
            value={filterVulnerability}
            onChange={(e) => setFilterVulnerability(e.target.value)}
            className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="all">Todos los grupos poblacionales</option>
            <option value="Campesino / Sector Rural">Campesino / Sector Rural</option>
            <option value="Madre / Padre Cabeza de Familia">Madre / Padre Cabeza de Familia</option>
            <option value="Víctima del Conflicto Armado">Víctima del Conflicto Armado</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-2.5 px-3">Aprendiz</th>
                <th className="py-2.5 px-3">Ficha</th>
                <th className="py-2.5 px-3">Caracterización</th>
                <th className="py-2.5 px-3">Estilo VAK</th>
                <th className="py-2.5 px-3">Dispositivo / Conexión</th>
                <th className="py-2.5 px-3">Apoyos Solicitados</th>
                <th className="py-2.5 px-3">Inducción</th>
                <th className="py-2.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApprentices.map((app) => {
                const char = app.characterization;
                const isPassed = app.evaluationResult?.passed;

                return (
                  <tr key={app.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{app.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{app.documentType} {app.documentNumber}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-[#005e26] dark:text-emerald-400">{app.fichaId}</span>
                    </td>
                    <td className="py-3 px-3">
                      {char ? (
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                          Completa (Estr. {char.stratum})
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {char ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          {char.dominantLearningStyle}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Sin test</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {char ? (
                        <div className="text-[11px] max-w-xs">
                          <div className="text-slate-800 dark:text-slate-200 truncate">{char.primaryDevice}</div>
                          <div className="text-slate-400 text-[10px] truncate">{char.internetConnection}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No reportado</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {char?.requiresEconomicSupport ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {char.supportRequestedTypes.map((t, i) => (
                            <span key={i} className="text-[10px] font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">No requiere</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {isPassed ? (
                        <span className="text-[11px] font-bold text-[#007832] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          Aprobado ({app.evaluationResult?.score}%)
                        </span>
                      ) : app.evaluationResult ? (
                        <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                          En refuerzo ({app.evaluationResult.score}%)
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">En progreso ({app.modulesCompleted.length} mód.)</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onViewApprentice(app)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
