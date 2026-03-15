export type Deliverable = {
  id: string;
  requestId: string;
  name: string;
  category: string;
  size: string;
  date: string;
  previewUrl: string;
  kind: "figma" | "video" | "pdf" | "zip";
};

export const deliverables: Deliverable[] = [
  {
    id: "DEL-001",
    requestId: "REQ-001",
    name: "Landing_Page_Final.fig",
    category: "Landing Page",
    size: "12.5 MB",
    date: "15 Ene 2025",
    previewUrl: "/assets/portfolio/elixir-token.webp",
    kind: "figma",
  },
  {
    id: "DEL-002",
    requestId: "REQ-002",
    name: "Instagram_AD_v2.mp4",
    category: "Vídeo AD",
    size: "45.2 MB",
    date: "16 Ene 2025",
    previewUrl: "/assets/portfolio/cybertitans-clash.webp",
    kind: "video",
  },
  {
    id: "DEL-003",
    requestId: "REQ-003",
    name: "Pitch_Deck_Inversores.pdf",
    category: "Pitch Deck",
    size: "8.7 MB",
    date: "17 Ene 2025",
    previewUrl: "/assets/portfolio/chronosworlds.webp",
    kind: "pdf",
  },
  {
    id: "DEL-004",
    requestId: "REQ-004",
    name: "Logo_Kinetora_Pack.zip",
    category: "Branding",
    size: "25.1 MB",
    date: "10 Ene 2025",
    previewUrl: "/assets/portfolio/dunk-elixir.webp",
    kind: "zip",
  },
  {
    id: "DEL-005",
    requestId: "REQ-005",
    name: "Web_Ecommerce_Assets.zip",
    category: "Desarrollo Web",
    size: "67.3 MB",
    date: "10 Ene 2025",
    previewUrl: "/assets/portfolio/elixir-token.webp",
    kind: "zip",
  },
  {
    id: "DEL-006",
    requestId: "REQ-003",
    name: "Social_Media_Templates.fig",
    category: "Social Media",
    size: "18.9 MB",
    date: "12 Ene 2025",
    previewUrl: "/assets/portfolio/cybertitans-clash.webp",
    kind: "figma",
  },
];