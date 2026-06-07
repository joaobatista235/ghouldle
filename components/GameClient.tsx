"use client";

import { useEffect, useState } from "react";
import { Character } from "@/types";
import { useGameStore } from "@/store/gameStore";
import Header from "@/components/Header";
import GuessGrid from "@/components/GuessGrid";
import SearchInput from "@/components/SearchInput";
import ColumnHeaders from "@/components/ColumnHeaders";
import ShareModal from "@/components/ShareModal";
import ColorLegend from "@/components/ColorLegend";

interface Props {
  characters: Character[];
  daily: Character;
}

const CONTAINER_WIDTH = "1024px";

export default function GameClient({ characters, daily }: Props) {
  const initializeState = useGameStore((s) => s.initializeState);
  const won           = useGameStore((s) => s.won);
  const showShare     = useGameStore((s) => s.showShare);
  const guesses       = useGameStore((s) => s.guesses);
  const mode          = useGameStore((s) => s.mode);
  const startNextRound = useGameStore((s) => s.startNextRound);

  useEffect(() => {
    initializeState(characters, daily);
  }, [characters, daily, initializeState]);

  useEffect(() => {
    if (won && mode === "infinite" && !showShare) {
      const timer = setTimeout(() => startNextRound(), 1800);
      return () => clearTimeout(timer);
    }
  }, [won, mode, showShare, startNextRound]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storageKey = "ghouldle-state";
    const existing = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
    const today = new Date().toISOString().slice(0, 10);
    const nextState = { ...existing, mode } as Record<string, any>;

    if (mode === "daily") {
      nextState.daily = {
        date: today,
        dailyId: daily.id,
        guesses,
        won,
        finished: won,
      };
    } else {
      nextState.infinite = {
        currentCharacterId: daily?.id ?? existing.infinite?.currentCharacterId,
        guesses,
        won,
        finished: won,
      };
    }

    window.localStorage.setItem(storageKey, JSON.stringify(nextState));
  }, [mode, daily, guesses, won]);

  const containerStyle: React.CSSProperties = {
    maxWidth: CONTAINER_WIDTH,
    margin: "0 auto",
    padding: "0 24px",
  };

  return (
    <div
      id="game-root"
      style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <Header />

      <main>
        {/* ── Hero title ───────────────────────────────── */}
        <div style={{ ...containerStyle, paddingTop: "40px", paddingBottom: "32px", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "16px",
            }}
          >
            {mode === "daily"
              ? "Adivinhe o personagem de Tokyo Ghoul de hoje"
              : "Adivinhe um personagem sorteado aleatoriamente — acerte para continuar"}
          </p>
          <ColorLegend />
        </div>

        {/* ── Win banner ───────────────────────────────── */}
        {won && (
          <div style={containerStyle}>
            <div
              id="win-banner"
              className="animate-scale-in"
              style={{
                textAlign: "center",
                marginBottom: "24px",
                padding: "24px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <p
                className="font-display"
                style={{ fontSize: "1.8rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "6px" }}
              >
                ✓ Acertou!
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                Era{" "}
                <strong style={{ color: "var(--text-primary)" }}>{daily.name}</strong>
                {" "}— em {guesses.length} tentativa{guesses.length !== 1 ? "s" : ""}
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: mode === "infinite" ? "10px" : "0" }}>
                <button
                  id="share-trigger-btn"
                  onClick={() => useGameStore.getState().setShowShare(true)}
                  style={{
                    padding: "10px 28px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-muted)",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
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
                  Compartilhar resultado
                </button>

                {mode === "infinite" && (
                  <button
                    id="next-round-btn"
                    onClick={startNextRound}
                    style={{
                      padding: "10px 28px",
                      border: "1px solid var(--accent)",
                      background: "var(--accent)",
                      color: "#fff",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    Próximo personagem
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Search ───────────────────────────────────── */}
        {!won && (
          <div style={containerStyle}>
            <SearchInput />
          </div>
        )}

        {/* ── Guess grid ───────────────────────────────── */}
        <div style={containerStyle}>
          <ColumnHeaders />
          <GuessGrid />
        </div>

        {/* ── Footer hint ──────────────────────────────── */}
        {guesses.length === 0 && !won && (
          <div style={{ ...containerStyle, paddingTop: "32px", paddingBottom: "48px", textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
              }}
            >
              {characters.length} personagens disponíveis · Sem limite de tentativas
            </p>
          </div>
        )}
      </main>

      {showShare && <ShareModal />}
    </div>
  );
}
