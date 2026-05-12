import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app.index";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/app/relatorios")({
  component: Relatorios,
  head: () => ({ meta: [{ title: "Relatórios · FV Inventário" }] }),
});

function Relatorios() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
      <PageHeader
        eyebrow="inteligência operacional"
        title="Relatórios"
        subtitle="O que rendeu, o que parou, o que sumiu — em números."
        action={
          <button className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary">
            <Download className="h-4 w-4" /> Exportar CSV
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Faturamento estimado" v="R$ 482k" delta="+18%" up />
        <Stat label="Taxa de utilização" v="74%" delta="+6 pts" up />
        <Stat label="Perdas / quebras" v="R$ 3.2k" delta="-42%" up />
        <Stat label="Atrasos médios" v="2.1h" delta="-0.8h" up />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card t="Utilização por categoria">
          <div className="space-y-3 p-5">
            {[
              ["Câmeras", 92],
              ["Lentes", 81],
              ["Iluminação", 68],
              ["Áudio", 54],
              ["Suportes", 47],
              ["Acessórios", 33],
            ].map(([k, v]) => (
              <div key={k as string}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium">{k}</span>
                  <span className="font-mono text-muted-foreground">{v}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-sm bg-secondary">
                  <div className="h-full bg-brand-gradient" style={{ width: v + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card t="Top 5 itens em uso">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              {[
                ["Sony FX6 #001", 28, "R$ 65k"],
                ["Sigma 24-70 #014", 24, "R$ 12k"],
                ["Aputure 600D #022", 19, "R$ 18k"],
                ["Sennheiser MKH #037", 17, "R$ 8.9k"],
                ["Tripé Sachtler #051", 14, "R$ 21.5k"],
              ].map(([n, d, v], i) => (
                <tr key={n as string}>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-5 py-3 font-semibold">{n}</td>
                  <td className="px-5 py-3 text-right font-mono text-xs">{d} dias</td>
                  <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card t="Histórico de saídas (últimos 6 meses)">
          <div className="flex h-56 items-end gap-3 p-5">
            {[42, 58, 51, 70, 64, 82].map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <div className="relative w-full flex-1 overflow-hidden rounded-sm bg-secondary">
                  <div
                    className="absolute inset-x-0 bottom-0 bg-brand-gradient transition-all group-hover:opacity-80"
                    style={{ height: v + "%" }}
                  />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"][i]}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card t="Ocorrências">
          <div className="divide-y divide-border">
            {[
              { t: "Quebra · cabo SDI 30m", os: "OS-119", v: "R$ 480", d: "08/06" },
              { t: "Perda · filtro ND variável", os: "OS-117", v: "R$ 1.2k", d: "02/06" },
              { t: "Atraso devolução · Aputure 600D", os: "OS-125", v: "—", d: "11/06" },
              { t: "Reparo · sensor sujo FX3", os: "OS-114", v: "R$ 320", d: "28/05" },
            ].map((o) => (
              <div key={o.t} className="flex items-center gap-3 p-4 text-sm">
                <div className="flex-1">
                  <div className="font-semibold">{o.t}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {o.os} · {o.d}
                  </div>
                </div>
                <div className="font-mono text-xs">{o.v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="border-b border-border px-5 py-3 font-display text-sm font-semibold">{t}</div>
      {children}
    </div>
  );
}

function Stat({ label, v, delta, up }: { label: string; v: string; delta: string; up?: boolean }) {
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold">{v}</div>
      <div className={"mt-1 inline-flex items-center gap-1 text-xs " + (up ? "text-emerald-700" : "text-destructive")}>
        <Icon className="h-3 w-3" /> {delta}
      </div>
    </div>
  );
}
