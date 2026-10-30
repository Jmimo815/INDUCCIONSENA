import { 
  RegulationChapter, 
  RegulationProhibition, 
  RegulationArticle 
} from '../types/induction';

/**
 * COMPENDIO OFICIAL Y DETALLADO DEL ACUERDO 0009 DE 2024
 * (Adoptado el 5 de noviembre de 2024 por el Consejo Directivo Nacional del SENA)
 * Con la reforma del Artículo 48 efectuada mediante el ACUERDO 2 DE 2026 (10 de marzo de 2026).
 */

export const ACUERDO_0009_CHAPTERS: RegulationChapter[] = [
  {
    number: 1,
    romanNumeral: "I",
    title: "Principios, Naturaleza y Ámbito de Aplicación",
    articleRange: "Artículos 1 al 5",
    description: "Establece el marco de derecho, los fines pedagógicos, el alcance territorial y las modalidades de formación profesional integral que rigen al SENA.",
    coreHighlights: [
      "Aplicación obligatoria en las 33 regionales y 118 centros del país.",
      "Cubre modalidades presenciales, virtuales, a distancia y combinadas.",
      "Garantía de dignidad humana, igualdad, justicia social, ecológica y gratuidad.",
      "Define la condición jurídica de Aprendiz SENA desde la matrícula formal activa."
    ],
    articles: [
      {
        number: 1,
        title: "Objeto y Naturaleza del Reglamento",
        summary: "Determinar las pautas de convivencia, los derechos, deberes y garantías formativas de los aprendices.",
        fullText: "El presente Reglamento tiene por objeto regular la relación formativa entre el Servicio Nacional de Aprendizaje SENA y sus aprendices, garantizando el pleno ejercicio de sus derechos, el cumplimiento de deberes y la vivencia de principios éticos que propendan por la excelencia técnica y el desarrollo humano integral.",
        chapterNumber: 1,
        chapterTitle: "Principios, Naturaleza y Ámbito de Aplicación",
        tags: ["Objeto", "Reglamento", "Naturaleza", "Convivencia"],
        practicalImplication: "Es la norma rectora suprema que rige toda tu vida académica y disciplinaria dentro de la institución."
      },
      {
        number: 2,
        title: "Ámbito de Aplicación",
        summary: "Rige para todos los aprendices del SENA en todas las modalidades y centros del país.",
        fullText: "Las disposiciones consagradas en el presente estatuto se aplican a todas las personas matriculadas en los programas de formación profesional integral impartidos por el SENA en sus distintas modalidades: presencial, virtual, a distancia y formación combinada, en todas las sedes y ambientes de aprendizaje del territorio nacional y en el exterior cuando aplique.",
        chapterNumber: 1,
        chapterTitle: "Principios, Naturaleza y Ámbito de Aplicación",
        tags: ["Ámbito", "Virtual", "Presencial", "Sedes"],
        practicalImplication: "Tanto si estudias en una sede presencial como 100% virtual en Zajuna, el reglamento te ampara y te exige por igual."
      },
      {
        number: 3,
        title: "Principios Orientadores",
        summary: "Dignidad, libertad de pensamiento, equidad, no discriminación y justicia social y ambiental.",
        fullText: "La formación profesional en el SENA se fundamenta en el respeto irrestricto a la dignidad humana, la libertad de pensamiento y opinión, la equidad de género, la inclusión de poblaciones vulnerables, la justicia social, el cuidado ambiental y el fomento de la paz a través del trabajo digno y calificado.",
        chapterNumber: 1,
        chapterTitle: "Principios, Naturaleza y Ámbito de Aplicación",
        tags: ["Principios", "Dignidad", "Inclusión", "Paz"],
        practicalImplication: "Ningún aprendiz o funcionario puede ser discriminado ni menoscabado en sus convicciones u origen social."
      },
      {
        number: 4,
        title: "Comunidad Educativa del SENA",
        summary: "Conformación de los actores que integran el ecosistema de formación del SENA.",
        fullText: "La comunidad educativa del SENA está integrada por los aprendices matriculados, los instructores, los directivos, los profesionales de apoyo a la formación, los coordinadores académicos, el personal administrativo y los egresados vinculados al desarrollo institucional.",
        chapterNumber: 1,
        chapterTitle: "Principios, Naturaleza y Ámbito de Aplicación",
        tags: ["Comunidad", "Actores", "Instructores", "Egresados"],
        practicalImplication: "El trabajo formativo es colaborativo y armónico entre aprendices, instructores y directivas de centro."
      },
      {
        number: 5,
        title: "Condición y Calidad de Aprendiz",
        summary: "Nacimiento y vigencia de la calidad de aprendiz mediante el acto de matrícula.",
        fullText: "Se adquiere la calidad de aprendiz del SENA una vez se legaliza la matrícula en el programa para el cual fue admitido, y se conserva hasta la obtención de la certificación o titulación respectiva, o hasta cuando sobrevenga cancelación de matrícula o retiro formal de acuerdo con los trámites reglamentarios.",
        chapterNumber: 1,
        chapterTitle: "Principios, Naturaleza y Ámbito de Aplicación",
        tags: ["Calidad de Aprendiz", "Matrícula", "Vigencia", "Titulación"],
        practicalImplication: "Tus derechos y deberes nacen el primer día de matrícula y concluyen al graduarte o retirarte formalmente."
      }
    ]
  },
  {
    number: 2,
    romanNumeral: "II",
    title: "Derechos del Aprendiz SENA",
    articleRange: "Artículos 6 al 8",
    description: "Consagra el catálogo inalienable de derechos formativos, de bienestar, representación, salud ocupacional y debido proceso.",
    coreHighlights: [
      "Derecho a formación integral de alta calidad técnica y pedagógica.",
      "Retroalimentación oportuna de evaluaciones en máximo cinco (5) días hábiles.",
      "Acceso prioritario a Bienestar al Aprendiz, apoyos FIC y sostenimiento.",
      "Garantía plena de legítima defensa, presunción de inocencia y segundo calificador."
    ],
    articles: [
      {
        number: 6,
        title: "Naturaleza de los Derechos",
        summary: "Los derechos del aprendiz son fundamentales, irrenunciables y de protección institucional.",
        fullText: "El aprendiz goza de todos los derechos fundamentales consagrados en la Constitución Política de Colombia, las leyes de la República y el presente Reglamento. La institución vela activamente por su efectividad, creando condiciones pedagógicas idóneas para su pleno desarrollo.",
        chapterNumber: 2,
        chapterTitle: "Derechos del Aprendiz SENA",
        tags: ["Constitución", "Garantías", "Derechos"],
        practicalImplication: "Tus derechos no pueden ser vulnerados ni condicionados arbitrariamente por ninguna autoridad del Centro."
      },
      {
        number: 7,
        title: "Derechos Académicos y de Formación",
        summary: "Acceso a inducción, ambientes idóneos, retroalimentación en 5 días y revisión de calificaciones.",
        fullText: "Son derechos formativos: 1. Recibir inducción oportuna. 2. Disponer de ambientes y herramientas actualizadas. 3. Conocer previamente guías y rúbricas. 4. Recibir retroalimentación y juicios evaluativos en un término máximo de 5 días hábiles siguientes a la entrega. 5. Solicitar respetuosamente revisión de evidencias y designación de un segundo calificador ante desacuerdo fundado.",
        chapterNumber: 2,
        chapterTitle: "Derechos del Aprendiz SENA",
        tags: ["Retroalimentación", "5 Días", "Segundo Calificador", "Inducción"],
        practicalImplication: "Si no recibes tus notas o comentarios a tiempo, puedes invocar respetuosamente el Artículo 7 ante tu instructor y coordinación."
      },
      {
        number: 8,
        title: "Derechos de Bienestar, Participación y Debido Proceso",
        summary: "Uso de servicios de bienestar, postulación a apoyos, libre expresión y garantías de defensa.",
        fullText: "Son derechos de bienestar y procedimentales: 1. Acceder a los servicios y programas de salud, deporte, cultura y apoyos socioeconómicos de Bienestar. 2. Elegir y ser elegido democráticamente vocero o representante. 3. Conocer cualquier informe en su contra antes de sesiones de comités. 4. Rendir descargos y aportar pruebas. 5. Ser asistido por el vocero de ficha o representante en comités.",
        chapterNumber: 2,
        chapterTitle: "Derechos del Aprendiz SENA",
        tags: ["Bienestar", "Apoyos", "Elegir", "Debido Proceso"],
        practicalImplication: "Nadie puede sancionarte sin antes citarte formalmente y permitirte presentar descargos y pruebas con tu vocero."
      }
    ]
  },
  {
    number: 3,
    romanNumeral: "III",
    title: "Deberes del Aprendiz SENA",
    articleRange: "Artículo 9 (Numerales 1 al 20)",
    description: "Establece las responsabilidades éticas, académicas, de seguridad y convivencia que asume cada aprendiz matriculado.",
    coreHighlights: [
      "Porte permanente y visible del carné institucional.",
      "Puntualidad y asistencia obligatoria a la ruta de formación.",
      "Justificación de inasistencias en máximo tres (3) días hábiles con soportes válidos.",
      "Uso obligatorio de Elementos de Protección Personal (EPP) y respeto al Código de Integridad."
    ],
    articles: [
      {
        number: 9,
        title: "Deberes del Aprendiz SENA",
        summary: "Conjunto integral de responsabilidades académicas, disciplinarias, de seguridad y representatividad.",
        fullText: "El aprendiz asume los siguientes deberes fundamentales: 1. Portar permanentemente el carné visible. 2. Asistir puntual a sesiones presenciales y virtuales. 3. Justificar inasistencias en máximo 3 días hábiles. 4. Entregar evidencias auténticas sin plagio. 5. Usar uniforme y EPP según exigencias del taller. 6. Cuidar bienes, equipos y software del SENA. 7. Tratar con dignidad a instructores y compañeros. 8. Respetar los canales oficiales de comunicación institucional.",
        chapterNumber: 3,
        chapterTitle: "Deberes del Aprendiz SENA",
        tags: ["Deberes", "Asistencia", "Carné", "EPP", "Honestidad"],
        practicalImplication: "Cumplir tus deberes es el requisito para mantener tu matrícula activa, conservar apoyos y graduarte con éxito."
      }
    ]
  },
  {
    number: 4,
    romanNumeral: "IV",
    title: "Prohibiciones Expresas del Aprendiz",
    articleRange: "Artículo 10 (Numerales 1 al 22)",
    description: "Tipifica las conductas incompatibles con la formación profesional integral que constituyen faltas disciplinarias o académicas.",
    coreHighlights: [
      "Prohibición de armas, sustancias psicoactivas y bebidas alcohólicas en los centros.",
      "Tolerancia cero con el acoso, ciberacoso, agresión física o verbal y discriminación.",
      "Sanción severa al plagio, fraude en evaluaciones o suplantación de identidad.",
      "Prohibición de alterar firmas, calificaciones, plataformas informáticas o dañar infraestructura."
    ],
    articles: [
      {
        number: 10,
        title: "Prohibiciones Expresas",
        summary: "Catálogo de conductas prohibidas que dan lugar a investigaciones disciplinarias y comités.",
        fullText: "Se prohíbe taxativamente a los aprendices: 1. Ingresar o portar armas u objetos peligrosos. 2. Ingresar, consumir o comercializar alcohol o drogas. 3. Cometer fraude, plagio o suplantación en pruebas o evidencias. 4. Agredir física, verbal o virtualmente a miembros de la comunidad. 5. Alterar registros de asistencia o notas en SofiaPlus/Zajuna. 6. Usar el nombre del SENA para beneficio personal no autorizado. 7. Obstaculizar el normal desarrollo de actividades formativas.",
        chapterNumber: 4,
        chapterTitle: "Prohibiciones Expresas del Aprendiz",
        tags: ["Prohibiciones", "Armas", "Alcohol", "Plagio", "Bullying"],
        practicalImplication: "Incurrir en estas conductas activa de inmediato la ruta sancionatoria y puede derivar en cancelación de matrícula."
      }
    ]
  },
  {
    number: 5,
    romanNumeral: "V",
    title: "Representación, Vocerías y Liderazgo",
    articleRange: "Artículos 11 al 18",
    description: "Regula los mecanismos democráticos de elección, funciones y responsabilidades de los voceros de ficha y representantes de centro.",
    coreHighlights: [
      "Elección democrática del vocero de grupo durante el primer mes de formación.",
      "Funciones de puente de comunicación concertada entre aprendices e instructores.",
      "Acompañamiento del vocero en comités de evaluación para respaldar a sus compañeros.",
      "Elección anual del Representante de Aprendices del Centro de Formación mediante votación electrónica general."
    ],
    articles: [
      {
        number: 11,
        title: "Naturaleza de la Representatividad",
        summary: "Espacios democráticos de participación y vocería estudiantil en la toma de decisiones.",
        fullText: "El SENA garantiza y promueve el derecho a la participación democrática mediante la figura de los Voceros de Ficha y los Representantes de Aprendices del Centro de Formación, quienes son líderes formativos y canales de articulación con las directivas.",
        chapterNumber: 5,
        chapterTitle: "Representación, Vocerías y Liderazgo",
        tags: ["Democracia", "Vocero", "Representante", "Liderazgo"],
        practicalImplication: "Tienes el derecho de participar en elecciones y postularte para representar los intereses de tu grupo."
      },
      {
        number: 12,
        title: "Elección y Funciones del Vocero de Ficha",
        summary: "Elegido por votación simple en cada grupo durante el primer mes de formación.",
        fullText: "Cada ficha elige un vocero principal y un suplente. Sus funciones son: 1. Promover el cumplimiento del reglamento. 2. Presentar inquietudes académicas concertadas ante instructores y coordinadores. 3. Asistir con voz y voto al Comité de Centro y acompañar a aprendices citados al Comité de Evaluación y Seguimiento.",
        chapterNumber: 5,
        chapterTitle: "Representación, Vocerías y Liderazgo",
        tags: ["Vocero de Ficha", "Funciones", "Acompañamiento", "Comité"],
        practicalImplication: "Tu vocero te representa ante quejas colectivas y te acompaña obligatoriamente si eres citado a descargos."
      },
      {
        number: 13,
        title: "Representante de Aprendices del Centro",
        summary: "Líder institucional electo anualmente por todos los aprendices del Centro de Formación.",
        fullText: "Es el aprendiz elegido democráticamente por votación secreta y universal en el Centro de Formación para un periodo de un (1) año. Es miembro del Comité Directivo del Centro y vocero de la totalidad de las fichas en jornadas diurnas, mixtas, nocturnas y virtuales.",
        chapterNumber: 5,
        chapterTitle: "Representación, Vocerías y Liderazgo",
        tags: ["Representante de Centro", "Votación", "Periodo Anual", "Comité Directivo"],
        practicalImplication: "Canaliza las necesidades generales de infraestructura, bienestar y calidad educativa de todo el Centro."
      }
    ]
  },
  {
    number: 6,
    romanNumeral: "VI",
    title: "Trámites Académico-Administrativos",
    articleRange: "Artículos 19 al 27",
    description: "Normativa sobre novedades de matrícula: traslados, aplazamientos, reingresos, retiros voluntarios y deserción.",
    coreHighlights: [
      "Traslados posibles tras cursar y aprobar como mínimo el primer trimestre.",
      "Aplazamiento de hasta 6 meses (técnicos) y 1 año (tecnólogos) por fuerza mayor justificada.",
      "Retiro voluntario formal con paz y salvo genera 6 meses de espera en SofiaPlus.",
      "Deserción configurada con 3 días hábiles consecutivos de inasistencia injustificada."
    ],
    articles: [
      {
        number: 19,
        title: "Novedades de Formación en Sistemas de Información",
        summary: "Toda modificación en la matrícula debe radicarse formalmente en el sistema oficial.",
        fullText: "Las solicitudes de novedades académicas y administrativas deben ser tramitadas por el aprendiz a través del sistema SofiaPlus o radicación oficial ante la Coordinación Académica, cumpliendo los requisitos y plazos estipulados para cada figura.",
        chapterNumber: 6,
        chapterTitle: "Trámites Académico-Administrativos",
        tags: ["Novedades", "SofiaPlus", "Radicación", "Trámites"],
        practicalImplication: "Ninguna solicitud verbal o por chat es válida; debe constar por escrito en el aplicativo institucional."
      },
      {
        number: 21,
        title: "Aplazamiento de la Formación",
        summary: "Desvinculación temporal por caso fortuito, enfermedad, servicio militar o trabajo.",
        fullText: "El aprendiz puede solicitar aplazamiento formal por motivos justificados: enfermedad prolongada, fuerza mayor, servicio militar o cambio laboral incompatible. El plazo máximo es de 6 meses para técnicos y hasta 1 año para tecnólogos.",
        chapterNumber: 6,
        chapterTitle: "Trámites Académico-Administrativos",
        tags: ["Aplazamiento", "Fuerza Mayor", "Incapacidad", "Términos"],
        practicalImplication: "Si tienes una eventualidad grave, solicita aplazamiento a tiempo para no perder tu cupo ni ser sancionado por deserción."
      },
      {
        number: 24,
        title: "Deserción del Proceso Formativo",
        summary: "Abandono injustificado del programa de formación con sanción en el sistema.",
        fullText: "Se declara la deserción cuando: 1. El aprendiz acumula tres (3) días hábiles consecutivos de inasistencia injustificada. 2. Transcurren 2 años tras culminar la etapa lectiva sin iniciar etapa productiva. 3. Vencido el término de aplazamiento no solicita el reingreso formal.",
        chapterNumber: 6,
        chapterTitle: "Trámites Académico-Administrativos",
        tags: ["Deserción", "3 Días", "Inasistencia", "2 Años"],
        practicalImplication: "Nunca dejes de asistir sin avisar. 3 días de inasistencia sin soporte activan de inmediato la cancelación de matrícula."
      },
      {
        number: 25,
        title: "Procedimiento de Deserción y Notificación",
        summary: "Requerimiento previo por correo electrónico institucional con 5 días hábiles para responder.",
        fullText: "Detectada la causal de inasistencia, el Centro enviará citación o requerimiento al correo electrónico institucional del aprendiz, otorgándole cinco (5) días hábiles para que justifique su ausencia. Si no comparece o no acredita justa causa, el Subdirector declara la deserción mediante resolución con inhabilidad de 6 meses.",
        chapterNumber: 6,
        chapterTitle: "Trámites Académico-Administrativos",
        tags: ["Citación", "5 Días Hábiles", "Resolución", "Inhabilidad"],
        practicalImplication: "Revisa siempre tu correo @misena.edu.co para contestar dentro de los 5 días de plazo legal."
      }
    ]
  },
  {
    number: 7,
    romanNumeral: "VII",
    title: "Desarrollo de la Etapa Productiva",
    articleRange: "Artículos 28 al 35",
    description: "Marco legal de la práctica formativa en el sector productivo: modalidades, registro en SGVA, bitácoras y evaluación.",
    coreHighlights: [
      "Complemento práctico obligatorio e indispensable para la certificación técnica o tecnológica.",
      "Cinco alternativas: Contrato de Aprendizaje, Proyecto Productivo SENNOVA, Vínculo Laboral, Pasantía y Monitorías.",
      "Afiliación obligatoria a Riesgos Laborales (ARL) y Seguridad Social en Salud (EPS).",
      "Seguimiento concertado con instructor mediante visitas presenciales/virtuales y bitácoras."
    ],
    articles: [
      {
        number: 28,
        title: "Naturaleza de la Etapa Productiva",
        summary: "Aplicación real de competencias en entornos laborales reales del sector productivo.",
        fullText: "La Etapa Productiva es el periodo en el cual el aprendiz aplica, complementa, fortalece y consolida sus competencias técnicas y humanas en situaciones reales de trabajo, orientada a la resolución de problemas en el entorno empresarial o social.",
        chapterNumber: 7,
        chapterTitle: "Desarrollo de la Etapa Productiva",
        tags: ["Etapa Productiva", "Práctica", "Competencias", "Certificación"],
        practicalImplication: "Es un requisito obligatorio sin el cual ningún aprendiz puede graduarse ni obtener su diploma SENA."
      },
      {
        number: 29,
        title: "Alternativas para el Desarrollo de la Etapa Productiva",
        summary: "Modalidades válidas reconocidas por el SENA para acreditar la etapa práctica.",
        fullText: "Son alternativas autorizadas: 1. Contrato de Aprendizaje (Ley 789/2002 con patrocinio y SGVA). 2. Proyecto Productivo o I+D+i SENNOVA / Fondo Emprender. 3. Vínculo Laboral o contractual afín al perfil. 4. Pasantía en entidades públicas, ONG o empresas. 5. Monitoría institucional en ambientes SENA.",
        chapterNumber: 7,
        chapterTitle: "Desarrollo de la Etapa Productiva",
        tags: ["Contrato de Aprendizaje", "Proyecto Productivo", "Pasantía", "Monitoría", "Vínculo Laboral"],
        practicalImplication: "Elige la alternativa que mejor se adapte a tu vocación laboral o emprendimiento con asesoría de tu coordinador."
      },
      {
        number: 30,
        title: "Seguimiento y Registro de Bitácoras",
        summary: "Diligenciamiento de bitácoras periódicas y visitas del instructor de seguimiento.",
        fullText: "El aprendiz debe concertar su plan de trabajo, registrar sus bitácoras de actividades en los tiempos fijados y atender las visitas de seguimiento que realiza el instructor asignado por el Centro de Formación para evaluar el progreso.",
        chapterNumber: 7,
        chapterTitle: "Desarrollo de la Etapa Productiva",
        tags: ["Bitácoras", "Instructor de Seguimiento", "Visitas", "Evaluación"],
        practicalImplication: "Sube tus bitácoras a tiempo para evitar bloqueos administrativos al momento de solicitar el grado."
      }
    ]
  },
  {
    number: 8,
    romanNumeral: "VIII",
    title: "Faltas Académicas y Disciplinarias",
    articleRange: "Artículos 36 al 40",
    description: "Tipificación, graduación y criterios para evaluar la gravedad de las infracciones a la formación y convivencia.",
    coreHighlights: [
      "Distinción clara entre Faltas Académicas (evidencias/conocimiento) y Faltas Disciplinarias (conducta/bienes/personas).",
      "Clasificación jerárquica en Leves, Graves y Gravísimas.",
      "Criterios de valoración: grado de dolo o culpa, daño patrimonial, impacto social y reincidencia.",
      "Identificación de atenuantes (confesión espontánea, reparación) y agravantes (premeditación, porte de uniforme)."
    ],
    articles: [
      {
        number: 36,
        title: "Faltas Académicas",
        summary: "Incumplimiento en el desarrollo de competencias, entrega de evidencias o compromisos pedagógicos.",
        fullText: "Se configuran cuando el aprendiz no cumple con las actividades de aprendizaje, no presenta las evidencias requeridas, comete plagio o fraude en tareas, o incumple los planes de mejoramiento concertados con su equipo de instructores.",
        chapterNumber: 8,
        chapterTitle: "Faltas Académicas y Disciplinarias",
        tags: ["Falta Académica", "Evidencias", "Plagio", "Plan de Mejoramiento"],
        practicalImplication: "Afecta tu juicio evaluativo y requiere un plan pedagógico de nivelación con tu instructor."
      },
      {
        number: 37,
        title: "Faltas Disciplinarias",
        summary: "Infracción de deberes de convivencia, respeto a las personas, seguridad y bienes del Centro.",
        fullText: "Están relacionadas directamente con la conducta personal del aprendiz: agresiones verbales o físicas, desacato a órdenes legítimas, consumo o ingreso de sustancias prohibidas, daños a maquinaria o deshonra al buen nombre institucional.",
        chapterNumber: 8,
        chapterTitle: "Faltas Académicas y Disciplinarias",
        tags: ["Falta Disciplinaria", "Convivencia", "Respeto", "Bienes SENA"],
        practicalImplication: "Compromete tu permanencia en la institución y activa el Comité de Evaluación y Seguimiento."
      },
      {
        number: 38,
        title: "Criterios para Calificar la Gravedad de las Faltas",
        summary: "Elementos objetivos para graduar la falta como Leve, Grave o Gravísima.",
        fullText: "Para determinar si la falta es leve, grave o gravísima se evaluará: 1. Daño o perjuicio causado a la comunidad o bienes. 2. Grado de intencionalidad (dolo o culpa). 3. Reiteración o antecedentes en la hoja de vida del aprendiz. 4. Confusión o impacto en la convivencia pacífica.",
        chapterNumber: 8,
        chapterTitle: "Faltas Académicas y Disciplinarias",
        tags: ["Leve", "Grave", "Gravísima", "Criterios", "Dolo"],
        practicalImplication: "El comité analiza el contexto global antes de emitir una recomendación proporcionada a los hechos."
      }
    ]
  },
  {
    number: 9,
    romanNumeral: "IX",
    title: "Medidas Formativas y Sanciones Disciplinarias",
    articleRange: "Artículos 41 al 46",
    description: "Catálogo de respuestas pedagógicas preventivas y sanciones administrativas dictadas por la Subdirección.",
    coreHighlights: [
      "Primacía del enfoque restaurativo y pedagógico antes de aplicar sanciones punitivas.",
      "Llamados de atención verbal y escrito con copia a hoja de vida como medidas correctivas.",
      "Plan de Mejoramiento: acuerdo vinculante con metas y plazos perentorios.",
      "Sanciones de Subdirección: Condicionamiento de matrícula y Cancelación de matrícula con inhabilidad."
    ],
    articles: [
      {
        number: 41,
        title: "Enfoque Pedagógico y Restaurativo",
        summary: "Las medidas buscan corregir la conducta y recuperar la ruta formativa del aprendiz.",
        fullText: "Las medidas formativas son acciones pedagógicas orientadas a que el aprendiz tome conciencia de sus errores, asuma la responsabilidad ética y restablezca su compromiso con la excelencia técnica y la convivencia armónica.",
        chapterNumber: 9,
        chapterTitle: "Medidas Formativas y Sanciones Disciplinarias",
        tags: ["Pedagógico", "Restaurativo", "Formación", "Ética"],
        practicalImplication: "El objetivo del SENA nunca es castigar, sino formar integralmente trabajadores honestos y competentes."
      },
      {
        number: 42,
        title: "Llamados de Atención Pedagógicos",
        summary: "Medida formativa verbal o escrita ante faltas leves o llamados iniciales de atención.",
        fullText: "El instructor o coordinador puede realizar un llamado de atención verbal ante faltas leves. Si la conducta persiste o es reiterada, se emite llamado de atención escrito con constancia en la hoja de vida académica del aprendiz en el sistema.",
        chapterNumber: 9,
        chapterTitle: "Medidas Formativas y Sanciones Disciplinarias",
        tags: ["Llamado de Atención", "Verbal", "Escrito", "Hoja de Vida"],
        practicalImplication: "Es una alerta temprana para corregir el rumbo antes de que el caso escale a un comité de evaluación."
      },
      {
        number: 43,
        title: "Plan de Mejoramiento Concertado",
        summary: "Acuerdo académico o disciplinario con actividades y fechas específicas de entrega.",
        fullText: "Es una medida académica o disciplinaria de concertación que formula el instructor o el Comité de Evaluación. Fija metas específicas y un plazo límite para que el aprendiz subsane las falencias o evidencias pendientes.",
        chapterNumber: 9,
        chapterTitle: "Medidas Formativas y Sanciones Disciplinarias",
        tags: ["Plan de Mejoramiento", "Metas", "Nivelación", "Plazos"],
        practicalImplication: "Si te asignan un plan de mejoramiento, cúmplelo al 100% en la fecha fijada para no incurrir en falta grave."
      },
      {
        number: 44,
        title: "Sanciones Disciplinarias de Subdirección",
        summary: "Condicionamiento o cancelación de matrícula dictada exclusivamente por el Subdirector.",
        fullText: "Son sanciones de orden administrativo: 1. Condicionamiento de la matrícula (última oportunidad sujeta a intachable conducta). 2. Cancelación de la matrícula con inhabilidad para ingresar al SENA por un periodo de seis (6) meses hasta dos (2) años según la gravedad de la falta.",
        chapterNumber: 9,
        chapterTitle: "Medidas Formativas y Sanciones Disciplinarias",
        tags: ["Sanciones", "Condicionamiento", "Cancelación de Matrícula", "Inhabilidad"],
        practicalImplication: "Solo el Subdirector del Centro tiene competencia legal para dictar una sanción de matrícula."
      }
    ]
  },
  {
    number: 10,
    romanNumeral: "X",
    title: "Debido Proceso y Comité de Evaluación (Art. 48 Modificado 2026)",
    articleRange: "Artículos 47 al 55",
    description: "Garantías procesales, citación digital, descargos, comités de evaluación y recursos legales de reposición.",
    coreHighlights: [
      "Aplicación obligatoria del debido proceso consagrado en el Artículo 29 de la Constitución Nacional.",
      "Artículo 48 (Actualizado por Acuerdo 2 de 2026): Notificación digital a @misena con 3-5 días hábiles con informe de cargos.",
      "Derecho irrenunciable a ser asistido por el vocero de ficha o representante de aprendices del Centro.",
      "Actas digitales unificadas y Recurso de Reposición en cinco (5) días hábiles ante el Subdirector de Centro."
    ],
    articles: [
      {
        number: 47,
        title: "Garantías Fundamentales del Debido Proceso",
        summary: "Presunción de inocencia, contradicción, derecho a la defensa y doble instancia.",
        fullText: "En todas las actuaciones disciplinarias y académicas se garantizará la presunción de inocencia, el derecho a conocer los hechos y pruebas, la posibilidad de rendir descargos y la resolución motivada en derecho por autoridad competente.",
        chapterNumber: 10,
        chapterTitle: "Debido Proceso y Comité de Evaluación",
        tags: ["Debido Proceso", "Presunción de Inocencia", "Defensa", "Legalidad"],
        practicalImplication: "No existe ninguna sanción sin previo proceso, descargos y notificación formal."
      },
      {
        number: 48,
        title: "Comité de Evaluación y Seguimiento (Reformado por Acuerdo 2 de 2026)",
        summary: "Procedimiento unificado, citación digital anticipada, presencia del vocero y prevalencia formativa.",
        fullText: "Órgano consultivo colegiado de Centro. Conforme al Acuerdo 2 del 10 de marzo de 2026: 1. La citación debe remitirse al correo institucional (@misena.edu.co) con mínimo 3 a 5 días hábiles de antelación, adjuntando el pliego de cargos. 2. El aprendiz comparecerá asistido por el vocero de ficha o representante. 3. Podrá presentar descargos verbales o escritos y aportar pruebas. 4. El comité priorizará recomendaciones formativas y consignará sus conclusiones en Acta Digital Estandarizada.",
        chapterNumber: 10,
        chapterTitle: "Debido Proceso y Comité de Evaluación",
        is2026Amended: true,
        tags: ["Artículo 48", "Acuerdo 2 de 2026", "Comité de Evaluación", "Descargos", "Acta Digital"],
        practicalImplication: "Es tu máxima garantía institucional. Tienes derecho a ser escuchado con tu vocero y aportar todas las pruebas a tu favor."
      },
      {
        number: 49,
        title: "Acto Administrativo Motivado de Subdirección",
        summary: "Resolución oficial expedida por el Subdirector de Centro que resuelve el caso.",
        fullText: "Con base en la recomendación del Comité de Evaluación y el acervo probatorio, el Subdirector de Centro expedirá dentro de los términos legales la Resolución debidamente motivada que ordene el archivo, plan de mejoramiento o sanción correspondiente.",
        chapterNumber: 10,
        chapterTitle: "Debido Proceso y Comité de Evaluación",
        tags: ["Resolución", "Subdirector", "Acto Administrativo", "Motivación"],
        practicalImplication: "Toda decisión debe fundamentarse en pruebas fehacientes y normas del reglamento."
      },
      {
        number: 51,
        title: "Recurso de Reposición",
        summary: "Plazo legal de cinco (5) días hábiles tras la notificación para controvertir la sanción.",
        fullText: "Contra la resolución de Subdirección que imponga sanción de condicionamiento o cancelación de matrícula, procede únicamente el Recurso de Reposición, el cual deberá interponerse por escrito dentro de los cinco (5) días hábiles siguientes a la fecha de notificación formal.",
        chapterNumber: 10,
        chapterTitle: "Debido Proceso y Comité de Evaluación",
        tags: ["Recurso de Reposición", "5 Días Hábiles", "Impugnación", "Defensa"],
        practicalImplication: "Si no estás de acuerdo con la sanción, radica tu escrito de reposición dentro de los 5 días hábiles ante la Subdirección."
      }
    ]
  }
];

