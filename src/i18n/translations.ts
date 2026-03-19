export type Lang = "es" | "en";

export type Dictionaries = Record<Lang, Record<string, string>>;

export const dictionaries: Dictionaries = {
  es: {
    "lang.es": "Español",
    "lang.en": "Inglés",
    "lang.switch": "Idioma",

    "nav.services": "Servicios",
    "nav.method": "Método",
    "nav.successes": "Éxitos",
    "nav.plans": "Planes",
    "nav.contact": "Contacto",
    "nav.login": "Login",
    "nav.start": "¿Contactamos?",

    "portal.title": "Portal del Cliente",
    "portal.notifications": "Notificaciones",

    // Legal Notice
    "legal.back": "← KINETORA",
    "legal.title": "AVISO LEGAL",
    "legal.subtitle": "Información legal sobre el titular del sitio web y condiciones de uso.",
    "legal.updated": "ÚLTIMA ACTUALIZACIÓN: MARZO 2026",
    
    "legal.s1.title": "1. IDENTIFICACIÓN DEL TITULAR",
    "legal.s1.p1": "En cumplimiento con la Ley 34/2002 de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos del titular del sitio web:",
    "legal.s1.company": "Razón social",
    "legal.s1.address": "Domicilio social",
    "legal.s1.cif": "CIF/NIF",
    "legal.s1.cif.val": "Registro en trámite",
    "legal.s1.email": "Correo electrónico",
    "legal.s1.web": "Sitio web",

    "legal.s2.title": "2. OBJETO Y ÁMBITO DE APLICACIÓN",
    "legal.s2.p1": "Este Aviso Legal regula el acceso y uso del sitio web https://kinetora.tech (en adelante, \"el Sitio Web\"), titularidad de Kinetora Studio S.L.",
    "legal.s2.p2": "El acceso y/o uso de este Sitio Web atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este Aviso Legal, Política de Privacidad y Política de Cookies vigentes en el momento en que el usuario acceda al Sitio Web.",

    "legal.s3.title": "3. PROPIEDAD INTELECTUAL E INDUSTRIAL",
    "legal.s3.p1": "Todos los contenidos del Sitio Web, tales como textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a Kinetora Studio S.L., sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el uso correcto del Sitio Web.",
    "legal.s3.p2": "Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación, por cualquier procedimiento, de la totalidad o parte de los contenidos de este Sitio Web con fines comerciales sin la autorización expresa y por escrito de Kinetora Studio S.L.",

    "legal.s4.title": "4. RESPONSABILIDAD",
    "legal.s4.p1": "Kinetora Studio S.L. no se hace responsable de los daños o perjuicios de cualquier naturaleza que pudieran derivarse del acceso o uso del Sitio Web, de la información o contenidos en él incluidos, o de los servicios prestados a través del mismo, incluyendo a título enunciativo y no limitativo errores u omisiones en los contenidos, falta de disponibilidad del portal, o la transmisión de virus o programas maliciosos.",

    "legal.s5.title": "5. LEGISLACIÓN APLICABLE Y JURISDICCIÓN",
    "legal.s5.p1": "El presente Aviso Legal se rige en todos sus extremos por la legislación española. Para la resolución de cualquier conflicto que pudiera derivarse del acceso al Sitio Web, las partes acuerdan someterse expresamente a los Juzgados y Tribunales competentes conforme a la normativa vigente.",

    "legal.s6.title": "6. MODIFICACIONES",
    "legal.s6.p1": "Kinetora Studio S.L. se reserva el derecho de efectuar, sin previo aviso, las modificaciones que considere oportunas en el Sitio Web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios prestados a través del mismo como la forma en la que éstos aparezcan presentados o localizados en el Sitio Web.",

    // Privacy Policy
    "privacy.title": "POLÍTICA DE PRIVACIDAD",
    "privacy.subtitle": "Tu privacidad es importante para nosotros. Aquí te explicamos cómo tratamos tus datos personales.",
    
    "privacy.s1.title": "1. RESPONSABLE DEL TRATAMIENTO",
    "privacy.s1.l1.label": "Responsable",
    "privacy.s1.l1.value": "Kinetora Studio S.L.",
    "privacy.s1.l2.label": "Email",
    "privacy.s1.l2.value": "hola@kinetora.tech",
    "privacy.s1.l3.label": "Actividad",
    "privacy.s1.l3.value": "Agencia creativa de diseño, desarrollo y estrategia digital",
    "privacy.s2.title": "2. DATOS QUE RECOPILAMOS",
    "privacy.s2.p1": "Recopilamos distintos tipos de información personal cuando interactúas con nosotros:",
    "privacy.s2.subtitle1": "Datos facilitados directamente:",
    "privacy.s2.l1": "Nombre y apellidos",
    "privacy.s2.l2": "Dirección de correo electrónico",
    "privacy.s2.l3": "Nombre de empresa",
    "privacy.s2.l4": "Información del proyecto y presupuesto",
    "privacy.s2.l5": "Mensajes e información de contacto",
    "privacy.s2.subtitle2": "Datos de navegación:",
    "privacy.s2.p2": "Datos técnicos de acceso como dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, recopilados a través de cookies y tecnologías similares según nuestra Política de Cookies.",
    "privacy.s3.title": "3. FINALIDADES Y BASES LEGALES DEL TRATAMIENTO",
    "privacy.s3.l1": "Gestión de solicitudes de contacto y presupuestos: Interés legítimo / Consentimiento (3 años)",
    "privacy.s3.l2": "Envío de newsletter y comunicaciones comerciales: Consentimiento expreso (Hasta retirar consentimiento)",
    "privacy.s3.l3": "Análisis y mejora del sitio web: Interés legítimo (26 meses)",
    "privacy.s3.l4": "Cumplimiento de obligaciones legales: Obligación legal (Según normativa)",
    "privacy.s4.title": "4. DESTINATARIOS DE LOS DATOS",
    "privacy.s4.p1": "No cedemos ni vendemos tus datos personales a terceros. Proveedores: hosting, Google Analytics (IP anonimizada), ClickUp, Slack.",
    "privacy.s5.title": "5. TRANSFERENCIAS INTERNACIONALES",
    "privacy.s5.p1": "Garantizamos garantías adecuadas (cláusulas contractuales tipo) para proveedores fuera del EEE.",
    "privacy.s6.title": "6. TUS DERECHOS",
    "privacy.s6.p1": "Acceso, Rectificación, Supresión, Oposición, Limitación, Portabilidad. Email: hola@kinetora.tech. Reclamación ante la AEPD (www.aepd.es).",
    "privacy.s7.title": "7. SEGURIDAD DE LOS DATOS",
    "privacy.s7.p1": "Medidas técnicas y organizativas para garantizar la seguridad según RGPD y LOPDGDD.",

    // Cookie Policy
    "cookie.title": "POLÍTICA DE COOKIES",
    "cookie.subtitle": "Información sobre las cookies que utilizamos y cómo gestionarlas.",
    
    "cookie.s1.title": "1. ¿QUÉ SON LAS COOKIES?",
    "cookie.s1.p1": "Pequeños archivos de texto para funcionamiento, mejora y análisis del sitio.",
    "cookie.s2.title": "2. TIPOS DE COOKIES",
    "cookie.s2.p1": "Técnicas (necesarias), Funcionales, Analíticas.",
    
    "cookie.types.tech": "Técnicas (necesarias)",
    "cookie.types.func": "Funcionales",
    "cookie.types.anal": "Analíticas",

    "cookie.s3.title": "3. COOKIES UTILIZADAS",
    "cookie.s3.l1": "Nombre: _ga, _gid, _gat | Tipo: Analítica | Proveedor: Google Analytics | Finalidad: Análisis comportamiento | Duración: 2 años / 24h / 1 min",
    "cookie.s3.l2": "Nombre: cookieconsent_status | Tipo: Técnica | Proveedor: Propia | Finalidad: Recordar consentimiento cookies | Duración: 1 año",
    
    "cookie.table.name": "NOMBRE",
    "cookie.table.type": "TIPO",
    "cookie.table.provider": "PROVEEDOR",
    "cookie.table.purpose": "FINALIDAD",
    "cookie.table.duration": "DURACIÓN",

    "cookie.table.row1.name": "_ga, _gid, _gat",
    "cookie.table.row1.type": "Analítica",
    "cookie.table.row1.provider": "Google Analytics",
    "cookie.table.row1.purpose": "Análisis comportamiento",
    "cookie.table.row1.duration": "2 años / 24h / 1 min",

    "cookie.table.row2.name": "cookieconsent_status",
    "cookie.table.row2.type": "Técnica",
    "cookie.table.row2.provider": "Propia",
    "cookie.table.row2.purpose": "Recordar consentimiento cookies",
    "cookie.table.row2.duration": "1 año",

    "cookie.s4.title": "4. CÓMO GESTIONAR LAS COOKIES",
    "cookie.s4.p1": "Instrucciones para Chrome, Firefox, Safari, Edge, Opera.",
    "cookie.manage.chrome": "Chrome",
    "cookie.manage.firefox": "Firefox",
    "cookie.manage.safari": "Safari",
    "cookie.manage.edge": "Edge",
    "cookie.manage.opera": "Opera",

    "cookie.s5.title": "5. ACTUALIZACIONES",
    "cookie.s5.p1": "Revisiones periódicas para reflejar cambios en el uso.",

    // Social Media Privacy Policy
    "social.title": "POLÍTICA DE PRIVACIDAD EN REDES SOCIALES",
    "social.subtitle": "Cómo gestionamos la privacidad en nuestras páginas de redes sociales.",
    
    "social.s1.title": "1. NUESTROS PERFILES",
    "social.s1.p1": "Presencia activa en: Instagram, TikTok, X (Twitter), YouTube, Facebook (@kinetora_studio / Kinetora Studio).",
    
    "social.profile.ig": "Instagram",
    "social.profile.tk": "TikTok",
    "social.profile.x": "X (Twitter)",
    "social.profile.yt": "YouTube",
    "social.profile.fb": "Facebook",
    "social.profile.handle": "@kinetora_studio",

    "social.s2.title": "2. RESPONSABILIDAD Y TRATAMIENTO",
    "social.s2.p1": "Las plataformas son responsables según sus políticas. Kinetora Studio S.L. es responsable solo de interacciones directas (mensajes, comentarios). No extraemos datos sin consentimiento.",
    "social.s3.title": "3. FINALIDAD DEL USO",
    "social.s3.p1": "Publicar contenido, interactuar, responder consultas, promover servicios y compartir casos de éxito."
  },
  en: {
    "lang.es": "Spanish",
    "lang.en": "English",
    "lang.switch": "Language",

    "nav.services": "Services",
    "nav.method": "How it works",
    "nav.successes": "Case studies",
    "nav.plans": "Pricing",
    "nav.contact": "Contact",
    "nav.login": "Log in",
    "nav.start": "Let's talk",

    "portal.title": "Client Portal",
    "portal.notifications": "Notifications",

    // Legal Notice
    "legal.back": "← KINETORA",
    "legal.title": "LEGAL NOTICE",
    "legal.subtitle": "Legal information about the website owner and conditions of use.",
    "legal.updated": "LAST UPDATED: MARCH 2026",
    
    "legal.s1.title": "1. OWNER IDENTIFICATION",
    "legal.s1.p1": "In compliance with Law 34/2002 of July 11, on Services of the Information Society and Electronic Commerce (LSSI-CE), the following data of the website owner is provided:",
    "legal.s1.company": "Company name",
    "legal.s1.address": "Registered address",
    "legal.s1.cif": "CIF/NIF",
    "legal.s1.cif.val": "Registration in progress",
    "legal.s1.email": "Email",
    "legal.s1.web": "Website",

    "legal.s2.title": "2. PURPOSE AND SCOPE",
    "legal.s2.p1": "This Legal Notice regulates access to and use of the website https://kinetora.tech (hereinafter, \"the Website\"), owned by Kinetora Studio S.L.",
    "legal.s2.p2": "Access to and/or use of this Website confers the status of user and implies full and unreserved acceptance of all of the provisions included in this Legal Notice, Privacy Policy and Cookie Policy in force at any time the user accesses the Website.",

    "legal.s3.title": "3. INTELLECTUAL AND INDUSTRIAL PROPERTY",
    "legal.s3.p1": "All content on the Website, such as texts, photographs, graphics, images, icons, technology, software, links and other audiovisual or sound content, as well as its graphic design and source codes, constitute a work whose property belongs to Kinetora Studio S.L., without any exploitation rights being considered assigned to the user beyond what is strictly necessary for the correct use of the Website.",
    "legal.s3.p2": "Reproduction, distribution, public communication, transformation or any other form of exploitation, by any means, of all or part of the content of this Website for commercial purposes is expressly prohibited without the express written authorization of Kinetora Studio S.L.",

    "legal.s4.title": "4. LIABILITY",
    "legal.s4.p1": "Kinetora Studio S.L. shall not be liable for damages of any kind that may result from access to or use of the Website, the information or content included therein, or the services provided through it, including but not limited to errors or omissions in content, lack of portal availability, or the transmission of viruses or malicious programs.",

    "legal.s5.title": "5. APPLICABLE LAW AND JURISDICTION",
    "legal.s5.p1": "This Legal Notice is governed in all its aspects by Spanish law. For the resolution of any conflict that may arise from access to the Website, the parties expressly agree to submit to the competent Courts and Tribunals in accordance with current regulations.",

    "legal.s6.title": "6. MODIFICATIONS",
    "legal.s6.p1": "Kinetora Studio S.L. reserves the right to make, without prior notice, such modifications as it deems appropriate to the Website, being able to change, delete or add both the content and services provided through it and the way in which these appear presented or located on the Website.",

    // Privacy Policy
    "privacy.title": "PRIVACY POLICY",
    "privacy.subtitle": "Your privacy matters to us. Here we explain how we process your personal data.",
    
    "privacy.s1.title": "1. DATA CONTROLLER",
    "privacy.s1.l1.label": "Controller",
    "privacy.s1.l1.value": "Kinetora Studio S.L.",
    "privacy.s1.l2.label": "Email",
    "privacy.s1.l2.value": "hola@kinetora.tech",
    "privacy.s1.l3.label": "Activity",
    "privacy.s1.l3.value": "Creative agency for design, development and digital strategy",
    "privacy.s2.title": "2. DATA WE COLLECT",
    "privacy.s2.p1": "We collect different types of personal information when you interact with us:",
    "privacy.s2.subtitle1": "Directly provided data:",
    "privacy.s2.l1": "Full name",
    "privacy.s2.l2": "Email address",
    "privacy.s2.l3": "Company name",
    "privacy.s2.l4": "Project information and budget",
    "privacy.s2.l5": "Messages and contact information",
    "privacy.s2.subtitle2": "Browsing data:",
    "privacy.s2.p2": "Technical access data such as IP address, browser type, pages visited and time spent, collected through cookies and similar technologies as per our Cookie Policy.",
    "privacy.s3.title": "3. PURPOSES AND LEGAL BASIS FOR PROCESSING",
    "privacy.s3.l1": "Managing contact requests and proposals: Legitimate interest / Consent (3 years)",
    "privacy.s3.l2": "Newsletter and commercial communications: Explicit consent (Until withdrawal)",
    "privacy.s3.l3": "Website analysis and improvement: Legitimate interest (26 months)",
    "privacy.s3.l4": "Compliance with legal obligations: Legal obligation (As per regulations)",
    "privacy.s4.title": "4. DATA RECIPIENTS",
    "privacy.s4.p1": "We do not sell or transfer your personal data to third parties. Processors: hosting, Google Analytics (anonymized IP), ClickUp, Slack.",
    "privacy.s5.title": "5. INTERNATIONAL TRANSFERS",
    "privacy.s5.p1": "Appropriate safeguards (SCCs) for providers outside the EEA.",
    "privacy.s6.title": "6. YOUR RIGHTS",
    "privacy.s6.p1": "Access, Rectification, Erasure, Objection, Restriction, Portability. Email: hola@kinetora.tech. Complaint with AEPD (www.aepd.es).",
    "privacy.s7.title": "7. DATA SECURITY",
    "privacy.s7.p1": "Technical and organizational measures as per GDPR and LOPDGDD.",

    // Cookie Policy
    "cookie.title": "COOKIE POLICY",
    "cookie.subtitle": "Information about the cookies we use and how you can manage them.",
    
    "cookie.s1.title": "1. WHAT ARE COOKIES?",
    "cookie.s1.p1": "Small text files for website functioning, improvement and analysis.",
    "cookie.s2.title": "2. TYPES OF COOKIES",
    "cookie.s2.p1": "Technical (necessary), Functional, Analytical.",

    "cookie.types.tech": "Technical (necessary)",
    "cookie.types.func": "Functional",
    "cookie.types.anal": "Analytical",

    "cookie.s3.title": "3. COOKIES USED",
    "cookie.s3.l1": "Name: _ga, _gid, _gat | Type: Analytical | Provider: Google Analytics | Purpose: User behavior analysis | Duration: 2 years / 24h / 1 min",
    "cookie.s3.l2": "Name: cookieconsent_status | Type: Technical | Provider: Own | Purpose: Remember cookie consent | Duration: 1 year",

    "cookie.table.name": "NAME",
    "cookie.table.type": "TYPE",
    "cookie.table.provider": "PROVIDER",
    "cookie.table.purpose": "PURPOSE",
    "cookie.table.duration": "DURATION",

    "cookie.table.row1.name": "_ga, _gid, _gat",
    "cookie.table.row1.type": "Analytical",
    "cookie.table.row1.provider": "Google Analytics",
    "cookie.table.row1.purpose": "User behavior analysis",
    "cookie.table.row1.duration": "2 years / 24h / 1 min",

    "cookie.table.row2.name": "cookieconsent_status",
    "cookie.table.row2.type": "Technical",
    "cookie.table.row2.provider": "Own",
    "cookie.table.row2.purpose": "Remember cookie consent",
    "cookie.table.row2.duration": "1 year",

    "cookie.s4.title": "4. HOW TO MANAGE COOKIES",
    "cookie.s4.p1": "Instructions for Chrome, Firefox, Safari, Edge, Opera.",
    "cookie.manage.chrome": "Chrome",
    "cookie.manage.firefox": "Firefox",
    "cookie.manage.safari": "Safari",
    "cookie.manage.edge": "Edge",
    "cookie.manage.opera": "Opera",

    "cookie.s5.title": "5. UPDATES",
    "cookie.s5.p1": "Periodic reviews to reflect changes in usage.",

    // Social Media Privacy Policy
    "social.title": "SOCIAL MEDIA PRIVACY POLICY",
    "social.subtitle": "Information about how we manage privacy on our social media pages and profiles.",
    
    "social.s1.title": "1. OUR SOCIAL MEDIA PROFILES",
    "social.s1.p1": "Active presence on: Instagram, TikTok, X (Twitter), YouTube, Facebook (@kinetora_studio / Kinetora Studio).",
    
    "social.profile.ig": "Instagram",
    "social.profile.tk": "TikTok",
    "social.profile.x": "X (Twitter)",
    "social.profile.yt": "YouTube",
    "social.profile.fb": "Facebook",
    "social.profile.handle": "@kinetora_studio",

    "social.s2.title": "2. RESPONSIBILITY AND DATA PROCESSING",
    "social.s2.p1": "Platforms are responsible per their policies. Kinetora Studio S.L. is controller only for direct interactions (messages, comments). No data extraction without consent.",
    "social.s3.title": "3. PURPOSE OF SOCIAL MEDIA USE",
    "social.s3.p1": "Publish content, interact, respond to inquiries, promote services and share success cases."
  },
};