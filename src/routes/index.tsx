import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import {
  ArrowRight,
  QrCode,
  CalendarDays,
  Boxes,
  ClipboardList,
  ShieldCheck,
  Bell,
  Camera,
  Wrench,
  Package,
  Users,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FV Inventário — Controle total do seu kit audiovisual" },
      {
        name: "description",
        content:
          "Super App de inventário para produtoras audiovisuais. Ordens de Serviço, QR Code, Google Calendar e responsabilidade clara em cada equipamento.",
      },
    ],
  }),
});

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">FV INVENTÁRIO</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              audiovisual ops
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#problema" className="hover:text-primary">O problema</a>
          <a href="#produto" className="hover:text-primary">Produto</a>
          <a href="#fluxos" className="hover:text-primary">Fluxos</a>
          <a href="#precos" className="hover:text-primary">Preços</a>
        </nav>
        <Link
          to="/app"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand transition hover:opacity-90"
        >
          Entrar no app <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 grid-paper opacity-40" aria-hidden />
      <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Ordens de Serviço · QR · Google Calendar
          </div>
          <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            Cada equipamento.{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">Cada responsável.</span>{" "}
            Em tempo real.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            O super app de inventário feito para produtoras audiovisuais. Saídas, devoluções,
            reservas e manutenção — orquestrados pela Ordem de Serviço, sincronizados com o seu
            Google Calendar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:opacity-90"
            >
              Começar teste de 14 dias <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#produto"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              Ver como funciona
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <div><span className="block text-2xl font-bold text-foreground">100%</span>rastreabilidade</div>
            <div><span className="block text-2xl font-bold text-foreground">-87%</span>tempo de check-out</div>
            <div><span className="block text-2xl font-bold text-foreground">0</span>equipamento "no ar"</div>
          </div>
        </div>

        <div className="md:col-span-5">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-2 rounded bg-brand-gradient opacity-20 blur-2xl" aria-hidden />
      <div className="relative rounded-md border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            OS-128 · em produção
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat label="Em uso" value="42" tone="brand" />
          <Stat label="Disponível" value="318" />
          <Stat label="Atrasados" value="2" tone="danger" />
        </div>

        <div className="mt-5 space-y-2">
          {[
            { name: "Sony FX6 · #001", who: "João Mendes", due: "hoje 18:00", ok: true },
            { name: "Lente Sigma 24-70 · #014", who: "Marina Couto", due: "amanhã 09:00", ok: true },
            { name: "Aputure 600D · #022", who: "Equipe Light", due: "atrasado 4h", ok: false },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-sm border border-border bg-background px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-sm bg-secondary">
                  <Camera className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{row.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {row.who}
                  </div>
                </div>
              </div>
              <span
                className={
                  "rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-widest " +
                  (row.ok
                    ? "bg-emerald-500/10 text-emerald-700"
                    : "bg-destructive/10 text-destructive")
                }
              >
                {row.due}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-sm bg-brand-gradient p-3 text-primary-foreground">
          <div className="flex items-center gap-3">
            <QrCode className="h-5 w-5" />
            <span className="text-sm font-semibold">Escanear próximo item</span>
          </div>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "brand" | "danger";
}) {
  const toneCls =
    tone === "brand"
      ? "text-primary"
      : tone === "danger"
      ? "text-destructive"
      : "text-foreground";
  return (
    <div className="rounded-sm border border-border bg-background p-3">
      <div className={`font-display text-2xl font-bold ${toneCls}`}>{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Problema() {
  const items = [
    { icon: AlertTriangle, t: "Lente sumida sem responsável", d: "R$ 15-80k de prejuízo por item, sem rastro de quem pegou." },
    { icon: Bell, t: "Devolução atrasada, contrato em risco", d: "Multas e cliente furioso por equipamento que não voltou." },
    { icon: Package, t: "Compra duplicada", d: "Você já tem o item — ninguém sabia. R$ 5-30k/ano jogados fora." },
    { icon: Users, t: "Gestor caçando equipamento por WhatsApp", d: "5h/semana perdidas em 'quem está com o que?'" },
  ];
  return (
    <section id="problema" className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            01 — o problema real
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Planilha + WhatsApp custa caro.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Toda produtora audiovisual sente o mesmo sintoma. Ele tem nome, valor e horário.
          </p>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4 bg-card p-6">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Produto() {
  const features = [
    {
      icon: ClipboardList,
      t: "Ordem de Serviço como núcleo",
      d: "Toda movimentação nasce de uma OS — projeto, datas, equipe e equipamentos em um só lugar.",
    },
    {
      icon: CalendarDays,
      t: "Sincronia com Google Calendar",
      d: "Cada OS vira evento no Calendar com lista de equipamentos. Mude a data — o evento muda junto.",
    },
    {
      icon: QrCode,
      t: "Check-out por QR Code",
      d: "Bipa, confere o técnico, libera. Devolução com inspeção e foto na hora do check-in.",
    },
    {
      icon: Boxes,
      t: "Kits inteligentes",
      d: "Monte 'Kit FX6 completo' uma vez. Em todas as OS futuras, sai com um clique.",
    },
    {
      icon: Wrench,
      t: "Manutenção e garantia",
      d: "Histórico de reparo por item, alerta de garantia vencendo e horas de uso por lâmpada.",
    },
    {
      icon: ShieldCheck,
      t: "Auditoria total",
      d: "Quem fez o quê, quando. Trilha completa para perícia, financeiro e seguro.",
    },
    {
      icon: Smartphone,
      t: "Mobile-first no set",
      d: "PWA pra técnico ler QR, ver de quem é o case e receber push de devolução próxima.",
    },
    {
      icon: Zap,
      t: "Disponibilidade em tempo real",
      d: "Reservou para a próxima OS? O calendário trava conflitos antes que aconteçam.",
    },
  ];
  return (
    <section id="produto" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              02 — produto
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Construído em volta do fluxo real de produção.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Não é um inventário genérico com cara de ERP. É a operação de uma produtora audiovisual,
            digitalizada com obsessão por detalhe.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="group relative overflow-hidden rounded-md border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-gradient transition-transform group-hover:scale-x-100" />
              <Icon className="h-6 w-6 text-primary" />
              <div className="mt-4 font-display text-lg font-semibold">{t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fluxos() {
  const flows = [
    {
      n: "01",
      t: "Nova produção",
      d: "Gestor cria 'Comercial Banco XYZ', monta a OS para 15-17/06 e o evento aparece no Google Calendar com a lista de kit.",
    },
    {
      n: "02",
      t: "Check-out na saída",
      d: "Operador bipa o QR Code de cada item. Sistema registra técnico, hora e OS. Push para o time com o que pegaram.",
    },
    {
      n: "03",
      t: "Check-in na devolução",
      d: "Bipa, inspeciona, marca OK ou abre ocorrência. Atraso? Gestor recebe alerta automático.",
    },
    {
      n: "04",
      t: "Consulta no set",
      d: "Aquele case sem dono? Técnico bipa com o celular: equipamento, OS, responsável e prazo, em 2 segundos.",
    },
  ];
  return (
    <section id="fluxos" className="border-b border-border bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            03 — fluxos
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Da pré-produção ao último check-in.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden border border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {flows.map((f) => (
            <div key={f.n} className="bg-ink p-8 ring-1 ring-white/5">
              <div className="font-mono text-xs tracking-[0.3em] text-primary">{f.n}</div>
              <div className="mt-4 font-display text-xl font-semibold">{f.t}</div>
              <p className="mt-3 text-sm text-paper/70">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Precos() {
  const plans = [
    {
      name: "Starter",
      price: "R$ 197",
      tag: "Produtoras pequenas",
      features: ["Até 150 equipamentos", "3 usuários", "1 almoxarifado", "QR Code + Check-in/out"],
      cta: "Começar agora",
    },
    {
      name: "Pro",
      price: "R$ 397",
      tag: "Mais escolhido",
      highlighted: true,
      features: [
        "Até 500 equipamentos",
        "10 usuários",
        "Google Calendar nativo",
        "Kits + Relatórios avançados",
        "Manutenção e garantia",
      ],
      cta: "Testar 14 dias",
    },
    {
      name: "Enterprise",
      price: "R$ 797",
      tag: "Grandes produtoras",
      features: [
        "Equipamentos ilimitados",
        "Usuários ilimitados",
        "API aberta + White-label",
        "Gerente de conta + SLA",
      ],
      cta: "Falar com vendas",
    },
  ];
  return (
    <section id="precos" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            04 — preços
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Cobrança transparente. Valor que se paga em uma lente.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Mensal, com 15% de desconto no anual. Setup inicial e treinamento sob medida.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                "relative flex flex-col rounded-md border p-8 " +
                (p.highlighted
                  ? "border-primary bg-card shadow-brand"
                  : "border-border bg-card")
              }
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-8 rounded-sm bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-foreground">
                  Recomendado
                </div>
              )}
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {p.tag}
              </div>
              <div className="mt-2 font-display text-2xl font-bold">{p.name}</div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={
                  "mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-semibold transition " +
                  (p.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border hover:bg-secondary")
                }
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-md border border-dashed border-border bg-secondary/40 p-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Modelo projeto fechado:</span> MVP customizado
          de R$ 30.000 a R$ 50.000 com manutenção a partir de R$ 2.500/mês. Ideal para uma única
          produtora que quer exclusividade e integrações sob medida.
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-brand-gradient text-primary-foreground">
      <div className="absolute inset-0 grid-paper opacity-15" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-24 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Pare de procurar equipamento. Comece a entregar produção.
          </h2>
          <p className="mt-4 text-lg text-white/85">
            14 dias grátis, setup incluso no lançamento. Migramos sua planilha por você.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:contato@fvinventario.com"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
          >
            Quero testar agora <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#produto"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ver demonstração
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <div>
            <div className="font-display text-sm font-bold">FV INVENTÁRIO</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              audiovisual operations · 2026
            </div>
          </div>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          contato@fvinventario.com · são paulo · brasil
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Produto />
        <Fluxos />
        <Precos />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
