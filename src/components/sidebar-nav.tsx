
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Lightbulb,
  GraduationCap,
  Briefcase,
  ListChecks,
  BotMessageSquare,
  Star,
  BrainCircuit,
  Settings, // Added new icon
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/strategy", label: "Strategy AI", icon: BotMessageSquare },
  { href: "/skill-analyzer", label: "Skill Analyzer", icon: BrainCircuit },
  { href: "/learning", label: "Learning Hub", icon: GraduationCap },
  { href: "/jobs", label: "Job Board", icon: Briefcase },
  { href: "/tasks", label: "Task Manager", icon: ListChecks },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-semibold font-headline">ProsperIA</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <div className="p-2 mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/settings"}
                tooltip="Ajustes"
                className="justify-start"
              >
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span>Ajustes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/upgrade"}
                tooltip="Unlock all features"
                className="justify-start bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/upgrade">
                  <Star className="h-5 w-5" />
                  <span>Upgrade to Premium</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground">
          Email: <a href="mailto:ProsperIApro2025@gmail.com" className="underline hover:text-primary">ProsperIApro2025@gmail.com</a>
        </p>
        <p className="text-xs text-muted-foreground">
          WhatsApp: <a href="https://wa.me/542257405607" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">+54 2257405607</a>
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Lucas Leandro Guzmán - ProsperIA</p>
      </SidebarFooter>
    </Sidebar>
  );
}
