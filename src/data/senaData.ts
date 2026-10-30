import {
  ApprenticeRight,
  ApprenticeDuty,
  ProcedureGuide,
  ProductiveStageOption,
  CaseStudy,
  EvaluationQuestion,
  FichaGroup,
  ApprenticeProfile,
  SenaValue
} from '../types/induction';

export * from './acuerdo0009Data';

export const SENA_FOUNDER_INFO = {
  founder: "Rodolfo Martínez Tono",
  year: 1957,
  decree: "Decreto Ley 118 del 21 de junio de 1957",
  history: "El SENA nació fruto de la iniciativa conjunta de los trabajadores organizados, los empresarios, la Iglesia Católica y la OIT. Su creador, el economista y abogado cartagenero Rodolfo Martínez Tono, soñó una institución que brindara capacitación técnica a la clase trabajadora colombiana para impulsar el desarrollo económico y social del país.",
  mission: "El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.",
  vision: "En el 2026, el SENA se consolidará como una entidad referente de formación integral para el trabajo y el desarrollo humano, con pertinencia, innovación y calidad, orientada a la transformación productiva, la justicia social, ambiental y el empleo digno.",
  motto: "El SENA es Colombia: Formación profesional integral para el trabajo y el desarrollo social."
};

export const SENA_REGULATION_INFO = {
  currentAgreement: "Acuerdo 0009 de 2024",
  latestAmendment: "Acuerdo 2 de 2026 (10 de marzo de 2026)",
  issueDate: "5 de noviembre de 2024 (Acuerdo base) · 10 de marzo de 2026 (Reforma Art. 48)",
  issuingEntity: "Consejo Directivo Nacional del SENA",
  status: "Vigente con actualizaciones de 2026",
  derogatedAgreements: "Acuerdo 007 de 2012, Acuerdo 02 de 2014, Acuerdo 06 de 2023 y Acuerdo 02 de 2024",
  officialTitle: "Reglamento del Aprendiz del Servicio Nacional de Aprendizaje SENA",
  legalBasis: "Acuerdo 0009 del 5 de noviembre de 2024 con la reforma procesal del Acuerdo 2 del 10 de marzo de 2026 expedidos por el Consejo Directivo Nacional",
  description: "Estatuto normativo vigente que consagra los principios, derechos, deberes, prohibiciones, trámites académicos y debido proceso disciplinario de los aprendices en formación profesional integral, incorporando las garantías reforzadas de 2026 para Comités de Evaluación y Seguimiento."
};

export const SENA_2026_UPDATES = {
  agreement: "Acuerdo 2 de 2026",
  date: "10 de marzo de 2026",
  targetArticle: "Artículo 48 del Acuerdo 0009 de 2024",
  subject: "Comités de Evaluación y Seguimiento, Debido Proceso y Digitalización Procesal",
  keyModifications: [
    {
      title: "Citación y Notificación Digital Fehaciente",
      description: "Las citaciones a comités deben enviarse formalmente al correo institucional (@misena.edu.co) y canales digitales oficiales con mínimo 3 a 5 días hábiles de anticipación, adjuntando el informe de cargos y las evidencias probatorias."
    },
    {
      title: "Garantías Reforzadas de Legítima Defensa",
      description: "El aprendiz tiene derecho inalienable a presentarse asistido por el vocero de ficha o el representante de aprendices del Centro, aportar pruebas técnicas, solicitar testimonios y presentar descargos orales o escritos."
    },
    {
      title: "Prevalencia Formativa y Planes de Mejoramiento",
      description: "El comité debe agotar prioritariamente medidas pedagógicas y planes de mejoramiento concertados antes de recomendar sanciones de cancelación de matrícula, privilegiando el derecho a la educación."
    },
    {
      title: "Trazabilidad Digital y Acta Estandarizada",
      description: "Las deliberaciones y recomendaciones se consignan en actas digitales unificadas firmadas electrónicamente y registradas en el aplicativo de gestión académica para garantizar transparencia y evitar dilaciones."
    },
    {
      title: "Recursos de Ley Clarificados",
      description: "Frente al acto administrativo del Subdirector de Centro que imponga sanción, procede el Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a su notificación formal."
    }
  ]
};

export const SENA_SYMBOLS = [
  {
    id: "escudo",
    name: "El Escudo del SENA",
    meaning: "Refleja los tres sectores económicos dentro de los cuales se ubica el accionar de la institución para el desarrollo nacional.",
    elements: [
      { name: "La Antorcha", description: "Símbolo de la luz del conocimiento, la sabiduría y la orientación profesional para el trabajo." },
      { name: "Rueda Dentada y Caduceo", description: "Representan el sector industrial (secundario) y el sector comercio y servicios (terciario)." },
      { name: "La Espiga de Café", description: "Representa el sector agropecuario y extractivo (primario), base fundacional de Colombia." }
    ],
    funFact: "El escudo fue concebido desde los primeros años de la fundación para honrar el esfuerzo de todos los sectores productivos."
  },
  {
    id: "bandera",
    name: "La Bandera del SENA",
    meaning: "Simboliza la tranquilidad, la paz y la libertad que brinda la educación técnica y el trabajo digno en todo el territorio colombiano.",
    elements: [
      { name: "Fondo Blanco", description: "Evoca la paz, la pureza de intención formativa y la universalidad e inclusión institucional." },
      { name: "Escudo Verde y Blanco", description: "Ubicado en el centro geométrico, denota la esperanza, el crecimiento productivo y el compromiso patrio." }
    ],
    funFact: "Debe estar izada en todos los centros de formación junto a la bandera de Colombia y la bandera del departamento o municipio."
  },
  {
    id: "logotipo",
    name: "El Logotipo (Símbolo Institucional)",
    meaning: "Muestra a una persona caminando con determinación hacia un futuro promisorio, apoyándose en la formación que adquiere en el SENA.",
    elements: [
      { name: "La Cabeza Circular", description: "Representa la razón, el pensamiento crítico y la plenitud del ser humano." },
      { name: "El Sendero y los Brazos Abiertos", description: "La figura dinámica que avanza por un camino ascendente hacia la autorrealización personal y técnica." }
    ],
    funFact: "Es uno de los logotipos más reconocidos y respetados por millones de colombianos en las 33 regionales."
  }
];

export const SENA_ANTHEM = {
  lyricsAuthor: "Luis Alfredo Sánchez",
  musicAuthor: "Daniel Marlez",
  chorus: "Estudiantes del SENA, ¡adelante!\nPor Colombia luchad con amor,\ncon el ánimo noble y constante,\nque la patria en vosotros confió.",
  stanzas: [
    {
      number: 1,
      text: "Compasivos del pobre que gime,\ncon la ciencia y la técnica en pos,\nal trabajo que al hombre redime,\nconsagremos la fuerza y la voz.",
      explanation: "Destaca la vocación social del SENA: la técnica y la ciencia puestas al servicio de la dignidad humana y el bienestar colectivo."
    },
    {
      number: 2,
      text: "Hoy la patria nos llama a la lid,\nmas no es lid de sangrienta batalla,\nes la lid del trabajo y la lid,\nque en el pecho los odios acalla.",
      explanation: "El llamado es a la construcción de paz mediante el trabajo honesto, superando los conflictos a través de la educación."
    },
    {
      number: 3,
      text: "En el yunque, en la fragua, en el campo,\nen la nave, en la mina o taller,\npara el pueblo encendamos la lumbre,\nque disipe las sombras de ayer.",
      explanation: "Menciona todos los escenarios productivos del país donde los aprendices SENA son protagonistas del progreso."
    }
  ]
};

