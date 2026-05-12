import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app.index";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/app/calendario")({
  component: Calendario,
  head: () => ({ meta: [{ title: "Calendário · FV Inventário" }] }),
});

const events: Record<number, { id: string; t: string; tone: string }[]> = {
  3: [{ id: "OS-122", t: "Editorial Vogue", tone: "bg-blue-500/15 text-blue-700 border-blue-500/30" }],
  10: [
    { id: "OS-125", t: "Fashion Film NK", tone: "bg-primary/15 text-primary border-primary/30" },
    { id: "OS-124", t: "Itaú", tone: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" },
  ],
  12: [{ id: "OS-126", t: "Doc Verão", tone: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" }],
  14: [{ id: "OS-127", t: "Clipe Pop", tone: "bg-blue-500/15 text-blue-700 border-blue-500/30" }],
  15: [
    { id: "OS-128", t: "Banco XYZ", tone: "bg-primary/15 text-primary border-primary/30" },
    { id: "OS-126", t: "Doc Verão", tone: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" },
  ],
  17: [{ id: "OS-128", t: "Banco XYZ · final", tone: "bg-primary/15 text-primary border-primary/30" }],
  20: [{ id: "OS-126", t: "Doc Verão · final", tone: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30" }],
  22: [{ id: "OS-123", t: "Rock in Rio", tone: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30" }],
};

function Calendario() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekday = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const offset = 6; // June 1 = Sunday-ish demo
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
      <PageHeader
        eyebrow="agenda"
        title="Calendário de produções"
        subtitle="Sincronizado com Google Calendar · cada OS é um evento."
        action={
          <button className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary">
            <CalendarDays className="h-4 w-4" /> Conectar Google Calendar
          </button>
        }
      />

      <div className="flex items-center gap-3">
        <button className="grid h-8 w-8 place-items-center rounded-sm border border-border bg-card hover:bg-secondary">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-display text-xl font-bold">Junho 2026</div>
        <button className="grid h-8 w-8 place-items-center rounded-sm border border-border bg-card hover:bg-secondary">
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="ml-auto flex gap-2 font-mono text-[10px] uppercase tracking-widest">
          <Legend c="bg-primary" l="Banco" />
          <Legend c="bg-blue-500" l="Clipe" />
          <Legend c="bg-emerald-500" l="Doc" />
          <Legend c="bg-yellow-500" l="Festival" />
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card">
        <div className="grid grid-cols-7 border-b border-border bg-secondary/60 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {weekday.map((w) => (
            <div key={w} className="px-3 py-2 text-center">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={"e" + i} className="min-h-28 border-b border-r border-border bg-secondary/20" />
          ))}
          {days.map((d, i) => {
            const isLast = (i + offset + 1) % 7 === 0;
            const evs = events[d] || [];
            return (
              <div
                key={d}
                className={
                  "min-h-28 border-b border-border p-2 " +
                  (isLast ? "" : "border-r ") +
                  (d === 15 ? "bg-primary/5" : "")
                }
              >
                <div className={"font-mono text-xs " + (d === 15 ? "font-bold text-primary" : "text-muted-foreground")}>
                  {String(d).padStart(2, "0")}
                </div>
                <div className="mt-1 space-y-1">
                  {evs.map((e) => (
                    <div
                      key={e.id + e.t}
                      className={"truncate rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold " + e.tone}
                    >
                      {e.t}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Legend({ c, l }: { c: string; l: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={"h-2 w-2 rounded-full " + c} /> {l}
    </span>
  );
}
