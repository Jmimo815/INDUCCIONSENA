import React, { useState } from 'react';
import { 
  Briefcase, 
  FileSpreadsheet, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  AlertCircle, 
  ArrowRightLeft, 
  FileWarning, 
  Building,
  Rocket
} from 'lucide-react';
import { PROCEDURES_DATA, PRODUCTIVE_STAGE_OPTIONS } from '../../data/senaData';

interface ProceduresModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateToNext: () => void;
}

export const ProceduresModule: React.FC<ProceduresModuleProps> = ({
  isCompleted,
  onToggleComplete,
  onNavigateToNext
}) => {
  const [activeTab, setActiveTab] = useState<'tramites' | 'etapa_productiva'>('tramites');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>(PROCEDURES_DATA[0].id);
  const [selectedProductiveId, setSelectedProductiveId] = useState<string>(PRODUCTIVE_STAGE_OPTIONS[0].id);

  const currentProcedure = PROCEDURES_DATA.find(p => p.id === selectedProcedureId) || PROCEDURES_DATA[0];
  const currentProductive = PRODUCTIVE_STAGE_OPTIONS.find(p => p.id === selectedProductiveId) || PRODUCTIVE_STAGE_OPTIONS[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-[#005e26] to-[#39A900] rounded-2xl text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
            <span>Módulo 4 · Gestión Académica y Futuro Laboral</span>
            <span aria-hidden="true">·</span>
            <span>Capítulos V y VI del Reglamento</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-3">
            Novedades del Aprendiz y Alternativas de Etapa Productiva
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed mb-5">
            Aprende a gestionar oportunamente tus trámites académicos (aplazamientos, traslados y deserciones) y conoce las 5 modalidades oficiales para certificar tu etapa productiva con éxito.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                isCompleted 
                  ? 'bg-white text-[#005e26]' 
                  : 'bg-emerald-400 hover:bg-emerald-300 text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Módulo Completado (Apropiado)' : 'Marcar como Completado'}</span>
            </button>
            <span className="text-xs text-emerald-200">
              Clave para evitar sanciones e inhabilidades de 6 meses
            </span>
          </div>
        </div>
      </div>

      {/* Main Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto transition-colors">
        <button
          onClick={() => setActiveTab('tramites')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'tramites'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Novedades y Trámites del Aprendiz ({PROCEDURES_DATA.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('etapa_productiva')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'etapa_productiva'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Modalidades de Etapa Productiva ({PRODUCTIVE_STAGE_OPTIONS.length})</span>
        </button>
      </div>

      {/* TAB 1: Novedades y Trámites */}
      {activeTab === 'tramites' && (
        <div className="space-y-6">
          {/* Selector pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {PROCEDURES_DATA.map(proc => (
              <button
                key={proc.id}
                onClick={() => setSelectedProcedureId(proc.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedProcedureId === proc.id
                    ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  {proc.type.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                  {proc.title}
                </span>
              </button>
            ))}
          </div>

          {/* Procedure Detail Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase mb-1">
                <FileSpreadsheet className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
                <span>Trámite Oficial ante Subdirección y Coordinación</span>
              </div>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                {currentProcedure.title}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mt-2">
                {currentProcedure.definition}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Duration limits */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                  <Clock className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
                  <span>Plazo Máximo Reglamentario:</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {currentProcedure.durationLimit}
                </p>
              </div>

              {/* Sanction or impact */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Impacto o Consecuencia:</span>
                </div>
                <p className="text-amber-900 dark:text-amber-300 leading-relaxed font-medium">
                  {currentProcedure.impactOrSanction}
                </p>
              </div>
            </div>

            {/* Requirements & Step-by-step */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Requisitos indispensables:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {currentProcedure.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] dark:bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Paso a paso para radicar el trámite:
                </h4>
                <div className="space-y-2 text-xs">
                  {currentProcedure.stepByStep.map((st, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Etapa Productiva */}
      {activeTab === 'etapa_productiva' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 flex items-start gap-3 transition-colors">
            <Rocket className="w-5 h-5 text-[#007832] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-[#005e26] dark:text-emerald-300 block font-bold mb-0.5">
                ¿Qué es la Etapa Productiva en el SENA?
              </strong>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Es la fase donde aplicas en el contexto real de la empresa o la comunidad las competencias laborales y actitudinales aprendidas durante la etapa lectiva. Tiene una duración habitual de seis (6) meses (864 horas).
              </p>
            </div>
          </div>

          {/* Options selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PRODUCTIVE_STAGE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSelectedProductiveId(opt.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedProductiveId === opt.id
                    ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs ring-1 ring-[#39A900]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    <Building className="w-3.5 h-3.5 text-[#39A900] dark:text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {opt.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {opt.description}
                </p>
              </button>
            ))}
          </div>

          {/* Detail card of chosen productive alternative */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5 transition-colors">
            <div>
              <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Alternativa Seleccionada
              </span>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                {currentProductive.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-2 font-medium">
                {currentProductive.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Beneficios Clave:
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  {currentProductive.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Requisitos de Formalización:
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  {currentProductive.requirements.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007832] dark:bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{currentProductive.popularIn}</span>
              <span className="font-semibold text-[#007832] dark:text-emerald-400">Registro obligatorio en SofiaPlus</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA to next module */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mt-6 transition-colors">
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-[#39A900] dark:text-emerald-400' : 'text-slate-300 dark:text-slate-600'}`} />
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
            {isCompleted 
              ? 'Has completado la revisión de Novedades y Etapa Productiva.' 
              : 'Revisa las alternativas y márcalas como completadas.'}
          </span>
        </div>

        <button
          onClick={onNavigateToNext}
          className="flex items-center gap-1 px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <span>Siguiente: Simulador de Casos Reales</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
