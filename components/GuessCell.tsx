"use client";

import { useEffect, useState } from "react";
import { GuessResult } from "@/types";

interface Props {
  value: string;
  result: GuessResult;
  direction?: "up" | "down";
  delay?: number;
  isName?: boolean;
}

const STYLES: Record<GuessResult, { bg: string; border: string; color: string }> = {
  correct: {
    bg:     "var(--correct-bg)",
    border: "rgba(255,255,255,0.25)",
    color:  "var(--correct-text)",
  },
  partial: {
    bg:     "var(--partial-bg)",
    border: "var(--partial-border)",
    color:  "var(--partial-text)",
  },
  wrong: {
    bg:     "var(--wrong-bg)",
    border: "var(--wrong-border)",
    color:  "var(--wrong-text)",
  },
};

export default function GuessCell({
  value,
  result,
  direction,
  delay = 0,
  isName = false,
}: Props) {
  const [revealed, setRevealed] = useState(false);
  const style = STYLES[result];

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: isName ? "68px" : "64px",
        padding: isName ? "8px 10px" : "6px 4px",
        borderRadius: "6px",
        border: `1px solid ${revealed ? style.border : "var(--border)"}`,
        background: revealed ? style.bg : "var(--surface)",
        color: revealed ? style.color : "var(--text-muted)",
        fontWeight: isName ? 600 : 500,
        overflow: "hidden",
        animationName: revealed ? "flip-in" : "none",
        animationDuration: "0.4s",
        animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        animationFillMode: "both",
        animationDelay: revealed ? `${delay}ms` : "0ms",
        transition: "background 0.35s, border-color 0.35s, color 0.35s",
      }}
    >
      <span
        style={{
          fontSize: isName
            ? "clamp(0.6rem, 1.6vw, 0.85rem)"
            : "clamp(0.55rem, 1.2vw, 0.75rem)",
          lineHeight: 1.3,
          wordBreak: "break-word",
          hyphens: "auto",
          maxWidth: "100%",
        }}
      >
        {value}
      </span>

      {direction && revealed && (
        <span
          style={{
            fontSize: "0.55rem",
            marginTop: "3px",
            opacity: 0.9,
            color: "var(--partial-text)",
          }}
        >
          {direction === "up" ? "↑ maior" : "↓ menor"}
        </span>
      )}

      {result === "correct" && revealed && (
        <span
          style={{
            position: "absolute",
            top: "4px",
            right: "5px",
            fontSize: "0.5rem",
            opacity: 0.35,
            color: "var(--correct-text)",
          }}
        >
          ✓
        </span>
      )}
    </div>
  );
}
