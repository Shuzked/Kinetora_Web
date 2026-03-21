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

  // English = US flag, simplified
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-white/15",
        className
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <rect width="24" height="24" fill="#FFFFFF" />

        {/* stripes */}
        {Array.from({ length: 13 }).map((_, i) => {
          const y = (24 / 13) * i;
          const h = 24 / 13;
          const isRed = i % 2 === 0;
          return isRed ? (
            <rect key={i} x="0" y={y} width="24" height={h} fill="#B22234" />
          ) : null;
        })}

        {/* canton */}
        <rect x="0" y="0" width="11.2" height="9.2" fill="#3C3B6E" />

        {/* stars (dots) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const cols = 4;
          const r = 0.55;
          const padX = 1.2;
          const padY = 1.1;
          const gapX = 2.4;
          const gapY = 2.2;
          const cx = padX + (i % cols) * gapX;
          const cy = padY + Math.floor(i / cols) * gapY;
          return <circle key={i} cx={cx} cy={cy} r={r} fill="#FFFFFF" opacity="0.95" />;
        })}
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
            "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]",
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
    "h-11 px-4 rounded-xl border text-[11px] font-black tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B454FF]";

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