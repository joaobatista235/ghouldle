"use client";

import { useGameStore } from "@/store/gameStore";
import GuessCell from "@/components/GuessCell";

const DELAYS = [0, 90, 180, 270, 360, 450, 540, 630, 720];

export default function GuessGrid() {
  const guesses = useGameStore((s) => s.guesses);

  if (guesses.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "48px 0",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
        }}
      >
        Nenhuma tentativa ainda — comece digitando um nome
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", paddingBottom: "8px" }}>
      <div style={{ minWidth: "520px" }}>
        {guesses.map((guess, rowIdx) => (
          <div
            key={rowIdx}
            id={`guess-row-${rowIdx}`}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr repeat(8, 1fr)",
              gap: "6px",
              marginBottom: "6px",
              opacity: 0,
              animationName: "row-slide-up",
              animationDuration: "0.35s",
              animationTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
              animationFillMode: "forwards",
              animationDelay: `${rowIdx * 60}ms`,
              transformOrigin: "bottom center",
            }}
          >
            <GuessCell value={guess.character.name}    result={guess.results.name}    delay={DELAYS[0]} isName />
            <GuessCell value={guess.character.species} result={guess.results.species} delay={DELAYS[1]} />
            <GuessCell value={guess.character.kagune}  result={guess.results.kagune}  delay={DELAYS[2]} />
            <GuessCell value={guess.character.faction} result={guess.results.faction} delay={DELAYS[3]} />
            <GuessCell
              value={guess.character.rating}
              result={guess.results.rating}
              direction={guess.results.ratingDirection}
              delay={DELAYS[4]}
            />
            <GuessCell value={guess.character.gender} result={guess.results.gender} delay={DELAYS[5]} />
            <GuessCell value={guess.character.status} result={guess.results.status} delay={DELAYS[6]} />
            <GuessCell value={guess.character.arc}    result={guess.results.arc}    delay={DELAYS[7]} />
            <GuessCell value={guess.character.role}   result={guess.results.role}   delay={DELAYS[8]} />
          </div>
        ))}
      </div>
    </div>
  );
}
