# Sincronización Automática con Google Sheets y Google Drive en Inducción SENA

Sistema de persistencia institucional que conecta la plataforma de Inducción SENA con Google Drive y Google Sheets para crear automáticamente una hoja de cálculo centralizada por cohorte y sincronizar en tiempo real el registro sociodemográfico, estilos VAK, avance modular y calificaciones oficiales de los aprendices.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> A continuación se resumen las decisiones acordadas durante la fase de clarificación interactiva y los requerimientos arquitectónicos que norman esta integración:

- **Estrategia de Creación en Google Drive**: Se generará de forma 100% automática una hoja de cálculo institucional oficial en la cuenta de Google Drive autorizada (ej. `Induccion_SENA_Ficha_[ID]_[Programa]`), organizando la información en pestañas estructuradas.
- **Alcance de los Datos a Sincronizar**: La hoja consolidará la matriz integral: identificación oficial del aprendiz, perfil socioeconómico y tecnológico (equipo, conectividad), diagnóstico de estilos de aprendizaje VAK, estado de módulos cursados (0 al 6) y notas finales con código de certificación.
- **Responsable de la Conexión OAuth**: La vinculación se realizará desde el rol de **Instructor Líder** o **Directivo/Bienestar** mediante el flujo oficial de Google Workspace OAuth, sirviendo como canal seguro para toda la cohorte.
- **Flujo de Permisos OAuth**: Para activar la sincronización en Google Drive se invocará la herramienta oficial `set_up_oauth` solicitando los alcances mínimos estrictos (`drive.file` y `spreadsheets`).

---

## 1. Overview & Core Concept

- **Qué hace**: Permite al instructor o directivo autenticar su cuenta de Google institucional con un solo clic. El sistema crea automáticamente la hoja de cálculo `Acta e Inducción SENA - Ficha [ID]` en su Drive y mantiene actualizadas las filas a medida que cada aprendiz diligencia su caracterización, avanza en los módulos y presenta la evaluación.
- **Público objetivo**: Instructores líderes de ficha, coordinadores académicos y personal de Bienestar al Aprendiz del SENA que requieren consolidar actas de inducción sin digitación manual, garantizando trazabilidad y respaldo continuo.
- **Valor agregado**: Elimina la dispersión de datos, proporciona una auditoría en tiempo real en la nube de Google Workspace y cumple con los requerimientos del Acuerdo 0009 de 2024 y Acuerdo 2 de 2026.

---

## 2. User Experience & Visual Design

### Flujos Principales de Usuario

1. **Vinculación por el Instructor / Directivo**:
   - En el encabezado del *Panel del Instructor* o *Tablero Directivo*, el docente visualiza un widget limpio de estado: *"Google Drive: No conectado"*.
   - Al pulsar *"Vincular Google Drive y Sheets"*, se inicia la autorización oficial con Google Workspace.
   - El sistema crea la hoja institucional con encabezados formateados y guarda en memoria el identificador de la hoja (`spreadsheetId`) y enlace directo (`spreadsheetUrl`).
2. **Sincronización en Tiempo Real al Responder el Aprendiz**:
   - Cuando el aprendiz envía su **Caracterización** (datos sociodemográficos, conectividad, test VAK), el evento dispara un envío automático a la hoja de cálculo.
   - Al completar cada módulo y registrar la **Evaluación de Apropiación**, la fila del aprendiz se actualiza automáticamente con su puntaje porcentual, juicio de competencia (*APROBADO* / *NO COMPETENTE*) y código de certificado.
3. **Monitoreo y Respaldo Manual**:
   - En el panel del instructor se despliega un botón directo *"Abrir Hoja en Google Drive"* junto con un botón *"Forzar Sincronización Completa"* para refrescar la totalidad de la ficha cuando sea necesario.

### Identidad Visual y Estilo

- **Alineación SENA**: Estilo visual institucional con colores `#39A900` (verde SENA) y `#005e26` (verde oscuro), neutros pizarra (`slate-900` / `slate-100`) y acentos Google Workspace (Drive/Sheets).
- **Zero-Pill & Tipografía**: Etiquetas de estado tipográficas sin píldoras recargadas, indicadores de sincronización limpios con fecha y hora en formato tabular monospaciado (`tabular-nums font-mono`).
- **Retroalimentación en Tiempo Real**: Notificaciones toast discretas y estados de carga no bloqueantes mientras se ejecuta la llamada a la API de Google Sheets.

---

## 3. Key Product Decisions & Trade-Offs

- **Decisión 1: Creación automática vs. Enlace manual de hoja existente**
  - *Enfoque elegido*: Creación automática de la hoja con estructura institucional estándar preconfigurada (encabezados en verde SENA, filtros congelados, columnas ordenadas).
  - *Razón*: Evita errores humanos de tipeo o formateo en hojas en blanco y ahorra tiempo a los instructores.
- **Decisión 2: Alcance de permisos de Google Drive (`drive.file` vs `drive` completo)**
  - *Enfoque elegido*: Uso de `https://www.googleapis.com/auth/drive.file` y `https://www.googleapis.com/auth/spreadsheets`.
  - *Razón*: Principio de mínimo privilegio. La aplicación solo tiene acceso a las hojas creadas o abiertas explícitamente por ella, protegiendo el resto del Drive del usuario.
