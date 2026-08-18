"use client";

import { motion } from "framer-motion";
import { CLASS_LEVELS, CLASS_TYPES, type ClassLevel, type ClassType } from "@/lib/config/classes";
import { scrollFadeUpProps } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/shared/Button";

interface LearningPathPickerProps {
  classType: ClassType | null;
  level: ClassLevel | null;
  onSelectType: (type: ClassType) => void;
  onSelectLevel: (level: ClassLevel) => void;
  onContinue: () => void;
}

export function LearningPathPicker({
  classType,
  level,
  onSelectType,
  onSelectLevel,
  onContinue,
}: LearningPathPickerProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-14">
      <motion.div {...scrollFadeUpProps}>
        <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-charcoal-light">
          What would you like to learn?
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CLASS_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onSelectType(type)}
              className={cn(
                "border px-6 py-5 font-display text-lg text-charcoal transition-colors",
                classType === type ? "border-wine bg-ivory-dark" : "border-charcoal/15 hover:border-charcoal/40"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      {classType && (
        <motion.div {...scrollFadeUpProps}>
          <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-charcoal-light">
            Choose your level
          </p>
          <div className="space-y-4">
            {CLASS_LEVELS.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => onSelectLevel(l.value)}
                className={cn(
                  "block w-full border px-6 py-5 text-left transition-colors",
                  level === l.value ? "border-wine bg-ivory-dark" : "border-charcoal/15 hover:border-charcoal/40"
                )}
              >
                <span className="font-display text-lg text-charcoal">{l.label}</span>
                <span className="mt-1 block text-sm text-charcoal-light">{l.description}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {classType && level && (
        <motion.div {...scrollFadeUpProps} className="text-center">
          <Button onClick={onContinue} size="lg">
            Continue to Inquiry
          </Button>
        </motion.div>
      )}
    </div>
  );
}
