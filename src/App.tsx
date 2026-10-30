import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Scale, 
  ArrowRightLeft, 
  Gavel, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  Info,
  FileSpreadsheet,
  LogOut
} from 'lucide-react';
import { 
  UserRole, 
  InductionModuleTab, 
  ApprenticeProfile, 
  ApprenticeCharacterization,
  FichaGroup, 
  EvaluationResult 
} from './types/induction';
import { 
  INITIAL_FICHAS, 
  INITIAL_APPRENTICES 
} from './data/senaData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { CharacterizationModule } from './components/apprentice/CharacterizationModule';
import { DirectivoDashboard } from './components/directivo/DirectivoDashboard';
import { InstitutionalModule } from './components/modules/InstitutionalModule';
import { RightsModule } from './components/modules/RightsModule';
import { DutiesModule } from './components/modules/DutiesModule';
import { ProceduresModule } from './components/modules/ProceduresModule';
import { CaseSimulatorModule } from './components/modules/CaseSimulatorModule';
import { EvaluationQuiz } from './components/evaluation/EvaluationQuiz';
import { InductionCertificate } from './components/evaluation/InductionCertificate';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { SenaLogo } from './components/common/SenaLogo';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  signInWithGoogle, 
  signOutGoogle, 
  getAccessToken,
  createInductionSpreadsheet, 
  syncAllApprenticesToSheet, 
  getSavedSpreadsheetInfo 
} from './services/googleSheetsService';

