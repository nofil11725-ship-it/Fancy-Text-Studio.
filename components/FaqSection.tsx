import React from "react";

const FAQS = [
  {
    q: "How does Fancy Text Generator 2.0 work?",
    a: "This tool does not change your computer font. It maps standard alphanumeric ASCII letters to official Unicode symbols, mathematical alphanumeric variants, and combining diacritics. These are recognized universally across the web and mobile operating systems."
  },
  {
    q: "Can I use these fonts on Instagram, TikTok, and Discord?",
    a: "Yes. Because these characters are universal Unicode glyphs, you can paste them directly into your Instagram bio, TikTok captions, Discord handles, Twitter/X tweets, WhatsApp chats, and gaming profiles (like PUBG, Free Fire, and Steam)."
  },
  {
    q: "Why do some characters show up as boxes on older devices?",
    a: "Older operating systems or legacy browser versions may lack font definitions for newer Unicode ranges. All modern smartphones (iOS 12+, Android 9+) and modern desktop browsers fully support these characters."
  },
  {
    q: "Is there any cost or character limit?",
    a: "No. The application is completely free, client-side, and does not send your text to any remote server, ensuring privacy and instantaneous conversions."
  }
];

export function FaqSection() {
  return (
    <section className="mx-auto mt-16 max-w-4xl border-t border-gray-200/80 pt-12 dark:border-gray-800">
      <h2 className="text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Everything you need to know about Unicode fancy fonts and compatibility.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/40"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {faq.q}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
