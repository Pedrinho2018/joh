"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Factory,
  ShoppingCart,
  Ticket,
  BarChart3,
  Mail,
  FileText,
  Users,
  Settings,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    id: "intro",
    icon: Factory,
    title: "JHONROB",
    subtitle: "Plataforma Digital Completa",
    description: "Sistema integrado para gestão comercial, pós-venda e automação",
    color: "from-cyan-500 to-blue-600",
    duration: 4000,
  },
  {
    id: "catalog",
    icon: ShoppingCart,
    title: "Catálogo Digital",
    subtitle: "Equipamentos & Peças",
    description: "Navegue por categorias, veja especificações e solicite orçamentos",
    color: "from-emerald-500 to-teal-600",
    items: ["Elevadores", "Secadores", "Silos", "Peças de Reposição"],
    duration: 5000,
  },
  {
    id: "leads",
    icon: Users,
    title: "Captação de Leads",
    subtitle: "Formulários Inteligentes",
    description: "Contato, orçamento e download de catálogo com notificação automática",
    color: "from-violet-500 to-purple-600",
    items: ["Formulário de Contato", "Solicitação de Orçamento", "Download de Catálogo"],
    duration: 5000,
  },
  {
    id: "tickets",
    icon: Ticket,
    title: "Pós-Venda Digital",
    subtitle: "Sistema de Chamados",
    description: "Abertura de tickets com protocolo, anexos e acompanhamento de status",
    color: "from-orange-500 to-red-600",
    items: ["Protocolo Automático", "Upload de Arquivos", "Rastreamento de Status"],
    duration: 5000,
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automação Inteligente",
    subtitle: "Integração Python + FastAPI",
    description: "Processamento de webhooks, envio de emails e relatórios automáticos",
    color: "from-yellow-500 to-amber-600",
    items: ["Notificações por Email", "Webhook em Tempo Real", "Relatório Diário às 18h"],
    duration: 5000,
  },
  {
    id: "admin",
    icon: BarChart3,
    title: "Painel Administrativo",
    subtitle: "Dashboard Completo",
    description: "Métricas, gestão de leads, tickets, produtos e eventos em um só lugar",
    color: "from-pink-500 to-rose-600",
    items: ["Dashboard de Métricas", "Gestão de Leads", "Controle de Tickets", "CRUD Completo"],
    duration: 5000,
  },
  {
    id: "tech",
    icon: Settings,
    title: "Stack Moderna",
    subtitle: "Tecnologia de Ponta",
    description: "Next.js 14, TypeScript, Tailwind CSS, Prisma, FastAPI, Docker",
    color: "from-slate-500 to-zinc-700",
    items: ["Next.js 14 + React 18", "TypeScript + Zod", "Tailwind CSS", "Python + FastAPI"],
    duration: 5000,
  },
  {
    id: "final",
    icon: CheckCircle,
    title: "Pronto para Produção",
    subtitle: "@jhonrob",
    description: "Solução completa para indústria e agro",
    color: "from-cyan-500 to-emerald-600",
    duration: 4000,
  },
];

export default function DemoPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentFeature = features[currentIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const duration = currentFeature.duration;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < features.length - 1) {
            setCurrentIndex((i) => i + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, currentFeature.duration]);

  const handlePlay = () => {
    if (currentIndex === features.length - 1 && progress >= 100) {
      setCurrentIndex(0);
      setProgress(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setProgress(0);
  };

  const handleSlideClick = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white overflow-hidden">
      {/* Background gradient */}
      <div
        className={`fixed inset-0 bg-gradient-to-br ${currentFeature.color} opacity-20 transition-all duration-1000`}
      />

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center font-bold">
              JR
            </div>
            <span className="text-sm font-semibold tracking-wide">DEMO MODE</span>
          </div>
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <Button onClick={handlePlay} size="sm" className="gap-2">
                <Play size={16} /> Play
              </Button>
            ) : (
              <Button onClick={handlePause} size="sm" variant="secondary" className="gap-2">
                <Pause size={16} /> Pause
              </Button>
            )}
            <Button onClick={handleReset} size="sm" variant="ghost">
              <RotateCcw size={16} />
            </Button>
          </div>
        </header>

        {/* Slide indicators */}
        <div className="px-6 flex gap-1">
          {features.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSlideClick(idx)}
              className="flex-1 h-1 rounded-full overflow-hidden bg-white/10 cursor-pointer"
            >
              <div
                className={`h-full bg-white transition-all duration-100 ${
                  idx < currentIndex ? "w-full" : idx === currentIndex ? "" : "w-0"
                }`}
                style={{
                  width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>

        {/* Content area */}
        <main className="flex-1 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl w-full text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`mx-auto mb-8 h-24 w-24 rounded-3xl bg-gradient-to-br ${currentFeature.color} grid place-items-center shadow-2xl`}
              >
                <currentFeature.icon size={48} strokeWidth={1.5} />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl font-extrabold tracking-tight"
              >
                {currentFeature.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`mt-3 text-xl sm:text-2xl font-semibold bg-gradient-to-r ${currentFeature.color} bg-clip-text text-transparent`}
              >
                {currentFeature.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-lg text-white/70"
              >
                {currentFeature.description}
              </motion.p>

              {/* Items list */}
              {"items" in currentFeature && currentFeature.items && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 flex flex-wrap justify-center gap-3"
                >
                  {currentFeature.items.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                    >
                      <ArrowRight size={14} className="text-cyan-400" />
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-sm text-white/40">
            Slide {currentIndex + 1} de {features.length}
          </p>
        </footer>
      </div>
    </div>
  );
}
