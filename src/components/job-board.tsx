"use client";

import type { JobListing } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Building, Briefcase } from "lucide-react";
import Link from "next/link";

const placeholderJobs: JobListing[] = [
  {
    id: "1",
    title: "AI Ethics Specialist",
    company: "FutureTech Inc.",
    location: "Remote",
    url: "#",
    description: "Develop and implement ethical guidelines for AI products. Strong background in ethics and AI required.",
    category: "AI & Ethics",
    icon: Briefcase,
  },
  {
    id: "2",
    title: "Senior UX Researcher",
    company: "Innovate Solutions",
    location: "New York, NY",
    url: "#",
    description: "Lead user research initiatives to inform product design and strategy for cutting-edge tech products.",
    category: "UX & Design",
    icon: Briefcase,
  },
  {
    id: "3",
    title: "Blockchain Developer",
    company: "CryptoChain Ltd.",
    location: "Austin, TX (Hybrid)",
    url: "#",
    description: "Design, implement, and support blockchain-based applications and smart contracts.",
    category: "Web3",
    icon: Briefcase,
  },
  {
    id: "4",
    title: "Renewable Energy Analyst",
    company: "GreenPower Co.",
    location: "San Francisco, CA",
    url: "#",
    description: "Analyze market trends and policy changes in the renewable energy sector to guide investment decisions.",
    category: "Sustainability",
    icon: Briefcase,
  },
  {
    id: "5",
    title: "Cloud Solutions Architect",
    company: "SkyHigh Cloud Services",
    location: "Remote",
    url: "#",
    description: "Design and deploy scalable, secure, and robust cloud solutions for enterprise clients.",
    category: "Cloud Computing",
    icon: Briefcase,
  },
  {
    id: "6",
    title: "Cybersecurity Engineer",
    company: "SecureNet Systems",
    location: "Washington D.C.",
    url: "#",
    description: "Protect company assets by identifying and mitigating security vulnerabilities.",
    category: "Cybersecurity",
    icon: Briefcase,
  },
];

export function JobBoard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {placeholderJobs.map((job) => (
        <Card key={job.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
             <div className="flex items-center gap-3 mb-2">
                {job.icon && <job.icon className="h-8 w-8 text-primary flex-shrink-0" />}
                <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
             </div>
            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                </div>
            </div>
            <Badge variant="secondary" className="mt-1 w-fit">{job.category}</Badge>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm mb-4 line-clamp-3">{job.description}</p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={job.url} target="_blank" rel="noopener noreferrer">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
