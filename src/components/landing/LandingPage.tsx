import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Building2, 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Play,
  X
} from 'lucide-react';
import { UserRole, ApprenticeProfile, FichaGroup } from '../../types/induction';
import { SenaLogo } from '../common/SenaLogo';

interface LandingPageProps {
  onSelectRole: (role: UserRole, initialTab?: string) => void;
  apprentices: ApprenticeProfile[];
  fichas: FichaGroup[];
  activeApprentice: ApprenticeProfile;
  theme: 'light' | 'dark';
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  activeApprentice,
  fichas
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const isCharacterized = !!activeApprentice.characterization;
  const isCertified = !!activeApprentice.evaluationResult?.passed;

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 space-y-8 animate-fade-in">
      {/* Simplified, Clean Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center">
          <SenaLogo variant="official" className="w-16 h-16 drop-shadow-sm" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-[#007832] dark:text-emerald-300">
          <span>Inducción Integral SENA 2026</span>
          <span className="opacity-40">|</span>
          <span className="font-normal">Reglamento Acuerdo 0009</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 dark:text-white tracking-tight">
          Portal de Inducción SENA
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Selecciona tu rol institucional para acceder a la caracterización pedagógica, ruta formativa o tableros de seguimiento.
        </p>

        {/* Video Tutorial CTA Button */}
        <div className="pt-2 flex items-center justify-center">
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-[#007832] dark:hover:text-emerald-300 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-2xs hover:shadow-sm hover:border-[#39A900] dark:hover:border-emerald-600 transition-all active:scale-95 cursor-pointer group"
            title="Ver video tutorial guiado de la plataforma de inducción"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#007832] dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#39A900] group-hover:text-white transition-all shadow-xs">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>Video tutorial</span>
          </button>
        </div>
      </div>

      {/* 3 Streamlined Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. APRENDIZ */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-[#39A900] dark:border-emerald-700/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-[#39A900] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#007832] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                Aprendiz
              </span>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                Soy Aprendiz
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Diligencia tu ficha de caracterización, apropia el reglamento de aprendices y obtén tu certificación oficial.
              </p>
            </div>

            {/* Quick status of active apprentice */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                {activeApprentice.fullName}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Ficha {activeApprentice.fichaId}</span>
                {isCharacterized ? (
                  <span className="text-[#007832] dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" /> Caracterizado
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Sin Caracterizar
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5 space-y-2">
            <button
              onClick={() => onSelectRole('apprentice', 'characterization')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#39A900] hover:bg-[#2d8500] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{isCharacterized ? 'Ver Caracterización' : 'Diligenciar Caracterización'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </button>

            <button
              onClick={() => onSelectRole('apprentice', 'institutional')}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Entrar a Módulos de Inducción</span>
            </button>
          </div>
        </div>

        {/* 2. INSTRUCTOR */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#005e26] dark:hover:border-emerald-600 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-[#005e26] dark:text-emerald-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#005e26] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                Instructor
              </span>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                Soy Instructor
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Controla la inducción de tu ficha, analiza la matriz pedagógica VAK y descarga actas oficiales.
              </p>
            </div>

            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005e26] dark:bg-emerald-400" />
                <span>Matriz de estilos VAK por cohorte</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005e26] dark:bg-emerald-400" />
                <span>Seguimiento y registro de aprendices</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#005e26] dark:bg-emerald-400" />
                <span>Emisión y validación de actas</span>
              </li>
            </ul>
          </div>

          <div className="pt-5">
            <button
              onClick={() => onSelectRole('instructor')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#005e26] hover:bg-[#00471d] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Ingresar al Panel de Instructor</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </button>
          </div>
        </div>

        {/* 3. DIRECTIVO & BIENESTAR */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800">
                Directivo / Bienestar
              </span>
            </div>

            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                Soy Directivo / Bienestar
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Tablero estratégico de Subdirección y Bienestar: apoyos de sostenimiento FIC, alertas de deserción y debido proceso.
              </p>
            </div>

            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                <span>Demandas de apoyo FIC y transporte</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                <span>Enfoque diferencial y vulnerabilidad</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
                <span>Trazabilidad Comité de Evaluación</span>
              </li>
            </ul>
          </div>

          <div className="pt-5">
            <button
              onClick={() => onSelectRole('directivo')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Acceder al Tablero Directivo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Modal for Video Tutorial */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-tutorial-title"
        >
          <div 
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#007832] dark:text-emerald-300 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div>
                  <h3 id="video-tutorial-title" className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Video Tutorial: Tu Camino de Inducción SENA
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Guía oficial de navegación · Manual del Aprendiz SENA (Acuerdo 0009 / 2026)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Cerrar video tutorial"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container with full controls */}
            <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden">
              <video
                src="/assets/aistudio/2026__11_51_ae8bb56f.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Tu navegador no soporta la reproducción de video HTML5.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-slate-500 dark:text-slate-400">
                Aprende a realizar tu caracterización VAK, explorar los 8 módulos y obtener tu certificación oficial.
              </p>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onSelectRole('apprentice', 'characterization');
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#39A900] hover:bg-[#2d8500] text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  Comenzar mi Inducción
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Institutional Info Banner */}
      <div className="text-center pt-2 text-xs text-slate-400 dark:text-slate-500">
        Servicio Nacional de Aprendizaje SENA · República de Colombia · Dirección de Formación Profesional
      </div>
    </div>
  );
};
