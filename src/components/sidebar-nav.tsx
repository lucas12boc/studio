
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

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
          <h1 className="text-xl font-semibold font-headline">Income Insights</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} asChild>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* You can add footer items here if needed, like a settings link or user profile */}
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Income Insights AI</p>
      </SidebarFooter>
    </Sidebar>
  );
}
