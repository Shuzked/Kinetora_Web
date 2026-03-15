"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewRequestModal = ({ isOpen, onClose }: NewRequestModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("¡Solicitud enviada con éxito! Empezamos a trabajar.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5] sm:max-w-[500px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Nueva Solicitud</DialogTitle>
          <DialogDescription className="text-[#2A2A2A] font-bold text-[10px] uppercase tracking-widest">
            Describe tu visión y nosotros la hacemos realidad en 48h.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A]">Título del Proyecto</Label>
            <Input 
              placeholder="Ej: Rediseño de Dashboard" 
              className="bg-[#0D0D0D] border-[#2A2A2A] rounded-xl h-12 focus:ring-[#B454FF]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A]">Tipo de Servicio</Label>
            <Select required>
              <SelectTrigger className="bg-[#0D0D0D] border-[#2A2A2A] rounded-xl h-12">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-[#2A2A2A] text-[#F5F5F5]">
                <SelectItem value="uiux">UX/UI Design</SelectItem>
                <SelectItem value="branding">Branding & Logo</SelectItem>
                <SelectItem value="motion">Motion Graphics</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#2A2A2A]">Brief / Descripción</Label>
            <Textarea 
              placeholder="Cuéntanos los detalles, objetivos y referencias..." 
              className="bg-[#0D0D0D] border-[#2A2A2A] rounded-xl min-h-[120px] focus:ring-[#B454FF]"
              required
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-[#B454FF] hover:bg-[#B454FF]/90 text-white rounded-full h-14 font-black text-xs tracking-widest shadow-[0_10px_30px_rgba(180,84,255,0.2)]">
              ENVIAR A COLA DE DISEÑO
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRequestModal;