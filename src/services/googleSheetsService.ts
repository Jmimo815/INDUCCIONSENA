import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ApprenticeProfile, FichaGroup } from '../types/induction';

// Initialize Firebase App safely (singleton)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Workspace Scopes for Sheets and Drive
export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets'
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach(scope => provider.addScope(scope));

// In-memory token cache (CRITICAL: never in localStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize Auth Listener
export const initAuth = (
  onAuthChange: (user: User | null, token: string | null) => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      onAuthChange(user, cachedAccessToken);
    } else if (user && !cachedAccessToken && !isSigningIn) {
      // Prompt user to re-authenticate if token was cleared on page reload
      onAuthChange(user, null);
    } else if (!user) {
      cachedAccessToken = null;
      onAuthChange(null, null);
    }
  });
};

// Google Sign-In with OAuth Scope consent
export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso OAuth para Google Drive.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Error en autenticación con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Google Sign Out
export const signOutGoogle = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Get current in-memory token
export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// Set token manually (e.g. if refreshed)
export const setCachedAccessToken = (token: string | null): void => {
  cachedAccessToken = token;
};

// Public metadata storage keys (Non-sensitive file IDs)
const SPREADSHEET_ID_KEY = 'sena_induction_spreadsheet_id';
const SPREADSHEET_URL_KEY = 'sena_induction_spreadsheet_url';
const SPREADSHEET_NAME_KEY = 'sena_induction_spreadsheet_name';

export const getSavedSpreadsheetInfo = () => {
  return {
    id: localStorage.getItem(SPREADSHEET_ID_KEY),
    url: localStorage.getItem(SPREADSHEET_URL_KEY),
    name: localStorage.getItem(SPREADSHEET_NAME_KEY)
  };
};

export const saveSpreadsheetInfo = (id: string, url: string, name: string) => {
  localStorage.setItem(SPREADSHEET_ID_KEY, id);
  localStorage.setItem(SPREADSHEET_URL_KEY, url);
  localStorage.setItem(SPREADSHEET_NAME_KEY, name);
};

export const clearSavedSpreadsheetInfo = () => {
  localStorage.removeItem(SPREADSHEET_ID_KEY);
  localStorage.removeItem(SPREADSHEET_URL_KEY);
  localStorage.removeItem(SPREADSHEET_NAME_KEY);
};

// Headers Definition for Matriz_Induccion
export const MATRIZ_HEADERS = [
  'Ficha SENA',
  'Programa de Formación',
  'Tipo Documento',
  'Número Documento',
  'Nombres y Apellidos',
  'Correo Institucional / Personal',
  'Teléfono de Contacto',
  'Caracterizado (Sí/No)',
  'Estilo VAK Dominante',
  'Dispositivo Principal',
  'Tipo de Conectividad',
  'Requiere Apoyo Económico',
  'Tipos de Apoyo Solicitados',
  'Módulos Completados',
  'Total Módulos Inducción',
  'Evaluación Presentada',
  'Calificación (%)',
  'Juicio de Inducción',
  'Código de Certificado',
  'Fecha Registro / Certificación',
  'Última Sincronización'
];

/**
 * Creates an official SENA induction spreadsheet in Google Drive via Google Sheets API v4
 */
