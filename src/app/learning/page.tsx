"use client";

import { AppLayout } from "@/components/app-layout";
import { LearningSuggestions } from "@/components/learning-suggestions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export default function LearningPage() {
  return (
    <AppLayout title="Learning Hub">
      <div className="mb-8 p-6 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2 font-headline">Expand Your Skills</h2>
        <p className="text-muted-foreground mb-4">
          Discover courses and certifications to enhance your income potential. These resources are curated to align with emerging job market trends and AI-suggested strategies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Search courses (e.g., Python, Marketing)..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </div>
      <LearningSuggestions />
    </AppLayout>
  );
}
