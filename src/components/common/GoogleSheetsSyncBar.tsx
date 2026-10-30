import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  LogOut,
  FolderOpen
} from 'lucide-react';
import { User } from 'firebase/auth';

interface GoogleSheetsSyncBarProps {
  currentUser: User | null;
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  spreadsheetName: string | null;
  isSyncing: boolean;
  lastSyncTime: string | null;
  onLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
  onCreateOrSync: () => Promise<void>;
  compact?: boolean;
}

export const GoogleSheetsSyncBar: React.FC<GoogleSheetsSyncBarProps> = ({
  currentUser,
  spreadsheetId,
  spreadsheetUrl,
  spreadsheetName,
  isSyncing,
  lastSyncTime,
  onLogin,
  onLogout,
  onCreateOrSync,
  compact = false
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAction = async (action: () => Promise<void>) => {
    setErrorMsg(null);
    try {
      await action();
    } catch (err: any) {
      console.error('Google Sheets Action Error:', err);
      setErrorMsg(err.message || 'Error en la sincronización con Google');
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 shadow-2xs transition-colors ${compact ? 'text-xs' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Google Drive / Sheets Identity & Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#007832] dark:text-emerald-300 shrink-0">
            <FileSpreadsheet className="w-5 h-5 text-[#39A900]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                Google Sheets & Drive
              </span>

              {spreadsheetId ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
                  <span>Sincronización Activa</span>
                </span>
              ) : currentUser ? (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  Conectado · Hoja pendiente de crear
                </span>
              ) : (
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Sin conectar
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {spreadsheetName ? (
                <span>{spreadsheetName}</span>
              ) : (
                <span>Crea y actualiza la hoja de cálculo en Drive con respuestas de aprendices en tiempo real</span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
          {/* Case 1: Not Authenticated -> Show Official Google Sign In button */}
          {!currentUser ? (
            <button
              onClick={() => handleAction(onLogin)}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Vincular con tu cuenta de Google Drive para crear y sincronizar la hoja"
            >
              {/* Official Google G Logo SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>Conectar Google Drive</span>
            </button>
          ) : (
            /* Case 2: Authenticated */
            <>
              {/* Account pill */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="max-w-[130px] truncate" title={currentUser.email || ''}>
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>

              {/* Open in Google Sheets link */}
              {spreadsheetUrl && (
                <a
                  href={spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-[#007832] dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-all shadow-2xs"
                  title="Abrir hoja de cálculo oficial en Google Sheets"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Abrir en Drive</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Sync / Create Button */}
              <button
                onClick={() => handleAction(onCreateOrSync)}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#39A900] hover:bg-[#2d8500] text-white shadow-2xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                title={spreadsheetId ? "Sincronizar todos los aprendices a Google Sheets ahora" : "Crear hoja oficial en Google Drive y subir datos"}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : spreadsheetId ? 'Sincronizar' : 'Crear Hoja en Drive'}</span>
              </button>

              {/* Sign out */}
              <button
                onClick={() => handleAction(onLogout)}
                disabled={isSyncing}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Desconectar cuenta de Google"
                aria-label="Desconectar cuenta de Google"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Error alert if any */}
      {errorMsg && (
        <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-900/60">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Timestamp subline */}
      {lastSyncTime && (
        <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-1.5">
          <span>Última sincronización exitosa: <strong className="font-mono text-slate-600 dark:text-slate-300">{lastSyncTime}</strong></span>
          <span className="text-emerald-600 dark:text-emerald-400">Pestañas: Matriz_Induccion & Estadisticas_Cohorte</span>
        </div>
      )}
    </div>
  );
};
