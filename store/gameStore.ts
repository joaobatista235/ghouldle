"use client";
import { create } from "zustand";
import { Character, GuessRow } from "@/types";
import { compareGuess, getRandomCharacter } from "@/lib/game";

interface GameState {
  characters: Character[];
  daily: Character | null;
  dailyTarget: Character | null;
  mode: "daily" | "infinite";
  guesses: GuessRow[];
  won: boolean;
  lost: boolean;
  finished: boolean;
  input: string;
  suggestions: Character[];
  showShare: boolean;
  setCharacters: (chars: Character[], daily: Character) => void;
  initializeState: (chars: Character[], daily: Character) => void;
  setMode: (mode: "daily" | "infinite") => void;
  startNextRound: () => void;
  setInput: (val: string) => void;
  submitGuess: (character: Character) => void;
  setShowShare: (val: boolean) => void;
  clearSuggestions: () => void;
}

export const useGameStore = create<GameState>((set, get) => {
  const STORAGE_KEY = "ghouldle-state";

  const loadSavedState = () => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const persistSavedState = (saved: any) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  };

  const saveActiveMode = () => {
    const state = get();
    if (typeof window === "undefined") return;

    const saved = loadSavedState() || {};
    const today = new Date().toISOString().slice(0, 10);

    if (state.mode === "daily" && state.daily) {
      saved.daily = {
        date: today,
        dailyId: state.daily.id,
        guesses: state.guesses,
        won: state.won,
        finished: state.finished,
      };
    }

    if (state.mode === "infinite" && state.daily) {
      saved.infinite = {
        currentCharacterId: state.daily.id,
        guesses: state.guesses,
        won: state.won,
        finished: state.finished,
      };
    }

    saved.mode = state.mode;
    persistSavedState(saved);
  };

  return ({
  characters: [],
  daily: null,
  dailyTarget: null,
  mode: "daily",
  guesses: [],
  won: false,
  lost: false,
  finished: false,
  input: "",
  suggestions: [],
  showShare: false,

  setCharacters: (chars, daily) => {
    set({ characters: chars, dailyTarget: daily, daily });
  },

  initializeState: (chars, daily) => {
    if (typeof window === "undefined") {
      set({ characters: chars, dailyTarget: daily, daily });
      return;
    }

    const raw = window.localStorage.getItem("ghouldle-state");
    const today = new Date().toISOString().slice(0, 10);
    let saved: any = null;

    if (raw) {
      try {
        saved = JSON.parse(raw);
      } catch {
        saved = null;
      }
    }

    const savedDaily = saved?.daily;
    const savedInfinite = saved?.infinite;
    const mode = saved?.mode === "infinite" ? "infinite" : "daily";

    if (mode === "daily" && savedDaily?.date === today && savedDaily?.dailyId === daily.id) {
      set({
        characters: chars,
        dailyTarget: daily,
        daily,
        mode,
        guesses: savedDaily.guesses ?? [],
        won: savedDaily.won ?? false,
        finished: savedDaily.finished ?? false,
        input: "",
        suggestions: [],
        showShare: savedDaily.won ?? false,
      });
      return;
    }

    if (mode === "infinite" && savedInfinite?.currentCharacterId) {
      const current =
        chars.find((character) => character.id === savedInfinite.currentCharacterId) ||
        getRandomCharacter(chars, daily);

      set({
        characters: chars,
        dailyTarget: daily,
        daily: current,
        mode,
        guesses: savedInfinite.guesses ?? [],
        won: savedInfinite.won ?? false,
        finished: savedInfinite.finished ?? false,
        input: "",
        suggestions: [],
        showShare: savedInfinite.won ?? false,
      });
      return;
    }

    set({
      characters: chars,
      dailyTarget: daily,
      daily,
      mode: "daily",
      guesses: [],
      won: false,
      lost: false,
      finished: false,
      input: "",
      suggestions: [],
      showShare: false,
    });
  },

  setMode: (newMode) => {
    const { characters, dailyTarget, mode, daily, guesses, won, finished } = get();
    if (!dailyTarget || !daily) return;

    const saved = loadSavedState() || {};
    const today = new Date().toISOString().slice(0, 10);

    if (mode === "daily") {
      saved.daily = {
        date: today,
        dailyId: daily.id,
        guesses,
        won,
        finished,
      };
    }

    if (mode === "infinite") {
      saved.infinite = {
        currentCharacterId: daily.id,
        guesses,
        won,
        finished,
      };
    }

    saved.mode = newMode;

    if (newMode === "daily") {
      const savedDaily = saved.daily;
      const shouldRestore =
        savedDaily?.date === today && savedDaily?.dailyId === dailyTarget.id;

      set({
        mode: newMode,
        daily: dailyTarget,
        guesses: shouldRestore ? savedDaily.guesses ?? [] : [],
        won: shouldRestore ? savedDaily.won ?? false : false,
        finished: shouldRestore ? savedDaily.finished ?? false : false,
        input: "",
        suggestions: [],
        showShare: shouldRestore ? savedDaily.won ?? false : false,
      });
    } else {
      const savedInfinite = saved.infinite;
      const restoredDaily =
        savedInfinite?.currentCharacterId
          ? characters.find((character) => character.id === savedInfinite.currentCharacterId)
          : null;
      const current = restoredDaily || getRandomCharacter(characters, dailyTarget);

      set({
        mode: newMode,
        daily: current,
        guesses: savedInfinite?.guesses ?? [],
        won: savedInfinite?.won ?? false,
        finished: savedInfinite?.finished ?? false,
        input: "",
        suggestions: [],
        showShare: savedInfinite?.won ?? false,
      });
    }

    persistSavedState(saved);
  },

  startNextRound: () => {
    const { characters, daily, dailyTarget } = get();
    if (characters.length === 0) return;

    const nextDaily = getRandomCharacter(characters, dailyTarget || daily);
    set({
      daily: nextDaily,
      guesses: [],
      won: false,
      lost: false,
      finished: false,
      input: "",
      suggestions: [],
      showShare: false,
    });
  },

  setInput: (val) => {
    const { characters, guesses } = get();
    const alreadyGuessed = guesses.map((g) => g.character.id);
    const suggestions =
      val.length >= 1
        ? characters
            .filter(
              (c) =>
                c.name.toLowerCase().includes(val.toLowerCase()) &&
                !alreadyGuessed.includes(c.id)
            )
            .slice(0, 8)
        : [];
    set({ input: val, suggestions });
  },

  submitGuess: (character) => {
    const { daily, guesses, mode } = get();
    if (!daily) return;

    const results = compareGuess(character, daily);
    const newGuess: GuessRow = { character, results };
    const newGuesses = [newGuess, ...guesses];
    const won = character.id === daily.id;

    set({
      guesses: newGuesses,
      won,
      finished: won,
      input: "",
      suggestions: [],
      showShare: won,
    });
  },

  setShowShare: (val) => set({ showShare: val }),
  clearSuggestions: () => set({ suggestions: [], input: "" }),
  });
});
