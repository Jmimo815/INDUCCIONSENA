import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  FileCheck, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { EVALUATION_QUESTIONS } from '../../data/senaData';
import { EvaluationQuestion, EvaluationResult } from '../../types/induction';
import { SenaLogo } from '../common/SenaLogo';

interface EvaluationQuizProps {
  apprenticeName: string;
  onSaveResult: (result: EvaluationResult) => void;
  onViewCertificate: () => void;
  previousResult?: EvaluationResult;
}

export const EvaluationQuiz: React.FC<EvaluationQuizProps> = ({
  apprenticeName,
  onSaveResult,
  onViewCertificate,
  previousResult
}) => {
  const [quizMode, setQuizMode] = useState<'official' | 'practice'>('official');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<EvaluationQuestion[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

  // Initialize questions
  const startQuiz = (mode: 'official' | 'practice') => {
    setQuizMode(mode);
    // Shuffle or select 15 questions for official, all for practice
    const shuffled = [...EVALUATION_QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = mode === 'official' ? shuffled.slice(0, 15) : shuffled;
    
    setActiveQuestions(selected);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setTimerSeconds(mode === 'official' ? 900 : 0);
    setIsTimerRunning(mode === 'official');
    setStartTime(Date.now());
    setHasStarted(true);
  };

  // Timer countdown
  useEffect(() => {
    let interval: number | undefined;
    if (isTimerRunning && timerSeconds > 0) {
      interval = window.setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleFinishQuiz = () => {
    setIsTimerRunning(false);
    setIsFinished(true);

    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
    let correctCount = 0;

    const categoryBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {};
    const answersArray: { questionId: string; selectedIndex: number; isCorrect: boolean }[] = [];

    activeQuestions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { total: 0, correct: 0, percentage: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (isCorrect) categoryBreakdown[q.category].correct += 1;

      answersArray.push({
        questionId: q.id,
        selectedIndex: selected ?? -1,
        isCorrect
      });
    });

    Object.keys(categoryBreakdown).forEach(k => {
      const cat = categoryBreakdown[k];
      cat.percentage = Math.round((cat.correct / cat.total) * 100);
    });

    const score = Math.round((correctCount / activeQuestions.length) * 100);
    const passed = score >= 70;

    const result: EvaluationResult = {
      completedAt: new Date().toLocaleString('es-CO', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      totalQuestions: activeQuestions.length,
      correctCount,
      score,
      passed,
      categoryBreakdown,
      timeSpentSeconds,
      answers: answersArray
    };

    onSaveResult(result);

    if (passed) {
      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // If not started, show the pre-quiz introduction
  if (!hasStarted) {
    return (
      <div className="space-y-6 pb-12">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-[#005e26] to-[#39A900] rounded-2xl text-white p-6 sm:p-8 shadow-sm">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
            <SenaLogo variant="white" className="w-80 h-80" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              <span>Evaluación de Conocimientos</span>
              <span aria-hidden="true">·</span>
              <span>Apropiación del Proceso de Inducción</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-3">
              Prueba Diagnóstica y de Certificación de Inducción
            </h1>
            <p className="text-emerald-100 text-sm leading-relaxed mb-6">
              Evalúa tu nivel de comprensión sobre la identidad institucional del SENA, tus derechos fundamentales, tus deberes y prohibiciones, el debido proceso disciplinario y las modalidades de etapa productiva.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => startQuiz('official')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#005e26] font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-md"
              >
                <Award className="w-4 h-4 text-[#39A900]" />
                <span>Presentar Examen Oficial de Inducción</span>
              </button>

              <button
                onClick={() => startQuiz('practice')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all backdrop-blur-sm border border-white/20"
              >
                <BookOpen className="w-4 h-4 text-emerald-200" />
                <span>Modo Práctica con Respuestas Inmediatas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Previous Result Summary if exists */}
        {previousResult && (
          <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
            previousResult.passed 
              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' 
              : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-black text-xl shrink-0 ${
                previousResult.passed ? 'bg-emerald-100 dark:bg-emerald-900/60 text-[#005e26] dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200'
              }`}>
                {previousResult.score}%
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block text-slate-700 dark:text-slate-300">
                  Último Intento Registrado ({previousResult.completedAt})
                </span>
                <span className={`text-sm font-bold ${previousResult.passed ? 'text-[#005e26] dark:text-emerald-400' : 'text-amber-800 dark:text-amber-300'}`}>
                  {previousResult.passed ? 'APROBADO · COMPETENCIA ADQUIRIDA' : 'AÚN NO COMPETENTE · REQUIERE REFUERZO'}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {previousResult.correctCount} aciertos de {previousResult.totalQuestions} preguntas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {previousResult.passed && (
                <button
                  onClick={onViewCertificate}
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Ver Mi Certificado Digital</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Instructions Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 flex items-center justify-center font-bold text-xs mb-3">1</span>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-1">Criterio de Aprobación</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              El puntaje mínimo para certificar la inducción es de <strong>70%</strong> de respuestas correctas (estándar de competencia SENA).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 flex items-center justify-center font-bold text-xs mb-3">2</span>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-1">Diagnóstico por Competencias</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Al finalizar, recibirás un reporte analítico que identifica qué módulos dominas y cuáles requieren lectura de refuerzo.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors">
            <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 flex items-center justify-center font-bold text-xs mb-3">3</span>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-1">Certificación Oficial</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Al aprobar, se emitirá de inmediato tu <strong>Constancia de Aprobación de Inducción</strong> con código de verificación QR descargable e imprimible.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Finished Screen: Detailed Appropriation Diagnosis
  if (isFinished) {
    const correctCount = activeQuestions.filter((q, idx) => selectedAnswers[idx] === q.correctIndex).length;
    const score = Math.round((correctCount / activeQuestions.length) * 100);
    const passed = score >= 70;

    return (
      <div className="space-y-6 pb-12">
        <div className={`p-6 sm:p-8 rounded-2xl text-white shadow-sm ${
          passed 
            ? 'bg-gradient-to-r from-emerald-950 via-[#005e26] to-[#39A900]' 
            : 'bg-gradient-to-r from-slate-900 via-amber-950 to-amber-900'
        }`}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">
              <span>Resultado de Apropiación · Inducción SENA</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                  {passed ? '¡Felicitaciones! Has Aprobado la Inducción' : 'Inducción en Proceso · Refuerzo Requerido'}
                </h1>
                <p className="text-emerald-100 text-sm mt-1">
                  Aprendiz: <strong className="text-white">{apprenticeName}</strong>
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-5 py-3 rounded-xl shadow-md text-center shrink-0 border border-transparent dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block">Puntaje Final</span>
                <span className={`text-3xl font-heading font-black ${passed ? 'text-[#005e26] dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                  {score}%
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  {correctCount} de {activeQuestions.length} aciertos
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed mb-6">
              {passed 
                ? 'Has demostrado una apropiación sólida de los valores institucionales, el reglamento, los derechos y deberes del aprendiz SENA. Tu certificado oficial ha sido generado.' 
                : 'Tu puntaje está por debajo del 70% requerido para certificar. Te recomendamos repasar los temas con bajo puntaje y volver a presentar la evaluación.'}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {passed && (
                <button
                  onClick={onViewCertificate}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#005e26] font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-sm"
                >
                  <FileCheck className="w-4 h-4 text-[#39A900]" />
                  <span>Ver y Descargar Certificado Oficial</span>
                </button>
              )}

              <button
                onClick={() => startQuiz(quizMode)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Presentar Nueva Evaluación</span>
              </button>

              <button
                onClick={() => setHasStarted(false)}
                className="px-4 py-2.5 rounded-xl text-white/80 hover:text-white text-xs font-semibold"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>

        {/* Competency Area Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
          <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-1">
            Diagnóstico de Apropiación por Área Temática
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Analiza tu rendimiento específico en cada uno de los 5 núcleos de la inducción:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['institucional', 'derechos', 'deberes', 'procedimientos', 'etapa_productiva'].map(catKey => {
              const questionsInCat = activeQuestions.filter(q => q.category === catKey);
              if (questionsInCat.length === 0) return null;
              
              const correctInCat = questionsInCat.filter((q, qIdx) => {
                const actualIndex = activeQuestions.findIndex(x => x.id === q.id);
                return selectedAnswers[actualIndex] === q.correctIndex;
              }).length;

              const pct = Math.round((correctInCat / questionsInCat.length) * 100);
              const label = questionsInCat[0].categoryLabel;

              return (
                <div key={catKey} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{label}</span>
                      <span className={`text-xs font-black ${pct >= 70 ? 'text-[#005e26] dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                        {pct}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-3 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${pct >= 70 ? 'bg-[#39A900]' : 'bg-amber-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      {correctInCat} de {questionsInCat.length} preguntas acertadas
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-700 text-[11px]">
                    {pct >= 70 ? (
                      <span className="text-[#007832] dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Apropiación satisfactoria
                      </span>
                    ) : (
                      <span className="text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Recomendado repasar este módulo
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Review Accordion */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
          <h2 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-1">
            Revisión Pedagógica de Preguntas y Respuestas
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Revisa cada pregunta con la fundamentación del Reglamento del Aprendiz:
          </p>

          <div className="space-y-3">
            {activeQuestions.map((q, idx) => {
              const selected = selectedAnswers[idx];
              const isCorrect = selected === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-xl border text-xs ${
                    isCorrect 
                      ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20' 
                      : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {idx + 1}. {q.question}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      isCorrect 
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-[#005e26] dark:text-emerald-300' 
                        : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                    }`}>
                      {isCorrect ? 'Correcta' : 'Incorrecta'}
                    </span>
                  </div>

                  <div className="space-y-1 mb-2">
                    <div className="text-slate-600 dark:text-slate-300">
                      <strong>Tu respuesta: </strong>
                      <span className={isCorrect ? 'text-[#005e26] dark:text-emerald-400 font-medium' : 'text-rose-700 dark:text-rose-400 line-through'}>
                        {selected !== undefined ? q.options[selected] : 'Sin responder'}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div className="text-[#007832] dark:text-emerald-400">
                        <strong>Respuesta correcta: </strong>
                        <span className="font-medium">{q.options[q.correctIndex]}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px]">
                    <strong className="text-slate-900 dark:text-white">Fundamento reglamentario: </strong>
                    {q.explanation} <span className="text-slate-400 dark:text-slate-500 font-medium">({q.articleReference})</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View
  const currentQ = activeQuestions[currentIndex];
  const selectedForCurrent = selectedAnswers[currentIndex];
  const isAnswered = selectedForCurrent !== undefined;
  const answeredTotal = Object.keys(selectedAnswers).length;
  const isPracticeMode = quizMode === 'practice';

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Quiz Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex items-center justify-between gap-4 transition-colors">
        <div>
          <span className="text-[11px] font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider block">
            {quizMode === 'official' ? 'Examen Oficial de Certificación' : 'Modo Práctica Formativa'}
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Pregunta {currentIndex + 1} de {activeQuestions.length} · {currentQ.categoryLabel}
          </span>
        </div>

        {quizMode === 'official' && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold ${
            timerSeconds < 180 
              ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 animate-pulse' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-[#39A900] h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6 transition-colors">
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
            {currentQ.categoryLabel}
          </span>
          <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedForCurrent === optIdx;
            let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/80 text-slate-800 dark:text-slate-200';

            if (isPracticeMode && isAnswered) {
              if (optIdx === currentQ.correctIndex) {
                btnStyle = 'border-emerald-500 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-500';
              } else if (isSelected && optIdx !== currentQ.correctIndex) {
                btnStyle = 'border-rose-400 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 font-medium ring-1 ring-rose-400';
              } else {
                btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500';
              }
            } else if (isSelected) {
              btnStyle = 'border-[#39A900] dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium ring-2 ring-[#39A900]/30';
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectAnswer(optIdx)}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 ${btnStyle}`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                  isSelected ? 'border-[#39A900] bg-[#39A900] text-white' : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </div>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* In Practice Mode: show immediate explanation */}
        {isPracticeMode && isAnswered && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong className="text-slate-900 dark:text-white block">Explicación reglamentaria:</strong>
            <p className="leading-relaxed">{currentQ.explanation}</p>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block pt-1">
              Referencia: {currentQ.articleReference}
            </span>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {answeredTotal} de {activeQuestions.length} respondidas
          </span>

          {currentIndex < activeQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              className="flex items-center gap-1 px-5 py-2 rounded-lg bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 hover:bg-black text-white text-xs font-bold transition-all shadow-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Finalizar y Calificar</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Jump Question Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
          Navegación de Preguntas
        </span>
        <div className="flex flex-wrap gap-1.5">
          {activeQuestions.map((_, idx) => {
            const hasAnswer = selectedAnswers[idx] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                  isCurrent
                    ? 'ring-2 ring-[#39A900] bg-[#39A900] text-white'
                    : hasAnswer
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-[#005e26] dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
