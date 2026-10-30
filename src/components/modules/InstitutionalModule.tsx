import React, { useState } from 'react';
import { 
  History, 
  Flag, 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  Zap, 
  Users, 
  Scale, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  SENA_FOUNDER_INFO, 
  SENA_SYMBOLS, 
  SENA_VALUES,
  SENA_REGULATION_INFO,
  SENA_2026_UPDATES
} from '../../data/senaData';
import { SenaLogo } from '../common/SenaLogo';
import { AudioAnthemPlayer } from '../AudioAnthemPlayer';

interface InstitutionalModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateToNext: () => void;
}

export const InstitutionalModule: React.FC<InstitutionalModuleProps> = ({
  isCompleted,
  onToggleComplete,
  onNavigateToNext
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'historia' | 'simbolos' | 'valores' | 'bienestar'>('historia');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');

  // Value icon mapping
  const getValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-600" />;
      case 'Users': return <Users className="w-5 h-5 text-sky-600" />;
      case 'Scale': return <Scale className="w-5 h-5 text-indigo-600" />;
      default: return <Award className="w-5 h-5 text-[#39A900]" />;
    }
  };

  const currentSymbol = SENA_SYMBOLS.find(s => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#003d19] via-[#005e26] to-[#39A900] rounded-2xl text-white p-6 sm:p-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-15 pointer-events-none">
          <SenaLogo variant="white" className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-200 uppercase mb-2">
            <span>Módulo 1 · Identidad e Imagen Institucional</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento y Filosofía SENA</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-3">
            Orgullo y Pertenencia SENA: Raíces, Símbolos y Misión
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6">
            Conoce la historia del Servicio Nacional de Aprendizaje, los símbolos patrios e institucionales que portarás con honor, el himno que nos convoca al trabajo decente y los principios éticos que guían a cada aprendiz.
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

            <div className="text-xs text-emerald-100 flex items-center gap-1.5">
              <span>Fundado en 1957</span>
              <span>·</span>
              <span>33 Regionales</span>
              <span>·</span>
              <span>118 Centros de Formación</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto transition-colors">
        <button
          onClick={() => setActiveSubTab('historia')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'historia'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Historia, Misión y Visión</span>
        </button>

        <button
          onClick={() => setActiveSubTab('simbolos')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'simbolos'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Flag className="w-4 h-4" />
          <span>Símbolos e Himno</span>
        </button>

        <button
          onClick={() => setActiveSubTab('valores')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'valores'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Valores e Integridad</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bienestar')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'bienestar'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Bienestar y Ecosistema</span>
        </button>
      </div>

      {/* SUBTAB 1: Historia, Mision & Vision */}
      {activeSubTab === 'historia' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Founder Card */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 flex items-center justify-center font-heading font-black text-xl">
                    1957
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                      {SENA_FOUNDER_INFO.founder}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Fundador del SENA · Economista y Abogado</p>
                  </div>
                </div>

                <div className="text-xs font-medium text-[#007832] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded inline-block mb-3">
                  {SENA_FOUNDER_INFO.decree}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {SENA_FOUNDER_INFO.history}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Dato Clave de Inducción:</span>
                El SENA se financia con aportes parafiscales de las empresas colombianas, garantizando que la formación profesional integral sea <strong>100% gratuita y pública</strong> para todos los colombianos.
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-[#39A900]" />
                  <span>Nuestra Misión</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed font-medium">
                  {SENA_FOUNDER_INFO.mission}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-[#39A900]" />
                  <span>Nuestra Visión 2026</span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed font-medium">
                  {SENA_FOUNDER_INFO.vision}
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-950/40 dark:to-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 p-4 flex items-center justify-between transition-colors">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Lema Institucional</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 italic">"{SENA_FOUNDER_INFO.motto}"</span>
                </div>
                <SenaLogo className="w-8 h-8" />
              </div>

              {/* Marco Normativo Vigente & Actualizaciones 2026 */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-700/60 p-5 space-y-3 transition-colors">
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-[#007832] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        Reglamento del Aprendiz: {SENA_REGULATION_INFO.currentAgreement}
                      </span>
                      <span className="text-[10px] font-bold bg-[#39A900] text-white px-2 py-0.5 rounded-full">
                        {SENA_REGULATION_INFO.status}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Expedido el 5 de noviembre de 2024 por el Consejo Directivo Nacional del SENA. Adopta el nuevo estatuto del aprendiz y <strong>deroga formalmente los antiguos Acuerdos 007 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024</strong>.
                    </p>
                  </div>
                </div>

                {/* 2026 Amendment Spotlight Box */}
                <div className="mt-2 pt-3 border-t border-emerald-200 dark:border-emerald-800/80 bg-white/70 dark:bg-slate-900/60 p-3.5 rounded-lg border border-emerald-300/60 dark:border-emerald-700/50">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-[11px] font-extrabold text-[#005e26] dark:text-emerald-300 uppercase tracking-wide">
                      Actualización 2026: {SENA_2026_UPDATES.agreement} ({SENA_2026_UPDATES.date})
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded">
                      Reforma {SENA_2026_UPDATES.targetArticle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2 font-medium">
                    {SENA_2026_UPDATES.subject}: fortalece las garantías procesales de los aprendices durante los comités:
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                    {SENA_2026_UPDATES.keyModifications.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#39A900] dark:text-emerald-400 font-bold">✔</span>
                        <span><strong>{item.title}:</strong> {item.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Simbolos e Himno */}
      {activeSubTab === 'simbolos' && (
        <div className="space-y-6">
          {/* Interactive Symbol Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
            <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-1">
              Símbolos Oficiales del SENA
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Haz clic en cada símbolo para examinar su composición heráldica y significado formativo:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {SENA_SYMBOLS.map(sym => (
                <button
                  key={sym.id}
                  onClick={() => setSelectedSymbolId(sym.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    selectedSymbolId === sym.id
                      ? 'border-[#39A900] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm ring-2 ring-[#39A900]/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 p-1">
                    {sym.id === 'escudo' && (
                      <img 
                        src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png" 
                        alt="Escudo SENA" 
                        className="w-6 h-7 object-contain" 
                      />
                    )}
                    {sym.id === 'bandera' && <Flag className="w-5 h-5 text-[#39A900]" />}
                    {sym.id === 'logotipo' && <SenaLogo variant="official" className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{sym.name}</h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{sym.meaning}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Symbol Deep Dive */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center transition-colors">
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
                {currentSymbol.id === 'escudo' && (
                  <img 
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png" 
                    alt="Escudo Oficial del SENA" 
                    className="w-48 h-[216px] object-contain drop-shadow-sm mb-3" 
                  />
                )}
                {currentSymbol.id === 'bandera' && (
                  <div className="w-48 h-32 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 shadow-md rounded relative flex items-center justify-center mb-3">
                    <SenaLogo variant="official" className="w-16 h-16" />
                  </div>
                )}
                {currentSymbol.id === 'logotipo' && (
                  <SenaLogo variant="official" className="w-32 h-32 mb-3 drop-shadow-sm" />
                )}
                <span className="font-heading font-bold text-slate-900 dark:text-white text-sm">{currentSymbol.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic">{currentSymbol.funFact}</span>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
                    Significado Institucional
                  </h4>
                  <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-relaxed">
                    {currentSymbol.meaning}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">Elementos constitutivos:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentSymbol.elements.map((el, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs transition-colors">
                        <strong className="text-slate-900 dark:text-white block mb-0.5">{el.name}</strong>
                        <span className="text-slate-600 dark:text-slate-300">{el.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Anthem Player */}
          <AudioAnthemPlayer />
        </div>
      )}

      {/* SUBTAB 3: Valores e Integridad */}
      {activeSubTab === 'valores' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
            <div className="max-w-2xl mb-6">
              <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-1">
                Código de Integridad y Valores del Aprendiz SENA
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                El SENA no solo forma trabajadores competentes en lo técnico, sino ciudadanos éticos, solidarios y respetuosos de la sociedad. Estos son los seis valores que regirán tu actuar en el aula, talleres y prácticas:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SENA_VALUES.map((val, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50/80 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 p-5 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                        {getValueIcon(val.iconName)}
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">{val.name}</h3>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {val.concept}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700/80 text-xs bg-emerald-50/50 dark:bg-emerald-950/40 p-2.5 rounded-lg border-emerald-100 dark:border-emerald-900/50">
                    <strong className="text-[#007832] dark:text-emerald-400 block mb-0.5">En el ambiente de aprendizaje:</strong>
                    <span className="text-slate-600 dark:text-slate-300">{val.applicationInLearning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Bienestar y Ecosistema */}
      {activeSubTab === 'bienestar' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#39A900]" />
                <span>Bienestar al Aprendiz</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Es una estrategia institucional para acompañarte durante toda tu formación, fortaleciendo tus habilidades para la vida y tu permanencia en el SENA.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Salud Integral y Psicosocial:</strong>
                    <p className="text-slate-600 dark:text-slate-300">Atención preventiva, campañas de salud y asesoría emocional y pedagógica confidencial.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Deporte, Recreación y Cultura:</strong>
                    <p className="text-slate-600 dark:text-slate-300">Selecciones deportivas, danzas, música, teatro y torneos intercentros zonales y nacionales.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Apoyos Socioeconómicos (FIC y Regulares):</strong>
                    <p className="text-slate-600 dark:text-slate-300">Subsidios monetarios para aprendices de estratos 1 y 2 en condición de vulnerabilidad para transporte y sustento.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">4</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Liderazgo y Habilidades Blandas:</strong>
                    <p className="text-slate-600 dark:text-slate-300">Talleres de oratoria, resolución de conflictos, trabajo en equipo y formación de voceros.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between transition-colors">
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#39A900]" />
                  <span>Plataformas Tecnológicas Clave</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Como aprendiz activo interactuarás con los sistemas oficiales del SENA:
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 dark:text-white font-bold">Zajuna LMS</strong>
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 font-semibold px-2 py-0.5 rounded">Aula Virtual</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Plataforma de aprendizaje oficial donde descargas guías, participas en foros y subes tus evidencias de formación.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 dark:text-white font-bold">SofiaPlus</strong>
                      <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold px-2 py-0.5 rounded">Gestión Académica</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Sistema administrativo donde consultas tus notas definitivas, certificaciones, juicios evaluativos y radicados.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 dark:text-white font-bold">SGVA (Caprendizaje)</strong>
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold px-2 py-0.5 rounded">Etapa Práctica</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Sistema de Gestión Virtual de Aprendices para postulación y legalización de contratos de aprendizaje empresarial.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Tu correo oficial: @misena.edu.co</span>
                <span className="text-[#007832] dark:text-emerald-400 font-semibold">Acceso con tu documento</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA to next module */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-[#39A900]' : 'text-slate-300 dark:text-slate-600'}`} />
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
            {isCompleted 
              ? 'Has completado la revisión de Identidad e Imagen Institucional.' 
              : 'Revisa todos los temas y marca el módulo para avanzar en tu ruta.'}
          </span>
        </div>

        <button
          onClick={onNavigateToNext}
          className="flex items-center gap-1 px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <span>Siguiente: Derechos del Aprendiz</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
