"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import HowToPlay from "@/components/HowToPlay";

export default function Header() {
  const [showTooltip, setShowTooltip] = useState(false);
  const mode = useGameStore((s) => s.mode);
  const setMode = useGameStore((s) => s.setMode);

  const date = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
              letterSpacing: "0.14em",
              lineHeight: 1,
              color: "var(--text-primary)",
              userSelect: "none",
            }}
          >
            GHOU<span style={{ color: "var(--accent)" }}>L</span>DLE
          </h1>
          <p
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginTop: "4px",
            }}
          >
            Tokyo Ghoul · Jogo Diário
          </p>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              {date}
            </p>
            <p
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
                marginTop: "3px",
              }}
            >
              {mode === "daily" ? "Modo Diário" : "Modo Infinito"}
            </p>
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setMode("daily")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: mode === "daily" ? "1px solid var(--accent)" : "1px solid var(--border)",
                  background: mode === "daily" ? "rgba(193, 18, 31, 0.1)" : "transparent",
                  color: mode === "daily" ? "var(--text-primary)" : "var(--text-muted)",
                  fontSize: "0.65rem",
                  cursor: "pointer",
                }}
              >
                Diário
              </button>
              <button
                onClick={() => setMode("infinite")}
                style={{
                  padding: "8px 12px",
                  borderRadius: "999px",
                  border: mode === "infinite" ? "1px solid var(--accent)" : "1px solid var(--border)",
                  background: mode === "infinite" ? "rgba(193, 18, 31, 0.1)" : "transparent",
                  color: mode === "infinite" ? "var(--text-primary)" : "var(--text-muted)",
                  fontSize: "0.65rem",
                  cursor: "pointer",
                }}
              >
                Infinito
              </button>
            </div>
          </div>

          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              id="help-btn"
              aria-label="Como jogar"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border-hover)";
                el.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text-muted)";
              }}
            >
              ?
            </button>

            {showTooltip && <HowToPlay />}
          </div>
        </div>
      </div>
    </header>
  );
}