export const SENA_VALUES: SenaValue[] = [
  {
    name: "Respeto",
    concept: "Reconozco, valoro y trato de manera digna a todas las personas, con sus virtudes y diferencias, garantizando sus derechos.",
    applicationInLearning: "Escuchar con empatía a instructores y compañeros, cuidar el lenguaje y acatar las normas de convivencia en los ambientes.",
    iconName: "HeartHandshake"
  },
  {
    name: "Honestidad",
    concept: "Actúo siempre con fundamento en la verdad, cumpliendo mis deberes con transparencia y rectitud en toda circunstancia.",
    applicationInLearning: "Presentar evidencias y proyectos auténticos, jamás cometer plagio ni falsear asistencias o firmas.",
    iconName: "ShieldCheck"
  },
  {
    name: "Compromiso",
    concept: "Soy consciente de la importancia de mi rol como aprendiz y dispongo mis capacidades para el logro de las metas institucionales.",
    applicationInLearning: "Asistir puntualmente, entregar a tiempo las evidencias de aprendizaje y participar activamente en la ficha.",
    iconName: "Award"
  },
  {
    name: "Diligencia",
    concept: "Cumplo con los deberes, funciones y responsabilidades asignadas de la mejor manera posible, con atención, prontitud y eficiencia.",
    applicationInLearning: "Cuidar las máquinas, herramientas y equipos entregados para la práctica y acatar de inmediato normas de seguridad.",
    iconName: "Zap"
  },
  {
    name: "Solidaridad",
    concept: "Trabajo en equipo y brindo apoyo a quienes lo necesitan para superar dificultades y alcanzar metas colectivas.",
    applicationInLearning: "Colaborar con compañeros con dificultades de aprendizaje y apoyar causas comunitarias o de bienestar.",
    iconName: "Users"
  },
  {
    name: "Justicia",
    concept: "Actúo con imparcialidad garantizando los derechos de las personas, con equidad, igualdad y sin discriminación.",
    applicationInLearning: "Respetar los turnos de uso en talleres y valorar equitativamente el aporte de cada integrante en proyectos grupales.",
    iconName: "Scale"
  }
];

export const APPRENTICE_RIGHTS: ApprenticeRight[] = [
  {
    id: "der-01",
    number: 1,
    title: "Formación Profesional Integral de Calidad",
    summary: "Recibir formación profesional integral acorde con el programa formativo y los más altos estándares pedagógicos y técnicos.",
    fullText: "Recibir formación profesional integral de calidad que garantice la adquisición de competencias laborales, humanas y tecnológicas estipuladas en el diseño curricular del programa.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 1",
    category: "formacion",
    realLifeExample: "Si estás en el programa de Desarrollo de Software, tienes derecho a recibir formación teórica y práctica actualizada en lenguajes y metodologías modernas.",
    advice: "Conoce tu diseño curricular y la ruta de aprendizaje de tu ficha en SofiaPlus o Zajuna."
  },
  {
    id: "der-02",
    number: 2,
    title: "Inducción Oportuna y Completa",
    summary: "Recibir al iniciar el programa una completa inducción sobre el SENA, el reglamento y el funcionamiento de la formación.",
    fullText: "Recibir al ingresar a la institución la inducción sobre la estructura institucional del SENA, el reglamento del aprendiz, las características de la formación profesional integral y el programa específico.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 2",
    category: "formacion",
    realLifeExample: "Esta misma plataforma y actividades de primera semana corresponden al cumplimiento pleno de tu derecho de inducción.",
    advice: "Aprovecha la inducción para resolver todas las dudas sobre tu etapa lectiva y etapa productiva."
  },
  {
    id: "der-03",
    number: 3,
    title: "Disposición de Ambientes, Equipos y TIC",
    summary: "Disponer de los recursos físicos, tecnológicos, laboratorios y herramientas indispensables para el proceso formativo.",
    fullText: "Disponer en los Centros de Formación de los recursos físicos, didácticos, técnicos, tecnológicos y bibliográficos requeridos para su proceso de formación.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 3",
    category: "formacion",
    realLifeExample: "Acceso a salas de cómputo, talleres de mecatrónica, cocinas especializadas o laboratorios agrícolas según la especialidad.",
    advice: "Reporta oportunamente al instructor si algún equipo requiere mantenimiento preventivo o correctivo."
  },
  {
    id: "der-04",
    number: 4,
    title: "Porte del Carné Institucional",
    summary: "Ser carnetizado oportunamente y reconocido como miembro activo de la comunidad educativa del SENA.",
    fullText: "Portar el carné institucional que lo acredite como aprendiz SENA en formación durante su vigencia académica.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 5",
    category: "bienestar",
    realLifeExample: "El carné físico o digital te permite el ingreso a los centros, bibliotecas y descuentos estudiantiles de transporte.",
    advice: "Mantenlo en buen estado y pórtalo siempre en lugar visible al ingresar a cualquier sede institucional."
  },
  {
    id: "der-05",
    number: 5,
    title: "Concertación y Evaluación Objetiva",
    summary: "Conocer previamente las guías de aprendizaje, los criterios de evaluación y recibir retroalimentación a tiempo.",
    fullText: "Conocer el plan de evaluación, los resultados de aprendizaje, criterios de evaluación y recibir la retroalimentación de las evidencias en un plazo máximo de cinco (5) días hábiles.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 4 y 7",
    category: "formacion",
    realLifeExample: "Antes de una entrega, el instructor debe explicarte la lista de chequeo o rúbrica con la que serás calificado.",
    advice: "Revisa siempre las observaciones en la plataforma LMS (Zajuna) para saber qué competencias aprobaste o debes reforzar."
  },
  {
    id: "der-06",
    number: 6,
    title: "Derecho al Debido Proceso y Defensa",
    summary: "Ser escuchado, presentar pruebas y ejercer la legítima defensa antes de cualquier medida académica o sanción.",
    fullText: "Gozar del debido proceso en todas las actuaciones académicas y disciplinarias, ser notificado oportunamente y tener la oportunidad de presentar descargos y recursos de ley.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 10 y Capítulo IX",
    category: "debido_proceso",
    realLifeExample: "Si un aprendiz es citado al Comité de Evaluación y Seguimiento, tiene derecho a conocer el informe previo y dar su versión.",
    advice: "Siempre responde por escrito y conserva copias de tus radicados y soportes justificativos."
  },
  {
    id: "der-07",
    number: 7,
    title: "Participación en Bienestar al Aprendiz",
    summary: "Acceder a programas deportivos, culturales, de salud, apoyos de sostenimiento, monitorías y orientación psicopedagógica.",
    fullText: "Participar en las actividades y programas del Plan Nacional Integral de Bienestar al Aprendiz encaminados al desarrollo humano integral.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 8",
    category: "bienestar",
    realLifeExample: "Postularte a torneos deportivos, grupos de danza, apoyos FIC o apoyos regulares de sostenimiento si cumples los requisitos socioeconómicos.",
    advice: "Acércate a la oficina de Bienestar de tu Centro desde el primer mes de formación."
  },
  {
    id: "der-08",
    number: 8,
    title: "Representación y Vocería Estudiantil",
    summary: "Elegir y ser elegido democráticamente como vocero de ficha o representante general de aprendices del Centro.",
    fullText: "Elegir y ser elegido como vocero de grupo (ficha) o representante de los aprendices ante el Comité de Centro de Formación.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 9",
    category: "representacion",
    realLifeExample: "Postularse en las elecciones de vocero para ser el canal de comunicación constructiva entre el grupo y la coordinación.",
    advice: "Ser vocero desarrolla tus habilidades de liderazgo y oratoria en tu hoja de vida."
  },
  {
    id: "der-09",
    number: 9,
    title: "Respeto a la Libertad de Pensamiento y Expresión",
    summary: "Expresar libremente opiniones e ideas sin ser discriminado por motivos de raza, género, credo, política u orientación.",
    fullText: "Respeto a la dignidad humana, la libertad de pensamiento, conciencia, religión y libre expresión dentro del marco de la sana convivencia.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 11",
    category: "debido_proceso",
    realLifeExample: "Fomentar debates respetuosos sobre temáticas del sector productivo donde se respeten diferentes puntos de vista.",
    advice: "El respeto mutuo es el cimiento de la formación profesional integral en el SENA."
  },
  {
    id: "der-10",
    number: 10,
    title: "Reconocimientos y Estímulos por Excelencia",
    summary: "Recibir menciones de honor, prelación en monitorías o becas por rendimiento académico sobresaliente.",
    fullText: "Recibir estímulos e incentivos institucionales por su destacado desempeño académico, liderazgo, espíritu de superación o representación en eventos como WorldSkills.",
    legalArticle: "Reglamento del Aprendiz, Capítulo II, Artículo 7, Numeral 13",
    category: "bienestar",
    realLifeExample: "Ser seleccionado para representar al SENA en competencias técnicas departamentales, nacionales o internacionales.",
    advice: "La constancia y el alto nivel técnico abren puertas laborales tempranas."
  }
];

