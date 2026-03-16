"use client";

import React from 'react';
import { Clock, CheckCircle2, PlayCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

interface RequestCardProps {
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  type: string;
}

const RequestCard = ({ title, status, date, type }: RequestCardProps) => {
  const { lang } = useI18n();

  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      label: lang === 'es' ? 'En cola' : 'Queued',
    },
    'in-progress': {
      icon: PlayCircle,
      color: 'text-[#B454FF]',
      bg: 'bg-[#B454FF]/10',
      label: lang === 'es' ? 'Diseñando' : 'In progress',
    },
    completed: {
      icon: CheckCircle2,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      label: lang === 'es' ? 'Entregado' : 'Delivered',
    },
  } as const;

  const config = statusConfig[status];

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#B454FF]/35 hover:bg-white/[0.04] transition-all group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[9px] font-black uppercase tracking-widest text-[#F5F5F5]/55 bg-[#0D0D0D] px-3 py-1 rounded-full border border-white/10">
          {type}
        </span>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.color} text-[9px] font-black uppercase tracking-widest`}>
          <config.icon className="w-3 h-3" />
          {config.label}
        </div>
      </div>
      
      <h3 className="text-[#F5F5F5] font-bold text-lg mb-2 group-hover:text-[#B454FF] transition-colors">{title}</h3>
      <p className="text-[#F5F5F5]/55 text-[10px] font-bold uppercase tracking-widest">
        {lang === 'es' ? 'Solicitado el' : 'Requested on'} {date}
      </p>
      
      {status === 'in-progress' && (
        <div className="mt-6">
          <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-[#F5F5F5]/55 mb-2">
            <span>{lang === 'es' ? 'Progreso' : 'Progress'}</span>
            <span>75%</span>
          </div>
          <div className="h-1 w-full bg-[#0D0D0D] rounded-full overflow-hidden">
            <div className="h-full bg-[#B454FF] w-3/4 shadow-[0_0_10px_#B454FF]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCard;