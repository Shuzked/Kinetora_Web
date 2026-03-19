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
    "legal.s6.p1": "Kinetora Studio S.L. se reserva el derecho de efectuar, sin previo aviso, las modificaciones que considere oportunas en el Sitio Web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios prestados a través del mismo como la forma en la que éstos aparezcan presentados o localizados en el Sitio Web."
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
    "legal.s6.p1": "Kinetora Studio S.L. reserves the right to make, without prior notice, such modifications as it deems appropriate to the Website, being able to change, delete or add both the content and services provided through it and the way in which these appear presented or located on the Website."
  },
};