export const APPRENTICE_DUTIES: ApprenticeDuty[] = [
  {
    id: "deb-01",
    number: 1,
    title: "Porte Visible del Carné Institucional",
    summary: "Portar el carné en lugar visible durante toda la permanencia en las instalaciones y actividades formativas.",
    fullText: "Portar permanentemente y en lugar visible el carné que lo identifica como aprendiz SENA en todas las actividades institucionales y presentarlo cuando sea requerido.",
    legalArticle: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 1",
    category: "seguridad",
    consequenceIfViolated: "No se permitirá el ingreso al centro por razones de seguridad perimetral y control de acceso.",
    practicalTip: "Guárdalo siempre en tu maleta de estudio con su cinta porta-carné oficial."
  },
  {
    id: "deb-02",
    number: 2,
    title: "Asistencia y Puntualidad a Sesiones",
    summary: "Cumplir rigurosamente con los horarios establecidos para las sesiones presenciales, virtuales o prácticas.",
    fullText: "Asistir puntual y permanentemente a todas las actividades programadas en la ruta de aprendizaje, registrando debidamente la asistencia.",
    legalArticle: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 2",
    category: "academico",
    consequenceIfViolated: "Acumular inasistencias injustificadas puede generar llamado de atención, plan de mejoramiento o inicio de trámite de deserción.",
    practicalTip: "Llega 10 minutos antes del inicio de la formación para alistar tu ambiente de trabajo."
  },
  {
    id: "deb-03",
    number: 3,
    title: "Justificación Oportuna de Inasistencias (3 Días)",
    summary: "Presentar soportes médicos o de fuerza mayor en un término máximo de 3 días hábiles posteriores a la inasistencia.",
    fullText: "Justificar las inasistencias ante el instructor y coordinación académica dentro de los tres (3) días hábiles siguientes a la ocurrencia, anexando incapacidad médica de EPS/IPS o soporte legal de fuerza mayor.",
    legalArticle: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 4 y Art. 22",
    category: "academico",
    consequenceIfViolated: "Pasados los 3 días hábiles, la inasistencia queda catalogada como injustificada sin posibilidad de modificación.",
    practicalTip: "Envía un correo electrónico preventivo a tu instructor con la foto de la incapacidad médica el mismo día."
  },
  {
    id: "deb-04",
    number: 4,
    title: "Uso de Indumentaria Institucional y EPP",
    summary: "Portar el uniforme reglamentario y los Elementos de Protección Personal exigidos en talleres y laboratorios.",
    fullText: "Portar el uniforme institucional según las especificaciones del Centro y utilizar obligatoriamente los Elementos de Protección Personal (EPP) correspondientes a la especialidad técnica.",
    legalArticle: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 6",
    category: "seguridad",
    consequenceIfViolated: "Por protocolo de seguridad y salud en el trabajo (SG-SST), el aprendiz no podrá ingresar a la práctica de taller o laboratorio.",
    practicalTip: "Casco, gafas de seguridad, botas punta de acero o uniforme blanco según tu área técnica."
  },
  {
    id: "deb-05",
    number: 5,
    title: "Cuidado y Preservación de Bienes y Equipos",
    summary: "Hacer uso responsable, cuidadoso y exclusivo de la maquinaria, computadores, mobiliario e insumos del SENA.",
    fullText: "Cuidar las instalaciones, equipos, herramientas, software y materiales puestos a su disposición, utilizándolos exclusivamente para fines formativos.",
    legalArticle: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 7",
    category: "disciplinario",
    consequenceIfViolated: "El daño intencional o por negligencia grave acarrea reposición del bien y proceso disciplinario de falta grave.",
    practicalTip: "Revisa el estado de la máquina o computador al iniciar y al terminar tu jornada formativa."
  },
  {
    id: "deb-06",
    number: 6,
    title: "Autenticidad y Rechazo al Plagio Académico",
    summary: "Elaborar trabajos propios y citar debidamente las fuentes bibliográficas, autores y recursos de terceros.",
    fullText: "Respetar los derechos de autor, absteniéndose de cometer plagio, copia total o parcial de tareas, proyectos o códigos sin la debida referenciación académica.",
    legalArticle: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 10 y Art. 10",
    category: "academico",
    consequenceIfViolated: "El plagio o fraude se califica como falta académica GRAVE, acarreando evaluación D (Deficiente) y Comité de Evaluación.",
    practicalTip: "Usa normas APA o IEEE para citar artículos, repositorios y documentación técnica."
  },
  {
    id: "deb-07",
    number: 7,
    title: "Prohibición de Bebidas Alcohólicas y Sustancias",
    summary: "Total prohibición de ingresar, portar, consumir o comercializar alcohol o sustancias psicoactivas en el SENA.",
    fullText: "No ingresar, comercializar, portar ni consumir bebidas alcohólicas ni sustancias psicoactivas dentro de las instalaciones o actividades de la entidad.",
    legalArticle: "Reglamento del Aprendiz, Capítulo IV, Prohibiciones, Art. 10, Numeral 1",
    category: "disciplinario",
    consequenceIfViolated: "Constituye falta disciplinaria GRAVÍSIMA que da lugar a la cancelación inmediata de la matrícula.",
    practicalTip: "Los Centros SENA son zonas 100% libres de humo y sustancias psicoactivas."
  },
  {
    id: "deb-08",
    number: 8,
    title: "Trato Respetuoso y Convivencia Pacífica",
    summary: "Mantener relaciones interpersonales respetuosas, libres de acoso, violencia verbal, física o digital.",
    fullText: "Tratar con dignidad, cortesía y respeto a instructores, directivos, compañeros, funcionarios y visitantes, promoviendo la concertación y la resolución pacífica de diferencias.",
    legalArticle: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 12",
    category: "convivencia",
    consequenceIfViolated: "Agresiones o actos de matoneo (bullying/ciberacoso) conllevan sanciones disciplinarias severas y comités extraordinarios.",
    practicalTip: "Si surge un conflicto en el grupo, acude al vocero de ficha o al instructor líder para una mediación pedagógica."
  }
];

export const PROCEDURES_DATA: ProcedureGuide[] = [
  {
    id: "proc-aplazamiento",
    title: "Aplazamiento de la Formación",
    type: "aplazamiento",
    definition: "Es la solicitud motivada y justificada que hace el aprendiz para desvincularse temporalmente del programa formativo por causas de fuerza mayor o caso fortuito debidamente soportado.",
    requirements: [
      "Estar al día académicamente al momento de la solicitud (no tener planes de mejoramiento pendientes vencidos).",
      "Anexar soporte probatorio: incapacidad médica prolongada, contrato de trabajo incompatible justificado, servicio militar o calamidad doméstica.",
      "Radicar la solicitud formal a través de SofiaPlus o ventanilla de correspondencia del Centro dirigida al Subdirector."
    ],
    durationLimit: "Hasta un máximo de seis (6) meses continuos o discontinuos para técnicos, y hasta un (1) año para tecnólogos.",
    impactOrSanction: "No genera sanción de inhabilidad. El cupo queda reservado condicionado a la oferta de la ficha al momento del reingreso.",
    stepByStep: [
      "Paso 1: Redactar carta dirigida a la Subdirección del Centro exponiendo los motivos y fechas.",
      "Paso 2: Adjuntar soportes legales (médicos, laborales o militares).",
      "Paso 3: Radicar en SofiaPlus / Coordinación Académica antes de ausentarse de la formación.",
      "Paso 4: Esperar la resolución oficial de aprobación del Subdirector."
    ]
  },
  {
    id: "proc-traslado",
    title: "Traslado de Centro, Jornada o Programa",
    type: "traslado",
    definition: "Es la solicitud formal del aprendiz para continuar su proceso de formación en otra jornada, en otro Centro del SENA (a nivel nacional) o en un programa afín.",
    requirements: [
      "Haber culminado y aprobado como mínimo el primer trimestre de formación.",
      "Que exista disponibilidad de cupo en la ficha receptora del Centro de destino.",
      "Que el programa de destino sea idéntico o mantenga afinidad curricular técnica."
    ],
    durationLimit: "Se puede solicitar una sola vez por programa de formación.",
    impactOrSanction: "No genera sanción. Requiere acta de homologación de resultados de aprendizaje aprobados.",
    stepByStep: [
      "Paso 1: Verificar disponibilidad de cupo en el Centro y jornada receptora.",
      "Paso 2: Radicar solicitud de traslado con visto bueno del Subdirector del Centro de origen.",
      "Paso 3: El Centro receptor revisa el estado académico y emite aceptación formal.",
      "Paso 4: Realizar la formalización de matrícula en la nueva ficha en SofiaPlus."
    ]
  },
  {
    id: "proc-reingreso",
    title: "Reingreso a la Formación",
    type: "reingreso",
    definition: "Es la solicitud que realiza el aprendiz que previamente se le aprobó un aplazamiento para reactivar su estado de matrícula e incorporarse a una ficha en formación.",
    requirements: [
      "Haber radicado el aplazamiento oportunamente y no haber excedido el tiempo límite autorizado.",
      "Solicitar el reingreso por lo menos con un (1) mes de anticipación al inicio del trimestre correspondiente.",
      "Disponibilidad de una ficha activa que se encuentre en el mismo nivel o fase curricular."
    ],
    durationLimit: "Debe presentarse antes de cumplirse el plazo máximo otorgado en la resolución de aplazamiento.",
    impactOrSanction: "Si no solicita el reingreso en el término estipulado, se configurará la deserción del programa.",
    stepByStep: [
      "Paso 1: Radicar carta de solicitud de reingreso ante la Coordinación Académica.",
      "Paso 2: Presentar la copia de la resolución donde se concedió el aplazamiento.",
      "Paso 3: La coordinación asigna la nueva ficha de caracterización receptora.",
      "Paso 4: Ingresar a la plataforma Zajuna y presentarse con el instructor líder."
    ]
  },
  {
    id: "proc-retiro",
    title: "Retiro Voluntario",
    type: "retiro_voluntario",
    definition: "Es la manifestación escrita y voluntaria del aprendiz de abandonar definitivamente el programa de formación profesional en el cual se encuentra matriculado.",
    requirements: [
      "Estar a paz y salvo institucional con biblioteca, almacén y bienestar.",
      "Radicar la carta formal de desistimiento motivado dirigida a la Subdirección de Centro."
    ],
    durationLimit: "Se puede solicitar en cualquier momento de la etapa lectiva o productiva.",
    impactOrSanction: "Conlleva una sanción de seis (6) meses de inhabilidad en el sistema SofiaPlus para inscribirse a nuevos programas de formación titulada.",
    stepByStep: [
      "Paso 1: Tramitar el paz y salvo de herramientas, biblioteca y carné institucional.",
      "Paso 2: Radicar carta de retiro voluntario justificando las razones.",
      "Paso 3: El Subdirector emite el acto administrativo de cancelación voluntaria.",
      "Paso 4: Cumplir los 6 meses de espera para poder inscribirse a una nueva convocatoria."
    ]
  },
  {
    id: "proc-desercion",
    title: "Deserción del Proceso Formativo",
    type: "desercion",
    definition: "Es la pérdida del cupo formativo declarada por el Centro cuando el aprendiz abandona injustificadamente el programa de formación.",
    requirements: [
      "Se configura cuando el aprendiz acumula tres (3) días hábiles consecutivos de inasistencia injustificada.",
      "O cuando transcurridos dos (2) años de terminar la etapa lectiva no presenta la etapa productiva.",
      "O cuando pasados los términos de aplazamiento no solicita el reingreso formal."
    ],
    durationLimit: "Se declara mediante resolución administrativa previo requerimiento por escrito.",
    impactOrSanction: "Sanción severa: Cancelación de matrícula e inhabilidad de seis (6) meses en SofiaPlus para inscribirse a cualquier programa del SENA.",
    stepByStep: [
      "Paso 1: El instructor reporta 3 días de inasistencia injustificada a la coordinación.",
      "Paso 2: El Centro envía una citación o comunicación al correo del aprendiz para que justifique en 5 días hábiles.",
      "Paso 3: Si el aprendiz no responde o no justifica válidamente, el Subdirector declara la deserción.",
      "Paso 4: Se expide la resolución de cancelación de matrícula y se aplica la sanción en el sistema."
    ]
  }
];