export const ACUERDO_0009_PROHIBITIONS: RegulationProhibition[] = [
  {
    id: "proh-01",
    number: 1,
    title: "Porte de Armas y Objetos Peligrosos",
    conduct: "Ingresar, portar o almacenar armas de fuego, armas blancas, artefactos explosivos o cualquier elemento contundente que atente contra la integridad física de las personas.",
    gravity: "Gravísima",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 1",
    consequences: "Cancelación inmediata de matrícula con remisión del caso a las autoridades de Policía Nacional.",
    preventionAdvice: "Los Centros SENA son zonas de paz y convivencia desarmada."
  },
  {
    id: "proh-02",
    number: 2,
    title: "Consumo o Venta de Alcohol y Sustancias Psicoactivas",
    conduct: "Ingresar, comercializar, portar o consumir bebidas alcohólicas, estupefacientes o sustancias alucinógenas dentro de las sedes del SENA o en actividades formativas externas.",
    gravity: "Gravísima",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 2",
    consequences: "Cancelación de matrícula e inhabilidad para inscribirse a cualquier programa del SENA de 1 a 2 años.",
    preventionAdvice: "Entornos 100% libres de humo, alcohol y sustancias psicoactivas."
  },
  {
    id: "proh-03",
    number: 3,
    title: "Plagio, Fraude y Copia Académica",
    conduct: "Presentar como propios proyectos, códigos de software, diseños o tareas copiadas de internet o de terceros sin citar adecuadamente las fuentes conforme a normas académicas.",
    gravity: "Grave",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 5",
    consequences: "Juicio evaluativo Deficiente (D / No Aprobado), llamado de atención formal y remisión al Comité de Evaluación.",
    preventionAdvice: "Usa normas APA o IEEE y documenta tus repositorios con autoría original."
  },
  {
    id: "proh-04",
    number: 4,
    title: "Acoso, Ciberacoso y Agresiones (Bullying)",
    conduct: "Cualquier acto de violencia verbal, física, psicológica, acoso sexual o ciberacoso contra instructores, compañeros, aprendices o funcionarios por redes o canales institucionales.",
    gravity: "Gravísima",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 4",
    consequences: "Comité disciplinario extraordinario, medidas de protección a la víctima y cancelación de matrícula.",
    preventionAdvice: "Fomenta el diálogo respetuoso y reporta a Bienestar cualquier indicio de violencia."
  },
  {
    id: "proh-05",
    number: 5,
    title: "Suplantación de Identidad y Falseo de Documentos",
    conduct: "Firmar planillas por un compañero, presentar evaluaciones en nombre de otro o adulterar certificaciones médicas, firmas de paz y salvo o carnés institucionales.",
    gravity: "Gravísima",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 6",
    consequences: "Cancelación de matrícula e inhabilidad de hasta 2 años en el sistema por vulnerar la fe pública.",
    preventionAdvice: "Tu carné y usuario de SofiaPlus / Zajuna son personales e intransferibles."
  },
  {
    id: "proh-06",
    number: 6,
    title: "Sabotaje a Sistemas Informáticos del SENA",
    conduct: "Acceder sin autorización a servidores, alterar notas en SofiaPlus o Zajuna, vulnerar la red institucional o propagar software malicioso (malware) en ambientes de aprendizaje.",
    gravity: "Gravísima",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 8",
    consequences: "Cancelación de matrícula y denuncia penal ante la Fiscalía General de la Nación por delitos informáticos (Ley 1273 de 2009).",
    preventionAdvice: "Aplica tus competencias técnicas en ciberseguridad con ética y legalidad."
  },
  {
    id: "proh-07",
    number: 7,
    title: "Daño Intencional a Infraestructura y Maquinaria",
    conduct: "Deteriorar deliberadamente instalaciones, maquinaria de talleres, herramientas, computadores, cableado o mobiliario del Centro de Formación.",
    gravity: "Grave",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 10",
    consequences: "Reposición patrimonial del bien dañado y sanción disciplinaria de condicionamiento o cancelación.",
    preventionAdvice: "Cuida los recursos del Estado que financian la educación gratuita de miles de aprendices."
  },
  {
    id: "proh-08",
    number: 8,
    title: "Comercialización No Autorizada de Productos",
    conduct: "Vender alimentos, rifas, artículos comerciales o prestar servicios remunerados no autorizados en los ambientes de formación y pasillos del Centro.",
    gravity: "Leve",
    regulatoryArticle: "Capítulo IV, Artículo 10, Numeral 14",
    consequences: "Llamado de atención verbal y retiro inmediato de la mercancía no autorizada.",
    preventionAdvice: "Para iniciativas de emprendimiento comercial, postula al Fondo Emprender o ferias de Bienestar."
  }
];

export const DUE_PROCESS_STAGES_2026 = [
  {
    step: 1,
    title: "Informe o Queja Motivada",
    responsible: "Instructor líder, directivo o miembro de la comunidad",
    legalTerm: "Inmediato tras ocurrir la presunta falta",
    description: "Se redacta el informe pormenorizado de los hechos con los soportes probatorios (planillas, pantallazos de Zajuna, dictámenes técnicos o testimonios) y se radica ante la Coordinación Académica.",
    guarantees: "Claridad en los hechos imputados y reserva procesal."
  },
  {
    step: 2,
    title: "Citación Oficial Digital / Escrita",
    responsible: "Coordinación Académica del Centro",
    legalTerm: "Antelación mínima de 3 a 5 días hábiles a la sesión",
    description: "Regulado por el Acuerdo 2 de 2026 (Art. 48). Se remite la citación formal al correo institucional (@misena.edu.co) y físico si aplica, adjuntando copia del informe y pruebas para que prepare su defensa.",
    guarantees: "Notificación previa, derecho al tiempo suficiente para estructurar argumentos y contactar a su vocero."
  },
  {
    step: 3,
    title: "Audiencia del Comité de Evaluación y Seguimiento",
    responsible: "Comité de Centro con asistencia del Aprendiz y su Vocero",
    legalTerm: "Día y hora señalados en la citación oficial",
    description: "Sesión donde se lee el pliego de cargos. El aprendiz rinde sus descargos orales o escritos, aporta contrapruebas y testimonios, respaldado por el Vocero de Ficha o Representante de Aprendices.",
    guarantees: "Derecho a ser escuchado, contradicción probatoria, asistencia del vocero de grupo y trato digno."
  },
  {
    step: 4,
    title: "Deliberación y Acta Digital Unificada",
    responsible: "Miembros del Comité de Evaluación",
    legalTerm: "Máximo 3 días hábiles posteriores a la sesión",
    description: "El comité analiza la conducta bajo los principios de proporcionalidad, presunción de inocencia y prevalencia pedagógica. Emite recomendación (archivo, plan de mejoramiento o sanción) en acta digital unificada.",
    guarantees: "Motivación técnica y jurídica, firma electrónica trazable en SofiaPlus / sistema institucional."
  },
  {
    step: 5,
    title: "Resolución Administrativa de Subdirección",
    responsible: "Subdirector del Centro de Formación",
    legalTerm: "Término legal de hasta 5 días hábiles tras recibir el acta",
    description: "El Subdirector expide la Resolución motivada que decide de fondo: archivar el proceso, imponer plan de mejoramiento pedagógico, condicionar la matrícula o cancelar la matrícula con inhabilidad.",
    guarantees: "Competencia privativa legal, acto administrativo formal con fundamento probatorio."
  },
  {
    step: 6,
    title: "Notificación Formal y Recurso de Reposición",
    responsible: "Centro de Formación y Aprendiz",
    legalTerm: "Cinco (5) días hábiles siguientes a la notificación",
    description: "Se notifica personalmente o por correo electrónico. Frente a la sanción, el aprendiz puede interponer por escrito el Recurso de Reposición para que el Subdirector aclare, modifique o revoque la decisión.",
    guarantees: "Doble revisión jurídica de los argumentos de defensa y firmeza del debido proceso."
  }
];
