"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Prevent hydration mismatch: resolvedTheme is undefined during SSR
  const isMounted = resolvedTheme !== undefined;
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Render placeholder during SSR to match initial client render
  if (!isMounted) {
    return (
      <div className="fixed top-4 right-4 z-50 w-12 h-12">
        <div className="absolute inset-0 rounded-full blur-xl transition-all duration-500 pointer-events-none bg-yellow-400/30 scale-110" />
        <Button
          variant="outline"
          size="icon"
          className="relative h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-white/90 border-yellow-400/40 shadow-lg shadow-yellow-800/50 hover:border-yellow-300 hover:scale-110 active:scale-95"
          style={{
            boxShadow:
              "0 0 18px rgba(251,191,36,0.4), inset 0 0 14px rgba(251,191,36,0.15)",
          }}
          aria-label="Toggle theme"
          disabled
        >
          <div className="relative flex items-center justify-center">
            <Sun
              className="h-6 w-6 transition-all duration-500 absolute opacity-100 scale-100 rotate-0"
              style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.6))" }}
            />
            <Moon
              className="h-6 w-6 transition-all duration-500 absolute opacity-0 scale-0 rotate-180"
              style={{ filter: "none" }}
            />
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-12 h-12">
      {/* Glowing background */}
      <div
        className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 pointer-events-none
          ${
            isDark ? "bg-cyan-500/20 scale-125" : "bg-yellow-400/30 scale-110"
          }`}
      />

      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className={`
          relative h-12 w-12 rounded-full border-2
          flex items-center justify-center transition-all duration-300
          ${
            isDark
              ? "bg-slate-900/90 border-cyan-400/40 shadow-lg shadow-cyan-400/30 hover:border-cyan-300"
              : "bg-white/90 border-yellow-400/40 shadow-lg shadow-yellow-800/50 hover:border-yellow-300"
          }
          hover:scale-110 active:scale-95
        `}
        style={{
          boxShadow: isDark
            ? "0 0 18px rgba(34,211,238,0.35), inset 0 0 14px rgba(34,211,238,0.15)"
            : "0 0 18px rgba(251,191,36,0.4), inset 0 0 14px rgba(251,191,36,0.15)",
        }}
        aria-label="Toggle theme"
      >
        {/* Icons */}
        <div className="relative flex items-center justify-center">
          <Sun
            className={`h-6 w-6 transition-all duration-500 absolute
              ${
                isDark
                  ? "opacity-0 scale-0 rotate-180"
                  : "opacity-100 scale-100 rotate-0 drop-shadow"
              }`}
            style={{
              filter: !isDark
                ? "drop-shadow(0 0 6px rgba(251,191,36,0.6))"
                : "none",
            }}
          />

          <Moon
            className={`h-6 w-6 transition-all duration-500 absolute
              ${
                isDark
                  ? "opacity-100 scale-100 rotate-0 drop-shadow"
                  : "opacity-0 scale-0 rotate-180"
              }`}
            style={{
              filter: isDark
                ? "drop-shadow(0 0 6px rgba(34,211,238,0.6))"
                : "none",
            }}
          />
        </div>
      </Button>
    </div>
  );
}
