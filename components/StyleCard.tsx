"use client";

import React, { useState } from "react";
import { Copy, Check, Star } from "lucide-react";

interface StyleCardProps {
  id: string;
  name: string;
  category: string;
  transformedText: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (text: string, name: string) => void;
}

export function StyleCard({
  id,
  name,
  category,
  transformedText,
  isFavorite,
  onToggleFavorite,
  onCopy
}: StyleCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(transformedText, name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm transition hover:border-brand-500/50 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60 dark:hover:border-brand-500/50">
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5 dark:border-gray-800/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {name}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {category}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`rounded-lg p-1 transition ${
            isFavorite
              ? "text-amber-500 hover:text-amber-600"
              : "text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400"
          }`}
        >
          <Star className={`h-4 w-4 ${isFavorite ? "fill-amber-500" : ""}`} />
        </button>
      </div>

      <div className="my-3 min-h-[3.25rem] overflow-x-auto whitespace-pre-wrap break-words py-1 text-lg font-medium text-gray-900 select-all dark:text-gray-100">
        {transformedText}
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-brand-500 hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-brand-600 dark:hover:text-white"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
