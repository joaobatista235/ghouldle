"use client";

const COLUMNS = [
  { key: "name",    label: "Personagem", abbr: "Nome" },
  { key: "species", label: "Espécie",    abbr: "Esp."  },
  { key: "kagune",  label: "Kagune",     abbr: "Kag."  },
  { key: "faction", label: "Facção",     abbr: "Fac."  },
  { key: "rating",  label: "Rating",     abbr: "Rat."  },
  { key: "gender",  label: "Gênero",     abbr: "Gên."  },
  { key: "status",  label: "Status",     abbr: "Sta."  },
  { key: "arc",     label: "Arco",       abbr: "Arco"  },
  { key: "role",    label: "Papel",      abbr: "Pap."  },
];

export default function ColumnHeaders() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr repeat(8, 1fr)",
        gap: "6px",
        marginBottom: "6px",
        marginTop: "8px",
        minWidth: "min(100%, 520px)",
      }}
    >
      {COLUMNS.map((col) => (
        <div
          key={col.key}
          id={`col-header-${col.key}`}
          style={{
            textAlign: "center",
            padding: "4px 2px",
            fontSize: "0.6rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {/* Full labels on screens >= 640px, abbreviated on smaller screens */}
          <span className="hidden sm:inline">{col.label}</span>
          <span className="sm:hidden">{col.abbr}</span>
        </div>
      ))}
    </div>
  );
}
