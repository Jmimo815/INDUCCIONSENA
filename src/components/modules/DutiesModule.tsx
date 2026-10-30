import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  IdCard, 
  HardHat, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Ban,
  Scale,
  BookOpen,
  Search,
  Filter,
  Users,
  Gavel,
  Award,
  Sparkles,
  Info,
  BadgeCheck,
  ChevronDown
} from 'lucide-react';
import { 
  APPRENTICE_DUTIES,
  ACUERDO_0009_CHAPTERS,
  ACUERDO_0009_PROHIBITIONS,
  DUE_PROCESS_STAGES_2026,
  SENA_REGULATION_INFO,
  SENA_2026_UPDATES
} from '../../data/senaData';
import { RegulationChapter, RegulationArticle, RegulationProhibition } from '../../types/induction';

interface DutiesModuleProps {
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNavigateToNext: () => void;
}

type RegulationSubTab = 
  | 'capitulos'
  | 'deberes'
  | 'prohibiciones'
  | 'vocerias'
  | 'faltas_sanciones'
  | 'debido_proceso';

export const DutiesModule: React.FC<DutiesModuleProps> = ({
  isCompleted,
  onToggleComplete,
  onNavigateToNext
}) => {
  const [activeTab, setActiveTab] = useState<RegulationSubTab>('capitulos');
  
  // Chapter Explorer State
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGravityFilter, setSelectedGravityFilter] = useState<'all' | 'Leve' | 'Grave' | 'Gravísima'>('all');
  const [expandedArticleNumber, setExpandedArticleNumber] = useState<number | null>(1);
  const [expandedDutyId, setExpandedDutyId] = useState<string | null>(APPRENTICE_DUTIES[0].id);

  const currentChapter = useMemo(() => {
    return ACUERDO_0009_CHAPTERS.find(c => c.number === selectedChapterNumber) || ACUERDO_0009_CHAPTERS[0];
  }, [selectedChapterNumber]);

  // Global search across all chapters and articles of Acuerdo 0009
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase().trim();

    const matchedArticles: { chapter: RegulationChapter; article: RegulationArticle }[] = [];
    ACUERDO_0009_CHAPTERS.forEach(chapter => {
      chapter.articles.forEach(article => {
        const matches = 
          article.title.toLowerCase().includes(query) ||
          article.summary.toLowerCase().includes(query) ||
          article.fullText.toLowerCase().includes(query) ||
          article.practicalImplication.toLowerCase().includes(query) ||
          article.tags.some(t => t.toLowerCase().includes(query));
        if (matches) {
          matchedArticles.push({ chapter, article });
        }
      });
    });

    const matchedProhibitions = ACUERDO_0009_PROHIBITIONS.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.conduct.toLowerCase().includes(query) ||
      p.consequences.toLowerCase().includes(query)
    );

    return { articles: matchedArticles, prohibitions: matchedProhibitions };
  }, [searchQuery]);

  // Filtered prohibitions
  const filteredProhibitions = useMemo(() => {
    return ACUERDO_0009_PROHIBITIONS.filter(p => {
      if (selectedGravityFilter === 'all') return true;
      return p.gravity === selectedGravityFilter;
    });
  }, [selectedGravityFilter]);

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-[#005e26] rounded-2xl text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-2 flex-wrap">
            <span>Módulo 3 · Marco Normativo Integral</span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-white bg-emerald-700/60 px-2 py-0.5 rounded">
              Todo el Acuerdo 0009 de 2024
            </span>
            <span className="text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded text-[11px]">
              Actualizado Acuerdo 2 de 2026 (Art. 48)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-3">
            Reglamento del Aprendiz SENA: Acuerdo 0009 de 2024
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            Explora de manera íntegra los <strong>10 Capítulos</strong> del nuevo estatuto del aprendiz del Servicio Nacional de Aprendizaje. Conoce tus derechos, deberes, prohibiciones tipificadas, el sistema de vocerías y la ruta blindada del debido proceso garantizada por la reforma de 2026.
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
            <span className="text-xs text-slate-300">
              Estatuto obligatorio para las 33 regionales y 118 centros de Colombia
            </span>
          </div>
        </div>
      </div>

      {/* Global Real-Time Search Bar across Acuerdo 0009 */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs transition-colors">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar en todo el Acuerdo 0009 (ej. 'inasistencia', 'plagio', 'comité', 'artículo 48', 'vocero', 'aplazamiento', 'epp')..."
            className="w-full pl-10 pr-24 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#39A900] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Search Results Drawer if user is searching */}
        {searchResults && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">
                Resultados para: "{searchQuery}" ({searchResults.articles.length} artículos, {searchResults.prohibitions.length} prohibiciones)
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">Búsqueda en todo el Acuerdo 0009</span>
            </div>

            {searchResults.articles.length === 0 && searchResults.prohibitions.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic py-2">
                No se encontraron artículos o prohibiciones con ese término. Intenta con palabras como 'debido proceso', 'sanción', 'retiro' o 'bienestar'.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {searchResults.articles.map(({ chapter, article }) => (
                  <div 
                    key={`search-art-${article.number}`}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Art. {article.number} - {article.title}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                        Cap. {chapter.romanNumeral}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-2">{article.summary}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-2 font-serif">
                      "{article.fullText}"
                    </p>
                  </div>
                ))}

                {searchResults.prohibitions.map((proh) => (
                  <div 
                    key={`search-proh-${proh.id}`}
                    className="p-3 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-900 dark:text-rose-300">
                        Prohibición #{proh.number}: {proh.title}
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/50 px-1.5 py-0.5 rounded">
                        Falta {proh.gravity}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{proh.conduct}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto transition-colors">
        <button
          onClick={() => setActiveTab('capitulos')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all ${
            activeTab === 'capitulos'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>10 Capítulos del Acuerdo 0009</span>
        </button>

        <button
          onClick={() => setActiveTab('deberes')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all ${
            activeTab === 'deberes'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Deberes (Capítulo III)</span>
        </button>

        <button
          onClick={() => setActiveTab('prohibiciones')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all ${
            activeTab === 'prohibiciones'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Ban className="w-4 h-4" />
          <span>Prohibiciones (Capítulo IV)</span>
        </button>

        <button
          onClick={() => setActiveTab('vocerias')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all ${
            activeTab === 'vocerias'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Vocerías & Liderazgo (Cap. V)</span>
        </button>

        <button
          onClick={() => setActiveTab('faltas_sanciones')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all ${
            activeTab === 'faltas_sanciones'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Faltas & Sanciones (Cap. VIII y IX)</span>
        </button>

        <button
          onClick={() => setActiveTab('debido_proceso')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg shrink-0 transition-all ${
            activeTab === 'debido_proceso'
              ? 'bg-[#39A900] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Debido Proceso & Art. 48 (Cap. X · 2026)</span>
        </button>
      </div>

      {/* TAB 1: Explorador de los 10 Capítulos del Acuerdo 0009 */}
      {activeTab === 'capitulos' && (
        <div className="space-y-6">
          {/* Chapter Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {ACUERDO_0009_CHAPTERS.map(ch => {
              const isSelected = ch.number === selectedChapterNumber;
              return (
                <button
                  key={`chapter-btn-${ch.number}`}
                  onClick={() => {
                    setSelectedChapterNumber(ch.number);
                    setExpandedArticleNumber(ch.articles[0]?.number || null);
                  }}
                  className={`text-left p-3 rounded-xl border text-xs transition-all ${
                    isSelected
                      ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/60 shadow-xs ring-1 ring-[#39A900]'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold font-heading ${isSelected ? 'text-[#005e26] dark:text-emerald-300' : 'text-slate-900 dark:text-white'}`}>
                      Capítulo {ch.romanNumeral}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {ch.articleRange.split(' ')[0]}
                    </span>
                  </div>
                  <p className={`line-clamp-2 leading-tight ${isSelected ? 'text-emerald-900 dark:text-emerald-200 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
                    {ch.title}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Details Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#005e26] dark:text-emerald-400">
                    Capítulo {currentChapter.romanNumeral} de X
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {currentChapter.articleRange}
                  </span>
                  {currentChapter.number === 10 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Modificado por Acuerdo 2 de 2026
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                  {currentChapter.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                  {currentChapter.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {currentChapter.articles.length} artículos desglosados
                </span>
              </div>
            </div>

            {/* Core Highlights of the Chapter */}
            <div className="bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl p-4 border border-emerald-200/80 dark:border-emerald-800/50">
              <span className="text-xs font-bold text-[#005e26] dark:text-emerald-300 block mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-[#39A900]" />
                <span>Puntos Clave del Capítulo {currentChapter.romanNumeral}</span>
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {currentChapter.coreHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapter Articles Accordion */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                Artículos del Capítulo {currentChapter.romanNumeral}:
              </h3>

              <div className="space-y-3">
                {currentChapter.articles.map(art => {
                  const isExpanded = expandedArticleNumber === art.number;
                  return (
                    <div 
                      key={`art-${art.number}`}
                      className={`rounded-xl border transition-all ${
                        isExpanded
                          ? 'border-[#39A900] bg-white dark:bg-slate-900 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedArticleNumber(isExpanded ? null : art.number)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0">
                            {art.number}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                                {art.title}
                              </h4>
                              {art.is2026Amended && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.2 rounded border border-emerald-300 dark:border-emerald-700">
                                  Reformado Acuerdo 2 de 2026
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {art.summary}
                            </p>
                          </div>
                        </div>

                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180 text-[#39A900]' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs space-y-3">
                          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              Texto Normativo Oficial:
                            </span>
                            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
                              "{art.fullText}"
                            </p>
                          </div>

                          <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#005e26] dark:text-emerald-400 block mb-1">
                              Implicación Práctica para el Aprendiz:
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                              {art.practicalImplication}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <span className="text-[10px] text-slate-400 font-medium">Etiquetas:</span>
                            {art.tags.map((t, idx) => (
                              <span 
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Deberes del Aprendiz (Capítulo III) */}
      {activeTab === 'deberes' && (
        <div className="space-y-4">
          <div className="bg-emerald-50/80 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Capítulo III · Artículo 9 del Acuerdo 0009 de 2024:
            </span>
            Los deberes del aprendiz son de cumplimiento estricto y continuo durante las etapas lectiva y productiva. Su observancia garantiza la permanencia, el acceso a apoyos de bienestar y la certificación profesional.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {APPRENTICE_DUTIES.map((duty) => {
              const isExpanded = expandedDutyId === duty.id;
              return (
                <div 
                  key={duty.id}
                  className={`bg-white dark:bg-slate-900 rounded-xl border transition-all p-5 shadow-xs flex flex-col justify-between ${
                    isExpanded 
                      ? 'border-[#39A900] ring-1 ring-[#39A900]' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                        Deber #{duty.number}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {duty.legalArticle}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-2">
                      {duty.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {duty.summary}
                    </p>

                    {isExpanded && (
                      <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                          <span className="text-slate-400 font-bold block mb-1 text-[10px] uppercase">Texto Oficial del Acuerdo:</span>
                          <p className="text-slate-700 dark:text-slate-300 font-serif leading-relaxed italic">
                            "{duty.fullText}"
                          </p>
                        </div>

                        <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/40">
                          <span className="text-amber-800 dark:text-amber-400 font-bold block mb-1 text-[10px] uppercase">Consecuencia de Incumplimiento:</span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {duty.consequenceIfViolated}
                          </p>
                        </div>

                        <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
                          <span className="text-[#005e26] dark:text-emerald-400 font-bold block mb-1 text-[10px] uppercase">Consejo Práctico:</span>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {duty.practicalTip}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setExpandedDutyId(isExpanded ? null : duty.id)}
                    className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-[#007832] dark:text-emerald-400 flex items-center justify-between w-full"
                  >
                    <span>{isExpanded ? 'Ocultar detalles' : 'Ver texto legal y consecuencias'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Prohibiciones Expresas (Capítulo IV - Art. 10) */}
      {activeTab === 'prohibiciones' && (
        <div className="space-y-6">
          <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-xs text-rose-900 dark:text-rose-200">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm font-bold mb-1">Capítulo IV · Artículo 10 (Prohibiciones Expresas):</strong>
              Estas conductas están terminantemente vedadas en todas las sedes del SENA, plataformas digitales (Zajuna) y eventos oficiales. Su comisión activa de forma inmediata el régimen disciplinario y puede causar la expulsión definitiva.
            </div>
          </div>

          {/* Gravity Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Filtrar gravedad:</span>
            {(['all', 'Gravísima', 'Grave', 'Leve'] as const).map(grav => (
              <button
                key={grav}
                onClick={() => setSelectedGravityFilter(grav)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedGravityFilter === grav
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {grav === 'all' ? 'Todas' : `Faltas ${grav}s`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProhibitions.map((proh) => (
              <div 
                key={proh.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {proh.regulatoryArticle}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    proh.gravity === 'Gravísima'
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                      : proh.gravity === 'Grave'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    Falta {proh.gravity}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Ban className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    {proh.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {proh.conduct}
                </p>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block text-[11px]">Sanción Aplicable:</strong>
                    <span className="text-rose-700 dark:text-rose-400">{proh.consequences}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block text-[11px]">Principio Preventivo:</strong>
                    <span className="text-slate-600 dark:text-slate-400">{proh.preventionAdvice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Vocerías y Liderazgo (Capítulo V - Art. 11 a 18) */}
      {activeTab === 'vocerias' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vocero de Ficha */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#005e26] dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                    Vocero de Ficha o Grupo
                  </h3>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">Artículos 11 y 12 del Acuerdo 0009</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Elegido democráticamente por sus compañeros durante el <strong>primer mes de formación</strong>. Es el interlocutor oficial entre la ficha, el equipo de instructores y la coordinación académica.
              </p>

              <div className="space-y-2.5 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">Funciones Principales:</span>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>Canalizar y concertar iniciativas, inquietudes académicas y requerimientos de materiales del grupo.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span><strong>Acompañar obligatoriamente</strong> a compañeros de ficha citados a descargos ante el Comité de Evaluación y Seguimiento.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>Participar en reuniones periódicas de voceros convocadas por la Subdirección y Bienestar.</span>
                </div>
              </div>
            </div>

            {/* Representante de Centro */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                    Representante de Aprendices de Centro
                  </h3>
                  <span className="text-xs text-indigo-700 dark:text-indigo-400 font-semibold">Artículos 13 al 18 del Acuerdo 0009</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Máximo líder estudiantil electo por voto universal y secreto de todos los aprendices del Centro de Formación para un periodo de <strong>un (1) año calendario</strong>.
              </p>

              <div className="space-y-2.5 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">Requisitos de Postulación:</span>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Haber cursado y aprobado como mínimo el primer trimestre de formación titulada.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Tener excelente desempeño académico (todos los resultados aprobados) y no tener llamados de atención escritos vigentes.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Presentar un programa de trabajo estructurado en beneficio de toda la comunidad del Centro.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Régimen de Faltas y Sanciones (Capítulos VIII y IX) */}
      {activeTab === 'faltas_sanciones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic vs Disciplinary Faltas */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors space-y-4">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                Capítulo VIII: Tipos y Graduación de Faltas
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <strong className="text-slate-900 dark:text-white font-bold block mb-1">1. Faltas Académicas (Art. 36):</strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Afectan directamente el logro de competencias, entrega de evidencias, autenticidad de proyectos y cumplimiento de la ruta de aprendizaje.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20">
                  <strong className="text-slate-900 dark:text-white font-bold block mb-1">2. Faltas Disciplinarias (Art. 37):</strong>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Afectan la convivencia pacífica, la integridad física o moral de las personas, el orden institucional o el patrimonio del SENA.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs">
                <strong className="text-slate-900 dark:text-white font-bold block mb-1">Criterios de Calificación (Art. 38):</strong>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Las faltas se gradúan en <strong>Leves</strong>, <strong>Graves</strong> o <strong>Gravísimas</strong> evaluando: daño causado, intencionalidad (dolo/culpa), reiteración, grado de perturbación y antecedentes.
                </p>
              </div>
            </div>

            {/* Medidas Formativas vs Sanciones */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors space-y-4">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                Capítulo IX: Medidas Formativas y Sanciones
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Medidas Formativas (Preventivas):</span>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li>• <strong>Llamado de atención verbal:</strong> Reflexión pedagógica inmediata ante faltas leves.</li>
                    <li>• <strong>Llamado de atención escrito:</strong> Notificado formalmente con copia a la hoja de vida.</li>
                    <li>• <strong>Plan de Mejoramiento:</strong> Concertación pedagógica con plazos límites para nivelar competencias o corregir conductas.</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20">
                  <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400 block mb-1">Sanciones Administrativas (Competencia del Subdirector):</span>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li>• <strong>Condicionamiento de matrícula:</strong> Advertencia formal previa sujeta a no reincidir.</li>
                    <li>• <strong>Cancelación de matrícula:</strong> Pérdida del cupo e inhabilidad en SofiaPlus por término de 6 meses a 2 años.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Debido Proceso y Comité Art. 48 (Capítulo X - Reforma 2026) */}
      {activeTab === 'debido_proceso' && (
        <div className="space-y-6">
          {/* Spotlight Banner on 2026 Reform */}
          <div className="bg-gradient-to-r from-emerald-900 to-[#005e26] text-white p-5 rounded-xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <BadgeCheck className="w-5 h-5 text-emerald-300" />
              <h3 className="font-heading font-extrabold text-base sm:text-lg">
                Capítulo X: Debido Proceso y Reforma al Artículo 48 (Acuerdo 2 de 2026)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              El Consejo Directivo Nacional actualizó el <strong>Artículo 48</strong> el 10 de marzo de 2026 para garantizar que ningún aprendiz sea sancionado sin una citación formal electrónica fehaciente, derecho irrestricto de contradicción con su vocero y actas digitales unificadas.
            </p>
          </div>

          {/* Step by Step Due Process Diagram */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
              Ruta Oficial de los 6 Pasos del Debido Proceso:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DUE_PROCESS_STAGES_2026.map((st) => (
                <div 
                  key={st.step}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between transition-colors space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-lg bg-[#39A900] text-white font-extrabold text-xs flex items-center justify-center">
                        {st.step}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {st.legalTerm}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                      {st.title}
                    </h4>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                      Responsable: {st.responsible}
                    </span>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {st.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✔ Garantía: {st.guarantees}
                  </div>
                </div>
              ))}
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
              ? 'Has completado la revisión integral del Reglamento del Aprendiz (Acuerdo 0009).' 
              : 'Revisa los capítulos y deberes del Acuerdo 0009 y márcalo como completado.'}
          </span>
        </div>

        <button
          onClick={onNavigateToNext}
          className="flex items-center gap-1 px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
        >
          <span>Siguiente: Trámites y Etapa Productiva</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
