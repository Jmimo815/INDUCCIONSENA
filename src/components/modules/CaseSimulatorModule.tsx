import React, { useState } from 'react';
import { 
  Gavel, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Scale, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { CASE_STUDIES } from '../../data/senaData';

interface CaseSimulatorModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateToNext: () => void;
}

export const CaseSimulatorModule: React.FC<CaseSimulatorModuleProps> = ({
  isCompleted,
  onToggleComplete,
  onNavigateToNext
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const currentCase = CASE_STUDIES[activeCaseIndex];
  const selectedOptionId = selectedAnswers[currentCase.id];
  const isAnswered = Boolean(selectedOptionId);
  const selectedOption = currentCase.options.find(o => o.id === selectedOptionId);
  const isCurrentCorrect = selectedOption?.isCorrect;

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentCase.id]: optionId
    }));
    setShowExplanation(prev => ({
      ...prev,
      [currentCase.id]: true
    }));
  };

  const answeredCasesCount = Object.keys(selectedAnswers).length;
  const allCasesAnswered = answeredCasesCount === CASE_STUDIES.length;

  const handleResetCurrentCase = () => {
    const updated = { ...selectedAnswers };
    delete updated[currentCase.id];
    setSelectedAnswers(updated);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 rounded-2xl text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
            <span>Módulo 5 · Aplicación Práctica del Reglamento</span>
            <span aria-hidden="true">·</span>
            <span>Tribunal del Aprendiz</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-3">
            Simulador de Casos Reales del Reglamento
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            Ponte a prueba analizando situaciones cotidianas en los centros de formación: identifica si se trata de una falta académica o disciplinaria, cuál es la sanción aplicable y cómo opera el debido proceso.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                isCompleted 
                  ? 'bg-white text-slate-900' 
                  : 'bg-emerald-400 hover:bg-emerald-300 text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Módulo Completado (Apropiado)' : 'Marcar como Completado'}</span>
            </button>
            <span className="text-xs text-indigo-200">
              Progreso: {answeredCasesCount} de {CASE_STUDIES.length} casos analizados
            </span>
          </div>
        </div>
      </div>

      {/* Case Navigator */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        <div className="flex items-center gap-2">
          {CASE_STUDIES.map((c, idx) => {
            const hasAnsweredThis = Boolean(selectedAnswers[c.id]);
            const isCorrect = c.options.find(o => o.id === selectedAnswers[c.id])?.isCorrect;

            return (
              <button
                key={c.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  activeCaseIndex === idx
                    ? 'bg-[#39A900] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>Caso {idx + 1}</span>
                {hasAnsweredThis && (
                  <span className={`w-2 h-2 rounded-full ${isCorrect ? 'bg-emerald-300' : 'bg-rose-300'}`} />
                )}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
          {activeCaseIndex + 1} de {CASE_STUDIES.length}
        </span>
      </div>

      {/* Main Interactive Case Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded">
              {currentCase.category}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Situación {activeCaseIndex + 1}</span>
          </div>

          <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
            {currentCase.title}
          </h2>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            "{currentCase.scenario}"
          </div>
        </div>

        {/* The Question */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
            <span>{currentCase.question}</span>
          </h3>

          <div className="space-y-3">
            {currentCase.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200';

              if (isAnswered) {
                if (option.isCorrect) {
                  optionStyle = 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-500';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = 'border-rose-400 dark:border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 font-medium ring-1 ring-rose-400';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {isAnswered && option.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    {isAnswered && isSelected && !option.isCorrect && <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                    {!isAnswered && option.id.split('-')[1]}
                  </div>
                  <div className="flex-1">
                    <span>{option.text}</span>
                    {isAnswered && isSelected && (
                      <p className={`text-xs mt-2 font-normal ${option.isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
                        {option.feedback}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Regulatory deep explanation after answering */}
        {isAnswered && (
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 pt-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <Gavel className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
                <span>Dictamen del Reglamento del Aprendiz</span>
              </span>

              <button
                onClick={handleResetCurrentCase}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Intentar de nuevo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-semibold block mb-1">Tipificación del hecho:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{currentCase.classification}</span>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {currentCase.regulatoryExplanation}
                </p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold block">Ruta del Debido Proceso:</span>
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                    Garantías 2026 (Art. 48 Ac. 2/2026)
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {currentCase.dueProcess}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Case navigation footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveCaseIndex(prev => Math.max(0, prev - 1))}
            disabled={activeCaseIndex === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none"
          >
            Caso Anterior
          </button>

          {activeCaseIndex < CASE_STUDIES.length - 1 ? (
            <button
              onClick={() => setActiveCaseIndex(prev => prev + 1)}
              className="px-4 py-1.5 rounded-lg bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <span>Siguiente Caso</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onNavigateToNext}
              className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 hover:bg-black text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Ir a la Evaluación Final</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
