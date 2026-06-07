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
  const filePath = join(process.cwd(), "public", "characters.json");
  const characters: Character[] = JSON.parse(readFileSync(filePath, "utf-8"));
  const daily = getDailyCharacter(characters);

  return <GameClient characters={characters} daily={daily} />;
}
