import React from "react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200/80 py-8 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-gray-500 sm:flex-row sm:px-6 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Fancy Text Generator 2.0. Clean, privacy-first Unicode styler.</p>
        <div className="flex gap-4">
          <span>Instagram Bios</span>
          <span>•</span>
          <span>Discord Handles</span>
          <span>•</span>
          <span>Gaming Usernames</span>
        </div>
      </div>
    </footer>
  );
}
