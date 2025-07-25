
"use client";

import { AppLayout } from "@/components/app-layout";
import { JobBoard } from "@/components/job-board";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type React from "react";

export default function JobsPage() {
  const { toast } = useToast();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real application, you would gather filter values here
    // and perform the search operation.
    // For demonstration, we'll get form data.
    const formData = new FormData(event.currentTarget);
    const keywords = formData.get("keywords") as string;
    const category = formData.get("category") as string;
    const location = formData.get("location") as string;

    toast({
      title: "Búsqueda Iniciada",
      description: `Buscando trabajos con: Palabras clave: ${keywords || 'N/A'}, Categoría: ${category || 'N/A'}, Ubicación: ${location || 'N/A'}.`,
    });
  };

  return (
    <AppLayout title="Job Board">
      <div className="mb-8 p-6 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2 font-headline">Find Your Next Opportunity</h2>
        <p className="text-muted-foreground mb-6">
          Explore job openings relevant to your skills and AI-generated income strategies.
          Use the filters below to narrow down your search.
        </p>
        <form onSubmit={handleSearchSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="search" placeholder="Keywords (e.g., Engineer, Remote)" className="pl-10" name="keywords" />
            </div>
            <Select name="category">
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Categoría" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai">AI & Machine Learning</SelectItem>
                <SelectItem value="dev">Web Development</SelectItem>
                <SelectItem value="marketing">Digital Marketing</SelectItem>
                <SelectItem value="design">UX/UI Design</SelectItem>
                <SelectItem value="finance">Finance & Analytics</SelectItem>
              </SelectContent>
            </Select>
            <Select name="location">
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Ubicación" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="ny">New York, NY (USA)</SelectItem>
                <SelectItem value="sf">San Francisco, CA (USA)</SelectItem>
                <SelectItem value="austin">Austin, TX (USA)</SelectItem>
                <SelectItem value="london">London, UK</SelectItem>
                <SelectItem value="ba">Buenos Aires, AR</SelectItem>
                <SelectItem value="cdmx">Ciudad de México, MX</SelectItem>
                <SelectItem value="madrid">Madrid, ES</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="md:col-span-3 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Search className="mr-2 h-4 w-4" /> Buscar Trabajos
            </Button>
          </div>
        </form>
      </div>
      <JobBoard />
    </AppLayout>
  );
}
