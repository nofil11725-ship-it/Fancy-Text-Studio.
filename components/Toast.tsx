"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-gray-900/95 px-4 py-3 text-sm font-medium text-white shadow-xl backdrop-blur-md transition-all duration-300 dark:bg-white dark:text-gray-950"
    >
      <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
      <span>{message}</span>
    </div>
  );
}
