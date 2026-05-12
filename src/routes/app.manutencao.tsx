import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app.index";
import { Wrench, AlertTriangle, ShieldCheck, Clock, Plus } from "lucide-react";

export const Route = createFileRoute("/app/manutencao")({
  component: Manutencao,
  head: () => ({ meta: [{ title: "Manutenção · FV Inventário" }] }),
});

function Manutencao() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
      <PageHeader
        eyebrow="cuidado dos ativos"
        title="Manutenção e garantia"
        subtitle="Histórico por item, alertas de garantia e horas de uso."
        action={
          <button className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand hover:opacity-90">
            <Plus className="h-4 w-4" /> Abrir ordem
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Mini icon={Wrench} label="Em reparo" value="9" />
        <Mini icon={AlertTriangle} label="Garantias vencendo (30d)" value="4" tone="warn" />
        <Mini icon={ShieldCheck} label="Cobertos por garantia" value="218" tone="ok" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <Head t="Ordens abertas" />
          <div className="divide-y divide-border">
            {[
              { id: "MO-041", item: "Aputure Nova P300c · APT-023", issue: "Painel piscando", since: "há 3 dias", tech: "TechCine" },
              { id: "MO-040", item: "Sony FX3 · FX3-008", issue: "Recall sensor", since: "há 5 dias", tech: "Sony Br" },
              { id: "MO-039", item: "Lente Sigma 35mm · LEN-021", issue: "Foco automático ruidoso", since: "há 1 semana", tech: "Interno" },
              { id: "MO-038", item: "DJI Ronin 4D · RNN-002", issue: "Calibração giroscópio", since: "há 2 semanas", tech: "DJI Care" },
            ].map((m) => (
              <div key={m.id} className="grid grid-cols-12 gap-3 p-4 text-sm">
                <div className="col-span-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {m.id}
                </div>
                <div className="col-span-6">
                  <div className="font-semibold">{m.item}</div>
                  <div className="text-xs text-muted-foreground">{m.issue}</div>
                </div>
                <div className="col-span-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {m.since}
                </div>
                <div className="col-span-2 text-right text-xs">{m.tech}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-border bg-card">
          <Head t="Garantias vencendo" />
          <div className="divide-y divide-border">
            {[
              { item: "Sony FX6 · FX6-001", end: "12/07/2026", days: 30 },
              { item: "Aputure 600D · APT-022", end: "20/07/2026", days: 38 },
              { item: "Atomos Ninja V+ · ATM-006", end: "05/08/2026", days: 54 },
              { item: "Tripé Sachtler · TRP-051", end: "30/08/2026", days: 79 },
            ].map((g) => (
              <div key={g.item} className="flex items-center gap-3 p-4 text-sm">
                <div className="grid h-9 w-9 place-items-center rounded-sm bg-yellow-500/10 text-yellow-700">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{g.item}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    expira {g.end}
                  </div>
                </div>
                <div className="font-mono text-xs">{g.days}d</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card">
        <Head t="Horas de uso · lâmpadas" />
        <div className="grid gap-4 p-5 md:grid-cols-3">
          {[
            { name: "Aputure 600D #022", h: 1240, max: 2000 },
            { name: "Aputure Nova P300c #023", h: 1850, max: 2000 },
            { name: "ARRI SkyPanel S60 #004", h: 620, max: 3000 },
          ].map((l) => {
            const pct = (l.h / l.max) * 100;
            const danger = pct > 85;
            return (
              <div key={l.name} className="rounded-sm border border-border p-4">
                <div className="font-semibold text-sm">{l.name}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {l.h}h / {l.max}h
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-sm bg-secondary">
                  <div className={"h-full " + (danger ? "bg-destructive" : "bg-primary")} style={{ width: pct + "%" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Head({ t }: { t: string }) {
  return (
    <div className="border-b border-border bg-secondary/40 px-5 py-3 font-display text-sm font-semibold">
      {t}
    </div>
  );
}

function Mini({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "warn" | "ok";
}) {
  const c =
    tone === "warn" ? "text-yellow-700 bg-yellow-500/10" : tone === "ok" ? "text-emerald-700 bg-emerald-500/10" : "text-primary bg-primary/10";
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={"grid h-8 w-8 place-items-center rounded-sm " + c}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
    </div>
  );
}
