"use client";

import { motion } from "framer-motion";
import { SERVICE_CARDS } from "@/lib/config/navigation";
import { staggerContainer } from "@/lib/motion";
import { ServiceMenuItem } from "./ServiceMenuItem";

export function ServiceMenu() {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      {SERVICE_CARDS.map((card, index) => (
        <ServiceMenuItem key={card.title} card={card} index={index} />
      ))}
    </motion.div>
  );
}
