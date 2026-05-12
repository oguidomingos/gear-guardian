import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Boxes,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Camera,
  ArrowUpRight,
  Wrench,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard · FV Inventário" }] }),
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      <PageHeader
        eyebrow="visão geral"
        title="Bom dia, Felipe."
        subtitle="Você tem 3 OS em andamento e 2 devoluções atrasadas."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Kpi label="Equipamentos" value="362" delta="+12 no mês" icon={Boxes} />
        <Kpi label="OS ativas" value="7" delta="3 hoje" icon={ClipboardList} tone="brand" />
        <Kpi label="Atrasados" value="2" delta="ação necessária" icon={AlertTriangle} tone="danger" />
        <Kpi label="Em manutenção" value="9" delta="-3 esta semana" icon={Wrench} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHead title="OS em andamento" href="/app/os" />
          <div className="divide-y divide-border">
            {[
              { os: "OS-128", proj: "Comercial Banco XYZ", date: "15-17/06", items: 24, who: "João M.", status: "produção" },
              { os: "OS-127", proj: "Clipe Pop · Estúdio 4", date: "14-15/06", items: 11, who: "Marina C.", status: "saída" },
              { os: "OS-126", proj: "Documentário Verão", date: "12-20/06", items: 38, who: "Equipe Doc", status: "produção" },
              { os: "OS-125", proj: "Fashion Film NK", date: "10-11/06", items: 17, who: "Léo R.", status: "atraso" },
            ].map((r) => (
              <div key={r.os} className="grid grid-cols-12 items-center gap-3 px-5 py-4 text-sm">
                <div className="col-span-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {r.os}
                </div>
                <div className="col-span-5">
                  <div className="font-semibold">{r.proj}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {r.date} · {r.items} itens · {r.who}
                  </div>
                </div>
                <div className="col-span-3">
                  <StatusPill status={r.status} />
                </div>
                <div className="col-span-1 text-right">
                  <Link to="/app/os" className="text-muted-foreground hover:text-primary">
                    <ArrowUpRight className="ml-auto h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Devoluções de hoje" href="/app/checkin" />
          <div className="space-y-2 p-4">
            {[
              { name: "Sony FX6 · #001", who: "João Mendes", due: "18:00", ok: true },
              { name: "Sigma 24-70 · #014", who: "Marina Couto", due: "amanhã 09:00", ok: true },
              { name: "Aputure 600D · #022", who: "Equipe Light", due: "atrasado 4h", ok: false },
              { name: "Sennheiser MKH · #037", who: "Bruno R.", due: "20:00", ok: true },
            ].map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-sm border border-border bg-background px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-sm bg-secondary">
                    <Camera className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {r.who}
                    </div>
                  </div>
                </div>
                <span
                  className={
                    "rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest " +
                    (r.ok
                      ? "bg-emerald-500/10 text-emerald-700"
                      : "bg-destructive/10 text-destructive")
                  }
                >
                  {r.due}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHead title="Atividade recente" />
          <div className="space-y-3 p-5 text-sm">
            {[
              { t: "Check-in · Lente Sigma 35mm", w: "Marina C.", at: "há 12 min", ok: true },
              { t: "Check-out · Kit FX6 completo", w: "João M.", at: "há 1h", ok: true },
              { t: "OS-128 criada", w: "Felipe V.", at: "há 2h", ok: true },
              { t: "Aputure 600D atrasado", w: "alerta automático", at: "há 4h", ok: false },
            ].map((a) => (
              <div key={a.t} className="flex items-start gap-3">
                <span
                  className={
                    "mt-1 h-2 w-2 shrink-0 rounded-full " +
                    (a.ok ? "bg-emerald-500" : "bg-destructive")
                  }
                />
                <div className="flex-1">
                  <div className="font-medium">{a.t}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {a.w} · {a.at}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Próximos eventos" href="/app/calendario" />
          <div className="space-y-2 p-4">
            {[
              { d: "15", m: "JUN", t: "Comercial Banco XYZ", s: "08:00 · Estúdio 1" },
              { d: "17", m: "JUN", t: "Clipe Pop · captação", s: "14:00 · Externa" },
              { d: "20", m: "JUN", t: "Documentário Verão", s: "07:00 · Praia" },
            ].map((e) => (
              <div key={e.t} className="flex items-center gap-4 rounded-sm border border-border bg-background p-3">
                <div className="grid h-12 w-12 place-items-center rounded-sm bg-primary/10 text-primary">
                  <div className="text-center leading-none">
                    <div className="font-display text-lg font-bold">{e.d}</div>
                    <div className="font-mono text-[9px] tracking-widest">{e.m}</div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{e.t}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {e.s}
                  </div>
                </div>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHead title="Saúde do inventário" />
          <div className="space-y-4 p-5">
            <Bar label="Disponíveis" pct={78} value="318" />
            <Bar label="Em uso" pct={14} value="42" tone="brand" />
            <Bar label="Manutenção" pct={6} value="9" tone="warn" />
            <Bar label="Atrasados" pct={2} value="2" tone="danger" />
            <div className="mt-4 flex items-center gap-2 rounded-sm bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Operação saudável
              <TrendingUp className="ml-auto h-4 w-4" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "brand" | "danger";
}) {
  const t =
    tone === "brand" ? "text-primary" : tone === "danger" ? "text-destructive" : "text-foreground";
  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-card p-5">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient opacity-60" />
      <div className="flex items-start justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <Icon className={"h-4 w-4 " + t} />
      </div>
      <div className={"mt-3 font-display text-3xl font-bold " + t}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{delta}</div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"overflow-hidden rounded-md border border-border bg-card " + className}>
      {children}
    </div>
  );
}

function CardHead({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-3">
      <div className="font-display text-sm font-semibold">{title}</div>
      {href && (
        <Link to={href} className="font-mono text-[10px] uppercase tracking-widest text-primary hover:underline">
          ver tudo
        </Link>
      )}
    </div>
  );
}

function Bar({
  label,
  pct,
  value,
  tone,
}: {
  label: string;
  pct: number;
  value: string;
  tone?: "brand" | "warn" | "danger";
}) {
  const c =
    tone === "brand"
      ? "bg-primary"
      : tone === "warn"
      ? "bg-yellow-400"
      : tone === "danger"
      ? "bg-destructive"
      : "bg-emerald-500";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-muted-foreground">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-sm bg-secondary">
        <div className={"h-full " + c} style={{ width: pct + "%" }} />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    produção: "bg-emerald-500/10 text-emerald-700",
    saída: "bg-blue-500/10 text-blue-700",
    atraso: "bg-destructive/10 text-destructive",
  };
  return (
    <span
      className={
        "inline-flex rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest " +
        (map[status] || "bg-secondary text-muted-foreground")
      }
    >
      {status}
    </span>
  );
}