export const createInductionSpreadsheet = async (
  ficha: FichaGroup,
  apprentices: ApprenticeProfile[]
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  const token = cachedAccessToken;
  if (!token) {
    throw new Error('Debes iniciar sesión con Google para crear la hoja de cálculo en Drive.');
  }

  const title = `Acta e Inducción SENA - Ficha ${ficha.id} - ${ficha.programName.slice(0, 32)}`;

  // 1. Create spreadsheet with 2 tabs: Matriz_Induccion and Estadisticas_Cohorte
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: title
      },
      sheets: [
        {
          properties: {
            title: 'Matriz_Induccion',
            gridProperties: {
              frozenRowCount: 1,
              columnCount: 22
            }
          }
        },
        {
          properties: {
            title: 'Estadisticas_Cohorte',
            gridProperties: {
              frozenRowCount: 1,
              columnCount: 5
            }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    throw new Error(err.error?.message || 'Error creando la hoja en Google Sheets');
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const spreadsheetUrl = sheetData.spreadsheetUrl;

  saveSpreadsheetInfo(spreadsheetId, spreadsheetUrl, title);

  // 2. Format Header with Institutional SENA Theme (#005E26 background, white bold text)
  try {
    const matrizSheetId = sheetData.sheets?.[0]?.properties?.sheetId || 0;
    const statsSheetId = sheetData.sheets?.[1]?.properties?.sheetId || 1;

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          // Format Matriz Header Row (A1:U1)
          {
            repeatCell: {
              range: {
                sheetId: matrizSheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: MATRIZ_HEADERS.length
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.0, green: 0.368, blue: 0.149 }, // SENA Dark Green #005E26
                  textFormat: { bold: true, fontSize: 10, foregroundColor: { red: 1, green: 1, blue: 1 } },
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE',
                  wrapStrategy: 'WRAP'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy)'
            }
          },
          // Format Stats Header Row (A1:C1)
          {
            repeatCell: {
              range: {
                sheetId: statsSheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 3
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.223, green: 0.662, blue: 0.0 }, // SENA Green #39A900
                  textFormat: { bold: true, fontSize: 11, foregroundColor: { red: 1, green: 1, blue: 1 } },
                  horizontalAlignment: 'CENTER'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
            }
          }
        ]
      })
    });
  } catch (formatErr) {
    console.warn('Formato visual no crítico omitido:', formatErr);
  }

  // 3. Populate Initial Data
  await syncAllApprenticesToSheet(spreadsheetId, ficha, apprentices);

  return { spreadsheetId, spreadsheetUrl };
};

/**
 * Transforms an ApprenticeProfile into an array of cell values
 */
export const formatApprenticeRow = (a: ApprenticeProfile, ficha: FichaGroup): (string | number)[] => {
  const isChar = !!a.characterization;
  const c = a.characterization;
  const res = a.evaluationResult;

  let finalStatus = 'SIN INICIAR';
  if (res) {
    finalStatus = res.passed ? 'APROBADO (COMPETENTE)' : 'NO COMPETENTE (REFUERZO)';
  } else if (a.modulesCompleted.length > 0) {
    finalStatus = `EN PROGRESO (${a.modulesCompleted.length}/6)`;
  }

  return [
    a.fichaId || ficha.id,
    a.programName || ficha.programName,
    a.documentType,
    a.documentNumber,
    a.fullName,
    a.email,
    a.phone,
    isChar ? 'SÍ' : 'NO',
    c ? c.dominantLearningStyle : 'Pendiente',
    c ? c.primaryDevice : 'Pendiente',
    c ? c.internetConnection : 'Pendiente',
    c ? (c.requiresEconomicSupport ? 'SÍ (Solicitó Apoyo)' : 'NO') : 'Pendiente',
    c ? (c.supportRequestedTypes.length > 0 ? c.supportRequestedTypes.join(', ') : 'Ninguno') : 'Pendiente',
    a.modulesCompleted.length,
    6, // Total modules in standard induction
    res ? 'SÍ' : 'NO',
    res ? `${res.score}%` : 'N/A',
    finalStatus,
    a.certificateCode || (res?.passed ? `SENA-IND-2026-${a.fichaId}-${a.documentNumber.slice(-4)}` : 'N/A'),
    a.issueDate || (res ? res.completedAt : (c ? c.completedAt : 'N/A')),
    new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })
  ];
};

/**
 * Syncs all apprentices of the given cohort to the Google Sheet
 */
