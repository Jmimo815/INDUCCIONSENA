import React from 'react';
import { 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Sun,
  Moon,
  Building2,
  Home,
  LogOut
} from 'lucide-react';
import { UserRole, ApprenticeProfile, FichaGroup } from '../types/induction';
import { SenaLogo } from './common/SenaLogo';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentView: 'landing' | 'app';
  onNavigateHome: () => void;
  activeApprentice: ApprenticeProfile;
  allApprentices: ApprenticeProfile[];
  onSelectApprentice: (apprentice: ApprenticeProfile) => void;
  currentFicha: FichaGroup;
  completedModulesCount: number;
  totalModulesCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  currentView,
  onNavigateHome,
  activeApprentice,
  allApprentices,
  onSelectApprentice,
  currentFicha,
  completedModulesCount,
  totalModulesCount,
  theme,
  onToggleTheme
}) => {
  const isPassed = activeApprentice.evaluationResult?.passed;

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-300">
      {/* Top micro bar for institutional identity */}
      <div className="bg-[#005e26] dark:bg-[#003816] text-white text-[11px] py-1 px-4 sm:px-8 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-2">
          <span className="font-medium tracking-wide">República de Colombia · Ministerio del Trabajo</span>
          <span className="opacity-40">|</span>
          <span className="text-emerald-200 font-semibold">{currentFicha.regionalName}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-emerald-100 text-[10px]">
          <span>Plataforma Oficial de Inducción de Aprendices</span>
          <span>·</span>
          <span className="font-medium">Reglamento del Aprendiz (Acuerdo 0009 de 2024 · Actualizado por Acuerdo 2 de 2026)</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Brand title (Clickable to go to Landing) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left group transition-all"
              title="Volver a la Página Principal (Portal SENA)"
            >
              <SenaLogo variant="official" className="w-10 h-10 drop-shadow-xs group-hover:scale-105 transition-transform" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-slate-900 dark:text-white tracking-tight text-lg sm:text-xl transition-colors group-hover:text-[#39A900]">
                    Inducción SENA
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/70 text-[#007832] dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    Ficha {currentFicha.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                  {currentFicha.programName}
                </p>
              </div>
            </button>
          </div>

          {/* Right Controls: Home portal button, Role Switcher & Apprentice Switcher & Theme Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Botón Salir al Landing Page */}
            {currentView === 'app' ? (
              <button
                onClick={onNavigateHome}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg border border-rose-300 dark:border-rose-900 bg-rose-50/90 dark:bg-rose-950/60 text-rose-700 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-900/80 hover:text-rose-900 dark:hover:text-white shadow-2xs transition-all active:scale-95 group cursor-pointer"
                title="Cerrar la sesión actual y salir al Landing Page"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Salir</span>
              </button>
            ) : (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-[#39A900] text-[#007832] dark:text-emerald-300 shadow-2xs"
                title="Portal Principal SENA"
              >
                <Home className="w-3.5 h-3.5 text-[#39A900]" />
                <span className="hidden sm:inline">Portal Inicio</span>
              </div>
            )}

            {/* Apprentice Quick Selector (allows testing different student states) */}
            {currentRole === 'apprentice' && currentView === 'app' && (
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg text-xs transition-colors">
                <span className="text-slate-400 dark:text-slate-400 font-medium hidden sm:inline">Aprendiz:</span>
                <select
                  value={activeApprentice.id}
                  onChange={(e) => {
                    const found = allApprentices.find(a => a.id === e.target.value);
                    if (found) onSelectApprentice(found);
                  }}
                  className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                >
                  {allApprentices
                    .filter(a => a.fichaId === currentFicha.id)
                    .map(a => (
                      <option key={a.id} value={a.id} className="dark:bg-slate-900 dark:text-white">
                        {a.fullName} {a.characterization ? '· Caracterizado' : ''} {a.evaluationResult?.passed ? '✓ (Aprobado)' : ''}
                      </option>
                    ))}
                </select>

                {isPassed && (
                  <span className="text-[10px] font-bold text-[#007832] dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#39A900] dark:text-emerald-400" />
                    Certificado
                  </span>
                )}
              </div>
            )}

            {/* Role Switcher Tabs (Zero-pill clean buttons) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors">
              <button
                onClick={() => onRoleChange('apprentice')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  currentRole === 'apprentice' && currentView === 'app'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#39A900]" />
                <span className="hidden sm:inline">Vista</span>
                <span>Aprendiz</span>
              </button>

              <button
                onClick={() => onRoleChange('instructor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  currentRole === 'instructor' && currentView === 'app'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className="w-4 h-4 text-[#005e26] dark:text-emerald-400" />
                <span className="hidden sm:inline">Panel</span>
                <span>Instructor</span>
              </button>

              <button
                onClick={() => onRoleChange('directivo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  currentRole === 'directivo' && currentView === 'app'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">Tablero</span>
                <span>Directivo</span>
              </button>
            </div>

            {/* Dark Mode / Light Mode Toggle Button with Blur transition */}
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white shadow-2xs transition-all active:scale-95"
              title={theme === 'dark' ? "Cambiar a Modo Claro (Efecto Blur)" : "Cambiar a Modo Oscuro (Efecto Blur)"}
              aria-label="Alternar modo claro y oscuro"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-emerald-600 animate-spin-once" />
                  <span className="hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
