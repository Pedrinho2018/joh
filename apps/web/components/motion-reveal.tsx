"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function MotionReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}
