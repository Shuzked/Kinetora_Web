"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PremiumButton from '@/components/PremiumButton';
import { Send, Menu, X, Paperclip, Smile } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useI18n } from '@/i18n/I18nProvider';

const Messages = () => {
  const { lang } = useI18n();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const ui =
    lang === 'es'
      ? {
          title: 'Mensajes',
          teamOnline: 'Equipo de diseño online',
          openMenu: 'Abrir menú',
          attach: 'Adjuntar archivo',
          emojis: 'Emojis',
          inputPh: 'Escribe un mensaje al equipo...',
          send: 'ENVIAR',
          me: 'Yo',
          team: 'Kinetora Team',
          msgs: [
            { sender: 'Kinetora Team', text: '¡Hola Alex! Hemos subido los primeros bocetos de la Landing Page al tablero. ¿Qué te parecen?', time: '10:30 AM', isMe: false },
            { sender: 'Yo', text: '¡Hola! Los acabo de ver. Me encanta la dirección visual, especialmente el uso de los degradados púrpuras.', time: '11:15 AM', isMe: true },
            { sender: 'Yo', text: '¿Podríamos probar una versión con la tipografía un poco más grande en el Hero?', time: '11:16 AM', isMe: true },
            { sender: 'Kinetora Team', text: '¡Claro! Nos ponemos con ello ahora mismo. Tendrás la actualización en menos de 2 horas.', time: '11:20 AM', isMe: false },
          ],
        }
      : {
          title: 'Messages',
          teamOnline: 'Design team online',
          openMenu: 'Open menu',
          attach: 'Attach file',
          emojis: 'Emojis',
          inputPh: 'Write a message to the team...',
          send: 'SEND',
          me: 'Me',
          team: 'Kinetora Team',
          msgs: [
            { sender: 'Kinetora Team', text: 'Hi Alex! We uploaded the first landing page drafts to your board. What do you think?', time: '10:30 AM', isMe: false },
            { sender: 'Me', text: 'Hey! Just checked them. Love the visual direction, especially the purple gradients.', time: '11:15 AM', isMe: true },
            { sender: 'Me', text: 'Could we try a version with slightly larger type in the Hero?', time: '11:16 AM', isMe: true },
            { sender: 'Kinetora Team', text: 'Absolutely! We\'re on it now. You\'ll have an update in under 2 hours.', time: '11:20 AM', isMe: false },
          ],
        };

  const chatMessages = ui.msgs;

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex relative">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed inset-y-0 left-0 w-[300px] max-w-[85vw] z-50 lg:hidden"
            >
              <DashboardSidebar />
              <button
                aria-label={ui.openMenu}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col h-screen">
        <header className="py-6 md:py-8 px-4 sm:px-6 lg:px-8 border-b border-white/10 flex items-center justify-between bg-[#0D0D0D]">
          <div className="flex items-start sm:items-center gap-4">
            <button
              aria-label={ui.openMenu}
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[#F5F5F5] hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#F5F5F5] tracking-tighter uppercase">{ui.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[#F5F5F5]/60 font-semibold text-[10px] uppercase tracking-widest">{ui.teamOnline}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-black text-[#F5F5F5]/70 uppercase tracking-widest">{msg.sender}</span>
                <span className="text-[9px] font-bold text-[#F5F5F5]/40 uppercase tracking-widest">{msg.time}</span>
              </div>
              <div className={`max-w-[88%] md:max-w-[60%] p-4 md:p-6 rounded-2xl md:rounded-3xl text-sm md:text-base font-medium leading-relaxed ${
                msg.isMe
                  ? 'bg-[#B454FF] text-white rounded-tr-none'
                  : 'bg-[#111111] border border-white/10 text-[#F5F5F5] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="py-6 md:py-8 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D] border-t border-white/10">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                aria-label={ui.attach}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <Paperclip className="w-5 h-5" />
              </button>
            </div>

            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={ui.inputPh}
              className="bg-[#111111] border-white/10 rounded-full pl-14 pr-24 h-14 md:h-16 text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
            />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                aria-label={ui.emojis}
                className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-[#F5F5F5]/70 hover:text-[#F5F5F5] hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              >
                <Smile className="w-5 h-5" />
              </button>

              <PremiumButton
                variant="primary"
                size="md"
                className="h-11 md:h-12 px-4 md:px-6 rounded-full tracking-[0.12em]"
                leftIcon={<Send className="w-4 h-4" />}
              >
                <span className="hidden sm:inline">{ui.send}</span>
              </PremiumButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;