"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

type FlagProps = {
  lang: "es" | "en";
  className?: string;
};

export const FlagIcon: React.FC<FlagProps> = ({ lang, className }) => {
  if (lang === "es") {
    return (
      <span
        className={cn(
          "inline-flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/15",
          className
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <rect width="24" height="24" fill="#AA151B" />
          <rect y="6" width="24" height="12" fill="#F1BF00" />
        </svg>
      </span>
    );
  }

  // English = UK flag (Union Jack), simplified
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/15",
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <rect width="24" height="24" fill="#012169" />

        {/* white diagonals */}
        <path d="M0 0 L9 0 L24 15 L24 24 L15 24 L0 9 Z" fill="#FFFFFF" />
        <path d="M24 0 L15 0 L0 15 L0 24 L9 24 L24 9 Z" fill="#FFFFFF" />

        {/* red diagonals */}
        <path d="M0 0 L6 0 L24 18 L24 24 L18 24 L0 6 Z" fill="#C8102E" />
        <path d="M24 0 L18 0 L0 18 L0 24 L6 24 L24 6 Z" fill="#C8102E" />

        {/* white cross */}
        <rect x="0" y="9" width="24" height="6" fill="#FFFFFF" />
        <rect x="9" y="0" width="6" height="24" fill="#FFFFFF" />

        {/* red cross */}
        <rect x="0" y="10.5" width="24" height="3" fill="#C8102E" />
        <rect x="10.5" y="0" width="3" height="24" fill="#C8102E" />
      </svg>
    </span>
  );
};

type LanguageSwitcherProps = {
  triggerClassName?: string;
  contentClassName?: string;
  hideOnSmall?: boolean;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  triggerClassName,
  contentClassName,
  hideOnSmall,
}) => {
  const { lang, setLang, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("lang.switch")}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
            "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20",
            hideOnSmall && "hidden sm:inline-flex",
            triggerClassName
          )}
        >
          <FlagIcon lang={lang} className="h-[18px] w-[18px]" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "bg-[#111111] border-white/10 text-[#F5F5F5] rounded-2xl p-1 min-w-[190px]",
          contentClassName
        )}
      >
        <DropdownMenuItem
          onClick={() => setLang("es")}
          className="rounded-xl focus:bg-white/[0.06] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FlagIcon lang="es" />
            <span className="font-semibold">{t("lang.es")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLang("en")}
          className="rounded-xl focus:bg-white/[0.06] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FlagIcon lang="en" />
            <span className="font-semibold">{t("lang.en")}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LanguagePills: React.FC<{ className?: string }> = ({ className }) => {
  const { lang, setLang, t } = useI18n();

  const pillBase =
    "h-11 px-4 rounded-full border text-[11px] font-black tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={cn(
          pillBase,
          "inline-flex items-center gap-2",
          lang === "es"
            ? "bg-[#B454FF]/18 border-[#B454FF]/30 text-[#F5F5F5]"
            : "bg-white/[0.03] border-white/10 text-[#F5F5F5]/75 hover:bg-white/[0.06] hover:text-[#F5F5F5]"
        )}
      >
        <FlagIcon lang="es" className="h-[18px] w-[18px]" />
        {t("lang.es")}
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          pillBase,
          "inline-flex items-center gap-2",
          lang === "en"
            ? "bg-[#B454FF]/18 border-[#B454FF]/30 text-[#F5F5F5]"
            : "bg-white/[0.03] border-white/10 text-[#F5F5F5]/75 hover:bg-white/[0.06] hover:text-[#F5F5F5]"
        )}
      >
        <FlagIcon lang="en" className="h-[18px] w-[18px]" />
        {t("lang.en")}
      </button>
    </div>
  );
};

export default LanguageSwitcher;