export const PRODUCTIVE_STAGE_OPTIONS: ProductiveStageOption[] = [
  {
    id: "prod-contrato",
    name: "Contrato de Aprendizaje (Ley 789 de 2002)",
    description: "Vinculación formativa con una empresa patrocinadora donde el aprendiz aplica sus competencias recibiendo apoyo de sostenimiento mensual y afiliación a seguridad social (ARL y EPS al 100%).",
    benefits: [
      "Apoyo económico mensual reglamentado por ley.",
      "Afiliación y cobertura completa de ARL y EPS.",
      "Alta probabilidad de vinculación laboral directa al culminar.",
      "Acceso gestionado a través del aplicativo SGVA (Caprendizaje)."
    ],
    requirements: ["Estar habilitado en SofiaPlus sin sanciones vigentes.", "Postularse a través del SGVA o concertación empresarial avalada por el SENA."],
    popularIn: "La alternativa más utilizada por aprendices técnicos y tecnólogos en toda Colombia."
  },
  {
    id: "prod-proyecto",
    name: "Proyecto Productivo / SENNOVA",
    description: "Desarrollo de un proyecto de investigación aplicada, innovación o emprendimiento que da solución real a una necesidad del sector productivo o de la comunidad.",
    benefits: [
      "Acompañamiento de instructores expertos e investigadores de SENNOVA.",
      "Posibilidad de postular al Fondo Emprender para capital semilla.",
      "Generación de tu propia empresa o modelo de negocio escalable."
    ],
    requirements: ["Propuesta metodológica avalada por el comité de proyecto del Centro.", "Cumplimiento de bitácoras de avance periódico."],
    popularIn: "Muy recomendado para aprendices con espíritu innovador y creadores de startups."
  },
  {
    id: "prod-vinculo",
    name: "Vínculo Laboral o Contractual",
    description: "Aplica cuando el aprendiz ya labora en una empresa formal y las funciones que desempeña guardan directa relación y afinidad con el programa de formación cursado.",
    benefits: [
      "El aprendiz continúa devengando su salario normal pactado.",
      "Valida su experiencia laboral previa con la titulación del SENA.",
      "No requiere suspender su empleo actual para graduarse."
    ],
    requirements: ["Certificación de funciones expedida por talento humano de la empresa.", "Aprobación y visitas periódicas del instructor de seguimiento."],
    popularIn: "Ideal para aprendices de jornadas nocturnas o fines de semana que ya trabajan."
  },
  {
    id: "prod-pasantiia",
    name: "Pasantía (Empresas, ONG o Sector Público)",
    description: "Práctica concertada con una entidad pública, fundación o empresa legalmente constituida para desarrollar actividades prácticas afines al perfil de egreso.",
    benefits: [
      "Flexibilidad en concertación de horarios según el convenio.",
      "Apertura en el sector público, alcaldías, ministerios y organizaciones sociales.",
      "Cobertura de ARL obligatoria por parte de la empresa o el SENA."
    ],
    requirements: ["Convenio o acuerdo de voluntades suscrito entre la entidad y el SENA.", "Plan de concertación de actividades formativas."],
    popularIn: "Frecuente en sectores ambientales, sociales y del sector público."
  },
  {
    id: "prod-monitoria",
    name: "Monitoría Institucional en el SENA",
    description: "Apoyo técnico en ambientes de aprendizaje, laboratorios o proyectos institucionales en el mismo Centro de Formación.",
    benefits: [
      "Incentivo económico mensual de monitoría otorgado por el SENA.",
      "Profundización en habilidades pedagógicas y técnicas avanzadas.",
      "Permanencia en el ecosistema de formación institucional."
    ],
    requirements: ["Haber obtenido excelentes calificaciones y postularse a la convocatoria de monitorías de Bienestar.", "Disponibilidad de horas exigidas."],
    popularIn: "Para aprendices destacados que aspiran a la docencia o investigación."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "caso-01",
    title: "Caso de Inasistencia por Calamidad de Salud",
    category: "Inasistencia",
    scenario: "Carlos es aprendiz de la ficha de Análisis y Desarrollo de Software. Tuvo un accidente en motocicleta el día lunes y fue atendido en urgencias de su EPS. El médico le otorgó cinco (5) días de reposo. Carlos regresa al Centro el lunes siguiente a entregar la incapacidad médica.",
    question: "¿Qué debió hacer Carlos conforme al Reglamento del Aprendiz y qué procede con su situación?",
    options: [
      {
        id: "opt-1",
        text: "Esperar a terminar todo su reposo y llevar la incapacidad el día que regrese a clase sin haber avisado previamente.",
        isCorrect: false,
        feedback: "Incorrecto. El reglamento exige radicar o notificar la justificación dentro de los 3 días hábiles siguientes al inicio de la inasistencia."
      },
      {
        id: "opt-2",
        text: "Notificar por correo a su instructor y radicar digitalmente el certificado de la EPS dentro de los 3 días hábiles siguientes a la inasistencia.",
        isCorrect: true,
        feedback: "¡Correcto! El Artículo 9 y 22 exige que el soporte se presente dentro de los 3 días hábiles. Al hacerlo a tiempo, la inasistencia queda formalmente justificada."
      },
      {
        id: "opt-3",
        text: "Pedirle a un compañero que firme la planilla de asistencia por él para no figurar ausente.",
        isCorrect: false,
        feedback: "Incorrecto. Suplantar firmas o falsear planillas constituye una falta disciplinaria GRAVÍSIMA."
      }
    ],
    classification: "Situación Administrativa",
    regulatoryExplanation: "Las inasistencias por salud deben soportarse con incapacidad oficial de EPS o IPS legalmente constituida en máximo 3 días hábiles. Si supera 30 días, se debe evaluar la viabilidad de un aplazamiento por fuerza mayor.",
    dueProcess: "El aprendiz radica el soporte ante el instructor líder y la coordinación académica. El instructor reprograma la entrega de las evidencias de aprendizaje."
  },
  {
    id: "caso-02",
    title: "Caso de Plagio en Evidencia Técnica de Proyecto",
    category: "Plagio / Fraude",
    scenario: "Mariana y Juan debían entregar un sistema de gestión de base de datos como evidencia final. Por falta de tiempo, descargaron un proyecto idéntico de internet y cambiaron los nombres de las tablas para hacerlo pasar como creación propia. El instructor detectó el plagio mediante software de verificación.",
    question: "¿Cómo clasifica el Reglamento del Aprendiz esta conducta y cuál es el procedimiento correspondiente?",
    options: [
      {
        id: "opt-1",
        text: "Es una falta leve; el instructor simplemente les pone 0 en la nota y les dice que entreguen otro mañana.",
        isCorrect: false,
        feedback: "Incorrecto. En el SENA no existen notas numéricas (se califica Aprobado o Por Mejorar) y el plagio nunca es una falta leve."
      },
      {
        id: "opt-2",
        text: "Es una falta disciplinaria y académica GRAVE. Procede llamado de atención formal, calificación D y remisión al Comité de Evaluación y Seguimiento.",
        isCorrect: true,
        feedback: "¡Excelente! El plagio atenta contra la honestidad institucional y los derechos de autor. Requiere inicio del debido proceso ante el Comité de Centro."
      },
      {
        id: "opt-3",
        text: "El instructor debe expulsarlos de inmediato del Centro sin necesidad de comités ni descargos.",
        isCorrect: false,
        feedback: "Incorrecto. Ningún instructor puede expulsar unilateralmente a un aprendiz; se debe respetar siempre el debido proceso y la legítima defensa."
      }
    ],
    classification: "Falta Grave",
    regulatoryExplanation: "El Artículo 10 tipifica el plagio y la copia como faltas que vulneran los principios de integridad académica. Conforme al debido proceso, los aprendices tienen derecho a presentar descargos ante el Comité.",
    dueProcess: "1. Notificación formal de los cargos. 2. Sesión del Comité de Evaluación con presencia de los aprendices y vocero. 3. Formulación de plan de mejoramiento o sanción con copia a la hoja de vida."
  },
  {
    id: "caso-03",
    title: "Caso de Ingreso sin Carné y Desacato a Seguridad",
    category: "Seguridad / EPP",
    scenario: "David olvidó su carné institucional. Al intentar ingresar al Centro de Formación, el guarda de seguridad le solicita su identificación. David se molesta, levanta la voz al vigilante y empuja el torniquete de acceso para entrar a la fuerza al ambiente.",
    question: "¿Qué faltas se cometieron y qué medidas corresponden?",
    options: [
      {
        id: "opt-1",
        text: "No es falta, ya que David tenía derecho a no perder clase y el guarda debió dejarlo pasar con su palabra.",
        isCorrect: false,
        feedback: "Incorrecto. El porte del carné y el respeto al personal de apoyo son deberes fundamentales de estricto cumplimiento."
      },
      {
        id: "opt-2",
        text: "Configura faltas disciplinarias por no portar el carné, agresión verbal y desacato a las normas de seguridad del Centro.",
        isCorrect: true,
        feedback: "¡Correcto! Se vulnera el Artículo 9 (porte del carné y respeto a la comunidad) y el Artículo 10 (acciones violentas o irrespetuosas)."
      },
      {
        id: "opt-3",
        text: "Solo es una falta leve que se soluciona si David compra un carné nuevo en la papelería del barrio.",
        isCorrect: false,
        feedback: "Incorrecto. El carné es un documento institucional intransferible y la agresión física o verbal al personal eleva la gravedad de la conducta."
      }
    ],
    classification: "Falta Grave",
    regulatoryExplanation: "La agresión y el desacato a los protocolos de seguridad física de la sede atentan contra la convivencia y la seguridad de toda la comunidad del Centro de Formación.",
    dueProcess: "El personal de seguridad y la coordinación de sede elaboran el informe. El aprendiz es citado a coordinación para realizar acta de compromiso disciplinario."
  },
  {
    id: "caso-04",
    title: "Caso de Oportunidad Laboral durante Etapa Lectiva",
    category: "Uso de Instalaciones",
    scenario: "Sofía está en segundo trimestre técnico y le surge una oferta laboral de tiempo completo en otra ciudad que le impide seguir asistiendo a las clases presenciales. Ella no quiere perder lo cursado en el SENA.",
    question: "¿Cuál es el trámite reglamentario idóneo que debe solicitar Sofía?",
    options: [
      {
        id: "opt-1",
        text: "Dejar de asistir sin avisar y volver dentro de un año cuando termine el contrato de trabajo.",
        isCorrect: false,
        feedback: "Incorrecto. A los 3 días consecutivos de inasistencia se le iniciará proceso de deserción con 6 meses de sanción."
      },
      {
        id: "opt-2",
        text: "Radicar una solicitud formal de Aplazamiento debidamente justificada y soportada ante la Subdirección del Centro.",
        isCorrect: true,
        feedback: "¡Muy bien! El aplazamiento le permite suspender formalmente su formación conservando su cupo para reingresar más adelante."
      },
      {
        id: "opt-3",
        text: "Exigirle al instructor que le envíe todas las clases por WhatsApp para hacerlas en la noche sin reportarlo a nadie.",
        isCorrect: false,
        feedback: "Incorrecto. Los cambios de modalidad o jornada deben tramitarse oficialmente por el sistema institucional."
      }
    ],
    classification: "Situación Administrativa",
    regulatoryExplanation: "El aplazamiento es la figura legal creada para proteger la trayectoria formativa del aprendiz ante eventos que le impidan continuar temporalmente de forma justificada.",
    dueProcess: "Radicar la solicitud antes de ausentarse, adjuntar la propuesta laboral o justificación, y esperar el acto administrativo emitido por la Subdirección de Centro."
  }
];

