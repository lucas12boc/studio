
"use client";

import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart as LucideBarChart, TrendingUp, DollarSign, Target, CheckCircle, GraduationCap, Briefcase } from "lucide-react";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import Image from "next/image";

const chartData = [
  { month: "January", income: 1860, expenses: 800 },
  { month: "February", income: 3050, expenses: 1200 },
  { month: "March", income: 2370, expenses: 900 },
  { month: "April", income: 7300, expenses: 2000 },
  { month: "May", income: 2090, expenses: 1100 },
  { month: "June", income: 2140, expenses: 1300 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
};


export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <LucideBarChart className="h-6 w-6" />
              Income Overview
            </CardTitle>
            <CardDescription>Visualize your potential income streams and progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4}>
                   <LabelList position="top" offset={5} className="fill-foreground" fontSize={12} />
                </Bar>
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4}>
                   <LabelList position="top" offset={5} className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Target className="h-6 w-6" />
              My Income Goals
            </CardTitle>
            <CardDescription>Track your financial targets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Monthly Target</p>
                <p className="text-2xl font-bold text-primary">$5,000</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Achieved This Month</p>
                <p className="text-2xl font-bold text-green-500">$3,500</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Set New Goal</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <DollarSign className="h-6 w-6" />
              Strategy Quick Start
            </CardTitle>
            <CardDescription>Generate your personalized income strategy.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Image src="https://placehold.co/300x200.png" alt="AI Strategy Illustration" width={300} height={200} className="mb-4 rounded-lg" data-ai-hint="abstract technology" />
            <p className="mb-4 text-muted-foreground">
              Let our AI analyze your profile and suggest the best income streams for you.
            </p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/strategy">
                Generate Strategy
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <GraduationCap className="h-6 w-6" />
              Featured Learning
            </CardTitle>
            <CardDescription>Enhance your skills with these courses.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span>Advanced Digital Marketing</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learning">View</Link>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Freelancing Masterclass</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learning">View</Link>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Investment Strategies 101</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learning">View</Link>
                </Button>
              </li>
            </ul>
            <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/learning">Explore All Courses</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Briefcase className="h-6 w-6" />
              Hot Job Opportunities
            </CardTitle>
            <CardDescription>Discover relevant job openings.</CardDescription>
          </CardHeader>
          <CardContent>
             <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span>Remote UX Designer</span>
                <Button variant="outline" size="sm" asChild>
                 <Link href="/jobs">Details</Link>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>AI Prompt Engineer</span>
                <Button variant="outline" size="sm" asChild>
                 <Link href="/jobs">Details</Link>
                </Button>
              </li>
              <li className="flex items-center justify-between">
                <span>Content Marketing Specialist</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/jobs">Details</Link>
                </Button>
              </li>
            </ul>
            <Button asChild className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/jobs">Browse All Jobs</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
