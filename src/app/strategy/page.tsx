
"use client";

import { AppLayout } from "@/components/app-layout";
import { StrategyForm } from "@/components/strategy-form";
import { StrategyDisplay } from "@/components/strategy-display";
import React, { useState } from "react";
import type { GenerateIncomeStrategyOutput } from "@/ai/flows/generate-income-strategy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BotMessageSquare } from "lucide-react";
import Image from "next/image";


export default function StrategyPage() {
  const [strategyData, setStrategyData] = useState<GenerateIncomeStrategyOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppLayout title="AI Income Strategy Generator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BotMessageSquare className="h-6 w-6" />
              Tell Us About Yourself
            </CardTitle>
            <CardDescription>
              Provide your details so our AI can craft personalized income strategies for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StrategyForm 
              onStrategyGenerated={setStrategyData} 
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
        
        <div className="lg:col-span-1 space-y-8">
            {isLoading ? (
                 <Card className="animate-pulse">
                    <CardHeader>
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="h-10 bg-muted rounded"></div>
                        <div className="h-10 bg-muted rounded"></div>
                        <div className="h-10 bg-muted rounded"></div>
                    </CardContent>
                </Card>
            ) : (
                <StrategyDisplay strategyData={strategyData} />
            )}

            {!strategyData && !isLoading && (
                 <Card className="bg-primary/10 border-primary/30">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">Why Use Our AI?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <p>Our AI considers:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Current job market trends</li>
                            <li>Your unique skill set</li>
                            <li>Local opportunities</li>
                            <li>Your risk appetite</li>
                        </ul>
                        <Image src="https://placehold.co/400x250.png" alt="AI illustration" width={400} height={250} className="rounded-lg mt-4" data-ai-hint="data analysis" />
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </AppLayout>
  );
}