export const EVALUATION_QUESTIONS: EvaluationQuestion[] = [
  {
    id: "q-01",
    category: "institucional",
    categoryLabel: "Identidad Institucional",
    question: "¿Quién fue el fundador visionario del SENA en el año 1957?",
    options: [
      "Rodolfo Martínez Tono",
      "Alberto Lleras Camargo",
      "Alfonso López Pumarejo",
      "Gabriel García Márquez"
    ],
    correctIndex: 0,
    explanation: "El economista y abogado Rodolfo Martínez Tono fue el fundador e ideólogo del SENA, creado mediante el Decreto Ley 118 del 21 de junio de 1957.",
    articleReference: "Historia Institucional del SENA"
  },
  {
    id: "q-01b",
    category: "institucional",
    categoryLabel: "Normatividad Institucional",
    question: "¿Cuál es el marco normativo y Acuerdo actualmente vigente que regula el Reglamento del Aprendiz SENA?",
    options: [
      "Acuerdo 0009 de 2024 del Consejo Directivo Nacional (que derogó el Acuerdo 007 de 2012).",
      "Acuerdo 007 de 2012 (norma derogada).",
      "Decreto 118 de 1957 exclusivamente.",
      "Ley 100 de 1993."
    ],
    correctIndex: 0,
    explanation: "El Consejo Directivo Nacional del SENA expidió el Acuerdo 0009 de 2024 (5 de noviembre de 2024), mediante el cual adoptó el nuevo Reglamento del Aprendiz SENA, derogando formalmente el antiguo Acuerdo 07 de 2012 y sus reformas.",
    articleReference: "Acuerdo 0009 de 2024 - Consejo Directivo Nacional del SENA"
  },
  {
    id: "q-01c",
    category: "institucional",
    categoryLabel: "Normatividad y Actualizaciones 2026",
    question: "¿Qué reforma clave introdujo el Acuerdo 2 de 2026 al Reglamento del Aprendiz (Acuerdo 0009 de 2024)?",
    options: [
      "Modificó el Artículo 48 sobre Comités de Evaluación y Seguimiento, reforzando el debido proceso, las citaciones digitales y las garantías del aprendiz.",
      "Eliminó la etapa productiva para todos los programas de formación.",
      "Dejó sin efectos todas las faltas disciplinarias del SENA.",
      "Restableció el antiguo Acuerdo 007 de 2012 sin modificaciones."
    ],
    correctIndex: 0,
    explanation: "El Consejo Directivo Nacional aprobó el Acuerdo 2 de 2026 (10 de marzo de 2026), mediante el cual modificó el Artículo 48 del Acuerdo 0009 de 2024, dinamizando el funcionamiento de los Comités de Evaluación y Seguimiento y fortaleciendo las garantías procesales y digitales del aprendiz.",
    articleReference: "Acuerdo 2 de 2026 (Modificatorio del Art. 48 del Acuerdo 0009 de 2024)"
  },
  {
    id: "q-02",
    category: "institucional",
    categoryLabel: "Identidad Institucional",
    question: "¿Qué representan los elementos del Escudo del SENA?",
    options: [
      "Los tres poderes públicos del Estado colombiano (Ejecutivo, Legislativo y Judicial).",
      "Los tres sectores económicos del país: agropecuario (espiga), industrial (rueda dentada) y servicios/comercio (caduceo).",
      "Las tres regiones geográficas más grandes de Colombia.",
      "Las tres etapas de la educación técnica, tecnológica y universitaria."
    ],
    correctIndex: 1,
    explanation: "El Escudo del SENA representa los 3 sectores de la economía nacional sobre los cuales la institución brinda formación para el trabajo.",
    articleReference: "Símbolos Institucionales del SENA"
  },
  {
    id: "q-03",
    category: "institucional",
    categoryLabel: "Identidad Institucional",
    question: "¿Qué significado tiene la figura humana que avanza en el logotipo del SENA?",
    options: [
      "Un atleta participando en competencias deportivas nacionales.",
      "Un aprendiz con paso firme hacia un horizonte de superación técnica, tecnológica y humana.",
      "Un instructor dictando una sesión de formación en el taller.",
      "Una persona corriendo para llegar a tiempo a clase."
    ],
    correctIndex: 1,
    explanation: "La figura estilizada representa al ser humano en camino ascendente de aprendizaje, autorrealización y desarrollo integral.",
    articleReference: "Manual de Identidad e Imagen Corporativa SENA"
  },
  {
    id: "q-04",
    category: "institucional",
    categoryLabel: "Identidad Institucional",
    question: "Dentro del Código de Integridad del SENA, ¿cuál valor define 'actuar siempre con base en la verdad y el cumplimiento ético de los deberes'?",
    options: [
      "Diligencia",
      "Honestidad",
      "Solidaridad",
      "Creatividad"
    ],
    correctIndex: 1,
    explanation: "La Honestidad es el principio ético rector que compromete a la comunidad del SENA a obrar con transparencia, verdad y rectitud.",
    articleReference: "Código de Integridad y Valores SENA"
  },
  {
    id: "q-05",
    category: "derechos",
    categoryLabel: "Derechos del Aprendiz",
    question: "Conforme al Reglamento del Aprendiz, ¿cuál es el plazo máximo que tiene un instructor para retroalimentar y evaluar las evidencias entregadas?",
    options: [
      "Veinticuatro (24) horas calendario.",
      "Cinco (5) días hábiles siguientes a la entrega.",
      "Treinta (30) días calendario.",
      "Al finalizar el trimestre de formación."
    ],
    correctIndex: 1,
    explanation: "El instructor debe realizar la retroalimentación cualitativa y el registro de la evaluación en un término no superior a cinco (5) días hábiles.",
    articleReference: "Reglamento del Aprendiz, Capítulo II, Artículo 7"
  },
  {
    id: "q-06",
    category: "derechos",
    categoryLabel: "Derechos del Aprendiz",
    question: "Si un aprendiz considera que una evaluación no refleja objetivamente su evidencia, ¿qué derecho reglamentario puede ejercer?",
    options: [
      "Solicitar la revisión de la evaluación de forma motivada y respetuosa ante el instructor o un segundo evaluador.",
      "Interponer de inmediato una demanda judicial ante la fiscalía.",
      "Suspender las clases de toda la ficha en protesta.",
      "Crear un grupo de reclamos en redes sociales atacando al instructor."
    ],
    correctIndex: 0,
    explanation: "El aprendiz tiene derecho a solicitar revisión ante su instructor y, si persiste el desacuerdo, solicitar por escrito un segundo evaluador ante la Coordinación Académica.",
    articleReference: "Reglamento del Aprendiz, Capítulo II, Artículo 7"
  },
  {
    id: "q-07",
    category: "derechos",
    categoryLabel: "Derechos del Aprendiz",
    question: "¿Qué garantiza el 'Debido Proceso' en un trámite disciplinario o académico en el SENA?",
    options: [
      "Que el aprendiz puede no asistir a los comités y las sanciones no le aplicarán.",
      "Que el aprendiz debe ser notificado, conocer las pruebas, ser escuchado y presentar descargos antes de cualquier decisión sancionatoria.",
      "Que todas las decisiones se toman por sorteo o votación abierta en el patio del centro.",
      "Que no existen sanciones en el SENA bajo ninguna circunstancia."
    ],
    correctIndex: 1,
    explanation: "El debido proceso (consagrado en el Art. 29 de la Constitución y en el Reglamento) asegura que nadie sea sancionado sin derecho a la defensa y contradicción.",
    articleReference: "Reglamento del Aprendiz, Capítulo IX - Procedimiento para la aplicación de sanciones"
  },
  {
    id: "q-08",
    category: "derechos",
    categoryLabel: "Derechos del Aprendiz",
    question: "¿A qué dependencia del Centro de Formación debe acudir un aprendiz para acceder a monitorías, torneos deportivos o apoyos socioeconómicos?",
    options: [
      "Almacén central del Centro.",
      "Bienestar al Aprendiz.",
      "Vigilancia y Seguridad privada.",
      "Ventanilla de Correspondencia."
    ],
    correctIndex: 1,
    explanation: "Bienestar al Aprendiz lidera los programas de salud, deporte, cultura, apoyos de sostenimiento (FIC y regulares), liderazgo y orientación psicoespiritual.",
    articleReference: "Plan Nacional Integral de Bienestar al Aprendiz"
  },
  {
    id: "q-09",
    category: "deberes",
    categoryLabel: "Deberes y Prohibiciones",
    question: "¿En qué término debe un aprendiz presentar la justificación y soportes médicos tras una inasistencia a formación?",
    options: [
      "El mismo día antes de las 12 del mediodía únicamente de forma presencial.",
      "Dentro de los tres (3) días hábiles siguientes a la inasistencia.",
      "Al finalizar el año escolar.",
      "No es necesario justificar si la inasistencia fue por motivos personales."
    ],
    correctIndex: 1,
    explanation: "El Reglamento del Aprendiz estipula perentoriamente un plazo de tres (3) días hábiles siguientes a la inasistencia para radicar los soportes válidos.",
    articleReference: "Reglamento del Aprendiz, Capítulo III, Artículo 9"
  },
  {
    id: "q-10",
    category: "deberes",
    categoryLabel: "Deberes y Prohibiciones",
    question: "¿Por qué es obligatorio el porte visible del carné institucional dentro del SENA?",
    options: [
      "Únicamente por motivos estéticos de la vestimenta.",
      "Por seguridad institucional, control de acceso perimetral e identificación como miembro oficial de la comunidad SENA.",
      "Para que los instructores memoricen los nombres de memoria el primer día.",
      "Solo es exigido los días de ceremonia de graduación."
    ],
    correctIndex: 1,
    explanation: "El carné acredita la calidad de aprendiz y garantiza la seguridad de todas las personas que conviven en los centros de formación.",
    articleReference: "Reglamento del Aprendiz, Capítulo III, Artículo 9, Numeral 1"
  },
  {
    id: "q-11",
    category: "deberes",
    categoryLabel: "Deberes y Prohibiciones",
    question: "¿Qué consecuencia directa tiene ingresar o consumir bebidas alcohólicas o sustancias psicoactivas en el Centro de Formación?",
    options: [
      "Una amonestación verbal suave sin registro en el expediente.",
      "Constituye una falta disciplinaria GRAVÍSIMA que puede acarrear la cancelación de la matrícula.",
      "Pagar una multa de 20.000 pesos en la cafetería del Centro.",
      "Quedarse 30 minutos barriendo el salón al terminar la clase."
    ],
    correctIndex: 1,
    explanation: "El ingreso o consumo de alcohol o estupefacientes es una falta gravísima que vulnera la seguridad y la convivencia del Centro.",
    articleReference: "Reglamento del Aprendiz, Capítulo IV, Artículo 10"
  },
  {
    id: "q-12",
    category: "deberes",
    categoryLabel: "Deberes y Prohibiciones",
    question: "La copia total o parcial de un proyecto, código fuente o documento sin citar las fuentes de autor es calificada como:",
    options: [
      "Una buena práctica de reutilización técnica recomendada.",
      "Una falta académica GRAVE tipificada como plagio o fraude.",
      "Un error sin ninguna trascendencia en la evaluación.",
      "Un derecho del aprendiz para ahorrar tiempo en entregas."
    ],
    correctIndex: 1,
    explanation: "El fraude y el plagio violan los derechos de autor y los principios éticos de la formación profesional integral.",
    articleReference: "Reglamento del Aprendiz, Capítulo III y IV"
  },
  {
    id: "q-13",
    category: "procedimientos",
    categoryLabel: "Trámites y Novedades",
    question: "¿Cuánto tiempo consecutivo de inasistencia injustificada da lugar al inicio del trámite de Deserción en el SENA?",
    options: [
      "Un (1) día de ausencia.",
      "Tres (3) días hábiles consecutivos sin justificación válida.",
      "Treinta (30) días calendario de inasistencia.",
      "Nunca se declara deserción si el aprendiz vuelve antes de fin de año."
    ],
    correctIndex: 1,
    explanation: "La deserción se configura cuando el aprendiz acumula 3 días hábiles consecutivos de inasistencia injustificada en etapa lectiva o productiva.",
    articleReference: "Reglamento del Aprendiz, Capítulo VI, Artículo 22"
  },
  {
    id: "q-14",
    category: "procedimientos",
    categoryLabel: "Trámites y Novedades",
    question: "¿Cuál es la sanción en el aplicativo SofiaPlus cuando se formaliza una deserción o retiro voluntario injustificado?",
    options: [
      "Inhabilidad para inscribirse en programas de formación titulada del SENA durante seis (6) meses.",
      "Inhabilidad definitiva de por vida para ingresar al SENA.",
      "Pérdida de la cédula de ciudadanía ante la Registraduría.",
      "No existe ninguna sanción en el sistema."
    ],
    correctIndex: 0,
    explanation: "El sistema bloquea la inscripción a programas titulados durante un período de seis (6) meses como sanción administrativa.",
    articleReference: "Normatividad de Administración Educativa SENA"
  },
  {
    id: "q-15",
    category: "procedimientos",
    categoryLabel: "Trámites y Novedades",
    question: "¿Cuál es la duración máxima permitida para un Aplazamiento en un programa de nivel Tecnólogo?",
    options: [
      "Quince (15) días hábiles.",
      "Hasta un (1) año continuo o discontinuo.",
      "Cinco (5) años sin límite.",
      "Tres (3) semanas únicamente."
    ],
    correctIndex: 1,
    explanation: "Para nivel tecnólogo el aplazamiento se concede hasta por un (1) año, y para técnicos hasta por seis (6) meses.",
    articleReference: "Reglamento del Aprendiz, Capítulo VI - Novedades del Aprendiz"
  },
  {
    id: "q-16",
    category: "etapa_productiva",
    categoryLabel: "Etapa Productiva",
    question: "En la modalidad de Contrato de Aprendizaje (Ley 789 de 2002), ¿cuáles coberturas de seguridad social son obligatorias a cargo de la empresa en la fase práctica?",
    options: [
      "Únicamente subsidio familiar de caja de compensación.",
      "Afiliación y cobertura completa al 100% de ARL (Riesgos Laborales) y EPS (Salud).",
      "El aprendiz debe pagar su propia salud y pensión de su bolsillo.",
      "Ninguna cobertura, ya que no existe vínculo legal."
    ],
    correctIndex: 1,
    explanation: "Por disposición de la Ley 789 de 2002, en la fase práctica la empresa patrocinadora debe afiliar al aprendiz a EPS y ARL en su totalidad.",
    articleReference: "Marco Legal del Contrato de Aprendizaje en Colombia"
  },
  {
    id: "q-17",
    category: "etapa_productiva",
    categoryLabel: "Etapa Productiva",
    question: "¿Qué plataforma institucional oficial administra las ofertas de patrocinio y contratos de aprendizaje del SENA?",
    options: [
      "LinkedIn Corporativo.",
      "SGVA (Sistema de Gestión Virtual de Aprendices / Caprendizaje).",
      "Facebook Marketplace.",
      "Plataforma de la Dian."
    ],
    correctIndex: 1,
    explanation: "El SGVA (caprendizaje.sena.edu.co) es el sistema oficial donde las empresas publican vacantes y los aprendices eligen su patrocinio.",
    articleReference: "Guía de Gestión del Contrato de Aprendizaje SENA"
  },
  {
    id: "q-18",
    category: "etapa_productiva",
    categoryLabel: "Etapa Productiva",
    question: "¿Cuál de las siguientes es una modalidad válida para desarrollar la Etapa Productiva en el SENA?",
    options: [
      "Quedarse en casa descansando sin realizar ninguna actividad.",
      "Proyecto Productivo SENNOVA o creación de empresa con Fondo Emprender.",
      "Comprar un certificado falso en una papelería.",
      "Pagarle a un familiar para que firme una carta sin hacer prácticas."
    ],
    correctIndex: 1,
    explanation: "El Proyecto Productivo I+D avalado por el SENA o Fondo Emprender es una de las modalidades más enriquecedoras de etapa productiva.",
    articleReference: "Reglamento del Aprendiz, Capítulo V - De la Etapa Productiva"
  }
];

