EN de HTML: detecta español y reemplaza texto en nodos preservando mayúsculas.">
"use client";

export function isLikelySpanish(text: string) {
  const probes = [
    /\b(el|la|los|las)\b/i,
    /\b(de|del|para|con|sin|sobre|entre)\b/i,
    /\b(y|o|pero|porque)\b/i,
    /\b(campaña|lanzamiento|ventas|impacto|equipo|proyecto|resultado|objetivo)\b/i,
  ];
  let hits = 0;
  probes.forEach((r) => {
    if (r.test(text)) hits++;
  });
  return hits >= 2;
}

type Pair = [RegExp, string];

function buildPairs(): Pair[] {
  const entries: Array<[string, string]> = [
    // frecuentes
    ["campaña", "campaign"],
    ["lanzamiento", "launch"],
    ["global", "global"],
    ["ventas", "sales"],
    ["impacto orgánico", "organic reach"],
    ["impacto", "impact"],
    ["recaudación", "funding"],
    ["rebranding", "rebrand"],
    ["identidad visual", "visual identity"],
    ["identidad", "identity"],
    ["dirección de arte", "art direction"],
    ["narrativa", "narrative"],
    ["equipo", "team"],
    ["resultado", "result"],
    ["resultados", "results"],
    ["objetivo", "goal"],
    ["objetivos", "goals"],
    ["estrategia", "strategy"],
    ["producto", "product"],
    ["marca", "brand"],
    ["contenido", "content"],
    ["creatividades", "creatives"],
    ["piezas", "assets"],
    ["piezas audiovisuales", "audiovisual assets"],
    ["web", "web"],
    ["sitio web", "website"],
    ["redes sociales", "social media"],
    ["torneo", "tournament"],
    ["eSports", "eSports"],
    ["UX/UI", "UX/UI"],
    ["experiencia", "experience"],
    ["usuarios", "users"],
    ["ganadores", "winners"],
    ["participantes", "participants"],
    ["alcance", "reach"],
    ["impresiones", "impressions"],
    ["vistas", "views"],
    ["token", "token"],
    ["airdrop", "airdrop"],
    ["serie", "series"],
    ["series", "series"],
    // conectores
    ["con", "with"],
    ["sin", "without"],
    ["para", "for"],
    ["y", "and"],
    ["o", "or"],
    ["pero", "but"],
    // frases comunes
    ["campaña de lanzamiento", "launch campaign"],
    ["lanzamiento global", "global launch"],
    ["sistema visual", "visual system"],
    ["sistema de diseño", "design system"],
    ["alto impacto", "high-impact"],
  ];

  // Orden: más largas primero para evitar solapamientos
  entries.sort((a, b) => b[0].length - a[0].length);

  return entries.map(([es, en]) => [new RegExp(`\\b${escapeRegExp(es)}\\b`, "gi"), en]);
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function preserveCaseLike(source: string, target: string) {
  // Si la fuente es mayoritariamente mayúsculas, devolver en mayúsculas.
  const letters = source.replace(/[^a-zA-Z]/g, "");
  const upperRatio = letters ? letters.replace(/[^A-Z]/g, "").length / letters.length : 0;
  if (upperRatio > 0.6) return target.toUpperCase();

  // Si empieza en mayúscula, capitaliza la traducción
  if (/^[A-ZÁÉÍÓÚÜÑ]/.test(source.trim())) {
    return target.charAt(0).toUpperCase() + target.slice(1);
  }
  return target;
}

const PAIRS = buildPairs();

export function translateHtmlEsToEn(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node: any) => {
      // omitir textos vacíos o sólo espacios
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      // omitir code/pre
      const p = (node.parentElement || node.parentNode) as HTMLElement | null;
      if (!p) return NodeFilter.FILTER_ACCEPT;
      const tag = p.tagName?.toLowerCase();
      if (tag === "code" || tag === "pre" || tag === "script" || tag === "style") {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  } as any);

  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  nodes.forEach((n) => {
    const original = n.nodeValue || "";
    if (!isLikelySpanish(original)) return;
    let out = original;
    PAIRS.forEach(([re, en]) => {
      out = out.replace(re, (m) => preserveCaseLike(m, en));
    });
    n.nodeValue = out;
  });

  return doc.body.innerHTML;
}