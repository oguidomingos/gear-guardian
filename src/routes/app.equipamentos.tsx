import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app.index";
import { Search, Filter, Plus, QrCode, Camera, Mic, Lightbulb, Cable, Package } from "lucide-react";

export const Route = createFileRoute("/app/equipamentos")({
  component: Equipamentos,
  head: () => ({ meta: [{ title: "Equipamentos · FV Inventário" }] }),
});

const data = [
  { id: "FX6-001", name: "Sony FX6", cat: "Câmera", val: "R$ 65.000", status: "Em uso", who: "OS-128 · João M.", ic: Camera },
  { id: "FX6-002", name: "Sony FX6", cat: "Câmera", val: "R$ 65.000", status: "Disponível", who: "—", ic: Camera },
  { id: "LEN-014", name: "Sigma 24-70 f/2.8 DG DN", cat: "Lente", val: "R$ 12.000", status: "Em uso", who: "OS-128 · Marina C.", ic: Camera },
  { id: "LEN-015", name: "Canon RF 50mm f/1.2", cat: "Lente", val: "R$ 22.000", status: "Disponível", who: "—", ic: Camera },
  { id: "APT-022", name: "Aputure 600D Pro", cat: "Iluminação", val: "R$ 18.000", status: "Atrasado", who: "OS-125 · Equipe Light", ic: Lightbulb },
  { id: "APT-023", name: "Aputure Nova P300c", cat: "Iluminação", val: "R$ 14.500", status: "Manutenção", who: "Reparo painel", ic: Lightbulb },
  { id: "MIC-037", name: "Sennheiser MKH 416", cat: "Áudio", val: "R$ 8.900", status: "Em uso", who: "OS-127 · Bruno R.", ic: Mic },
  { id: "MIC-038", name: "Rode NTG5", cat: "Áudio", val: "R$ 4.200", status: "Disponível", who: "—", ic: Mic },
  { id: "CAB-104", name: "Cabo SDI 30m", cat: "Acessório", val: "R$ 480", status: "Disponível", who: "—", ic: Cable },
  { id: "TRP-051", name: "Tripé Sachtler Flowtech", cat: "Suporte", val: "R$ 21.500", status: "Em uso", who: "OS-126", ic: Package },
];

const cats = ["Todos", "Câmera", "Lente", "Iluminação", "Áudio", "Acessório", "Suporte"];

function Equipamentos() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
      <PageHeader
        eyebrow="inventário"
        title="Equipamentos"
        subtitle="362 itens · R$ 4.8M em ativos rastreados"
        action={
          <button className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand hover:opacity-90">
            <Plus className="h-4 w-4" /> Cadastrar
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Buscar por ID, nome ou categoria…" className="w-full bg-transparent outline-none" />
        </div>
        <button className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 text-sm hover:bg-secondary">
          <Filter className="h-4 w-4" /> Filtros
        </button>
        <button className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 text-sm hover:bg-secondary">
          <QrCode className="h-4 w-4" /> Bipar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {cats.map((c, i) => (
          <button
            key={c}
            className={
              "rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition " +
              (i === 0
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-secondary")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-left">Valor</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Responsável</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((r) => (
              <tr key={r.id} className="hover:bg-secondary/40">
                <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-sm bg-secondary">
                      <r.ic className="h-4 w-4" />
                    </div>
                    <div className="font-semibold">{r.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.cat}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.val}</td>
                <td className="px-4 py-3"><Badge s={r.status} /></td>
                <td className="px-4 py-3 text-muted-foreground">{r.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ s }: { s: string }) {
  const map: Record<string, string> = {
    "Disponível": "bg-emerald-500/10 text-emerald-700",
    "Em uso": "bg-blue-500/10 text-blue-700",
    "Atrasado": "bg-destructive/10 text-destructive",
    "Manutenção": "bg-yellow-500/10 text-yellow-700",
  };
  return (
    <span className={"rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest " + (map[s] || "bg-secondary")}>
      {s}
    </span>
  );
}
