"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type RequestStatus = "completed" | "in-progress" | "review";
export type Priority = "alta" | "media" | "baja";

export type ActivityItem = {
  type: "done" | "review" | "progress" | "update" | "note" | "file";
  text: string;
  time: string;
};

export type Attachment = { id: string; name: string; url: string; kind: "image" | "file" };

export type Comment = { id: string; author: string; text: string; time: string };

export type RequestItem = {
  id: string;
  title: string;
  service: string;
  status: RequestStatus;
  date: string; // ISO date
  priority: Priority;
  description: string;
  attachments: Attachment[];
  comments: Comment[];
  activity: ActivityItem[];
};

type RequestsContextValue = {
  items: RequestItem[];
  getById: (id: string | undefined) => RequestItem | undefined;
  updateFields: (id: string, changes: Partial<Pick<RequestItem, "title" | "status" | "priority" | "date" | "description">>) => void;
  addAttachments: (id: string, files: Attachment[]) => void;
  removeAttachment: (id: string, attId: string) => void;
  addComment: (id: string, comment: Comment) => void;
  deleteComment: (id: string, commentId: string) => void;
  addActivity: (id: string, activity: ActivityItem) => void;
  createRequest: (data: { title: string; service: string; status: RequestStatus; date: string; priority: Priority; description: string }) => string;
};

const RequestsContext = createContext<RequestsContextValue | null>(null);

const nowLabel = () => {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `Hoy, ${hh}:${mm}`;
};

const generateRequestId = (existing: Set<string>) => {
  const make = () => `REQ-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  let id = make();
  while (existing.has(id)) id = make();
  return id;
};

const initialRequests: RequestItem[] = [
  {
    id: "REQ-001",
    title: "Diseño de Landing Page",
    service: "UX/UI Design",
    status: "in-progress",
    date: "2025-01-12",
    priority: "alta",
    description:
      "Rediseño completo de la landing orientado a conversión. Enfoque en hero más directo, beneficios claros y prueba social. Favor revisar también la versión móvil.",
    attachments: [
      { id: "att-1", name: "wireframe-home.png", url: "/assets/portfolio/elixir-token.webp", kind: "image" },
      { id: "att-2", name: "hero-variant-b.png", url: "/assets/portfolio/cybertitans-clash.webp", kind: "image" },
    ],
    comments: [
      { id: "c1", author: "Kinetora Team", text: "¡Primera entrega lista en el tablero!", time: "Ayer, 17:05" },
    ],
    activity: [
      { type: "progress", text: "Bocetos iniciales listos", time: "Ayer, 12:30" },
      { type: "review", text: "Primera entrega enviada", time: "Ayer, 17:05" },
      { type: "done", text: "Landing Page completada", time: "Hoy, 10:20" },
    ],
  },
  {
    id: "REQ-002",
    title: "Vídeo AD para Instagram",
    service: "Motion Graphics",
    status: "review",
    date: "2025-01-14",
    priority: "media",
    description:
      "Animación 15s formato vertical. Referencia de ritmo: anuncios de marketplaces tech. Entrega en 1080x1920, H.264.",
    attachments: [{ id: "att-3", name: "ad-storyboard.png", url: "/assets/portfolio/chronosworlds.webp", kind: "image" }],
    comments: [],
    activity: [
      { type: "progress", text: "Storyboard validado", time: "Ayer, 16:12" },
      { type: "review", text: "Versión v2 en revisión", time: "Hoy, 09:50" },
    ],
  },
  {
    id: "REQ-003",
    title: "Pitch Deck para Inversores",
    service: "Branding",
    status: "completed",
    date: "2025-01-08",
    priority: "alta",
    description:
      "Deck de 12-14 diapositivas para ronda Seed. Mantener consistencia con marca Kinetora. Énfasis en tracción y hoja de ruta.",
    attachments: [],
    comments: [],
    activity: [{ type: "progress", text: "Plantilla base creada", time: "Hoy, 08:15" }],
  },
  {
    id: "REQ-004",
    title: "Rediseño de Logo",
    service: "Branding",
    status: "in-progress",
    date: "2025-01-18",
    priority: "baja",
    description: "Evolución del logotipo con variantes para dark/light y favicons.",
    attachments: [],
    comments: [],
    activity: [],
  },
  {
    id: "REQ-005",
    title: "Desarrollo Web E-commerce",
    service: "Desarrollo Web",
    status: "completed",
    date: "2025-01-10",
    priority: "media",
    description: "MVP de e-commerce con catálogo, carrito y checkout.",
    attachments: [],
    comments: [],
    activity: [],
  },
];

export const RequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<RequestItem[]>(() => {
    const used = new Set<string>();
    return initialRequests.map((r) => {
      const id = generateRequestId(used);
      used.add(id);
      return { ...r, id };
    });
  });

  const getById = (id?: string) => items.find((r) => r.id === id);

  const updateFields: RequestsContextValue["updateFields"] = (id, changes) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, ...changes } : r)));
  };

  const addAttachments: RequestsContextValue["addAttachments"] = (id, files) => {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, attachments: [...files, ...r.attachments] } : r))
    );
    addActivity(id, { type: "file", text: `${files.length} archivo(s) subido(s)`, time: nowLabel() });
  };

  const removeAttachment: RequestsContextValue["removeAttachment"] = (id, attId) => {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, attachments: r.attachments.filter((a) => a.id !== attId) } : r))
    );
    addActivity(id, { type: "file", text: "Adjunto eliminado", time: nowLabel() });
  };

  const addComment: RequestsContextValue["addComment"] = (id, comment) => {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, comments: [comment, ...r.comments] } : r))
    );
    addActivity(id, { type: "note", text: "Nueva nota añadida", time: nowLabel() });
  };

  const deleteComment: RequestsContextValue["deleteComment"] = (id, commentId) => {
    setItems((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, comments: r.comments.filter((c) => c.id !== commentId) } : r
      )
    );
    addActivity(id, { type: "note", text: "Nota eliminada", time: nowLabel() });
  };

  const addActivity: RequestsContextValue["addActivity"] = (id, activity) => {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, activity: [activity, ...r.activity] } : r))
    );
  };

  // Generador de ID aleatoria legible; respeta IDs existentes
  const createRequest: RequestsContextValue["createRequest"] = (data) => {
    const used = new Set(items.map((r) => r.id));
    const newId = generateRequestId(used);

    const newItem: RequestItem = {
      id: newId,
      title: data.title,
      service: data.service,
      status: data.status,
      date: data.date,
      priority: data.priority,
      description: data.description,
      attachments: [],
      comments: [],
      activity: [{ type: "progress", text: "Request creado", time: nowLabel() }],
    };

    setItems((prev) => [newItem, ...prev]);
    return newId;
  };

  const value: RequestsContextValue = useMemo(
    () => ({
      items,
      getById,
      updateFields,
      addAttachments,
      removeAttachment,
      addComment,
      deleteComment,
      addActivity,
      createRequest,
    }),
    [items]
  );

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
};

export const useRequestsContext = () => {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error("useRequestsContext must be used within RequestsProvider");
  return ctx;
};