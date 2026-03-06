"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Factory,
  ShoppingCart,
  Ticket,
  BarChart3,
  Zap,
  CheckCircle,
  Users,
  Settings,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const slides = [
  {
    id: "intro",
    icon: Factory,
    badge: "PLATAFORMA",
    title: "JHONROB",
    highlight: "Digital",
    description: "Sistema completo para indústria e agro",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    particles: true,
  },
  {
    id: "catalog",
    icon: ShoppingCart,
    badge: "CATÁLOGO",
    title: "Produtos",
    highlight: "Online",
    description: "Equipamentos com especificações detalhadas",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    stats: [
      { label: "Categorias", value: "6+" },
      { label: "Produtos", value: "10+" },
    ],
  },
  {
    id: "leads",
    icon: Users,
    badge: "CAPTAÇÃO",
    title: "Leads",
    highlight: "Automáticos",
    description: "Formulários inteligentes com notificação em tempo real",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    stats: [
      { label: "Contato", value: "✓" },
      { label: "Orçamento", value: "✓" },
      { label: "Download", value: "✓" },
    ],
  },
  {
    id: "tickets",
    icon: Ticket,
    badge: "PÓS-VENDA",
    title: "Chamados",
    highlight: "Digitais",
    description: "Sistema completo com protocolo e rastreamento",
    gradient: "from-orange-400 via-red-500 to-rose-600",
    stats: [
      { label: "Protocolo", value: "Auto" },
      { label: "Anexos", value: "✓" },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    badge: "AUTOMAÇÃO",
    title: "Python",
    highlight: "FastAPI",
    description: "Webhooks, emails e relatórios automáticos",
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    stats: [
      { label: "Relatório", value: "18h" },
      { label: "Emails", value: "Auto" },
    ],
  },
  {
    id: "admin",
    icon: BarChart3,
    badge: "DASHBOARD",
    title: "Painel",
    highlight: "Completo",
    description: "Métricas e gestão em tempo real",
    gradient: "from-pink-400 via-rose-500 to-red-600",
    stats: [
      { label: "Gráficos", value: "📊" },
      { label: "CRUD", value: "✓" },
    ],
  },
  {
    id: "stack",
    icon: Settings,
    badge: "TECNOLOGIA",
    title: "Stack",
    highlight: "Moderna",
    description: "Next.js • TypeScript • Tailwind • Prisma",
    gradient: "from-slate-400 via-zinc-500 to-neutral-600",
  },
  {
    id: "cta",
    icon: CheckCircle,
    badge: "DISPONÍVEL",
    title: "Entre em",
    highlight: "Contato",
    description: "Modernize sua operação hoje",
    gradient: "from-cyan-400 via-emerald-500 to-green-600",
    cta: "@jhonrob",
  },
];

// Particles animation component
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{
            x: Math.random() * 375,
            y: 700,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: -20,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function ReelsPage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  const slide = slides[index];
  const duration = 3500;

  const next = useCallback(() => {
    if (index < slides.length - 1) {
      setIndex((i) => i + 1);
      setProgress(0);
    } else {
      // Loop
      setIndex(0);
      setProgress(0);
    }
  }, [index]);

  useEffect(() => {
    if (!playing) return;
    const interval = 25;
    const increment = (interval / duration) * 100;

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
  }, [playing, next]);

  const handleStart = () => {
    setStarted(true);
    setPlaying(true);
  };

  const togglePlay = () => setPlaying((p) => !p);

  const reset = () => {
    setIndex(0);
    setProgress(0);
    setPlaying(false);
  };

  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-4">
      {/* Phone frame - Reels format 9:16 */}
      <div className="relative w-full max-w-[375px] aspect-[9/16] bg-[#0a0a0f] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        {/* Dynamic gradient background */}
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-20`}
        />

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              background: [
                `radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)`,
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        {/* Particles effect */}
        {"particles" in slide && slide.particles && <Particles />}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Progress bars */}
          <div className="flex gap-1 mb-4">
            {slides.map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-full bg-white/30 overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={false}
                  animate={{
                    width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-auto">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-xs font-bold shadow-lg"
              >
                JR
              </motion.div>
              <div>
                <p className="text-xs font-semibold">jhonrob</p>
                <p className="text-[10px] text-white/70">Agro & Industrial</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="h-8 w-8 rounded-full bg-white/15 grid place-items-center hover:bg-white/25 transition border border-white/10"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={togglePlay}
                className="h-8 w-8 rounded-full bg-white/15 grid place-items-center hover:bg-white/25 transition border border-white/10"
              >
                {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${slide.gradient} px-3 py-1.5 text-[10px] font-bold tracking-wider shadow-lg`}>
                  {slide.badge}
                </span>
              </motion.div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                className={`mt-6 mb-5 h-20 w-20 rounded-3xl bg-gradient-to-br ${slide.gradient} grid place-items-center shadow-xl`}
              >
                <slide.icon size={40} strokeWidth={1.5} />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-[2.75rem] font-extrabold leading-[1.1] tracking-tight">
                  {slide.title}
                  <br />
                  <span className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                    {slide.highlight}
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-base text-white/80 leading-relaxed max-w-[280px]"
              >
                {slide.description}
              </motion.p>

              {/* Stats */}
              {"stats" in slide && slide.stats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex gap-2"
                >
                  {slide.stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className={`flex-1 rounded-2xl bg-gradient-to-br ${slide.gradient} p-[1px]`}
                    >
                      <div className="h-full rounded-2xl bg-[#0a0a0f]/90 p-3 text-center">
                        <p className="text-xl font-bold">{stat.value}</p>
                        <p className="text-[10px] text-white/70 uppercase tracking-wider mt-0.5">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* CTA */}
              {"cta" in slide && slide.cta && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-8 self-start rounded-full bg-gradient-to-r ${slide.gradient} px-6 py-3.5 font-bold text-lg flex items-center gap-2 shadow-xl`}
                >
                  {slide.cta}
                  <ChevronRight size={20} />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between text-xs text-white/60">
            <span>Slide {index + 1}/{slides.length}</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              jhonrob.com.br
            </span>
          </div>
        </div>

        {/* Initial overlay */}
        <AnimatePresence>
          {!started && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30"
              onClick={handleStart}
            >
              <div className="text-center cursor-pointer">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 h-20 w-20 rounded-full bg-cyan-400"
                  />
                  <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center shadow-xl shadow-cyan-500/30">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-white font-semibold"
                >
                  Iniciar Tour
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 text-center text-white/60 text-sm">
        <p>Formato Reels/Stories (9:16) • Ideal para Instagram</p>
      </div>
    </div>
  );
}
