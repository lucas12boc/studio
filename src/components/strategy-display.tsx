"use client";

import type { GenerateIncomeStrategyOutput } from "@/ai/flows/generate-income-strategy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lightbulb } from "lucide-react";

type StrategyDisplayProps = {
  strategyData: GenerateIncomeStrategyOutput | null;
};

export function StrategyDisplay({ strategyData }: StrategyDisplayProps) {
  if (!strategyData || strategyData.strategies.length === 0) {
    return (
        <Card className="mt-8 bg-muted/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Your Strategies Will Appear Here
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Fill out the form above and click &quot;Generate My Strategy&quot; to see personalized income suggestions.
                </p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <CheckCircle className="h-7 w-7 text-green-500" />
          Personalized Income Strategies
        </CardTitle>
        <CardDescription>
          Here are some income strategies tailored to your profile:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {strategyData.strategies.map((strategy, index) => (
            <li key={index} className="p-4 border rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                <p className="text-md">{strategy}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
