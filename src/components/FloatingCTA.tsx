"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PremiumButton from "@/components/PremiumButton";
import { useI18n } from "@/i18n/I18nProvider";

const FloatingCTA: React.FC = () => {
  // Ocultamos el CTA flotante en móvil (no se renderiza)
  return null;
};

export default FloatingCTA;