export const syncAllApprenticesToSheet = async (
  spreadsheetId: string,
  ficha: FichaGroup,
  apprentices: ApprenticeProfile[]
): Promise<void> => {
  const token = cachedAccessToken;
  if (!token) {
    throw new Error('Sesión de Google no encontrada. Por favor inicia sesión con Google.');
  }

  const fichaApprentices = apprentices.filter(a => a.fichaId === ficha.id);
  const dataRows = fichaApprentices.map(a => formatApprenticeRow(a, ficha));
  const fullMatrizValues = [MATRIZ_HEADERS, ...dataRows];

  // 1. Write Matriz_Induccion
  const updateMatrizRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Matriz_Induccion!A1:U${fullMatrizValues.length + 10}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `Matriz_Induccion!A1:U${fullMatrizValues.length}`,
        majorDimension: 'ROWS',
        values: fullMatrizValues
      })
    }
  );

  if (!updateMatrizRes.ok) {
    const err = await updateMatrizRes.json();
    throw new Error(err.error?.message || 'Error actualizando Matriz en Google Sheets');
  }

  // 2. Compute Cohort Statistics for Estadisticas_Cohorte
  const total = fichaApprentices.length;
  const characterized = fichaApprentices.filter(a => !!a.characterization).length;
  const certified = fichaApprentices.filter(a => a.evaluationResult?.passed).length;
  const inProgress = fichaApprentices.filter(a => !a.evaluationResult && a.modulesCompleted.length > 0).length;

  const visualCount = fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Visual').length;
  const auditoryCount = fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Auditivo').length;
  const kinestheticCount = fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Kinestésico').length;
  const readingCount = fichaApprentices.filter(a => a.characterization?.dominantLearningStyle === 'Lecto-Escritor').length;

  const supportCount = fichaApprentices.filter(a => a.characterization?.requiresEconomicSupport).length;
  const digitalGapCount = fichaApprentices.filter(a => 
    a.characterization?.primaryDevice === 'Teléfono inteligente (Smartphone)' ||
    a.characterization?.primaryDevice === 'Sin equipo propio (Depende de salas SENA / Café internet)' ||
    a.characterization?.internetConnection?.includes('Datos móviles') ||
    a.characterization?.internetConnection?.includes('Sin conexión continua')
  ).length;

  const statsValues = [
    ['Indicador Institucional', 'Valor Absoluto', 'Porcentaje / Detalle'],
    ['Ficha SENA', ficha.id, ficha.programName],
    ['Centro de Formación', ficha.centerName, ficha.regionalName],
    ['Total Aprendices en Cohorte', total, '100% de la ficha'],
    ['Aprendices Caracterizados', characterized, total > 0 ? `${Math.round((characterized / total) * 100)}%` : '0%'],
    ['Aprendices Certificados (Aprobados)', certified, total > 0 ? `${Math.round((certified / total) * 100)}%` : '0%'],
    ['Aprendices en Progreso de Inducción', inProgress, total > 0 ? `${Math.round((inProgress / total) * 100)}%` : '0%'],
    ['Estilo Predominante: Visual', visualCount, characterized > 0 ? `${Math.round((visualCount / characterized) * 100)}%` : '0%'],
    ['Estilo Predominante: Auditivo', auditoryCount, characterized > 0 ? `${Math.round((auditoryCount / characterized) * 100)}%` : '0%'],
    ['Estilo Predominante: Kinestésico', kinestheticCount, characterized > 0 ? `${Math.round((kinestheticCount / characterized) * 100)}%` : '0%'],
    ['Estilo Predominante: Lecto-Escritor', readingCount, characterized > 0 ? `${Math.round((readingCount / characterized) * 100)}%` : '0%'],
    ['Aprendices con Brecha Digital / Sin PC Propio', digitalGapCount, characterized > 0 ? `${Math.round((digitalGapCount / characterized) * 100)}%` : '0%'],
    ['Solicitudes de Apoyo de Sostenimiento (FIC / Transporte)', supportCount, characterized > 0 ? `${Math.round((supportCount / characterized) * 100)}%` : '0%'],
    ['Fecha de Última Sincronización', new Date().toLocaleDateString('es-CO'), new Date().toLocaleTimeString('es-CO')]
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Estadisticas_Cohorte!A1:C${statsValues.length}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `Estadisticas_Cohorte!A1:C${statsValues.length}`,
        majorDimension: 'ROWS',
        values: statsValues
      })
    }
  );
};
