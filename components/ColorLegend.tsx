"use client";

export default function ColorLegend() {
  const items = [
    {
      id: "legend-correct",
      bg: "var(--correct-bg)",
      color: "var(--correct-text)",
      border: "rgba(255,255,255,0.2)",
      label: "Correto",
    },
    {
      id: "legend-partial",
      bg: "var(--partial-bg)",
      color: "var(--partial-text)",
      border: "var(--partial-border)",
      label: "Próximo (rating)",
    },
    {
      id: "legend-wrong",
      bg: "var(--wrong-bg)",
      color: "var(--wrong-text)",
      border: "rgba(255,255,255,0.1)",
      label: "Errado",
    },
  ];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "20px",
        padding: "10px 20px",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        background: "var(--surface)",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          id={item.id}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "5px",
              background: item.bg,
              border: `1px solid ${item.border}`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
