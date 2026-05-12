import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app.index";
import { QrCode, ScanLine, Camera, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/checkin")({
  component: CheckIn,
  head: () => ({ meta: [{ title: "Check-in / out · FV Inventário" }] }),
});

function CheckIn() {
  const [mode, setMode] = useState<"out" | "in">("out");
  const [scanned, setScanned] = useState<string[]>([
    "FX6-001 · Sony FX6",
    "LEN-014 · Sigma 24-70 f/2.8",
    "TRP-051 · Tripé Sachtler",
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8">
      <PageHeader
        eyebrow="operação no balcão"
        title="Check-in / Check-out"
        subtitle="Bipa, confere, libera. Cada movimentação amarrada à OS e ao responsável."
      />

      <div className="inline-flex rounded-sm border border-border bg-card p-1">
        {(["out", "in"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={
              "rounded-sm px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition " +
              (mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
            }
          >
            {m === "out" ? "Saída" : "Devolução"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative overflow-hidden rounded-md border-2 border-dashed border-primary/40 bg-card p-10 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
              <QrCode className="h-10 w-10" />
            </div>
            <div className="mt-4 font-display text-xl font-bold">Aponte a câmera para o QR Code</div>
            <p className="mt-1 text-sm text-muted-foreground">
              ou digite o ID do equipamento abaixo
            </p>
            <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-sm border border-border bg-background px-3 py-2">
              <ScanLine className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Ex: FX6-002"
                className="flex-1 bg-transparent font-mono text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    setScanned([...scanned, e.currentTarget.value + " · novo item"]);
                    e.currentTarget.value = "";
                  }
                }}
              />
              <kbd className="rounded-sm bg-secondary px-2 py-0.5 font-mono text-[10px]">↵</kbd>
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="font-display text-sm font-semibold">
                Itens nesta {mode === "out" ? "saída" : "devolução"}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {scanned.length} bipados
              </span>
            </div>
            <div className="divide-y divide-border">
              {scanned.map((s) => (
                <div key={s} className="flex items-center gap-3 px-5 py-3 text-sm">
                  <div className="grid h-8 w-8 place-items-center rounded-sm bg-secondary">
                    <Camera className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs">{s}</span>
                  <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" />
                </div>
              ))}
              {scanned.length === 0 && (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                  Nenhum item bipado ainda.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-md border border-border bg-card p-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              OS vinculada
            </div>
            <div className="mt-1 font-display text-lg font-bold">OS-128</div>
            <div className="text-sm text-muted-foreground">Comercial Banco XYZ · 15-17/06</div>

            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <Row k="Responsável" v="João Mendes" />
              <Row k="Local" v="Estúdio 1" />
              <Row k="Devolução" v="17/06 · 18:00" />
            </div>

            <button
              className={
                "mt-5 flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-semibold " +
                (mode === "out"
                  ? "bg-primary text-primary-foreground shadow-brand"
                  : "bg-emerald-600 text-white")
              }
            >
              {mode === "out" ? "Confirmar saída" : "Confirmar devolução"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-md border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
            <div className="font-mono uppercase tracking-widest">dica</div>
            <p className="mt-1">
              Toda movimentação é registrada com hora, dispositivo e usuário. Trilha completa de
              auditoria fica disponível na OS.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
