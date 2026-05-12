import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app.index";
import { Plus, Search, ClipboardList, ArrowRight, Camera } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/os")({
  component: OS,
  head: () => ({ meta: [{ title: "Ordens de Serviço · FV Inventário" }] }),
});

const tabs = ["Todas", "Rascunho", "Confirmada", "Em produção", "Encerrada"];

const list = [
  { id: "OS-128", proj: "Comercial Banco XYZ", cli: "Banco XYZ", date: "15-17/06", items: 24, lead: "João M.", status: "Em produção" },
  { id: "OS-127", proj: "Clipe Pop · Estúdio 4", cli: "Sony Music", date: "14-15/06", items: 11, lead: "Marina C.", status: "Em produção" },
  { id: "OS-126", proj: "Documentário Verão", cli: "Globoplay", date: "12-20/06", items: 38, lead: "Equipe Doc", status: "Em produção" },
  { id: "OS-125", proj: "Fashion Film NK", cli: "Nike BR", date: "10-11/06", items: 17, lead: "Léo R.", status: "Encerrada" },
  { id: "OS-124", proj: "Institucional Itaú", cli: "Itaú", date: "08-09/06", items: 22, lead: "Felipe V.", status: "Confirmada" },
  { id: "OS-123", proj: "Making Of Festival", cli: "Rock in Rio", date: "22-25/06", items: 30, lead: "—", status: "Rascunho" },
];

function OS() {
  const [active, setActive] = useState<string | null>("OS-128");
  const sel = list.find((o) => o.id === active);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
      <PageHeader
        eyebrow="produção"
        title="Ordens de Serviço"
        subtitle="O coração do FV. Toda movimentação nasce aqui."
        action={
          <button className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand hover:opacity-90">
            <Plus className="h-4 w-4" /> Nova OS
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={
              "rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest " +
              (i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary")
            }
          >
            {t}
          </button>
        ))}
        <div className="ml-auto flex w-full items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 text-sm md:w-72">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Buscar OS…" className="w-full bg-transparent outline-none" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-2 lg:col-span-3">
          {list.map((o) => (
            <button
              key={o.id}
              onClick={() => setActive(o.id)}
              className={
                "flex w-full items-center gap-4 rounded-md border p-4 text-left transition " +
                (active === o.id
                  ? "border-primary bg-card shadow-card"
                  : "border-border bg-card hover:bg-secondary/50")
              }
            >
              <div className="grid h-10 w-10 place-items-center rounded-sm bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {o.id}
                  </span>
                  <StatusPill s={o.status} />
                </div>
                <div className="mt-1 truncate font-display text-base font-semibold">{o.proj}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {o.cli} · {o.date} · {o.items} itens · {o.lead}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <aside className="lg:col-span-2">
          {sel && <OSDetail os={sel} />}
        </aside>
      </div>
    </div>
  );
}

function OSDetail({ os }: { os: (typeof list)[number] }) {
  return (
    <div className="sticky top-20 space-y-4 rounded-md border border-border bg-card p-5">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {os.id} · {os.cli}
        </div>
        <div className="mt-1 font-display text-xl font-bold">{os.proj}</div>
        <div className="mt-2"><StatusPill s={os.status} /></div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
        <Field k="Datas" v={os.date} />
        <Field k="Itens" v={String(os.items)} />
        <Field k="Responsável" v={os.lead} />
        <Field k="Local" v="Estúdio 1 / Externa" />
      </div>

      <div className="border-t border-border pt-4">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Equipamentos da OS
        </div>
        <div className="space-y-2">
          {[
            "Sony FX6 #001",
            "Sigma 24-70 #014",
            "Aputure 600D #022",
            "Tripé Sachtler #051",
          ].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-sm border border-border bg-background px-3 py-2 text-xs">
              <Camera className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono">{i}</span>
            </div>
          ))}
          <div className="font-mono text-[10px] text-muted-foreground">+ {os.items - 4} itens</div>
        </div>
      </div>

      <div className="flex gap-2 border-t border-border pt-4">
        <button className="flex-1 rounded-sm bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
          Check-out
        </button>
        <button className="flex-1 rounded-sm border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary">
          Editar
        </button>
      </div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}

function StatusPill({ s }: { s: string }) {
  const map: Record<string, string> = {
    "Em produção": "bg-emerald-500/10 text-emerald-700",
    "Confirmada": "bg-blue-500/10 text-blue-700",
    "Rascunho": "bg-secondary text-muted-foreground",
    "Encerrada": "bg-ink/10 text-ink",
  };
  return (
    <span className={"inline-flex rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest " + (map[s] || "bg-secondary")}>
      {s}
    </span>
  );
}
