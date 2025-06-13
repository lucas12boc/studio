
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
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/strategy", label: "Strategy AI", icon: BotMessageSquare },
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
                isActive={pathname === item.href}
                tooltip={item.label}
                className="justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground">
          Email: <a href="mailto:ProsperIApro2025@gmail.com" className="underline hover:text-primary">ProsperIApro2025@gmail.com</a>
        </p>
        <p className="text-xs text-muted-foreground">
          WhatsApp: <a href="https://wa.me/542257405607" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">+54 2257405607</a>
        </p>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ProsperIA</p>
      </SidebarFooter>
    </Sidebar>
  );
}
