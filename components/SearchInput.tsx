"use client";

import { useRef, useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { Character } from "@/types";

export default function SearchInput() {
  const input            = useGameStore((s) => s.input);
  const suggestions      = useGameStore((s) => s.suggestions);
  const setInput         = useGameStore((s) => s.setInput);
  const submitGuess      = useGameStore((s) => s.submitGuess);
  const clearSuggestions = useGameStore((s) => s.clearSuggestions);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  function handleSelect(char: Character) {
    submitGuess(char);
    setSelectedIndex(-1);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      clearSuggestions();
      setSelectedIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    }
  }

  return (
    <div
      id="search-wrapper"
      style={{ position: "relative", marginBottom: "28px" }}
    >
      {/* ── Input ─────────────────────────────────── */}
      <div
        id="search-input-box"
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          background: "var(--surface)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocusCapture={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "rgba(255,255,255,0.22)";
          el.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.04)";
        }}
        onBlurCapture={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "none";
        }}
      >
        {/* Search icon */}
        <div style={{ padding: "0 14px 0 18px", color: "var(--text-muted)", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <input
          id="character-search"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite o nome de um personagem..."
          autoComplete="off"
          aria-label="Buscar personagem de Tokyo Ghoul"
          aria-controls="search-dropdown"
          aria-expanded={suggestions.length > 0}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            padding: "16px 0",
            fontSize: "1rem",
            color: "var(--text-primary)",
            caretColor: "var(--accent)",
            letterSpacing: "0.01em",
          }}
        />

        {input && (
          <button
            id="search-clear"
            onClick={(e) => {
              e.stopPropagation();
              clearSuggestions();
              setSelectedIndex(-1);
            }}
            aria-label="Limpar busca"
            style={{
              padding: "0 18px",
              height: "100%",
              background: "transparent",
              border: "none",
              borderLeft: "1px solid var(--border)",
              borderRadius: "0 10px 10px 0",
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)")}
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Dropdown ──────────────────────────────── */}
      {suggestions.length > 0 && (
        <div
          id="search-dropdown"
          className="animate-slide-down"
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
            overflow: "hidden",
            maxHeight: "340px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((char, i) => (
            <button
              key={char.id}
              id={`suggestion-${char.id}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(char);
              }}
              role="option"
              aria-selected={selectedIndex === i}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                padding: "13px 18px",
                borderBottom:
                  i < suggestions.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                background: selectedIndex === i ? "rgba(193, 18, 31, 0.15)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                setSelectedIndex(i);
                if (selectedIndex !== i) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(193, 18, 31, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedIndex === i) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(193, 18, 31, 0.15)";
                } else {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }
              }}
            >
              {/* Name */}
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                  minWidth: 0,
                  marginRight: "12px",
                }}
              >
                {char.name}
              </span>

              {/* Badges */}
              <span
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    background: "var(--surface-2)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {char.species}
                </span>
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    background: "var(--surface-2)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    border: "1px solid var(--border)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {char.faction}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── No results ────────────────────────────── */}
      {input.length >= 2 && suggestions.length === 0 && (
        <div
          className="animate-slide-down"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "14px 18px",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Nenhum personagem encontrado
          </span>
        </div>
      )}
    </div>
  );
}
