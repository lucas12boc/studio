
"use client";

import type React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import { PanelLeft, Lightbulb } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // Show a full-page loading indicator to prevent content flashing
    // and to provide feedback to the user.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
        <Lightbulb className="h-16 w-16 text-primary animate-pulse mx-auto mb-4" />
        <p className="text-xl text-primary">Cargando ProsperIA...</p>
        <p className="text-sm text-muted-foreground mt-2">Un momento, por favor.</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarNav />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-6 md:justify-end">
           <SidebarTrigger className="md:hidden" />
          {title && <h1 className="text-2xl font-semibold font-headline text-center flex-grow md:flex-grow-0 md:text-left">{title}</h1>}
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
