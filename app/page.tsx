"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { StyleCard } from "@/components/StyleCard";
import { Toast } from "@/components/Toast";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { TEXT_STYLES, PRESET_PHRASES } from "@/lib/transformers";
import { Search, X, Sparkles, Star } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Styles" },
  { id: "favorites", label: "Favorites" },
  { id: "popular", label: "Popular" },
  { id: "script", label: "Cursive & Script" },
  { id: "gothic", label: "Gothic / Fraktur" },
  { id: "aesthetic", label: "Aesthetic" },
  { id: "symbols", label: "Symbols & Dark" },
  { id: "glitch", label: "Glitch / Zalgo" },
  { id: "minimal", label: "Minimal" }
] as const;

export default function Home() {
  const [inputText, setInputText] = useState("Fancy Text");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedFavorites = localStorage.getItem("ftg_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch {
        // Fallback on parse failure
      }
    }

    const savedTheme = localStorage.getItem("ftg_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextState = !darkMode;
    setDarkMode(nextState);
    if (nextState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ftg_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ftg_theme", "light");
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem("ftg_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopy = (text: string, styleName: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setToastMessage(`Copied "${styleName}" style to clipboard!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const activeText = inputText.trim() === "" ? "Preview Text" : inputText;

  const filteredStyles = useMemo(() => {
    return TEXT_STYLES.filter((style) => {
      const matchesSearch =
        style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === "all") return true;
      if (selectedCategory === "favorites") return favorites.includes(style.id);
      return style.category === selectedCategory;
    });
  }, [selectedCategory, searchQuery, favorites]);

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <section className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-50/60 px-3 py-1 text-xs font-semibold text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Unicode Font Engine 2.0</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl dark:text-white">
            Generate Fancy Text & Aesthetic Fonts
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Type below to instantly convert normal letters into cursive, gothic fraktur, small caps,
            zalgo glitch, and decorated text styles for social bios and gaming tags.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="relative">
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 sm:text-lg dark:border-gray-700/80 dark:bg-gray-800/60 dark:text-white dark:placeholder-gray-500 dark:focus:border-brand-500 dark:focus:bg-gray-800"
            />
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText("")}
                aria-label="Clear input"
                className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-medium text-gray-700 dark:text-gray-300">Presets:</span>
              {PRESET_PHRASES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setInputText(preset)}
                  className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-gray-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-brand-500 dark:hover:text-brand-400"
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 font-medium">
              <span>{charCount} characters</span>
              <span>•</span>
              <span>{wordCount} words</span>
            </div>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-brand-500 text-white shadow-sm shadow-brand-500/30 dark:bg-brand-600"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {cat.id === "favorites" && <Star className="h-3.5 w-3.5 fill-current" />}
                  <span>{cat.label}</span>
                  {cat.id === "favorites" && isMounted && (
                    <span className="ml-0.5 rounded-full bg-black/10 px-1.5 py-0.2 text-[10px] dark:bg-white/20">
                      {favorites.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[200px] sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search style..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </section>

        <section className="mt-6">
          {filteredStyles.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                No matching styles found
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {selectedCategory === "favorites"
                  ? "Star any style to view it in your Favorites collection."
                  : "Try clearing your search query or switching categories."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStyles.map((style) => (
                <StyleCard
                  key={style.id}
                  id={style.id}
                  name={style.name}
                  category={style.category}
                  transformedText={style.transform(activeText)}
                  isFavorite={favorites.includes(style.id)}
                  onToggleFavorite={toggleFavorite}
                  onCopy={handleCopy}
                />
              ))}
            </div>
          )}
        </section>

        <FaqSection />
      </main>

      <Footer />
      <Toast message={toastMessage} />
    </div>
  );
}