- **Decisión 3: Estructura de la hoja (Pestañas dedicadas)**
  - *Enfoque elegido*: Dos pestañas dentro del mismo libro:
    1. `Matriz_Induccion`: Datos consolidados por aprendiz (documento, nombre, contacto, estado, VAK, nota, certificado).
    2. `Ficha_Estadisticas`: Resumen ejecutivo de la cohorte (% aprobados, desglose VAK, brechas digitales).

---

## 4. Technical Architecture & Data Strategy

### Diagrama de Arquitectura y Flujo de Datos

```
┌────────────────────────────────────────────────────────────────────────┐
│                        INTERFAZ DE USUARIO (REACT)                     │
│                                                                        │
│   ┌─────────────────────┐   ┌─────────────────┐  ┌───────────────────┐ │
│   │ CharacterizationForm│   │ EvaluationQuiz  │  │InstructorDashboard│ │
│   └──────────┬──────────┘   └────────┬────────┘  └─────────┬─────────┘ │
│              │                       │                     │           │
│              ▼                       ▼                     │           │
│   ┌───────────────────────────────────────────┐            │           │
│   │         Induction State Store             │            │           │
│   │  (Apprentices, Fichas, Active Sessions)   │            │           │
│   └──────────────────────┬────────────────────┘            │           │
│                          │ Eventos de guardado             │           │
│                          ▼                                 ▼           │
│   ┌──────────────────────────────────────────────────────────────────┐ │
│   │                 GoogleSheetsSyncService                          │ │
│   │  - autoCreateSpreadsheetIfMissing()                              │ │
│   │  - syncApprenticeRow(apprenticeData)                             │ │
│   │  - syncFullCohort(allApprentices)                                │ │
│   └──────────────────────────────┬───────────────────────────────────┘ │
└──────────────────────────────────┼─────────────────────────────────────┘
                                   │ Bearer AccessToken
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     GOOGLE WORKSPACE CLOUD APIs                        │
│                                                                        │
│   ┌───────────────────────────┐      ┌───────────────────────────────┐ │
│   │ Google Drive API (v3)     │      │ Google Sheets API (v4)        │ │
│   │ - files.create (metadata) │      │ - spreadsheets.create         │ │
│   │ - files.get / permissions │      │ - values.append / values.update│ │
│   └───────────────────────────┘      └───────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Esquema de Columnas de la Hoja de Cálculo (`Matriz_Induccion`)

| Columna | Nombre del Campo | Descripción |
| :--- | :--- | :--- |
| **A** | Ficha | Código de ficha SENA (ej. 2824901) |
| **B** | Tipo Doc | C.C., T.I., C.E., etc. |
| **C** | Número Documento | Identificación oficial del aprendiz |
| **D** | Nombres y Apellidos | Nombre completo del aprendiz |
| **E** | Correo Electrónico | Correo institucional o personal |
| **F** | Teléfono | Teléfono de contacto |
| **G** | Caracterizado | Sí / No |
| **H** | Estilo VAK Dominante | Visual, Auditivo o Kinestésico |
| **I** | Dispositivo Principal | Computador portátil, Smartphone, etc. |
| **J** | Conectividad | Hogar (Banda ancha), Datos móviles, etc. |
| **K** | Apoyo Económico | Requiere apoyo / No requiere |
| **L** | Módulos Completados | Conteo de módulos apropiados (ej. 6/6) |
| **M** | Evaluación Presentada | Sí / No |
| **N** | Calificación (%) | Nota obtenida en porcentaje (ej. 90%) |
| **O** | Estado Final | APROBADO / NO COMPETENTE / PENDIENTE |
| **P** | Código Certificado | Código único de verificación SENA |
| **Q** | Fecha de Actualización | Marca temporal ISO/local |

---

## 5. Plan de Ejecución por Fases (Una vez aprobado)

1. **Paso 1: Configuración de Permisos OAuth**
   - Invocar la herramienta interactiva `set_up_oauth` con los scopes de Google Drive y Sheets (`drive.file` y `spreadsheets`).
   - Esperar confirmación de permisos del usuario en la interfaz.
2. **Paso 2: Servicio de Integración Google Sheets (`GoogleSheetsSyncService`)**
   - Crear el módulo de cliente para autenticación, creación de plantillas con encabezados institucionales, e inserción/actualización de filas mediante API REST v4 de Sheets.
3. **Paso 3: Interfaz de Control en Paneles de Instructor y Directivo**
   - Incorporar el botón y estado de conexión con Google Drive en el `InstructorDashboard` y `DirectivoDashboard`, con visualización del enlace directo a la hoja creada.
4. **Paso 4: Disparadores de Sincronización en Tiempo Real**
   - Conectar los eventos `onSaveCharacterization` y `onSaveEvaluationResult` en `App.tsx` para sincronizar automáticamente el registro del aprendiz en la hoja.
5. **Paso 5: Validación y Pruebas**
   - Validar con `lint_applet` y `compile_applet`, verificando la actualización reactiva y el flujo sin errores.