export const INITIAL_FICHAS: FichaGroup[] = [
  {
    id: "2824901",
    programName: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    programLevel: "Tecnólogo",
    centerName: "Centro de Tecnologías del Transporte y Software",
    regionalName: "Regional Distrito Capital",
    leadInstructor: "Ing. Carlos Alberto Restrepo Gómez",
    startDate: "2026-02-15",
    totalApprentices: 28
  },
  {
    id: "2715022",
    programName: "Tecnólogo en Gestión Administrativa y Talento Humano",
    programLevel: "Tecnólogo",
    centerName: "Centro de Gestión de Mercados, Logística y TIC",
    regionalName: "Regional Distrito Capital",
    leadInstructor: "Dra. Martha Lucía Ospina",
    startDate: "2026-03-01",
    totalApprentices: 32
  },
  {
    id: "2901144",
    programName: "Técnico en Cocina Internacional y Servicios Gastronómicos",
    programLevel: "Técnico",
    centerName: "Centro Nacional de Hotelería, Turismo y Alimentos",
    regionalName: "Regional Distrito Capital",
    leadInstructor: "Chef Juan David Salamanca",
    startDate: "2026-03-10",
    totalApprentices: 24
  }
];

export const INITIAL_APPRENTICES: ApprenticeProfile[] = [
  {
    id: "app-101",
    fullName: "Valentina Gómez Morales",
    documentType: "C.C.",
    documentNumber: "1020491823",
    email: "vgomez823@misena.edu.co",
    phone: "312 458 9201",
    fichaId: "2824901",
    programName: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    centerName: "Centro de Tecnologías del Transporte y Software",
    regionalName: "Regional Distrito Capital",
    modulesCompleted: ["institutional", "rights", "duties", "procedures", "simulator"],
    evaluationResult: {
      completedAt: "2026-10-25 14:32",
      totalQuestions: 15,
      correctCount: 14,
      score: 93,
      passed: true,
      timeSpentSeconds: 420,
      categoryBreakdown: {
        institucional: { total: 3, correct: 3, percentage: 100 },
        derechos: { total: 3, correct: 3, percentage: 100 },
        deberes: { total: 3, correct: 3, percentage: 100 },
        procedimientos: { total: 3, correct: 2, percentage: 67 },
        etapa_productiva: { total: 3, correct: 3, percentage: 100 }
      },
      answers: []
    },
    characterization: {
      completedAt: "2026-10-24 09:15",
      stratum: 2,
      vulnerableGroup: "Ninguno / Población General",
      employmentStatus: "Dedicación exclusiva a estudio",
      householdDependents: 0,
      primaryDevice: "Portátil propio",
      internetConnection: "Banda ancha fija en hogar (Fibra/Cable)",
      digitalSkillLevel: "Intermedio (Ofimática, Teams, LMS Zajuna)",
      hasPersonalWorkspace: true,
      dominantLearningStyle: "Visual",
      vakScores: { visual: 45, auditory: 25, kinesthetic: 20, readingWriting: 10 },
      weeklyStudyHoursAvailable: 35,
      primaryMotivation: "Conseguir mi primer empleo formal",
      requiresEconomicSupport: true,
      supportRequestedTypes: ["Apoyo de Sostenimiento FIC", "Monitoría Académica"],
      healthEmergencyContact: {
        name: "María Morales (Madre)",
        phone: "311 204 9831",
        relationship: "Madre"
      }
    },
    certificateCode: "SENA-IND-2026-ADSO-8239",
    issueDate: "2026-10-25"
  },
  {
    id: "app-102",
    fullName: "Santiago Camargo Rojas",
    documentType: "C.C.",
    documentNumber: "1018934521",
    email: "scamargo521@misena.edu.co",
    phone: "315 782 1104",
    fichaId: "2824901",
    programName: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    centerName: "Centro de Tecnologías del Transporte y Software",
    regionalName: "Regional Distrito Capital",
    modulesCompleted: ["institutional", "rights", "duties"],
    evaluationResult: undefined
  },
  {
    id: "app-103",
    fullName: "Mariana Silva Cárdenas",
    documentType: "T.I.",
    documentNumber: "1083921004",
    email: "msilva004@misena.edu.co",
    phone: "318 649 2038",
    fichaId: "2824901",
    programName: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    centerName: "Centro de Tecnologías del Transporte y Software",
    regionalName: "Regional Distrito Capital",
    modulesCompleted: ["institutional", "rights", "duties", "procedures", "simulator"],
    characterization: {
      completedAt: "2026-10-25 11:30",
      stratum: 1,
      vulnerableGroup: "Madre / Padre Cabeza de Familia",
      employmentStatus: "Trabajador independiente / informal",
      householdDependents: 2,
      primaryDevice: "Teléfono inteligente (Smartphone)",
      internetConnection: "Datos móviles limitados (Prepago/Recargas)",
      digitalSkillLevel: "Básico (Navegación web y mensajería)",
      hasPersonalWorkspace: false,
      dominantLearningStyle: "Kinestésico",
      vakScores: { visual: 20, auditory: 20, kinesthetic: 50, readingWriting: 10 },
      weeklyStudyHoursAvailable: 20,
      primaryMotivation: "Mejorar ingresos y ascender laboralmente",
      requiresEconomicSupport: true,
      supportRequestedTypes: ["Apoyo de Sostenimiento Regular", "Subsidio de Transporte / Alimentación"],
      healthEmergencyContact: {
        name: "Carlos Cárdenas (Tío)",
        phone: "314 559 1102",
        relationship: "Familiar"
      }
    },
    evaluationResult: {
      completedAt: "2026-10-26 10:15",
      totalQuestions: 15,
      correctCount: 12,
      score: 80,
      passed: true,
      timeSpentSeconds: 510,
      categoryBreakdown: {
        institucional: { total: 3, correct: 3, percentage: 100 },
        derechos: { total: 3, correct: 2, percentage: 67 },
        deberes: { total: 3, correct: 2, percentage: 67 },
        procedimientos: { total: 3, correct: 2, percentage: 67 },
        etapa_productiva: { total: 3, correct: 3, percentage: 100 }
      },
      answers: []
    },
    certificateCode: "SENA-IND-2026-ADSO-4412",
    issueDate: "2026-10-26"
  },
  {
    id: "app-104",
    fullName: "Andrés Felipe Mendoza",
    documentType: "C.C.",
    documentNumber: "1032890145",
    email: "amendoza145@misena.edu.co",
    phone: "310 923 8812",
    fichaId: "2824901",
    programName: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    centerName: "Centro de Tecnologías del Transporte y Software",
    regionalName: "Regional Distrito Capital",
    modulesCompleted: ["institutional"],
    characterization: {
      completedAt: "2026-10-24 10:00",
      stratum: 2,
      vulnerableGroup: "Campesino / Sector Rural",
      employmentStatus: "Desempleado buscando empleo",
      householdDependents: 1,
      primaryDevice: "Computador de escritorio en casa",
      internetConnection: "Banda ancha fija en hogar (Fibra/Cable)",
      digitalSkillLevel: "Intermedio (Ofimática, Teams, LMS Zajuna)",
      hasPersonalWorkspace: true,
      dominantLearningStyle: "Auditivo",
      vakScores: { visual: 25, auditory: 45, kinesthetic: 20, readingWriting: 10 },
      weeklyStudyHoursAvailable: 30,
      primaryMotivation: "Crear mi propia empresa / unidad productiva",
      requiresEconomicSupport: false,
      supportRequestedTypes: [],
      healthEmergencyContact: {
        name: "Gloria Ramos (Madre)",
        phone: "313 778 9012",
        relationship: "Madre"
      }
    },
    evaluationResult: {
      completedAt: "2026-10-24 16:40",
      totalQuestions: 15,
      correctCount: 8,
      score: 53,
      passed: false,
      timeSpentSeconds: 310,
      categoryBreakdown: {
        institucional: { total: 3, correct: 2, percentage: 67 },
        derechos: { total: 3, correct: 1, percentage: 33 },
        deberes: { total: 3, correct: 2, percentage: 67 },
        procedimientos: { total: 3, correct: 1, percentage: 33 },
        etapa_productiva: { total: 3, correct: 2, percentage: 67 }
      },
      answers: []
    }
  },
  {
    id: "app-105",
    fullName: "Camila Andrea Lozano",
    documentType: "C.C.",
    documentNumber: "1014552399",
    email: "clozano399@misena.edu.co",
    phone: "320 812 7744",
    fichaId: "2824901",
    programName: "Tecnólogo en Análisis y Desarrollo de Software (ADSO)",
    centerName: "Centro de Tecnologías del Transporte y Software",
    regionalName: "Regional Distrito Capital",
    modulesCompleted: [],
    evaluationResult: undefined
  }
];
