"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { buildShareText } from "@/lib/game";

export default function ShareModal() {
  const guesses     = useGameStore((s) => s.guesses);
  const won         = useGameStore((s) => s.won);
  const daily       = useGameStore((s) => s.daily);
  const setShowShare = useGameStore((s) => s.setShowShare);
  const [copied, setCopied]   = useState(false);

  const text = buildShareText(guesses, won);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div
      id="share-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
      onClick={() => setShowShare(false)}
    >
      <div
        id="share-modal"
        className="animate-scale-in w-full"
        style={{
          maxWidth: "min(92vw, 460px)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div style={{ height: "4px", background: "var(--accent)" }} />

        {/* Header */}
        <div className="px-6 pt-8 pb-5 text-center">
          <p
            className="tracking-widest uppercase mb-2"
            style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.3em" }}
          >
            {won ? "✓ Acertou!" : "Resultado de hoje"}
          </p>
          <h2
            className="font-display tracking-[0.15em] uppercase"
            style={{ fontSize: "1.8rem", color: "var(--text-primary)", marginBottom: "8px" }}
          >
            {daily?.name}
          </h2>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
            {guesses.length} tentativa{guesses.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Emoji preview */}
        <div
          className="mx-6 mb-6 p-5 font-mono whitespace-pre-wrap text-center leading-relaxed"
          style={{
            background: "#000",
            border: "1px solid var(--border)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            borderRadius: "10px",
            userSelect: "all",
          }}
        >
          {text}
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-2">
          <button
            id="share-copy-btn"
            onClick={handleCopy}
            className="flex-1 py-3 transition-colors tracking-widest uppercase"
            style={{
              background: copied ? "#2a2a2a" : "var(--correct-bg)",
              color: copied ? "var(--text-primary)" : "var(--correct-text)",
              fontSize: "0.65rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              borderRadius: "1px",
            }}
          >
            {copied ? "✓ Copiado!" : "Copiar resultado"}
          </button>
          <button
            id="share-close-btn"
            onClick={() => setShowShare(false)}
            className="px-4 py-3 transition-colors"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontSize: "0.7rem",
              cursor: "pointer",
              borderRadius: "1px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-muted)")
            }
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
