
"use client";

import type { LearningResource } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Laptop, Briefcase } from "lucide-react";
import Link from "next/link"; 

const placeholderResources: LearningResource[] = [
  {
    id: "1",
    title: "Advanced AI for Business Leaders",
    platform: "Coursera",
    url: "https://www.coursera.org/learn/ai-for-everyone", 
    description: "Understand AI's impact and learn to implement AI strategies in your business.",
    category: "AI & Business",
    icon: Laptop,
  },
  {
    id: "2",
    title: "Full-Stack Web Development Bootcamp",
    platform: "Udemy",
    url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/", 
    description: "Master front-end and back-end technologies to build complete web applications.",
    category: "Web Development",
    icon: Laptop,
  },
  {
    id: "3",
    title: "Digital Marketing Specialization",
    platform: "edX",
    url: "https://www.edx.org/masters/micromasters/columbiax-digital-marketing", 
    description: "Learn SEO, content marketing, social media, and analytics to grow online presence.",
    category: "Marketing",
    icon: Briefcase,
  },
  {
    id: "4",
    title: "Financial Markets and Investment Strategy",
    platform: "Khan Academy",
    url: "https://www.khanacademy.org/economics-finance-domain/core-finance", 
    description: "Explore stocks, bonds, and other investment vehicles with expert guidance.",
    category: "Finance",
    icon: BookOpen,
  },
   {
    id: "5",
    title: "Data Science with Python",
    platform: "DataCamp",
    url: "https://www.datacamp.com/tracks/data-scientist-with-python", 
    description: "Unlock insights from data using Python, Pandas, NumPy, and Scikit-learn.",
    category: "Data Science",
    icon: Laptop,
  },
  {
    id: "6",
    title: "Project Management Professional (PMP) Prep",
    platform: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/paths/prepare-for-the-pmp-certification-exam", 
    description: "Prepare for the PMP certification and master project management principles.",
    category: "Project Management",
    icon: Briefcase,
  },
];

export function LearningSuggestions() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {placeholderResources.map((resource) => (
        <Card key={resource.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              {resource.icon && <resource.icon className="h-8 w-8 text-primary" />}
              <CardTitle className="font-headline text-xl">{resource.title}</CardTitle>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              Offered by: <span className="font-medium text-foreground">{resource.platform}</span> | Category: {resource.category}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm mb-4">{resource.description}</p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                View Course <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

