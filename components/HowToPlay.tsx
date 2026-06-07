"use client";

export default function HowToPlay() {
  return (
    <div
      id="how-to-play-tooltip"
      className="animate-slide-down absolute z-50"
      style={{
        top: "100%",
        right: 0,
        marginTop: "12px",
        width: "min(420px, 92vw)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        boxShadow: "0 16px 44px rgba(0,0,0,0.85)",
        cursor: "default",
        textAlign: "left",
      }}
    >
      <div className="px-5 py-5 space-y-5">
        <div className="space-y-4">
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              lineHeight: 1.75,
              marginBottom: "10px",
            }}
          >
            Um personagem de <strong style={{ color: "var(--text-primary)" }}>Tokyo Ghoul</strong> é sorteado diariamente.
            Adivinhe quem é digitando nomes no campo de busca.
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              color: "var(--text-muted)",
              lineHeight: 1.75,
            }}
          >
            Cada tentativa revela pistas através das cores das células abaixo.
          </p>
        </div>

        <div className="space-y-3">
          <p
            className="tracking-widest uppercase"
            style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.24em", marginBottom: "10px" }}
          >
            Cores das células
          </p>
          <div className="space-y-2">
            {[
              {
                id: "htp-correct",
                bg: "var(--correct-bg)",
                color: "var(--correct-text)",
                border: "rgba(255,255,255,0.15)",
                label: "Correto",
                desc: "O atributo é exatamente igual ao personagem do dia.",
              },
              {
                id: "htp-partial",
                bg: "var(--partial-bg)",
                color: "var(--partial-text)",
                border: "var(--partial-border)",
                label: "Próximo",
                desc: "O rating está 1 nível acima ↑ ou abaixo ↓ do correto.",
              },
              {
                id: "htp-wrong",
                bg: "var(--wrong-bg)",
                color: "var(--wrong-text)",
                border: "var(--wrong-border)",
                label: "Errado",
                desc: "O atributo não corresponde ao personagem do dia.",
              },
            ].map((item) => (
              <div key={item.id} id={item.id} className="flex items-start gap-3">
                <div
                  className="shrink-0 w-16 h-7 rounded-sm flex items-center justify-center"
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    color: item.color,
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </div>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="pt-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="tracking-widest uppercase mb-2"
            style={{ fontSize: "0.55rem", color: "var(--text-muted)" }}
          >
            Atributos comparados
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "Espécie",
              "Kagune",
              "Facção",
              "Rating",
              "Gênero",
              "Status",
              "Arco",
              "Papel",
            ].map((attr) => (
              <span
                key={attr}
                className="px-2 py-0.5 rounded-sm"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  fontSize: "0.6rem",
                  color: "var(--text-muted)",
                }}
              >
                {attr}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
