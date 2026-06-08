import { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import { Character } from "@/types";
import { getDailyCharacter } from "@/lib/game";
import GameClient from "@/components/GameClient";

export const metadata: Metadata = {
  title: "GHOULDLE — Adivinhe o personagem de Tokyo Ghoul",
  description: "Jogo diário de adivinhação de personagens do universo Tokyo Ghoul.",
};

export default function Home() {
  try {
    const filePath = join(process.cwd(), "public", "characters.json");
    const characters: Character[] = JSON.parse(readFileSync(filePath, "utf-8"));
    const daily = getDailyCharacter(characters);

    return <GameClient characters={characters} daily={daily} />;
  } catch (error) {
    console.error("Failed to load characters data:", error);
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text-primary)",
        padding: "24px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>❌ Erro ao carregar dados</h1>
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "400px" }}>
          Desculpe, não conseguimos carregar o banco de personagens. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }
}
