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
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

const cards = [
  {
    id: "cover",
    type: "cover",
    title: "JHONROB",
    subtitle: "DIGITAL",
    description: "Plataforma completa para Indústria & Agro",
    icon: Factory,
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    features: ["Catálogo Digital", "Captação de Leads", "Sistema de Tickets"],
  },
  {
    id: "catalog",
    type: "feature",
    badge: "01",
    title: "Catálogo",
    subtitle: "Digital",
    icon: ShoppingCart,
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    points: [
      "Produtos com especificações completas",
      "Categorização inteligente",
      "Imagens de alta qualidade",
      "Busca e filtros avançados",
    ],
  },
  {
    id: "leads",
    type: "feature",
    badge: "02",
    title: "Captação de",
    subtitle: "Leads",
    icon: BarChart3,
    gradient: "from-violet-500 via-purple-600 to-fuchsia-700",
    points: [
      "Formulário de contato rápido",
      "Solicitação de orçamento",
      "Download de catálogo em PDF",
      "Notificações em tempo real",
    ],
  },
  {
    id: "tickets",
    type: "feature",
    badge: "03",
    title: "Sistema de",
    subtitle: "Tickets",
    icon: Ticket,
    gradient: "from-orange-500 via-red-600 to-rose-700",
    points: [
      "Abertura digital de chamados",
      "Protocolo gerado automaticamente",
      "Upload de arquivos e anexos",
      "Acompanhamento de status",
    ],
  },
  {
    id: "automation",
    type: "feature",
    badge: "04",
    title: "Automação",
    subtitle: "Inteligente",
    icon: Zap,
    gradient: "from-yellow-500 via-amber-600 to-orange-700",
    points: [
      "Webhooks para integração",
      "Emails automáticos",
      "Relatórios diários às 18h",
      "Processamento em background",
    ],
  },
  {
    id: "cta",
    type: "cta",
    title: "Modernize sua",
    subtitle: "Operação",
    icon: CheckCircle,
    gradient: "from-cyan-500 via-emerald-600 to-green-700",
    handle: "@jhonrob",
    website: "jhonrob.com.br",
  },
];

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          initial={{
            x: Math.random() * 400,
            y: Math.random() * 400,
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

export default function PostPage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  const card = cards[index];
  const duration = 4000;

  const goToNext = useCallback(() => {
    if (index < cards.length - 1) {
      setDirection(1);
      setIndex((i) => i + 1);
      setProgress(0);
    } else {
      setDirection(1);
      setIndex(0);
      setProgress(0);
    }
  }, [index]);

  const goToPrev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex((i) => i - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (!playing) return;
    const interval = 30;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goToNext();
          return 0;
        }
        return p + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [playing, goToNext]);

  const handleStart = () => {
    setStarted(true);
    setPlaying(true);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-4">
      {/* Post frame 1:1 */}
      <div className="relative w-full max-w-[480px] aspect-square bg-[#0a0a0f] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
        {/* Dynamic background gradient */}
        <motion.div
          key={card.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20`}
        />

        {/* Mesh gradient animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                `radial-gradient(circle at 0% 0%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)`,
                `radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`,
                `radial-gradient(circle at 0% 100%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)`,
              ],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <FloatingParticles />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-sm font-bold shadow-lg shadow-cyan-500/30">
                JR
              </div>
              <div>
                <p className="text-sm font-bold">JHONROB</p>
                <p className="text-[10px] text-white/70">Agro & Industrial</p>
              </div>
            </motion.div>

            <div className="flex gap-2">
              <button
                onClick={() => { setIndex(0); setProgress(0); setPlaying(false); }}
                className="h-9 w-9 rounded-full bg-white/10 border border-white/15 grid place-items-center hover:bg-white/15 transition"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="h-9 w-9 rounded-full bg-white/10 border border-white/15 grid place-items-center hover:bg-white/15 transition"
              >
                {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5 mb-6">
            {cards.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden"
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${card.gradient}`}
                  initial={false}
                  animate={{
                    width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={card.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full text-center"
              >
                {card.type === "cover" && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`mx-auto h-24 w-24 rounded-3xl bg-gradient-to-br ${card.gradient} grid place-items-center shadow-xl`}
                    >
                      <card.icon size={48} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <h1 className="text-5xl font-black tracking-tight">{card.title}</h1>
                      <h2 className={`text-4xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {card.subtitle}
                      </h2>
                    </div>
                    <p className="text-white/75 text-base">{card.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {("features" in card && card.features ? card.features : []).map((f: string, i: number) => (
                        <motion.span
                          key={f}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${card.gradient} text-xs font-semibold`}
                        >
                          {f}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {card.type === "feature" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-center gap-3">
                      <span className={`text-sm font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {(card as typeof cards[1]).badge}
                      </span>
                      <div className={`h-[1px] w-16 bg-gradient-to-r ${card.gradient}`} />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className={`mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br ${card.gradient} grid place-items-center shadow-lg`}
                    >
                      <card.icon size={40} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-bold">{card.title}</h2>
                      <h3 className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {card.subtitle}
                      </h3>
                    </div>
                    <ul className="space-y-2.5 text-left max-w-[320px] mx-auto">
                      {("points" in card && card.points ? card.points : []).map((point: string, i: number) => (
                        <motion.li
                          key={point}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.08 }}
                          className="flex items-center gap-3 text-base text-white/85"
                        >
                          <span className={`h-5 w-5 rounded-full bg-gradient-to-br ${card.gradient} grid place-items-center text-[10px] font-bold flex-shrink-0`}>
                            ✓
                          </span>
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {card.type === "cta" && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring" }}
                      className={`mx-auto h-24 w-24 rounded-3xl bg-gradient-to-br ${card.gradient} grid place-items-center shadow-xl`}
                    >
                      <card.icon size={48} strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-bold">{card.title}</h2>
                      <h3 className={`text-4xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {card.subtitle}
                      </h3>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${card.gradient} px-8 py-4 font-bold text-xl shadow-xl`}
                    >
                      {(card as typeof cards[5]).handle}
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/75 text-base"
                    >
                      {(card as typeof cards[5]).website}
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={goToPrev}
              disabled={index === 0}
              className="h-10 w-10 rounded-full bg-white/10 grid place-items-center disabled:opacity-30 hover:bg-white/15 transition border border-white/15"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {cards.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); setProgress(0); }}
                  animate={{
                    scale: i === index ? 1 : 0.7,
                    opacity: i === index ? 1 : 0.4,
                  }}
                  className={`h-2.5 rounded-full transition-all ${i === index ? `w-6 bg-gradient-to-r ${card.gradient}` : "w-2.5 bg-white/50"}`}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="h-10 w-10 rounded-full bg-white/10 grid place-items-center hover:bg-white/15 transition border border-white/15"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Start overlay */}
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
                  transition={{ type: "spring" }}
                  className="relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 h-20 w-20 rounded-full bg-cyan-400"
                  />
                  <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center shadow-xl">
                    <Play size={32} className="ml-1" />
                  </div>
                </motion.div>
                <p className="mt-4 font-semibold">Iniciar Carrossel</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 text-center text-white/60 text-sm">
        <p>Formato Feed (1:1) • Ideal para Posts e Carrossel</p>
      </div>
    </div>
  );
}
