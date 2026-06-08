export type Species = "Ghoul" | "Humano" | "Meio-Ghoul" | "Quinx";
export type Kagune = "Rinkaku" | "Ukaku" | "Bikaku" | "Koukaku" | "Nenhum";
export type Faction = "CCG" | "Aogiri" | "Gourmet" | "Clowns" | "V" | "Independente" | "Anteiku";
export type Rating = "C" | "B" | "A" | "S" | "SS" | "SSS" | "—";
export type Gender = "Masculino" | "Feminino" | "Ambíguo";
export type Status = "Vivo" | "Viva" | "Morto" | "Morta" | "Desaparecido";
export type Arc = "Original" | ":re" | "Jack";
export type Role = "Protagonista" | "Antagonista" | "Aliado" | "Neutro";

export interface Character {
  id: number;
  name: string;
  image: string | null;
  species: Species;
  kagune: Kagune;
  faction: Faction;
  rating: Rating;
  gender: Gender;
  status: Status;
  arc: Arc;
  role: Role;
}

export type GuessResult = "correct" | "wrong" | "partial";

export interface GuessRow {
  character: Character;
  results: {
    name: GuessResult;
    species: GuessResult;
    kagune: GuessResult;
    faction: GuessResult;
    rating: GuessResult;
    gender: GuessResult;
    status: GuessResult;
    arc: GuessResult;
    role: GuessResult;
    ratingDirection?: "up" | "down";
  };
}
