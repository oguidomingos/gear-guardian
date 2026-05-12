import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, Plus } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur">
            <SidebarTrigger />
            <div className="hidden flex-1 items-center gap-2 rounded-sm border border-border bg-secondary/50 px-3 py-1.5 text-sm md:flex md:max-w-md">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar OS, equipamento ou pessoa…"
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                ⌘K
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Link
                to="/app/os"
                className="hidden items-center gap-2 rounded-sm bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-brand transition hover:opacity-90 sm:inline-flex"
              >
                <Plus className="h-4 w-4" /> Nova OS
              </Link>
              <button
                aria-label="Notificações"
                className="relative grid h-9 w-9 place-items-center rounded-sm border border-border bg-card hover:bg-secondary"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
              <div className="grid h-9 w-9 place-items-center rounded-sm bg-ink text-paper font-mono text-xs">
                FV
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
