"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const tourSteps = [
  {
    id: "hero",
    title: "Hero Principal",
    description: "Engenharia comercial para armazenagem, movimentação e pós-venda",
    scrollTo: 0,
    duration: 4000,
    highlight: { top: "120px", left: "40px", width: "600px", height: "400px" },
  },
  {
    id: "features",
    title: "Diferenciais",
    description: "Projetos sob demanda, Pós-venda digital, UX rápida, Visual premium",
    scrollTo: 0,
    duration: 3500,
    highlight: { top: "120px", right: "40px", width: "480px", height: "300px" },
  },
  {
    id: "equipamentos",
    title: "Nossos Equipamentos",
    description: "Categorias de elevadores, secadores e silos",
    scrollTo: 600,
    duration: 4000,
    highlight: { top: "100px", left: "40px", width: "calc(100% - 80px)", height: "400px" },
  },
  {
    id: "produtos",
    title: "Catálogo de Produtos",
    description: "Cards com imagem, categoria, descrição e botão de ação",
    scrollTo: 1000,
    duration: 4000,
    highlight: { top: "200px", left: "40px", width: "calc(100% - 80px)", height: "350px" },
  },
  {
    id: "pecas",
    title: "Peças de Reposição",
    description: "Componentes, kits e acessórios para manutenção",
    scrollTo: 1500,
    duration: 3500,
    highlight: { top: "100px", left: "40px", width: "calc(100% - 80px)", height: "300px" },
  },
  {
    id: "empresa",
    title: "Sobre a JHONROB",
    description: "Inovação, qualidade, confiabilidade e eficiência",
    scrollTo: 2000,
    duration: 4000,
    highlight: { top: "100px", left: "40px", width: "55%", height: "400px" },
  },
  {
    id: "unidades",
    title: "Unidades",
    description: "Sinop/MT e Criciúma/SC - Atendimento nacional",
    scrollTo: 2000,
    duration: 3500,
    highlight: { top: "100px", right: "40px", width: "40%", height: "400px" },
  },
  {
    id: "eventos",
    title: "Eventos",
    description: "Agenda de participação, encontros técnicos e ativações",
    scrollTo: 2600,
    duration: 4000,
    highlight: { top: "100px", left: "40px", width: "calc(100% - 80px)", height: "350px" },
  },
  {
    id: "footer",
    title: "Contato & Footer",
    description: "Informações de contato e links rápidos",
    scrollTo: 3200,
    duration: 3500,
    highlight: { bottom: "0", left: "0", width: "100%", height: "300px" },
  },
];

export default function TourPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const step = tourSteps[stepIndex];

  const scrollIframe = useCallback((scrollY: number) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.scrollTo({
        top: scrollY,
        behavior: "smooth",
      });
    }
  }, []);

  const nextStep = useCallback(() => {
    if (stepIndex < tourSteps.length - 1) {
      const nextIdx = stepIndex + 1;
      setStepIndex(nextIdx);
      setProgress(0);
      scrollIframe(tourSteps[nextIdx].scrollTo);
    } else {
      setPlaying(false);
    }
  }, [stepIndex, scrollIframe]);

  useEffect(() => {
    if (!playing) return;

    const duration = step.duration;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextStep();
          return 0;
        }
        return p + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [playing, step.duration, nextStep]);

  const handlePlay = () => {
    if (stepIndex === tourSteps.length - 1 && progress >= 100) {
      setStepIndex(0);
      setProgress(0);
      scrollIframe(0);
    }
    setPlaying(true);
    scrollIframe(step.scrollTo);
  };

  const handlePause = () => setPlaying(false);

  const handleReset = () => {
    setPlaying(false);
    setStepIndex(0);
    setProgress(0);
    scrollIframe(0);
  };

  const handleStepClick = (idx: number) => {
    setStepIndex(idx);
    setProgress(0);
    scrollIframe(tourSteps[idx].scrollTo);
  };

  return (
    <div className="min-h-screen bg-[#080a0d] text-white">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-xs font-bold">
                JR
              </div>
              <div>
                <p className="text-sm font-semibold">Tour Automático</p>
                <p className="text-[10px] text-white/50">JHONROB Platform</p>
              </div>
            </div>

            <div className="h-6 w-px bg-white/10" />

            {/* Controls */}
            <div className="flex items-center gap-2">
              {!playing ? (
                <Button onClick={handlePlay} size="sm" className="gap-2">
                  <Play size={14} /> Iniciar Tour
                </Button>
              ) : (
                <Button onClick={handlePause} size="sm" variant="secondary" className="gap-2">
                  <Pause size={14} /> Pausar
                </Button>
              )}
              <Button onClick={handleReset} size="sm" variant="ghost">
                <RotateCcw size={14} />
              </Button>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items.center gap-3">
            <span className="text-xs text-white/50">
              {stepIndex + 1} / {tourSteps.length}
            </span>
            <div className="flex gap-1">
              {tourSteps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStepClick(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === stepIndex
                      ? "w-6 bg-cyan-400"
                      : idx < stepIndex
                      ? "w-2 bg-cyan-400/50"
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 flex">
        {/* Iframe with site */}
        <div className="flex-1 relative">
          <iframe
            ref={iframeRef}
            src="/"
            className="w-full h-[calc(100vh-64px)] border-0"
            title="JHONROB Site"
          />

          {/* Highlight overlay */}
          <AnimatePresence>
            {playing && (
              <>
                {/* Dark overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 pointer-events-none"
                />

                {/* Highlight box */}
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute pointer-events-none"
                  style={{
                    ...step.highlight,
                    boxShadow: "0 0 0 4px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
                    borderRadius: "16px",
                    background: "transparent",
                  }}
                >
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 animate-pulse" />
                  
                  {/* Corner indicators */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />

                  {/* Pointer animation */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: -20 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-8 -left-8"
                  >
                    <MousePointer2 className="h-6 w-6 text-cyan-400 drop-shadow-lg" />
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Side panel */}
        <div className="w-80 bg-black/50 border-l border-white/10 p-6 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Sparkles size={16} />
              <span className="text-xs uppercase tracking-wider font-semibold">Seção Atual</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-2xl font-bold">{step.title}</h2>
                <p className="mt-2 text-sm text-white/60">{step.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-px bg-white/10 my-6" />

          {/* Steps list */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-white/40 mb-3">Roteiro do Tour</p>
            {tourSteps.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleStepClick(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  idx === stepIndex
                    ? "bg-cyan-400/10 border border-cyan-400/30"
                    : "bg-white/5 border border-transparent hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full grid place-items-center text-xs font-bold ${
                      idx < stepIndex
                        ? "bg-cyan-400 text-black"
                        : idx === stepIndex
                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {idx < stepIndex ? "✓" : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        idx === stepIndex ? "text-white" : "text-white/60"
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                  {idx === stepIndex && playing && (
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="h-px bg-white/10 my-6" />

          {/* Tips */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <p className="text-xs text-white/40 mb-2">💡 Dica</p>
            <p className="text-sm text-white/70">
              Use o gravador de tela para capturar o tour. No Windows: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-xs">Win+G</kbd>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
