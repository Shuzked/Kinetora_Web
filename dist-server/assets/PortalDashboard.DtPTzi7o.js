import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, CheckCircle2, Eye, Play, ChevronRight, ChevronDown, MoreHorizontal, Plus, GripVertical, Calendar, User, Flag, X, Layout, Share2, Trash2, MoreVertical, Type, CheckCircle, Hash, Paperclip, Zap, Circle, MessageSquare, History, Send, Smile, AtSign, Layers, ExternalLink, FileText, LayoutDashboard, Check, Search, List, LayoutGrid } from "lucide-react";
import { D as DropdownMenu, a as DropdownMenuTrigger, B as Button, b as DropdownMenuContent, c as DropdownMenuItem, d as cn } from "./entry-server.Dn9wYq1J.js";
import { D as Dialog, d as DialogTrigger, a as DialogContent } from "./dialog.CJU_-n7m.js";
import { I as Input } from "./input.CW1Cl7I9.js";
import { toast } from "sonner";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { T as Textarea } from "./textarea.CSHtzsiz.js";
import { io } from "socket.io-client";
import { B as Badge } from "./badge.DpnaAtNe.js";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "stream";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-slot";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "lenis";
import "react-dom";
const statusIcons = {
  "OPEN": Clock,
  "IN_SPRINT": Play,
  "IN_REVIEW": Eye,
  "DONE": CheckCircle2,
  "DEFAULT": Clock
};
const TaskCard = ({
  task,
  statusColor,
  statuses,
  onClick,
  onSelect,
  onMove
}) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95 },
      whileHover: { y: -2, transition: { duration: 0.2 } },
      className: cn(
        "group relative p-4 rounded-xl border border-white/5 bg-[#141414] cursor-pointer transition-all duration-300",
        "hover:border-white/20 hover:bg-[#1A1A1A]",
        task.selected && "border-[#B454FF]/50 bg-[#B454FF]/5 ring-1 ring-[#B454FF]/20"
      ),
      onClick,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: task.selected || false,
              onChange: onSelect,
              onClick: (e) => e.stopPropagation(),
              className: "mt-1 w-3.5 h-3.5 rounded border-white/10 bg-white/5 checked:bg-[#B454FF] cursor-pointer"
            }
          ),
          /* @__PURE__ */ jsx("h4", { className: "text-[12px] font-bold text-white group-hover:text-[#B454FF] transition-colors line-clamp-2 leading-snug flex-1", children: task.title })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: cn(
              "w-1.5 h-1.5 rounded-full",
              task.priority === "URGENT" ? "bg-red-500" : task.priority === "HIGH" ? "bg-orange-500" : task.priority === "MED" ? "bg-blue-400" : "bg-white/20"
            ) }),
            /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => e.stopPropagation(),
                  className: "p-1 hover:bg-white/5 rounded-md transition-colors",
                  children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-3 h-3 text-white/20 group-hover:text-white/40" })
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "bg-[#141414] border-white/10", children: [
                /* @__PURE__ */ jsx("div", { className: "p-2 border-b border-white/5 mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-white/20 uppercase tracking-widest pl-1", children: "Mover a..." }) }),
                statuses.filter((s) => s.id !== task.statusId).map((s) => /* @__PURE__ */ jsx(
                  DropdownMenuItem,
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      onMove(task.id, s.id, task.statusId);
                    },
                    className: "text-[10px] font-bold text-white/60 hover:text-[#B454FF]",
                    children: s.label
                  },
                  s.id
                ))
              ] })
            ] }),
            task.deadline_final && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-white/30 uppercase tracking-tighter ml-1", children: new Date(task.deadline_final).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) })
          ] }),
          task.subtasks && task.subtasks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "text-[9px] font-black text-white/20", children: [
            task.subtasks.filter((s) => s.isDone).length,
            "/",
            task.subtasks.length
          ] })
        ] })
      ]
    }
  );
};
const TaskBoard = ({
  tasks,
  statuses,
  onTaskClick,
  onUpdateTask,
  onUpdateStatus,
  onCreateTask,
  onSelectTask
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-6 overflow-x-auto pb-8 no-scrollbar min-h-[70vh] items-start", children: [
    statuses.map((status) => {
      const filteredTasks = tasks.filter((t) => t.statusId === status.id);
      const Icon = statusIcons[status.id] || statusIcons.DEFAULT;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex-shrink-0 transition-all duration-500",
            status.isCollapsed ? "w-12" : "w-80"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between group", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex items-center gap-2 cursor-pointer",
                  onClick: () => onUpdateStatus(status.id, { isCollapsed: !status.isCollapsed }),
                  children: status.isCollapsed ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 py-4", children: [
                    /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-white/20" }),
                    /* @__PURE__ */ jsx("div", { className: "h-px w-4 bg-white/10" }),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap rotate-90 origin-left ml-4",
                        style: { color: status.color },
                        children: status.label
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-white/20" }),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border flex items-center gap-2",
                        style: {
                          backgroundColor: `${status.color}15`,
                          color: status.color,
                          borderColor: `${status.color}30`
                        },
                        children: [
                          /* @__PURE__ */ jsx(Icon, { className: "w-3.5 h-3.5" }),
                          status.label
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-white/20", children: filteredTasks.length })
                  ] })
                }
              ),
              !status.isCollapsed && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7 rounded-lg hover:bg-white/5", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-4 h-4 text-white/20" }) }) }),
                /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "bg-[#141414] border-white/10 text-white", children: [
                  /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => {
                    const newName = prompt("Nuevo nombre:", status.label);
                    if (newName) onUpdateStatus(status.id, { label: newName });
                  }, children: "Renombrar" }),
                  /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => onUpdateStatus(status.id, { isCollapsed: true }), children: "Contraer" })
                ] })
              ] }) })
            ] }),
            !status.isCollapsed && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filteredTasks.map((task) => /* @__PURE__ */ jsx(
                TaskCard,
                {
                  task,
                  statusColor: status.color,
                  statuses,
                  onClick: () => onTaskClick(task),
                  onSelect: (e) => onSelectTask(task.id, e.target.checked),
                  onMove: (taskId, newStatusId, oldStatusId) => {
                    onUpdateTask(taskId, { statusId: newStatusId }, "status", oldStatusId, newStatusId);
                  }
                },
                task.id
              )) }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => onCreateTask(status.id),
                  className: "w-full py-3 rounded-xl border border-dashed border-white/5 text-white/10 hover:text-[#B454FF]/60 hover:border-[#B454FF]/20 hover:bg-[#B454FF]/5 transition-all flex items-center justify-center gap-2 group",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 group-hover:scale-110 transition-transform" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: "Nueva Tarea" })
                  ]
                }
              )
            ] })
          ]
        },
        status.id
      );
    }),
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-80", children: /* @__PURE__ */ jsxs("button", { className: "w-full h-12 rounded-xl border border-dashed border-white/5 text-white/20 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2 group", children: [
      /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: "Añadir Estado" })
    ] }) })
  ] });
};
const PriorityFlag = ({ priority }) => {
  const colors = {
    URGENT: "text-red-500",
    HIGH: "text-orange-500",
    MED: "text-blue-400",
    LOW: "text-white/20"
  };
  return /* @__PURE__ */ jsx(Flag, { className: cn("w-3.5 h-3.5", colors[priority]) });
};
const TaskListView = ({
  tasks,
  statuses,
  onTaskClick,
  onUpdateTask,
  onUpdateStatus,
  onCreateTask,
  onSelectTask
}) => {
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [isAddingInStatus, setIsAddingInStatus] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const handleQuickAdd = (statusId) => {
    if (!newTitle.trim()) {
      setIsAddingInStatus(null);
      return;
    }
    onCreateTask(statusId, newTitle);
    setNewTitle("");
    setIsAddingInStatus(null);
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-6 pb-20 select-none animate-in fade-in duration-500", children: statuses.map((status) => {
    const groupTasks = tasks.filter((t) => t.statusId === status.id);
    return /* @__PURE__ */ jsxs("div", { className: "group/section mb-4", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-2 h-8 px-1 group/header cursor-pointer group-hover/section:translate-x-0.5 transition-transform duration-200",
          onClick: () => onUpdateStatus(status.id, { isCollapsed: !status.isCollapsed }),
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "w-5 h-5 flex items-center justify-center rounded transition-all duration-200 hover:bg-white/5",
                  status.isCollapsed ? "-rotate-90" : "rotate-0 text-[#B454FF]"
                ),
                children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "px-2.5 py-0.5 rounded-[4px] text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-1.5 transition-all",
                style: { backgroundColor: status.color, color: "#FFFFFF" },
                children: [
                  status.label,
                  /* @__PURE__ */ jsx("span", { className: "opacity-60 text-[9px] font-bold", children: groupTasks.length })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "opacity-0 group-hover/header:opacity-100 transition-opacity ml-1 flex items-center gap-1", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => e.stopPropagation(),
                  className: "p-1 hover:bg-white/10 rounded transition-colors",
                  children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-3 h-3 text-white/40" })
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "bg-[#1A1A1A] border-white/10 text-white min-w-[140px] shadow-2xl", children: [
                /* @__PURE__ */ jsx(
                  DropdownMenuItem,
                  {
                    className: "text-[11px] font-bold py-2 focus:bg-[#B454FF]/20",
                    onClick: () => {
                      const n = prompt("Nuevo nombre del estado:", status.label);
                      if (n) onUpdateStatus(status.id, { label: n });
                    },
                    children: "Renombrar"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "h-px bg-white/5 mx-1 my-1" }),
                /* @__PURE__ */ jsxs("div", { className: "px-2 py-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-white/20 uppercase tracking-widest pl-1", children: "Color" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 mt-2 flex-wrap", children: ["#B454FF", "#F97316", "#22C55E", "#FFFFFF", "#EF4444"].map((c) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => onUpdateStatus(status.id, { color: c }),
                      className: cn(
                        "w-4 h-4 rounded-full border border-white/10 group/color transition-transform hover:scale-125",
                        status.color === c && "ring-2 ring-white/40 ring-offset-1 ring-offset-black"
                      ),
                      style: { backgroundColor: c }
                    },
                    c
                  )) })
                ] })
              ] })
            ] }) })
          ]
        }
      ),
      !status.isCollapsed && /* @__PURE__ */ jsxs("div", { className: "ml-1 border-l-2 border-white/[0.03] transition-all duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[34px_1fr_100px_110px_90px] gap-0 px-0 h-8 items-center border-b border-white/[0.05] text-[10px] font-bold text-white/20 uppercase tracking-tighter bg-transparent", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center h-full items-center", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ jsx("div", { className: "px-3 h-full flex items-center", children: "Nombre de la Petición" }),
          /* @__PURE__ */ jsx("div", { className: "text-center h-full flex items-center justify-center hidden sm:flex", children: "Vencimiento" }),
          /* @__PURE__ */ jsx("div", { className: "text-center h-full flex items-center justify-center hidden lg:flex", children: "Asignados" }),
          /* @__PURE__ */ jsx("div", { className: "text-center h-full flex items-center justify-center", children: "Prioridad" })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: groupTasks.map((task) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            layout: true,
            initial: { opacity: 0, x: -5 },
            animate: { opacity: 1, x: 0 },
            className: cn(
              "grid grid-cols-[34px_1fr_100px_110px_90px] gap-0 items-center border-b border-white/[0.03] group/row transition-all duration-150 h-[38px]",
              "hover:bg-[#B454FF]/[0.02] bg-transparent",
              task.selected && "bg-[#B454FF]/[0.05] border-l-2 border-l-[#B454FF]"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center h-full relative group-hover/row:bg-white/[0.03] transition-colors", children: [
                /* @__PURE__ */ jsx(GripVertical, { className: "absolute left-0 w-3 h-3 text-white/0 group-hover/row:text-white/10 cursor-grab active:cursor-grabbing" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: task.selected || false,
                    onChange: (e) => onSelectTask(task.id, e.target.checked),
                    className: "w-3.5 h-3.5 rounded-[3px] border-white/20 bg-transparent accent-[#B454FF] cursor-pointer"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "px-3 flex items-center gap-2.5 h-full min-w-0", children: [
                editingTitleId === task.id ? /* @__PURE__ */ jsx(
                  Input,
                  {
                    autoFocus: true,
                    value: task.title,
                    className: "h-full bg-transparent border-none text-[12px] font-medium text-white focus-visible:ring-0 p-0 shadow-none",
                    onBlur: () => setEditingTitleId(null),
                    onChange: (e) => onUpdateTask(task.id, { title: e.target.value }),
                    onKeyDown: (e) => e.key === "Enter" && setEditingTitleId(null)
                  }
                ) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "text-[12px] font-medium text-[#F5F5F5]/85 group-hover/row:text-white cursor-text truncate flex-1 tracking-tight",
                      onClick: () => setEditingTitleId(task.id),
                      children: task.title
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => onTaskClick(task),
                      className: "opacity-0 group-hover/row:opacity-100 p-1 hover:bg-[#B454FF]/10 rounded-md transition-all shrink-0",
                      children: /* @__PURE__ */ jsx(Eye, { className: "w-3 h-3 text-[#B454FF]" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 shrink-0 opacity-0 group-hover/row:opacity-40 transition-opacity", children: task.subtasks && task.subtasks.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 bg-white/5 rounded", children: /* @__PURE__ */ jsxs("span", { className: task.subtasks.every((s) => s.isDone) ? "text-emerald-400" : "text-[#B454FF]/80", children: [
                  task.subtasks.filter((s) => s.isDone).length,
                  "/",
                  task.subtasks.length
                ] }) }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center h-full items-center hidden sm:flex", children: task.deadline_final ? /* @__PURE__ */ jsx("div", { className: cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-colors",
                new Date(task.deadline_final) < /* @__PURE__ */ new Date() ? "text-red-400" : "text-white/30"
              ), children: new Date(task.deadline_final).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) }) : /* @__PURE__ */ jsx("button", { className: "opacity-0 group-hover/row:opacity-60 p-1.5 rounded hover:bg-white/5", children: /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3 text-white/20" }) }) }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center h-full items-center hidden lg:flex", children: /* @__PURE__ */ jsxs("div", { className: "flex -space-x-1.5", children: [
                [1].map((a) => /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border border-black bg-[#1A1A1A] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer ring-1 ring-white/5", children: /* @__PURE__ */ jsx(User, { className: "w-2.5 h-2.5 text-white/30" }) }, a)),
                /* @__PURE__ */ jsx("button", { className: "w-5 h-5 rounded-full border border-dashed border-white/10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 hover:bg-white/5 transition-all", children: /* @__PURE__ */ jsx(Plus, { className: "w-2.5 h-2.5 text-white/20" }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-center h-full items-center", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { className: "p-1 px-3 hover:bg-white/5 rounded transition-all opacity-80 hover:opacity-100", children: /* @__PURE__ */ jsx(PriorityFlag, { priority: task.priority }) }) }),
                /* @__PURE__ */ jsx(DropdownMenuContent, { className: "bg-[#1A1A1A] border-white/10 text-white min-w-[120px]", children: ["URGENT", "HIGH", "MED", "LOW"].map((p) => /* @__PURE__ */ jsxs(
                  DropdownMenuItem,
                  {
                    onClick: () => onUpdateTask(task.id, { priority: p }),
                    className: "gap-2 py-2",
                    children: [
                      /* @__PURE__ */ jsx(PriorityFlag, { priority: p }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold capitalize", children: p.toLowerCase() })
                    ]
                  },
                  p
                )) })
              ] }) })
            ]
          },
          task.id
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center h-[38px] group/addrow border-b border-white/[0.03]", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[34px] h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 text-white/10 group-hover/addrow:text-[#B454FF] transition-all" }) }),
          /* @__PURE__ */ jsx("div", { className: "px-3 h-full flex-1 flex items-center", children: isAddingInStatus === status.id ? /* @__PURE__ */ jsx(
            Input,
            {
              autoFocus: true,
              value: newTitle,
              placeholder: "Escribe el nombre de la tarea y pulsa Enter...",
              className: "h-full bg-transparent border-none text-[12px] font-medium text-white focus-visible:ring-0 p-0 placeholder:text-white/10",
              onBlur: () => handleQuickAdd(status.id),
              onChange: (e) => setNewTitle(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") handleQuickAdd(status.id);
                else if (e.key === "Escape") {
                  setIsAddingInStatus(null);
                  setNewTitle("");
                }
              }
            }
          ) : /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsAddingInStatus(status.id),
              className: "text-[12px] font-medium text-white/[0.08] hover:text-white/30 transition-colors w-full text-left",
              children: "Nueva Petición"
            }
          ) })
        ] })
      ] })
    ] }, status.id);
  }) });
};
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
const TaskDrawer = ({ task, isOpen, onClose, onUpdate, statuses }) => {
  var _a, _b, _c, _d;
  const [editedTask, setEditedTask] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [activeTab, setActiveTab] = useState("COMMENTS");
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  useEffect(() => {
    if (isOpen && task) {
      setComments([]);
      socketRef.current = io("http://localhost:3001");
      socketRef.current.emit("join-task", task.id);
      socketRef.current.on("new-comment", (comment) => {
        setComments((prev) => [...prev, comment]);
      });
      return () => {
        var _a2;
        (_a2 = socketRef.current) == null ? void 0 : _a2.disconnect();
      };
    }
  }, [isOpen, task == null ? void 0 : task.id]);
  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);
  if (!task) return null;
  const currentStatus = statuses.find((s) => s.id === task.statusId);
  const handleUpdateField = (field, newValue, oldValue, changeType) => {
    if (newValue === oldValue) return;
    const updates = { [field]: newValue };
    onUpdate(task.id, updates);
    if (socketRef.current) {
      socketRef.current.emit("update-task", {
        taskId: task.id,
        updates,
        changeType,
        oldValue,
        newValue,
        userId: 1
      });
    }
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setEditedTask({ ...editedTask, description: value });
    const lastChar = value[e.target.selectionStart - 1];
    if (lastChar === "/") {
      setShowSlashCommands(true);
      setCursorPosition({ top: 200, left: 100 });
    } else {
      setShowSlashCommands(false);
    }
  };
  const handleSendComment = () => {
    if (!newComment.trim() || !socketRef.current) return;
    const data = {
      taskId: task.id,
      text: newComment,
      sender: "Cliente",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userId: 1
    };
    socketRef.current.emit("send-comment", data);
    setNewComment("");
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", damping: 30, stiffness: 300 },
        className: "fixed top-0 right-0 h-screen w-full max-w-[90vw] md:max-w-[1200px] bg-[#0A0A0A] border-l border-white/5 z-[101] shadow-3xl flex flex-col overflow-hidden rounded-l-[2rem]",
        children: [
          /* @__PURE__ */ jsxs("header", { className: "h-16 flex items-center justify-between px-6 bg-[#0E0E0E] border-b border-white/5 shrink-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, className: "rounded-full hover:bg-white/10", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-white/40" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pr-6 border-r border-white/5", children: [
                /* @__PURE__ */ jsx(Layout, { className: "w-4 h-4 text-[#B454FF]" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-white/20 uppercase tracking-[0.2em]", children: [
                  "Petición #",
                  task.id
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                    style: {
                      backgroundColor: `${currentStatus == null ? void 0 : currentStatus.color}15`,
                      color: currentStatus == null ? void 0 : currentStatus.color,
                      borderColor: `${currentStatus == null ? void 0 : currentStatus.color}30`
                    },
                    children: currentStatus == null ? void 0 : currentStatus.label
                  }
                ),
                /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", className: "h-8 rounded-lg text-white/40 hover:text-white text-[10px] font-bold p-2 gap-2", children: [
                  /* @__PURE__ */ jsx(User, { className: "w-3.5 h-3.5" }),
                  "Sin asignar"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 rounded-xl hover:bg-white/5", children: /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 text-white/20" }) }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 rounded-xl hover:bg-white/5", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-white/20" }) }),
              /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-white/5 mx-1" }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-9 w-9 rounded-xl hover:bg-white/5", children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4 text-white/20" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 flex overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto bg-[#0A0A0A] custom-scrollbar scroll-smooth", children: /* @__PURE__ */ jsxs("div", { className: "p-10 md:p-16 max-w-4xl mx-auto space-y-12 pb-32", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: editedTask.title || "",
                    onChange: (e) => setEditedTask({ ...editedTask, title: e.target.value }),
                    onBlur: (e) => handleUpdateField("title", e.target.value, task.title, "content"),
                    className: "text-4xl md:text-5xl font-black bg-transparent border-none p-0 focus-visible:ring-0 text-white placeholder:text-white/[0.05] h-auto leading-[1.1] tracking-tight",
                    placeholder: "Título de la petición"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group premium-apple-button", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-amber-500" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-white/30 uppercase tracking-[0.2em]", children: "FECHA TOPE" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-white/80 group-hover:text-white", children: task.deadline_final ? new Date(task.deadline_final).toLocaleDateString("es-ES", { day: "2-digit", month: "long" }) : "Asignar fecha" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group premium-apple-button", children: [
                    /* @__PURE__ */ jsx(Flag, { className: "w-3.5 h-3.5 text-blue-500" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black text-white/30 uppercase tracking-[0.2em]", children: "PRIORIDAD" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-white/80 group-hover:text-white capitalize", children: task.priority.toLowerCase() })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 relative group", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1 h-4 bg-[#B454FF] rounded-full" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-white/40 uppercase tracking-[0.15em]", children: "Notas y Descripción" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "min-h-[400px] relative px-1", children: [
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      ref: textareaRef,
                      value: editedTask.description || "",
                      onChange: handleDescriptionChange,
                      onBlur: (e) => handleUpdateField("description", e.target.value, task.description, "content"),
                      className: "w-full h-full min-h-[400px] bg-transparent border-none p-0 focus-visible:ring-0 text-[15px] text-white/80 leading-[1.8] resize-none placeholder:text-white/10 font-medium",
                      placeholder: "Escribe '/' para insertar bloques... o describe el problema."
                    }
                  ),
                  /* @__PURE__ */ jsx(AnimatePresence, { children: showSlashCommands && /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 10, scale: 0.98 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      exit: { opacity: 0, y: 10, scale: 0.98 },
                      className: "absolute z-50 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] p-2 w-72 backdrop-blur-3xl overflow-hidden",
                      style: { top: `${cursorPosition.top}px`, left: `${cursorPosition.left}px` },
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "p-2 border-b border-white/5 mb-1 bg-white/[0.02]", children: /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-white/30 uppercase tracking-widest pl-1", children: "BLOQUES DE CLICkUP" }) }),
                        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: [
                          { icon: Type, label: "Texto", desc: "Escritura normal", shortcut: "T", color: "text-white/40" },
                          { icon: CheckCircle, label: "Checklist", desc: "Lista de tareas", shortcut: "C", color: "text-emerald-400" },
                          { icon: Hash, label: "Encabezado", desc: "Título grande", shortcut: "H", color: "text-[#B454FF]" },
                          { icon: Paperclip, label: "Adjuntos", desc: "Sube archivos", shortcut: "A", color: "text-blue-400" },
                          { icon: Zap, label: "Smart AI", desc: "Resumir con IA", shortcut: "S", color: "text-amber-400" }
                        ].map((cmd, i) => /* @__PURE__ */ jsxs(
                          "button",
                          {
                            className: "flex items-center gap-3 w-full p-2.5 hover:bg-white/5 rounded-xl transition-all group/cmd relative",
                            onClick: () => setShowSlashCommands(false),
                            children: [
                              /* @__PURE__ */ jsx("div", { className: cn("w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover/cmd:scale-110 transition-transform", cmd.color), children: /* @__PURE__ */ jsx(cmd.icon, { className: "w-4.5 h-4.5" }) }),
                              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start min-w-0", children: [
                                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-white group-hover/cmd:text-[#B454FF] transition-colors", children: cmd.label }),
                                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-white/30 truncate w-full", children: cmd.desc })
                              ] }),
                              /* @__PURE__ */ jsx("span", { className: "ml-auto text-[9px] font-black text-white/10 bg-white/5 px-1.5 py-0.5 rounded uppercase", children: cmd.shortcut })
                            ]
                          },
                          i
                        )) })
                      ]
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-6 border-t border-white/[0.03]", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center border border-[#22C55E]/20", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-[#22C55E]" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[11px] font-black text-white uppercase tracking-widest", children: "LISTA DE REQUERIMIENTOS" }),
                      /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-bold text-white/40", children: [
                        ((_a = task.subtasks) == null ? void 0 : _a.length) || 0,
                        " ITEMS EN CURSO"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-black text-[#22C55E]", children: [
                      ((_b = task.subtasks) == null ? void 0 : _b.length) ? Math.round(task.subtasks.filter((s) => s.isDone).length / task.subtasks.length * 100) : 0,
                      "%"
                    ] }) }),
                    /* @__PURE__ */ jsx("div", { className: "w-40 h-1.5 bg-white/[0.05] rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${((_c = task.subtasks) == null ? void 0 : _c.length) ? task.subtasks.filter((s) => s.isDone).length / task.subtasks.length * 100 : 0}%` },
                        className: "h-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all duration-500"
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white/[0.01] border border-white/[0.03] rounded-[2rem] p-6 space-y-1", children: [
                  (_d = task.subtasks) == null ? void 0 : _d.map((sub) => /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      className: "flex items-center gap-4 group p-3 hover:bg-white/[0.02] rounded-2xl transition-all cursor-pointer",
                      children: [
                        /* @__PURE__ */ jsx("button", { className: "shrink-0 p-1 group-hover:scale-125 transition-transform", children: sub.isDone ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-[#22C55E]" }) : /* @__PURE__ */ jsx(Circle, { className: "w-5 h-5 text-white/10 group-hover:text-white/30 transition-colors" }) }),
                        /* @__PURE__ */ jsx("span", { className: cn(
                          "text-[14px] font-medium transition-all flex-1",
                          sub.isDone ? "text-white/20 line-through" : "text-white/70 group-hover:text-white"
                        ), children: sub.title }),
                        /* @__PURE__ */ jsx("div", { className: "opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "w-8 h-8 rounded-xl hover:bg-red-500/10 text-white/10 hover:text-red-400 premium-apple-button", children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }) }) })
                      ]
                    },
                    sub.id
                  )),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-3 focus-within:bg-white/[0.02] rounded-2xl transition-all", children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 text-white/10" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        value: newSubtask,
                        onChange: (e) => setNewSubtask(e.target.value),
                        placeholder: "+ Añadir un requerimiento...",
                        className: "bg-transparent border-none p-0 focus-visible:ring-0 text-[14px] text-white/40 h-auto placeholder:text-white/5 font-medium"
                      }
                    )
                  ] })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "w-[480px] bg-[#0C0C0C] border-l border-white/5 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.2)]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex p-4 gap-2 bg-[#0C0C0C] border-b border-white/[0.03]", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setActiveTab("COMMENTS"),
                    className: cn(
                      "flex-1 flex items-center justify-center gap-2.5 h-11 rounded-[14px] text-[10px] font-black uppercase tracking-[0.15em] transition-all premium-apple-button",
                      activeTab === "COMMENTS" ? "bg-white/5 text-[#B454FF] border border-white/5" : "text-white/20 hover:text-white"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(MessageSquare, { className: "w-4 h-4" }),
                      "Feed de Chat"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setActiveTab("ACTIVITY"),
                    className: cn(
                      "flex-1 flex items-center justify-center gap-2.5 h-11 rounded-[14px] text-[10px] font-black uppercase tracking-[0.15em] transition-all premium-apple-button",
                      activeTab === "ACTIVITY" ? "bg-white/5 text-blue-400 border border-white/5" : "text-white/20 hover:text-white"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(History, { className: "w-4 h-4" }),
                      "Historial"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsx("div", { className: "p-8 pb-32 space-y-10", children: activeTab === "COMMENTS" ? /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
                comments.length === 0 && /* @__PURE__ */ jsxs("div", { className: "h-[300px] flex flex-col items-center justify-center text-center space-y-4 opacity-10", children: [
                  /* @__PURE__ */ jsx(Send, { className: "w-16 h-16" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-black uppercase tracking-widest", children: "No hay actividad aún" })
                ] }),
                comments.map((comment, i) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, className: "flex gap-4 group/msg", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#B454FF] to-[#8A2BE2] shrink-0 flex items-center justify-center text-white font-black text-xs shadow-xl ring-2 ring-white/5", children: comment.sender[0] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2.5", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between ml-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-white/40 uppercase tracking-widest", children: comment.sender }),
                      /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-white/10", children: new Date(comment.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-4 p-5 bg-white/[0.03] border border-white/[0.05] rounded-[22px] rounded-tl-none text-[13px] text-white/80 leading-relaxed relative group hover:bg-white/[0.05] transition-all", children: [
                      comment.text,
                      /* @__PURE__ */ jsx("div", { className: "absolute -right-2 top-2 opacity-0 group-hover/msg:opacity-100 transition-all hover:scale-110", children: /* @__PURE__ */ jsx(Smile, { className: "w-5 h-5 text-white/20 hover:text-[#B454FF] cursor-pointer drop-shadow-xl" }) })
                    ] })
                  ] })
                ] }, i)),
                /* @__PURE__ */ jsx("div", { ref: scrollRef })
              ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 group relative items-start", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(History, { className: "w-4 h-4 text-white/20" }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 pt-1", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-white/50 leading-tight", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-white font-bold", children: "Bot Kinetora" }),
                    " actualizó el estado a ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#B454FF] font-black", children: "IMPLEMENTACIÓN" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black text-white/10 uppercase tracking-widest", children: [
                    "Hoy a las 10:3",
                    i,
                    " AM"
                  ] }) })
                ] })
              ] }, i)) }) }) }),
              /* @__PURE__ */ jsx("div", { className: "p-6 bg-[#0E0E0E] border-t border-white/[0.05] shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "w-9 h-9 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all", children: /* @__PURE__ */ jsx(AtSign, { className: "w-4.5 h-4.5" }) }),
                  /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "w-9 h-9 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all", children: /* @__PURE__ */ jsx(Smile, { className: "w-4.5 h-4.5" }) }),
                  /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "w-9 h-9 rounded-xl text-white/20 hover:text-white hover:bg-white/5 transition-all", children: /* @__PURE__ */ jsx(Paperclip, { className: "w-4.5 h-4.5" }) }),
                  /* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-white/10 mx-2" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-white/10 uppercase tracking-widest", children: "Pulsa Enter para enviar" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      placeholder: activeTab === "COMMENTS" ? "Explica algo o menciona al equipo..." : "Anotar en bitácora...",
                      value: newComment,
                      onChange: (e) => setNewComment(e.target.value),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendComment();
                        }
                      },
                      className: "bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-5 pr-14 min-h-[120px] focus:border-[#B454FF]/30 transition-all text-sm resize-none placeholder:text-white/10 leading-relaxed font-medium"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: handleSendComment,
                      className: "absolute bottom-4 right-4 bg-[#B454FF] hover:bg-[#8A2BE2] text-white w-10 h-10 rounded-[14px] shadow-[0_10px_30px_rgba(180,84,255,0.4)] transition-all active:scale-90 premium-apple-button",
                      children: /* @__PURE__ */ jsx(Send, { className: "w-4.5 h-4.5" })
                    }
                  )
                ] })
              ] }) })
            ] })
          ] })
        ]
      }
    )
  ] }) });
};
const NewRequestForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MED");
  const [deadlineRequested, setDeadlineRequested] = useState("");
  const [driveLinks, setDriveLinks] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onSubmit({
      title,
      description,
      priority,
      deadline_requested: deadlineRequested,
      drive_links: driveLinks,
      files
    });
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-8 p-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "text-[10px] font-black text-[#B454FF] uppercase tracking-widest ml-1", children: "Título de la Petición" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "title",
            placeholder: "Ej: Rediseño de la sección Hero...",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            className: "bg-white/[0.03] border-white/5 text-white placeholder:text-white/10 h-14 rounded-2xl focus:border-[#B454FF]/40 transition-all font-bold text-lg",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "text-[10px] font-black text-white/20 uppercase tracking-widest ml-1", children: "Descripción Detallada" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "description",
            placeholder: "Describe lo que necesitas con el mayor detalle posible...",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            rows: 6,
            className: "bg-white/[0.03] border-white/5 text-white/80 placeholder:text-white/10 rounded-2xl focus:border-[#B454FF]/40 transition-all leading-relaxed",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Layers, { className: "w-3 h-3 text-amber-400" }),
            "Prioridad Inicial"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: ["LOW", "MED", "HIGH", "URGENT"].map((p) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setPriority(p),
              className: cn(
                "py-2 rounded-xl text-[9px] font-black border transition-all",
                priority === p ? "bg-[#B454FF]/20 border-[#B454FF]/40 text-[#B454FF] shadow-[0_0_15px_rgba(180,84,255,0.2)]" : "bg-white/[0.02] border-white/5 text-white/20 hover:border-white/20"
              ),
              children: p
            },
            p
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "deadline", className: "text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3 text-[#B454FF]" }),
            "Plazo Solicitado (Opcional)"
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "deadline",
              type: "date",
              value: deadlineRequested,
              onChange: (e) => setDeadlineRequested(e.target.value),
              className: "bg-white/[0.03] border-white/5 text-white h-11 rounded-xl focus:border-[#B454FF]/40 transition-all font-bold"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "drive_links", className: "text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 text-emerald-400" }),
          "Enlaces Externos (Figma, Drive, etc.)"
        ] }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "drive_links",
            placeholder: "Pega aquí los enlaces relevantes...",
            value: driveLinks,
            onChange: (e) => setDriveLinks(e.target.value),
            className: "bg-white/[0.03] border-white/5 text-white/60 h-12 rounded-xl focus:border-[#B454FF]/40 transition-all text-xs"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("label", { className: "text-[10px] font-black text-white/20 uppercase tracking-widest ml-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Paperclip, { className: "w-3 h-3 text-blue-400" }),
          "Adjuntar Archivos"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              multiple: true,
              ref: fileInputRef,
              onChange: handleFileChange,
              className: "absolute inset-0 opacity-0 cursor-pointer z-20"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-white/10 rounded-2xl p-8 transition-all group-hover:bg-white/[0.02] group-hover:border-[#B454FF]/30 flex flex-col items-center justify-center text-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Paperclip, { className: "w-4 h-4 text-white/30" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white/40 text-[10px] font-black uppercase tracking-widest", children: "Clica o arrastra archivos aquí" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: files.length > 0 && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          className: "flex flex-wrap gap-2 pt-2",
          children: files.map((file, i) => /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "bg-[#B454FF]/10 text-[#B454FF] border border-[#B454FF]/20 px-3 py-1.5 rounded-lg flex gap-2 items-center group relative overflow-hidden", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold truncate max-w-[150px]", children: file.name }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeFile(i),
                className: "hover:text-red-400 p-0.5 transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" })
              }
            )
          ] }, i))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          onClick: onCancel,
          className: "flex-1 h-14 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 font-black text-[10px] uppercase tracking-[0.2em] premium-apple-button premium-apple-button-ghost",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          type: "submit",
          className: "flex-[2] h-14 rounded-2xl bg-[#B454FF] hover:bg-[#A342FF] text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(180,84,255,0.3)] gap-3 group premium-apple-button",
          children: [
            /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" }),
            "Lanzar Petición"
          ]
        }
      )
    ] })
  ] });
};
const INITIAL_STATUSES = [
  { id: "OPEN", label: "ABIERTO", color: "#FFFFFF", category: "ACTIVE" },
  { id: "IN_SPRINT", label: "EN SPRINT", color: "#B454FF", category: "ACTIVE" },
  { id: "IN_REVIEW", label: "EN REVISIÓN", color: "#F97316", category: "ACTIVE" },
  { id: "DONE", label: "COMPLETADO", color: "#22C55E", category: "DONE" }
];
const INITIAL_TASKS = [
  {
    id: 1,
    title: "Implementación de Diseño Mobile en Hero",
    description: "Ajustar los márgenes y el tamaño de fuente para dispositivos iOS y Android.",
    statusId: "IN_SPRINT",
    priority: "HIGH",
    deadline_requested: "2024-04-15",
    deadline_final: "2024-04-12",
    drive_links: "https://figma.com/file/...",
    created_at: "2024-03-21T10:30:00Z",
    subtasks: [{ id: "1", title: "Ajustar padding", isDone: true }, { id: "2", title: "Font sizes", isDone: false }]
  },
  {
    id: 2,
    title: "Corrección de Bug en Formulario de Contacto",
    description: "El validador de email no acepta dominios .tech.",
    statusId: "OPEN",
    priority: "URGENT",
    deadline_requested: "2024-03-25",
    created_at: "2024-03-21T11:45:00Z"
  }
];
const PortalDashboard = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [statuses, setStatuses] = useState(INITIAL_STATUSES);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [viewMode, setViewMode] = useState("LIST");
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io("http://localhost:3001");
    socketRef.current.on("task-updated", ({ taskId, updates }) => {
      setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, ...updates } : t));
    });
    socketRef.current.on("board-task-updated", ({ taskId, updates }) => {
      setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, ...updates } : t));
    });
    socketRef.current.on("subtask-synced", ({ taskId, subtask, action }) => {
      setTasks((prev) => prev.map((t) => {
        if (t.id !== taskId) return t;
        let newSubtasks = [...t.subtasks || []];
        if (action === "add") newSubtasks.push(subtask);
        else if (action === "toggle") newSubtasks = newSubtasks.map((s) => s.id === subtask.id ? subtask : s);
        else if (action === "delete") newSubtasks = newSubtasks.filter((s) => s.id !== subtask.id);
        return { ...t, subtasks: newSubtasks };
      }));
    });
    return () => {
      var _a;
      (_a = socketRef.current) == null ? void 0 : _a.disconnect();
    };
  }, []);
  const selectedTasksCount = tasks.filter((t) => t.selected).length;
  const handleUpdateTask = (taskId, updates, changeType, oldValue, newValue) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, ...updates } : t));
    if ((selectedTask == null ? void 0 : selectedTask.id) === taskId) {
      setSelectedTask((prev) => prev ? { ...prev, ...updates } : null);
    }
    if (socketRef.current) {
      socketRef.current.emit("update-task", {
        taskId,
        updates,
        changeType,
        oldValue,
        newValue,
        userId: 1
      });
    }
  };
  const handleUpdateStatus = (statusId, updates) => {
    setStatuses((prev) => prev.map((s) => s.id === statusId ? { ...s, ...updates } : s));
  };
  const handleSelectTask = (taskId, isSelected) => {
    setTasks((prev) => prev.map((t) => t.id === taskId ? { ...t, selected: isSelected } : t));
  };
  const handleBulkUpdateStatus = (newStatusId) => {
    var _a;
    const selectedIds = tasks.filter((t) => t.selected).map((t) => t.id);
    setTasks((prev) => prev.map((t) => t.selected ? { ...t, statusId: newStatusId, selected: false } : t));
    selectedIds.forEach((id) => {
      var _a2;
      if (socketRef.current) {
        socketRef.current.emit("update-task", {
          taskId: id,
          updates: { statusId: newStatusId },
          changeType: "status",
          oldValue: (_a2 = tasks.find((t) => t.id === id)) == null ? void 0 : _a2.statusId,
          newValue: newStatusId,
          userId: 1
        });
      }
    });
    toast.success(`${selectedTasksCount} tareas movidas a ${(_a = statuses.find((s) => s.id === newStatusId)) == null ? void 0 : _a.label}`);
  };
  const handleBulkDelete = () => {
    setTasks((prev) => prev.filter((t) => !t.selected));
    toast.success(`${selectedTasksCount} tareas eliminadas`);
  };
  const handleCreateTask = async (data) => {
    const isQuickAdd = typeof data === "string";
    const title = isQuickAdd ? data : data.title;
    const taskId = tasks.length + 1;
    const newTask = {
      id: taskId,
      title: title || "Nueva Tarea",
      description: isQuickAdd ? "" : data.description,
      statusId: isQuickAdd ? data.statusId || "OPEN" : data.statusId || "OPEN",
      priority: isQuickAdd ? "MED" : data.priority,
      deadline_requested: isQuickAdd ? null : data.deadline_requested,
      drive_links: isQuickAdd ? "" : data.drive_links,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      subtasks: []
    };
    setTasks((prev) => [newTask, ...prev]);
    if (!isQuickAdd) setIsNewTaskModalOpen(false);
    if (socketRef.current) {
      socketRef.current.emit("create-task", newTask);
    }
    toast.success("Petición creada con éxito");
  };
  const filteredTasks = tasks.filter(
    (task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) && !activeFilters.includes(task.statusId)
  );
  return /* @__PURE__ */ jsxs("div", { className: "relative pb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
      /* @__PURE__ */ jsx("section", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        { label: "Total Tareas", value: tasks.length, icon: LayoutDashboard, color: "text-[#B454FF]" },
        { label: "Activas", value: tasks.filter((t) => {
          var _a;
          return ((_a = statuses.find((s) => s.id === t.statusId)) == null ? void 0 : _a.category) === "ACTIVE";
        }).length, icon: Play, color: "text-[#B454FF]" },
        { label: "Hecho", value: tasks.filter((t) => {
          var _a;
          return ((_a = statuses.find((s) => s.id === t.statusId)) == null ? void 0 : _a.category) === "DONE";
        }).length, icon: CheckCircle2, color: "text-emerald-400" },
        { label: "Seleccionadas", value: selectedTasksCount, icon: Check, color: "text-blue-400" }
      ].map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white/[0.02] border border-white/5 rounded-3xl p-6 backdrop-blur-sm group hover:bg-white/[0.04] transition-all", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-2", children: [
          /* @__PURE__ */ jsx(stat.icon, { className: cn("w-5 h-5", stat.color) }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-widest text-white/20", children: stat.label })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-black text-white", children: stat.value })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("header", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 w-full md:w-auto flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-96 group", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-4 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 text-white/20 group-focus-within:text-[#B454FF] transition-colors" }) }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Buscar peticiones...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "bg-white/5 border-white/10 rounded-2xl pl-11 h-12 focus:border-[#B454FF]/30 transition-all font-bold text-sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/10 ml-0 md:ml-auto", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setViewMode("LIST"),
                className: cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === "LIST" ? "bg-[#B454FF] text-white shadow-[0_0_20px_rgba(180,84,255,0.3)]" : "text-white/30 hover:text-white"
                ),
                children: [
                  /* @__PURE__ */ jsx(List, { className: "w-4 h-4" }),
                  "Lista"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setViewMode("BOARD"),
                className: cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === "BOARD" ? "bg-[#B454FF] text-white shadow-[0_0_20px_rgba(180,84,255,0.3)]" : "text-white/30 hover:text-white"
                ),
                children: [
                  /* @__PURE__ */ jsx(LayoutGrid, { className: "w-4 h-4" }),
                  "Tablero"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "h-12 px-6 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all gap-2", children: [
              /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4" }),
              "Filtros",
              activeFilters.length > 0 && /* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded-full bg-[#B454FF] text-white text-[9px] flex items-center justify-center", children: activeFilters.length })
            ] }) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "bg-[#141414] border-white/10 w-56", children: [
              /* @__PURE__ */ jsx("div", { className: "p-2 border-b border-white/5 mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-[9px] font-black text-white/20 uppercase tracking-widest pl-2", children: "Ocultar Estados" }) }),
              statuses.map((s) => /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  onClick: (e) => {
                    e.preventDefault();
                    setActiveFilters(
                      (prev) => prev.includes(s.id) ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                    );
                  },
                  className: "flex items-center justify-between text-white",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold", children: s.label }),
                    activeFilters.includes(s.id) ? /* @__PURE__ */ jsx(Eye, { className: "w-3.5 h-3.5 text-red-400" }) : /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-[#B454FF]" })
                  ]
                },
                s.id
              )),
              activeFilters.length > 0 && /* @__PURE__ */ jsx(
                DropdownMenuItem,
                {
                  onClick: () => setActiveFilters([]),
                  className: "text-white/40 justify-center text-[10px] font-black uppercase mt-1 border-t border-white/5",
                  children: "Limpiar Filtros"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 w-full md:w-auto", children: /* @__PURE__ */ jsxs(Dialog, { open: isNewTaskModalOpen, onOpenChange: setIsNewTaskModalOpen, children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "bg-[#B454FF] hover:bg-[#A74CFF] text-white rounded-2xl px-8 h-12 font-black uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(180,84,255,0.4)] transition-all active:scale-95 gap-3 w-full md:w-auto", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
            "NUEVA PETICIÓN"
          ] }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "bg-[#0D0D0D] border-white/10 text-[#F5F5F5] p-8 rounded-[2.5rem] max-w-2xl overflow-hidden shadow-2xl", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B454FF] via-[#8A2BE2] to-transparent" }),
            /* @__PURE__ */ jsx(
              NewRequestForm,
              {
                onSubmit: handleCreateTask,
                onCancel: () => setIsNewTaskModalOpen(false)
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.3 },
          children: viewMode === "BOARD" ? /* @__PURE__ */ jsx(
            TaskBoard,
            {
              tasks: filteredTasks,
              statuses,
              onTaskClick: (task) => setSelectedTask(task),
              onUpdateTask: handleUpdateTask,
              onUpdateStatus: handleUpdateStatus,
              onSelectTask: handleSelectTask,
              onCreateTask: (statusId) => {
                setIsNewTaskModalOpen(true);
              }
            }
          ) : /* @__PURE__ */ jsx(
            TaskListView,
            {
              tasks: filteredTasks,
              statuses,
              onTaskClick: (task) => setSelectedTask(task),
              onUpdateTask: handleUpdateTask,
              onUpdateStatus: handleUpdateStatus,
              onSelectTask: handleSelectTask,
              onCreateTask: (statusId, title) => {
                if (title) {
                  handleCreateTask({ title, statusId });
                } else {
                  setIsNewTaskModalOpen(true);
                }
              }
            }
          )
        },
        viewMode
      ) }),
      /* @__PURE__ */ jsx(
        TaskDrawer,
        {
          task: selectedTask,
          isOpen: !!selectedTask,
          onClose: () => setSelectedTask(null),
          onUpdate: handleUpdateTask,
          statuses
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedTasksCount > 0 && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: 100, opacity: 0, x: "-50%" },
        animate: { y: 0, opacity: 1, x: "-50%" },
        exit: { y: 100, opacity: 0, x: "-50%" },
        className: "fixed bottom-6 md:bottom-10 left-1/2 z-[200] flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 px-6 md:px-10 py-4 md:py-5 bg-[#111111]/90 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl ring-1 ring-white/5 w-[90vw] md:w-auto md:min-w-[600px] justify-between md:justify-start",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pr-8 border-r border-white/10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-[#B454FF] flex items-center justify-center text-xs font-black shadow-[0_0_20px_rgba(180,84,255,0.4)] text-white", children: selectedTasksCount }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-[#B454FF] uppercase tracking-[0.2em]", children: "Seleccionadas" }),
              /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold text-white/30 uppercase tracking-widest", children: "Acciones Masivas" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  className: "premium-apple-button premium-apple-button-ghost h-12 px-6 gap-2.5 text-[10px] font-black uppercase tracking-widest",
                  children: [
                    /* @__PURE__ */ jsx(Play, { className: "w-4 h-4 text-[#B454FF]" }),
                    "Mover a..."
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx(DropdownMenuContent, { className: "bg-[#141414] border-white/10 p-2 rounded-2xl min-w-[200px]", children: statuses.map((s) => /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  onClick: () => handleBulkUpdateStatus(s.id),
                  className: "text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl p-3 cursor-pointer gap-2",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: s.color } }),
                    s.label
                  ]
                },
                s.id
              )) })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                className: "premium-apple-button premium-apple-button-ghost h-12 px-6 gap-2.5 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/10",
                onClick: handleBulkDelete,
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" }),
                  "Eliminar"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setTasks(tasks.map((t) => ({ ...t, selected: false }))),
              className: "ml-auto w-10 h-10 rounded-full hover:bg-white/5 text-white/20 hover:text-white transition-all premium-apple-button",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          )
        ]
      }
    ) })
  ] });
};
export {
  PortalDashboard as default
};
