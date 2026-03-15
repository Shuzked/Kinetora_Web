"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Button } from "@/components/ui/button";
import { Send, Menu, X, Paperclip, Smile } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const chatMessages = [
    { sender: 'Kinetora Team', text: '¡Hola Alex! Hemos subido los primeros bocetos de la Landing Page al tablero. ¿Qué te parecen?', time: '10:30 AM', isMe: false },
    { sender: 'Yo', text: '¡Hola! Los acabo de ver. Me encanta la dirección visual, especialmente el uso de los degradados púrpuras.', time: '11:15 AM', isMe: true },
    { sender: 'Yo', text: '¿Podríamos probar una versión con la tipografía un poco más grande en el Hero?', time: '11:16 AM', isMe: true },
    { sender: 'Kinetora Team', text: '¡Claro! Nos ponemos con ello ahora mismo. Tendrás la actualización en menos de 2 horas.', time: '11:20 AM', isMe: false },
  ];

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
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 w-[280px] z-50 lg:hidden"
            >
              <DashboardSidebar />
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-6 right-[-50px] w-10 h-10 bg-[#111111] border border-[#2A2A2A] rounded-full flex items-center justify-center text-[#F5F5F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="flex-1 flex flex-col h-screen">
        <header className="p-6 md:p-8 border-b border-[#2A2A2A] flex items-center justify-between bg-[#0D0D0D]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-[#111111] border border-[#2A2A2A] rounded-xl text-[#F5F5F5]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#F5F5F5] tracking-tighter uppercase">Mensajes</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[#2A2A2A] font-bold text-[10px] uppercase tracking-widest">Equipo de diseño online</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] font-black text-[#2A2A2A] uppercase tracking-widest">{msg.sender}</span>
                <span className="text-[9px] font-bold text-[#2A2A2A]/50 uppercase tracking-widest">{msg.time}</span>
              </div>
              <div className={`max-w-[80%] md:max-w-[60%] p-4 md:p-6 rounded-2xl md:rounded-3xl text-sm md:text-base font-medium leading-relaxed ${
                msg.isMe 
                  ? 'bg-[#B454FF] text-white rounded-tr-none' 
                  : 'bg-[#111111] border border-[#2A2A2A] text-[#F5F5F5] rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 md:p-8 bg-[#0D0D0D] border-t border-[#2A2A2A]">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="p-2 text-[#2A2A2A] hover:text-[#B454FF] transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
            </div>
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje al equipo..." 
              className="bg-[#111111] border-[#2A2A2A] rounded-2xl pl-14 pr-24 h-14 md:h-16 text-[#F5F5F5] focus:ring-[#B454FF]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="hidden sm:block p-2 text-[#2A2A2A] hover:text-[#B454FF] transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <Button className="bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-xl h-10 md:h-12 px-4 md:px-6 font-black text-[10px] uppercase tracking-widest">
                <Send className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">ENVIAR</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;