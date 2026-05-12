import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  CalendarDays,
  Wrench,
  BarChart3,
  Settings,
  QrCode,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const main = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard, exact: true },
  { title: "Equipamentos", url: "/app/equipamentos", icon: Boxes },
  { title: "Ordens de Serviço", url: "/app/os", icon: ClipboardList },
  { title: "Calendário", url: "/app/calendario", icon: CalendarDays },
  { title: "Manutenção", url: "/app/manutencao", icon: Wrench },
  { title: "Check-in / out", url: "/app/checkin", icon: QrCode },
];

const sec = [
  { title: "Relatórios", url: "/app/relatorios", icon: BarChart3 },
  { title: "Configurações", url: "/app/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string, exact?: boolean) =>
    exact ? path === url : path === url || path.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border">
        <Link to="/app" className="flex items-center gap-3 px-2 py-2">
          <Logo className="h-8 w-8 shrink-0" />
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-display text-sm font-bold tracking-tight">FV INVENTÁRIO</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                audiovisual ops
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((it) => (
                <SidebarMenuItem key={it.url}>
                  <SidebarMenuButton asChild isActive={isActive(it.url, it.exact)}>
                    <Link to={it.url} className="flex items-center gap-2">
                      <it.icon className="h-4 w-4" />
                      {!collapsed && <span>{it.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sec.map((it) => (
                <SidebarMenuItem key={it.url}>
                  <SidebarMenuButton asChild isActive={isActive(it.url)}>
                    <Link to={it.url} className="flex items-center gap-2">
                      <it.icon className="h-4 w-4" />
                      {!collapsed && <span>{it.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        {!collapsed && (
          <div className="px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            v0.1 · MVP
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
