"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Eye, EyeOff, Volume2, VolumeX } from "lucide-react";

const scrollPoints = [
  { 
    y: 0, 
    label: "JHONROB", 
    sublabel: "Plataforma Digital Completa",
    duration: 5000,
    zoom: 1,
  },
  { 
    y: 550, 
    label: "Equipamentos", 
    sublabel: "Elevadores, Secadores e Silos",
    duration: 4500,
    zoom: 1.02,
  },
  { 
    y: 1100, 
    label: "Catálogo", 
    sublabel: "Produtos com especificações detalhadas",
    duration: 4500,
    zoom: 1,
  },
  { 
    y: 1600, 
    label: "Peças & Acessórios", 
    sublabel: "Componentes para manutenção",
    duration: 4000,
    zoom: 1.02,
  },
  { 
    y: 2100, 
    label: "A Empresa", 
    sublabel: "Inovação, Qualidade e Confiabilidade",
    duration: 4500,
    zoom: 1,
  },
  { 
    y: 2600, 
    label: "Eventos", 
    sublabel: "Agenda e encontros técnicos",
    duration: 4000,
    zoom: 1.02,
  },
  { 
    y: 3200, 
    label: "Contato", 
    sublabel: "Fale com especialistas",
    duration: 5000,
    zoom: 1,
  },
];

export default function AutoScrollPage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUI, setShowUI] = useState(true);
  const [started, setStarted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const point = scrollPoints[index];

  const scroll = useCallback((y: number) => {
    iframeRef.current?.contentWindow?.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    if (index < scrollPoints.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        const nextIdx = index + 1;
        setIndex(nextIdx);
        setProgress(0);
        scroll(scrollPoints[nextIdx].y);
        setTimeout(() => setTransitioning(false), 800);
      }, 400);
    } else {
      // Loop back to start
      setTransitioning(true);
      setTimeout(() => {
        setIndex(0);
        setProgress(0);
        scroll(0);
        setTimeout(() => setTransitioning(false), 800);
      }, 400);
    }
  }, [index, scroll]);

  useEffect(() => {
    if (!playing) return;
    const interval = 30;
    const increment = (interval / point.duration) * 100;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [playing, point.duration, next]);

  const handlePlay = () => {
    setStarted(true);
    setPlaying(true);
    scroll(point.y);
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
    } else {
      handlePlay();
    }
  };

  const reset = () => {
    setPlaying(false);
    setIndex(0);
    setProgress(0);
    scroll(0);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "KeyR") {
        reset();
      } else if (e.code === "KeyH") {
        setShowUI((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing]);

  return (
    <div className="relative w-screen h-screen bg-[#050507] overflow-hidden">
      {/* Iframe with zoom effect */}
      <motion.div
        animate={{ 
          scale: point.zoom,
          opacity: transitioning ? 0.7 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 origin-center"
      >
        <iframe
          ref={iframeRef}
          src="/"
          className="w-full h-full border-0"
          title="JHONROB"
        />
      </motion.div>

      {/* Cinematic bars (optional letterbox effect) */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/70 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />

      {/* Left edge gradient */}
      <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />

      {/* Transition flash effect */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cyan-500 pointer-events-none mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      {/* UI Elements - can be hidden */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress bars (Stories style) */}
            <div className="absolute top-5 left-5 right-5 flex gap-1.5 z-20">
              {scrollPoints.map((_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={false}
                    animate={{
                      width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              ))}
            </div>

            {/* Logo */}
            <div className="absolute top-14 left-5 flex items-center gap-3 z-20">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white text-sm font-bold shadow-lg shadow-cyan-500/30"
              >
                JR
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white font-semibold text-sm">JHONROB</p>
                <p className="text-white/70 text-[10px] uppercase tracking-widest">Agro & Industrial</p>
              </motion.div>
            </div>

            {/* Current section label - Cinematic style */}
            <div className="absolute bottom-28 left-0 right-0 z-20 px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4"
                  />
                  <h2 className="text-white text-4xl sm:text-5xl font-bold tracking-tight">
                    {point.label}
                  </h2>
                  <p className="text-white/80 text-lg mt-2">{point.sublabel}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Section counter */}
            <div className="absolute bottom-28 right-6 z-20">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-right"
              >
                <span className="text-5xl font-bold text-white/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xl text-white/10">/{String(scrollPoints.length).padStart(2, "0")}</span>
              </motion.div>
            </div>

            {/* Controls */}
            {started && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20"
              >
                <button
                  onClick={reset}
                  className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-md grid place-items-center text-white hover:bg-white/25 transition border border-white/15"
                  title="Reset (R)"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={togglePlay}
                  className="h-14 w-14 rounded-full bg-white grid place-items-center text-black hover:scale-105 transition-transform shadow-xl shadow-white/20"
                  title="Play/Pause (Space)"
                >
                  {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
                </button>
                <button
                  onClick={() => setShowUI(false)}
                  className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-md grid place-items-center text-white hover:bg-white/25 transition border border-white/15"
                  title="Ocultar UI (H)"
                >
                  <EyeOff size={16} />
                </button>
              </motion.div>
            )}

            {/* Keyboard hints */}
            {started && (
              <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                <kbd className="px-2 py-1 rounded bg-white/15 text-white/60 text-[10px] backdrop-blur-sm border border-white/20">
                  SPACE
                </kbd>
                <kbd className="px-2 py-1 rounded bg-white/15 text-white/60 text-[10px] backdrop-blur-sm border border-white/20">
                  H ocultar
                </kbd>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show UI button when hidden */}
      {!showUI && (
        <button
          onClick={() => setShowUI(true)}
          className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-black/50 backdrop-blur-md grid place-items-center text-white/50 hover:text-white transition z-20"
        >
          <Eye size={18} />
        </button>
      )}

      {/* Initial overlay */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30"
            onClick={handlePlay}
          >
            <div className="text-center cursor-pointer">
              {/* Animated rings */}
              <div className="relative mb-8">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 h-32 w-32 rounded-full border-2 border-cyan-400 mx-auto"
                  style={{ margin: "auto" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute inset-0 h-32 w-32 rounded-full border-2 border-blue-400 mx-auto"
                  style={{ margin: "auto" }}
                />
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center mx-auto shadow-2xl shadow-cyan-500/40"
                >
                  <Play size={48} className="text-white ml-2" />
                </motion.div>
              </div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-4xl font-bold tracking-tight"
              >
                Tour Automático
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 mt-3 text-lg"
              >
                Clique para explorar a plataforma JHONROB
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex items-center justify-center gap-4 text-white/50 text-sm"
              >
                <span>🎬 {scrollPoints.length} seções</span>
                <span>⏱️ ~30 segundos</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
