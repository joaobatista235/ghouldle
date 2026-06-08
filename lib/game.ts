import { Character, GuessRow, GuessResult, Rating } from "@/types";

const RATING_ORDER: Rating[] = ["—", "C", "B", "A", "S", "SS", "SSS"];

// Utility function to get consistent UTC date string
function getUtcDateString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

export function getDailyCharacter(characters: Character[]): Character {
  const today = getUtcDateString();
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)) & 0xffffffff;
  }
  const index = Math.abs(hash) % characters.length;
  return characters[index];
}

export function getRandomCharacter(
  characters: Character[],
  exclude?: Character | null
): Character {
  const pool = exclude
    ? characters.filter((character) => character.id !== exclude.id)
    : characters;

  return pool[Math.floor(Math.random() * pool.length)];
}

export function compareGuess(
  guess: Character,
  target: Character
): GuessRow["results"] {
  const ratingGuessIdx = RATING_ORDER.indexOf(guess.rating);
  const ratingTargetIdx = RATING_ORDER.indexOf(target.rating);

  const ratingDiff = Math.abs(ratingGuessIdx - ratingTargetIdx);
  const ratingResult: GuessResult =
    guess.rating === target.rating
      ? "correct"
      : ratingDiff <= 1
        ? "partial"
        : "wrong";

  return {
    name: guess.name === target.name ? "correct" : "wrong",
    species: compareField(guess.species, target.species),
    kagune: compareField(guess.kagune, target.kagune),
    faction: compareField(guess.faction, target.faction),
    rating: ratingResult,
    gender: compareField(guess.gender, target.gender),
    status: compareStatusField(guess.status, target.status),
    arc: compareField(guess.arc, target.arc),
    role: compareField(guess.role, target.role),
    ratingDirection:
      guess.rating !== target.rating
        ? ratingGuessIdx < ratingTargetIdx
          ? "up"
          : "down"
        : undefined,
  };
}

function compareField(a: string, b: string): GuessResult {
  return a === b ? "correct" : "wrong";
}

function compareStatusField(a: string, b: string): GuessResult {
  const normalize = (s: string) =>
    s.replace("Viva", "Vivo").replace("Morta", "Morto");
  return normalize(a) === normalize(b) ? "correct" : "wrong";
}

const RESULT_EMOJI: Record<GuessResult, string> = {
  correct: "⬜",
  partial: "🟧",
  wrong: "⬛",
};

export function buildShareText(guesses: GuessRow[], won: boolean): string {
  const date = getUtcDateString();
  const lines = guesses.map((g) => {
    const fields: GuessResult[] = [
      g.results.name,
      g.results.species,
      g.results.kagune,
      g.results.faction,
      g.results.rating,
      g.results.gender,
      g.results.status,
      g.results.arc,
      g.results.role,
    ];
    return fields.map((r) => RESULT_EMOJI[r]).join("");
  });

  const header = won
    ? `Acertei em ${guesses.length} tentativa${guesses.length !== 1 ? "s" : ""}!`
    : "Não acertei hoje...";

  return `👁️ GHOULDLE — ${date}\n${header}\n\n${lines.join("\n")}\n\nghouldle.vercel.app`;
}

export function formatRating(
  rating: Rating,
  direction?: "up" | "down"
): string {
  if (!direction) return rating;
  return `${rating} ${direction === "up" ? "↑" : "↓"}`;
}
