import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Lightbulb, 
  Scale, 
  GraduationCap, 
  Heart,
  Users
} from 'lucide-react';
import { APPRENTICE_RIGHTS } from '../../data/senaData';
import { ApprenticeRight } from '../../types/induction';

interface RightsModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateToNext: () => void;
}

export const RightsModule: React.FC<RightsModuleProps> = ({
  isCompleted,
  onToggleComplete,
  onNavigateToNext
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(APPRENTICE_RIGHTS[0].id);

  const filteredRights = useMemo(() => {
    return APPRENTICE_RIGHTS.filter(r => {
      const matchesSearch = 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.fullText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.realLifeExample.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryBadge = (cat: ApprenticeRight['category']) => {
    switch (cat) {
      case 'formacion':
        return { label: 'Formación Integral', icon: GraduationCap, color: 'text-emerald-700 bg-emerald-50' };
      case 'bienestar':
        return { label: 'Bienestar & Salud', icon: Heart, color: 'text-rose-700 bg-rose-50' };
      case 'representacion':
        return { label: 'Representación & Vocería', icon: Users, color: 'text-sky-700 bg-sky-50' };
      case 'debido_proceso':
        return { label: 'Debido Proceso & Defensa', icon: Scale, color: 'text-indigo-700 bg-indigo-50' };
      default:
        return { label: 'General', icon: BookOpen, color: 'text-slate-700 bg-slate-50' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-[#005e26] rounded-2xl text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2">
            <span>Módulo 2 · Marco Legal del Aprendiz</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento del Aprendiz (Acuerdo 0009 de 2024 - Vigente)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-3">
            Tus Derechos como Aprendiz SENA
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed mb-5">
            Como aprendiz matriculado en el Servicio Nacional de Aprendizaje, la ley y el reglamento te otorgan garantías y facultades para recibir una formación de calidad en ambientes seguros, dignos y participativos.
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
              {APPRENTICE_RIGHTS.length} Derechos Fundamentales Registrados
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por derecho, evaluación, carné..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:bg-white dark:focus:bg-slate-750 focus:outline-none focus:ring-2 focus:ring-[#39A900]/40 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>

        {/* Categories (Zero-pill discipline: segmented clean tabs) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todos ({APPRENTICE_RIGHTS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('formacion')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'formacion'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Formación
          </button>
          <button
            onClick={() => setSelectedCategory('bienestar')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'bienestar'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bienestar
          </button>
          <button
            onClick={() => setSelectedCategory('debido_proceso')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'debido_proceso'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Debido Proceso
          </button>
          <button
            onClick={() => setSelectedCategory('representacion')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'representacion'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Vocería
          </button>
        </div>
      </div>

      {/* Rights List */}
      <div className="space-y-4">
        {filteredRights.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center transition-colors">
            <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">No se encontraron derechos con ese criterio</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Intenta con otros términos como 'evaluación', 'carné', 'descargos'</p>
          </div>
        ) : (
          filteredRights.map((right) => {
            const isExpanded = expandedId === right.id;
            const badge = getCategoryBadge(right.category);
            const BadgeIcon = badge.icon;

            return (
              <div 
                key={right.id}
                className={`bg-white dark:bg-slate-900 rounded-xl border transition-all ${
                  isExpanded 
                    ? 'border-emerald-300 dark:border-emerald-600 shadow-sm ring-1 ring-emerald-300/30' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : right.id)}
                  className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between text-left gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#005e26] dark:text-emerald-300 font-heading font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/60">
                      0{right.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[11px] font-semibold flex items-center gap-1 ${badge.color} px-2 py-0.5 rounded`}>
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                          {right.legalArticle.split(',')[1] || right.legalArticle}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                        {right.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                        {right.summary}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-[#007832] dark:text-emerald-400 shrink-0 mt-1 sm:mt-0">
                    {isExpanded ? 'Ver Menos' : 'Detalles'}
                  </span>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    {/* Full text */}
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200">
                      <strong className="text-slate-900 dark:text-white block mb-1">Texto Reglamentario Oficial:</strong>
                      <p className="leading-relaxed italic">"{right.fullText}"</p>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 block font-medium">
                        Referencia legal: {right.legalArticle}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Real life example */}
                      <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/60 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold mb-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                          <span>¿Cómo se vive en la práctica formativa?</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {right.realLifeExample}
                        </p>
                      </div>

                      {/* Practical advice */}
                      <div className="bg-amber-50/60 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-100 dark:border-amber-900/60 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-bold mb-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>Consejo de apropiación para el aprendiz</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {right.advice}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom CTA to next module */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mt-6 transition-colors">
        <div className="flex items-center gap-2">
          <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-[#39A900]' : 'text-slate-300 dark:text-slate-600'}`} />
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
            {isCompleted 
              ? 'Has completado la apropiación de Derechos del Aprendiz.' 
              : 'Revisa todos los derechos y márcalos como comprendidos.'}
          </span>
        </div>

        <button
          onClick={onNavigateToNext}
          className="flex items-center gap-1 px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <span>Siguiente: Reglamento Completo (Acuerdo 0009)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