export default function App() {
  // View state: 'landing' (welcome portal) vs 'app' (role view)
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');

  // Theme state (persisted)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sena_theme_mode');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isThemeBlurActive, setIsThemeBlurActive] = useState<boolean>(false);

  // Sync theme class to document root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sena_theme_mode', theme);
  }, [theme]);

  // Toggle theme with visual blur transition
  const handleToggleTheme = () => {
    setIsThemeBlurActive(true);

    // Switch theme halfway through the blur transition
    setTimeout(() => {
      setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, 120);

    // Reset blur overlay after animation
    setTimeout(() => {
      setIsThemeBlurActive(false);
    }, 460);
  };

  // Local storage backed state
  const [fichas, setFichas] = useState<FichaGroup[]>(() => {
    const saved = localStorage.getItem('sena_induction_fichas');
    return saved ? JSON.parse(saved) : INITIAL_FICHAS;
  });

  const [apprentices, setApprentices] = useState<ApprenticeProfile[]>(() => {
    const saved = localStorage.getItem('sena_induction_apprentices');
    return saved ? JSON.parse(saved) : INITIAL_APPRENTICES;
  });

  const [selectedFichaId, setSelectedFichaId] = useState<string>('2824901');
  const [activeApprenticeId, setActiveApprenticeId] = useState<string>('app-102'); // Santiago Camargo (in progress)
  const [currentRole, setCurrentRole] = useState<UserRole>('apprentice');
  const [activeTab, setActiveTab] = useState<InductionModuleTab>('institutional');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Google Sheets & Drive Sync State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(() => getSavedSpreadsheetInfo().id);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(() => getSavedSpreadsheetInfo().url);
  const [spreadsheetName, setSpreadsheetName] = useState<string | null>(() => getSavedSpreadsheetInfo().name);
  const [isGoogleSyncing, setIsGoogleSyncing] = useState<boolean>(false);
  const [lastGoogleSyncTime, setLastGoogleSyncTime] = useState<string | null>(null);

  // Listen to Google Firebase Auth state
  useEffect(() => {
    const unsub = initAuth((user) => {
      setGoogleUser(user);
    });
    return () => unsub();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sena_induction_fichas', JSON.stringify(fichas));
  }, [fichas]);

  useEffect(() => {
    localStorage.setItem('sena_induction_apprentices', JSON.stringify(apprentices));
  }, [apprentices]);

  // Current active entities
  const currentFicha = fichas.find(f => f.id === selectedFichaId) || fichas[0];
  const activeApprentice = apprentices.find(a => a.id === activeApprenticeId) || apprentices[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Google Drive & Sheets Sync Actions
  const handleGoogleLogin = async () => {
    setIsGoogleSyncing(true);
    try {
      const res = await signInWithGoogle();
      if (!res) return;
      setGoogleUser(res.user);
      showToast(`Conectado como ${res.user.displayName || res.user.email}`);

      // Auto-create or sync official induction spreadsheet in Drive
      const savedInfo = getSavedSpreadsheetInfo();
      if (!savedInfo.id) {
        showToast('Creando hoja de cálculo oficial en tu Google Drive...');
        const newSheet = await createInductionSpreadsheet(currentFicha, apprentices);
        setSpreadsheetId(newSheet.spreadsheetId);
        setSpreadsheetUrl(newSheet.spreadsheetUrl);
        setSpreadsheetName(`Acta e Inducción SENA - Ficha ${currentFicha.id}`);
        setLastGoogleSyncTime(new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }));
        showToast('¡Hoja oficial creada y sincronizada en Google Drive!');
      } else {
        await syncAllApprenticesToSheet(savedInfo.id, currentFicha, apprentices);
        setSpreadsheetId(savedInfo.id);
        setSpreadsheetUrl(savedInfo.url);
        setSpreadsheetName(savedInfo.name);
        setLastGoogleSyncTime(new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }));
        showToast('¡Datos sincronizados con tu hoja en Google Sheets!');
      }
    } catch (err: any) {
      console.error('Error Google Login/Sync:', err);
      showToast(`Error: ${err.message || 'Fallo de autenticación con Google'}`);
    } finally {
      setIsGoogleSyncing(false);
    }
  };

  const handleGoogleLogout = async () => {
    await signOutGoogle();
    setGoogleUser(null);
    showToast('Sesión de Google desconectada');
  };

  const handleManualGoogleSync = async () => {
    setIsGoogleSyncing(true);
    try {
      let targetId = spreadsheetId || getSavedSpreadsheetInfo().id;
      if (!targetId) {
        showToast('Creando hoja oficial en Google Drive...');
        const newSheet = await createInductionSpreadsheet(currentFicha, apprentices);
        setSpreadsheetId(newSheet.spreadsheetId);
        setSpreadsheetUrl(newSheet.spreadsheetUrl);
        setSpreadsheetName(`Acta e Inducción SENA - Ficha ${currentFicha.id}`);
        targetId = newSheet.spreadsheetId;
      } else {
        await syncAllApprenticesToSheet(targetId, currentFicha, apprentices);
      }
      const nowTime = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      setLastGoogleSyncTime(nowTime);
      showToast('✓ Sincronización completa con Google Sheets exitosa');
    } catch (err: any) {
      console.error('Error en sincronización manual:', err);
      showToast(`Error: ${err.message || 'Fallo al sincronizar con Google Sheets'}`);
    } finally {
      setIsGoogleSyncing(false);
    }
  };

  // Background Auto-sync whenever apprentice completes actions
  const triggerAutoSync = async (updatedCohort: ApprenticeProfile[]) => {
    const token = getAccessToken();
    const targetSheetId = spreadsheetId || getSavedSpreadsheetInfo().id;
    if (token && targetSheetId) {
      try {
        setIsGoogleSyncing(true);
        await syncAllApprenticesToSheet(targetSheetId, currentFicha, updatedCohort);
        const nowTime = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        setLastGoogleSyncTime(nowTime);
        showToast('✓ Respuesta sincronizada en tiempo real con Google Sheets');
      } catch (err) {
        console.warn('Auto-sync en background no crítico:', err);
      } finally {
        setIsGoogleSyncing(false);
      }
    }
  };

  // Toggle module completion for active apprentice
  const handleToggleModuleComplete = (moduleKey: string) => {
    const updated = apprentices.map(a => {
      if (a.id !== activeApprentice.id) return a;
      const completed = a.modulesCompleted.includes(moduleKey)
        ? a.modulesCompleted.filter(m => m !== moduleKey)
        : [...a.modulesCompleted, moduleKey];
      return { ...a, modulesCompleted: completed };
    });
    setApprentices(updated);
    triggerAutoSync(updated);

    const isNowDone = !activeApprentice.modulesCompleted.includes(moduleKey);
    showToast(isNowDone ? 'Módulo marcado como completado y apropiado' : 'Módulo desmarcado');
  };

  // Save apprentice characterization (TRIGGERS AUTO-SYNC TO GOOGLE SHEETS)
  const handleSaveCharacterization = (charData: ApprenticeCharacterization) => {
    const updated = apprentices.map(a => {
      if (a.id !== activeApprentice.id) return a;
      return {
        ...a,
        characterization: charData,
        modulesCompleted: Array.from(new Set([...a.modulesCompleted, 'characterization']))
      };
    });
    setApprentices(updated);
    triggerAutoSync(updated);
    showToast('¡Caracterización completada! Tu Ficha Oficial ha sido vinculada al expediente.');
  };

  // Save evaluation result (TRIGGERS AUTO-SYNC TO GOOGLE SHEETS)
  const handleSaveEvaluationResult = (result: EvaluationResult) => {
    const certCode = result.passed
      ? `SENA-IND-2026-${activeApprentice.fichaId}-${activeApprentice.documentNumber.slice(-4)}`
      : undefined;

    const updated = apprentices.map(a => {
      if (a.id !== activeApprentice.id) return a;
      return {
        ...a,
        evaluationResult: result,
        certificateCode: certCode,
        issueDate: result.passed ? new Date().toLocaleDateString('es-CO') : undefined,
        modulesCompleted: Array.from(new Set([...a.modulesCompleted, 'evaluation']))
      };
    });
    setApprentices(updated);
    triggerAutoSync(updated);

    if (result.passed) {
      showToast('¡Felicitaciones! Has aprobado la Inducción SENA y obtenido tu certificado digital.');
    } else {
      showToast('Evaluación registrada. Puedes revisar tus áreas a reforzar y volver a presentarla.');
    }
  };

  // Add apprentice handler (TRIGGERS AUTO-SYNC)
  const handleAddApprentice = (newApp: ApprenticeProfile) => {
    const updated = [newApp, ...apprentices];
    setApprentices(updated);
    triggerAutoSync(updated);
    showToast(`Aprendiz ${newApp.fullName} registrado en la Ficha ${newApp.fichaId}`);
  };

  // View apprentice certificate from dashboard
  const handleViewApprenticeCertificate = (app: ApprenticeProfile) => {
    setActiveApprenticeId(app.id);
    setCurrentRole('apprentice');
    setCurrentView('app');
    setActiveTab('certificate');
  };

  // Modules definition for apprentice stepper
  const MODULES_LIST = [
    { id: 'characterization', label: '0. Caracterización', icon: FileSpreadsheet },
    { id: 'institutional', label: '1. Identidad & Símbolos', icon: Building2 },
    { id: 'rights', label: '2. Derechos del Aprendiz', icon: ShieldCheck },
    { id: 'duties', label: '3. Reglamento (Acuerdo 0009)', icon: Scale },
    { id: 'procedures', label: '4. Trámites & Etapa Productiva', icon: ArrowRightLeft },
    { id: 'simulator', label: '5. Simulador de Casos', icon: Gavel },
    { id: 'evaluation', label: '6. Evaluación de Apropiación', icon: Award },
    { id: 'certificate', label: '7. Certificado Oficial', icon: FileCheck, requiresPass: true }
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300 ${isThemeBlurActive ? 'theme-blur-active' : ''}`}>
      {/* Full screen backdrop blur overlay during theme change */}
      {isThemeBlurActive && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-white/20 dark:bg-black/30 transition-all duration-300"
          aria-hidden="true"
        />
      )}

      {/* Institutional Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          setCurrentView('app');
        }}
        currentView={currentView}
        onNavigateHome={() => {
          setCurrentView('landing');
          showToast('Has salido al Portal Principal de Roles.');
        }}
        activeApprentice={activeApprentice}
        allApprentices={apprentices}
        onSelectApprentice={(app) => {
          setActiveApprenticeId(app.id);
          setSelectedFichaId(app.fichaId);
        }}
        currentFicha={currentFicha}
        completedModulesCount={activeApprentice.modulesCompleted.length}
        totalModulesCount={6}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="no-print fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-slate-700 dark:border-slate-600 max-w-sm animate-fade-in">
          <Info className="w-4 h-4 text-[#39A900] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. LANDING PAGE VIEW */}
        {currentView === 'landing' && (
          <LandingPage
            onSelectRole={(role, initialTab) => {
              setCurrentRole(role);
              if (initialTab) {
                setActiveTab(initialTab as InductionModuleTab);
              }
              setCurrentView('app');
            }}
            apprentices={apprentices}
            fichas={fichas}
            activeApprentice={activeApprentice}
            theme={theme}
          />
        )}

        {/* 2. ROLE-SPECIFIC VIEWS */}
        {currentView === 'app' && (
          <>
            {/* INSTRUCTOR VIEW */}
            {currentRole === 'instructor' && (
              <InstructorDashboard
                fichas={fichas}
                selectedFichaId={selectedFichaId}
                onSelectFicha={setSelectedFichaId}
                apprentices={apprentices}
                onAddApprentice={handleAddApprentice}
                onViewApprenticeCertificate={handleViewApprenticeCertificate}
                onExitToLanding={() => {
                  setCurrentView('landing');
                  showToast('Has salido al Portal Principal de Roles.');
                }}
                googleUser={googleUser}
                spreadsheetId={spreadsheetId}
                spreadsheetUrl={spreadsheetUrl}
                spreadsheetName={spreadsheetName}
                isGoogleSyncing={isGoogleSyncing}
                lastGoogleSyncTime={lastGoogleSyncTime}
                onGoogleLogin={handleGoogleLogin}
                onGoogleLogout={handleGoogleLogout}
                onGoogleSync={handleManualGoogleSync}
              />
            )}

            {/* DIRECTIVO / BIENESTAR VIEW */}
            {currentRole === 'directivo' && (
              <DirectivoDashboard
                apprentices={apprentices}
                fichas={fichas}
                selectedFichaId={selectedFichaId}
                onSelectFicha={setSelectedFichaId}
                onExitToLanding={() => {
                  setCurrentView('landing');
                  showToast('Has salido al Portal Principal de Roles.');
                }}
                onViewApprentice={(app) => {
                  setActiveApprenticeId(app.id);
                  setSelectedFichaId(app.fichaId);
                  setCurrentRole('apprentice');
                  setActiveTab(app.characterization ? 'institutional' : 'characterization');
                }}
                googleUser={googleUser}
                spreadsheetId={spreadsheetId}
                spreadsheetUrl={spreadsheetUrl}
                spreadsheetName={spreadsheetName}
                isGoogleSyncing={isGoogleSyncing}
                lastGoogleSyncTime={lastGoogleSyncTime}
                onGoogleLogin={handleGoogleLogin}
                onGoogleLogout={handleGoogleLogout}
                onGoogleSync={handleManualGoogleSync}
              />
            )}

            {/* APPRENTICE VIEW */}
            {currentRole === 'apprentice' && (
              <div className="space-y-6">
                {/* Apprentice Info & Quick Exit Header */}
                <div className="no-print bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-[#007832] dark:text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0">
                      {activeApprentice.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                          {activeApprentice.fullName}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {activeApprentice.documentType} {activeApprentice.documentNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Ficha {activeApprentice.fichaId} · {activeApprentice.programName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {spreadsheetId && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                        <span>Sincronizando con Google Drive</span>
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setCurrentView('landing');
                        showToast('Has salido al Portal Principal de Roles.');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all shadow-2xs group cursor-pointer"
                      title="Salir al portal principal (Landing Page)"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                      <span>Salir al Portal</span>
                    </button>
                  </div>
                </div>

                {/* Induction Stepper / Module Nav */}
                <div className="no-print bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 shadow-xs overflow-x-auto transition-colors duration-300">
                  <div className="flex items-center gap-1 min-w-max">
                    {MODULES_LIST.map((mod) => {
                      const Icon = mod.icon;
                      const isActive = activeTab === mod.id;
                      const isCompleted = mod.id === 'characterization' 
                        ? !!activeApprentice.characterization 
                        : activeApprentice.modulesCompleted.includes(mod.id);
                      const isCertificateTab = mod.id === 'certificate';
                      const isCertificateAvailable = activeApprentice.evaluationResult?.passed;

                      if (isCertificateTab && !isCertificateAvailable) {
                        return null; // hide certificate tab until evaluation is passed
                      }

                      return (
                        <button
                          key={mod.id}
                          onClick={() => setActiveTab(mod.id as InductionModuleTab)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-[#39A900] text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#39A900]'}`} />
                          <span>{mod.label}</span>
                          {isCompleted && !isActive && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Module 0: Characterization */}
                {activeTab === 'characterization' && (
                  <CharacterizationModule
                    apprentice={activeApprentice}
                    onSaveCharacterization={handleSaveCharacterization}
                    onNavigateToNext={() => setActiveTab('institutional')}
                  />
                )}

                {/* Module 1: Institutional */}
                {activeTab === 'institutional' && (
                  <InstitutionalModule
                    isCompleted={activeApprentice.modulesCompleted.includes('institutional')}
                    onToggleComplete={() => handleToggleModuleComplete('institutional')}
                    onNavigateToNext={() => setActiveTab('rights')}
                  />
                )}

                {/* Module 2: Rights */}
                {activeTab === 'rights' && (
                  <RightsModule
                    isCompleted={activeApprentice.modulesCompleted.includes('rights')}
                    onToggleComplete={() => handleToggleModuleComplete('rights')}
                    onNavigateToNext={() => setActiveTab('duties')}
                  />
                )}

                {/* Module 3: Duties & Acuerdo 0009 */}
                {activeTab === 'duties' && (
                  <DutiesModule
                    isCompleted={activeApprentice.modulesCompleted.includes('duties')}
                    onToggleComplete={() => handleToggleModuleComplete('duties')}
                    onNavigateToNext={() => setActiveTab('procedures')}
                  />
                )}

                {/* Module 4: Procedures */}
                {activeTab === 'procedures' && (
                  <ProceduresModule
                    isCompleted={activeApprentice.modulesCompleted.includes('procedures')}
                    onToggleComplete={() => handleToggleModuleComplete('procedures')}
                    onNavigateToNext={() => setActiveTab('simulator')}
                  />
                )}

                {/* Module 5: Simulator */}
                {activeTab === 'simulator' && (
                  <CaseSimulatorModule
                    isCompleted={activeApprentice.modulesCompleted.includes('simulator')}
                    onToggleComplete={() => handleToggleModuleComplete('simulator')}
                    onNavigateToNext={() => setActiveTab('evaluation')}
                  />
                )}

                {/* Module 6: Evaluation */}
                {activeTab === 'evaluation' && (
                  <EvaluationQuiz
                    apprenticeName={activeApprentice.fullName}
                    onSaveResult={handleSaveEvaluationResult}
                    onViewCertificate={() => setActiveTab('certificate')}
                    previousResult={activeApprentice.evaluationResult}
                  />
                )}

                {/* Module 7: Certificate */}
                {activeTab === 'certificate' && (
                  <InductionCertificate
                    apprentice={activeApprentice}
                    onBack={() => setActiveTab('evaluation')}
                  />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SenaLogo variant="official" className="w-5 h-5" />
            <span className="font-bold text-slate-700 dark:text-slate-300">Servicio Nacional de Aprendizaje SENA</span>
            <span>·</span>
            <span>Ministerio del Trabajo de Colombia</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            Reglamento del Aprendiz (Acuerdo 0009 de 2024 - Vigente) · Código de Integridad Institucional
          </div>
        </div>
      </footer>
    </div>
  );
}
