"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PremiumButton from '@/components/PremiumButton';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';
import { useI18n } from '@/i18n/I18nProvider';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewRequestModal = ({ isOpen, onClose }: NewRequestModalProps) => {
  const { lang } = useI18n();

  const copy =
    lang === 'es'
      ? {
          title: 'Nueva Solicitud',
          sub: 'Describe tu visión y nosotros la hacemos realidad en 48h.',
          projectTitle: 'Título del Proyecto',
          projectTitlePh: 'Ej: Rediseño de Dashboard',
          serviceType: 'Tipo de Servicio',
          servicePh: 'Selecciona una categoría',
          desc: 'Brief / Descripción',
          descPh: 'Cuéntanos los detalles, objetivos y referencias...',
          cta: 'ENVIAR A COLA DE DISEÑO',
          toast: '¡Solicitud enviada con éxito! Empezamos a trabajar.',
          options: {
            uiux: 'Diseño UX/UI',
            branding: 'Branding & Logo',
            motion: 'Motion Graphics',
            web: 'Desarrollo Web',
          },
        }
      : {
          title: 'New Request',
          sub: 'Describe your vision and we\'ll deliver in 48h.',
          projectTitle: 'Project Title',
          projectTitlePh: 'e.g. Dashboard redesign',
          serviceType: 'Service Type',
          servicePh: 'Select a category',
          desc: 'Brief / Description',
          descPh: 'Tell us details, goals and references...',
          cta: 'SEND TO DESIGN QUEUE',
          toast: 'Request sent successfully! We\'re on it.',
          options: {
            uiux: 'UX/UI Design',
            branding: 'Branding & Logo',
            motion: 'Motion Graphics',
            web: 'Web Development',
          },
        };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(copy.toast);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111111] border-white/10 text-[#F5F5F5] sm:max-w-[520px] rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tighter">{copy.title}</DialogTitle>
          <DialogDescription className="text-[#F5F5F5]/60 font-semibold text-[10px] uppercase tracking-widest">
            {copy.sub}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/65">{copy.projectTitle}</Label>
            <Input 
              placeholder={copy.projectTitlePh}
              className="bg-[#0D0D0D] border-white/10 rounded-full h-12 text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/65">{copy.serviceType}</Label>
            <Select required>
              <SelectTrigger className="bg-[#0D0D0D] border-white/10 rounded-full h-12 focus:ring-0 focus-visible:ring-2 focus-visible:ring-[#B454FF]">
                <SelectValue placeholder={copy.servicePh} />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-white/10 text-[#F5F5F5]">
                <SelectItem value="uiux">{copy.options.uiux}</SelectItem>
                <SelectItem value="branding">{copy.options.branding}</SelectItem>
                <SelectItem value="motion">{copy.options.motion}</SelectItem>
                <SelectItem value="web">{copy.options.web}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest text-[#F5F5F5]/65">{copy.desc}</Label>
            <Textarea 
              placeholder={copy.descPh}
              className="bg-[#0D0D0D] border-white/10 rounded-2xl min-h-[120px] text-[#F5F5F5] placeholder:text-[#F5F5F5]/35 focus-visible:ring-2 focus-visible:ring-[#B454FF]"
              required
            />
          </div>

          <div className="pt-2">
            <PremiumButton type="submit" variant="primary" size="md" className="w-full">
              {copy.cta}
            </PremiumButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewRequestModal;