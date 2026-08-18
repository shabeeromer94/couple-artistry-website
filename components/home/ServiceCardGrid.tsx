"use client";

import { motion } from "framer-motion";
import { SERVICE_CARDS } from "@/lib/config/navigation";
import { staggerContainer } from "@/lib/motion";
import { ServiceCard } from "./ServiceCard";

export function ServiceCardGrid() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
    >
      {SERVICE_CARDS.map((card) => (
        <ServiceCard key={card.title} card={card} />
      ))}
    </motion.div>
  );
}
