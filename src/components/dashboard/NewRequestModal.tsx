"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PremiumButton from '@/components/PremiumButton';
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
      <DialogContent className="bg-[#111111] border-white/10 text-[#F5F5F5] sm:max-w-[520px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Nueva Solicitud</DialogTitle>
          <DialogDescription className="text-[#F5F5F5]/60 font-semibold text-[10px] uppercase tracking-widest">
            Describe tu visión y nosotros la hacemos realidad en 48h.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/65">Título del Proyecto</Label>
            <Input 
              placeholder="Ej: Rediseño de Dashboard" 
              className="bg-[#0D0D0D] border-white/10 rounded-full h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/65">Tipo de Servicio</Label>
            <Select required>
              <SelectTrigger className="bg-[#0D0D0D] border-white/10 rounded-full h-12 focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                <SelectItem value="uiux">UX/UI Design</SelectItem>
                <SelectItem value="branding">Branding & Logo</SelectItem>
                <SelectItem value="motion">Motion Graphics</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/65">Brief / Descripción</Label>
            <Textarea 
              placeholder="Cuéntanos los detalles, objetivos y referencias..." 
              className="bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[120px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
          </div>

          <div className="pt-2">
            <PremiumButton type="submit" variant="primary" size="md" className="w-full">
              ENVIAR A COLA DE DISEÑO
            </PremiumButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRequestModal;