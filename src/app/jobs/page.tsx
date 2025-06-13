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

export default function JobsPage() {
  return (
    <AppLayout title="Job Board">
      <div className="mb-8 p-6 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2 font-headline">Find Your Next Opportunity</h2>
        <p className="text-muted-foreground mb-6">
          Explore job openings relevant to your skills and AI-generated income strategies.
          Use the filters below to narrow down your search.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative md:col-span-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input type="search" placeholder="Keywords (e.g., Engineer, Remote)" className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Category" />
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
          <Select>
            <SelectTrigger className="w-full">
               <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="ny">New York, NY</SelectItem>
              <SelectItem value="sf">San Francisco, CA</SelectItem>
              <SelectItem value="austin">Austin, TX</SelectItem>
              <SelectItem value="london">London, UK</SelectItem>
            </SelectContent>
          </Select>
          <Button className="md:col-span-3 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Search className="mr-2 h-4 w-4" /> Search Jobs
          </Button>
        </div>
      </div>
      <JobBoard />
    </AppLayout>
  );
}
