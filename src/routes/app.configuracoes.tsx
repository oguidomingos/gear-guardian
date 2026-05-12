import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./app.index";
import { Building2, Users, Bell, KeyRound, CalendarDays, CreditCard } from "lucide-react";

export const Route = createFileRoute("/app/configuracoes")({
  component: Configuracoes,
  head: () => ({ meta: [{ title: "Configurações · FV Inventário" }] }),
});

function Configuracoes() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-8">
      <PageHeader eyebrow="ajustes" title="Configurações" subtitle="Empresa, equipe, integrações e plano." />

      <Section icon={Building2} title="Empresa">
        <Field label="Razão social" v="FV Produções Audiovisuais Ltda" />
        <Field label="CNPJ" v="12.345.678/0001-90" />
        <Field label="Almoxarifado principal" v="São Paulo · Vila Madalena" />
      </Section>

      <Section icon={Users} title="Equipe (5)">
        <div className="divide-y divide-border">
          {[
            { n: "Felipe Vieira", e: "felipe@fv.com.br", r: "Admin" },
            { n: "Marina Couto", e: "marina@fv.com.br", r: "Gestor" },
            { n: "João Mendes", e: "joao@fv.com.br", r: "Operador" },
            { n: "Bruno Reis", e: "bruno@fv.com.br", r: "Operador" },
            { n: "Léo Ramos", e: "leo@fv.com.br", r: "Técnico" },
          ].map((u) => (
            <div key={u.e} className="flex items-center gap-3 py-3 text-sm">
              <div className="grid h-9 w-9 place-items-center rounded-sm bg-ink text-paper font-mono text-xs">
                {u.n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{u.n}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{u.e}</div>
              </div>
              <span className="rounded-sm bg-secondary px-2 py-1 font-mono text-[10px] uppercase tracking-widest">
                {u.r}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={CalendarDays} title="Integrações">
        <Integ name="Google Calendar" status="Conectado · felipe@fv.com.br" connected />
        <Integ name="WhatsApp Business" status="Não conectado" />
        <Integ name="Webhook · ERP" status="https://erp.fv.com.br/hooks/inventario" connected />
      </Section>

      <Section icon={Bell} title="Notificações">
        <Toggle label="Push de devolução próxima (1h antes)" on />
        <Toggle label="Alerta de atraso (passou do horário)" on />
        <Toggle label="Resumo diário 08:00" on />
        <Toggle label="Garantias vencendo (30 dias)" />
      </Section>

      <Section icon={KeyRound} title="API & QR Codes">
        <Field label="Chave da API" v="fv_live_•••••••••••••••QmZx" mono />
        <Field label="Padrão de etiqueta" v="58 × 32mm · QR + ID" />
      </Section>

      <Section icon={CreditCard} title="Plano">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-xl font-bold">Pro</div>
            <div className="text-sm text-muted-foreground">R$ 397/mês · próximo ciclo 14/07</div>
          </div>
          <button className="rounded-sm border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-secondary">
            Mudar plano
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-md border border-border bg-card">
      <header className="flex items-center gap-3 border-b border-border bg-secondary/40 px-5 py-3">
        <Icon className="h-4 w-4 text-primary" />
        <h2 className="font-display text-sm font-semibold">{title}</h2>
      </header>
      <div className="space-y-3 p-5">{children}</div>
    </section>
  );
}

function Field({ label, v, mono }: { label: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className={mono ? "font-mono text-sm" : "text-sm font-medium"}>{v}</span>
    </div>
  );
}

function Toggle({ label, on }: { label: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <span
        className={
          "relative inline-flex h-5 w-9 items-center rounded-full transition " +
          (on ? "bg-primary" : "bg-secondary")
        }
      >
        <span className={"h-4 w-4 rounded-full bg-white transition " + (on ? "translate-x-4" : "translate-x-0.5")} />
      </span>
    </div>
  );
}

function Integ({ name, status, connected }: { name: string; status: string; connected?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-3 last:border-0">
      <div>
        <div className="font-semibold">{name}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{status}</div>
      </div>
      <button
        className={
          "rounded-sm px-3 py-1.5 text-xs font-semibold " +
          (connected
            ? "border border-border bg-card hover:bg-secondary"
            : "bg-primary text-primary-foreground shadow-brand hover:opacity-90")
        }
      >
        {connected ? "Gerenciar" : "Conectar"}
      </button>
    </div>
  );
}
