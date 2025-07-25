
"use client";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, type FormEvent } from "react";
import { analyzeSkillRelevance, type AnalyzeSkillRelevanceOutput, type AnalyzeSkillRelevanceInput } from "@/ai/flows/analyze-skill-relevance-flow";
import { Loader2, BrainCircuit, CheckSquare, Briefcase, GraduationCap, TrendingUp, Sparkles, Lightbulb } from "lucide-react";

// Sub-component for displaying analysis content (results or placeholder)
function SkillAnalysisDisplay({
  analysisResult,
}: {
  analysisResult: AnalyzeSkillRelevanceOutput | null;
}) {
  if (analysisResult) {
    return (
      <Card key="skill-analyzer-results-content" className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Sparkles className="h-7 w-7 text-primary" />
            Analysis for: {analysisResult.skillName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Market Demand
            </h3>
            <p className="text-muted-foreground">{analysisResult.marketDemand}</p>
          </div>

          {analysisResult.synergyWithUserSkills && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                <CheckSquare className="h-5 w-5 text-accent" />
                Synergy with Your Skills
              </h3>
              <p className="text-muted-foreground">{analysisResult.synergyWithUserSkills}</p>
            </div>
          )}

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Income Impact Potential
            </h3>
            <p className="text-muted-foreground">{analysisResult.incomeImpactPotential}</p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <GraduationCap className="h-5 w-5 text-accent" />
              Suggested Courses
            </h3>
            <ul className="space-y-3">
              {analysisResult.suggestedCourses.map((course, index) => (
                <li key={`course-${index}-${course.name.replace(/\s+/g, '-')}`} className="p-3 border rounded-md bg-background/50">
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-muted-foreground">{course.reason}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
              <Briefcase className="h-5 w-5 text-accent" />
              Suggested Job Roles
            </h3>
            <ul className="space-y-3">
              {analysisResult.suggestedJobRoles.map((role, index) => (
                <li key={`role-${index}-${role.name.replace(/\s+/g, '-')}`} className="p-3 border rounded-md bg-background/50">
                  <p className="font-medium">{role.name}</p>
                  <p className="text-sm text-muted-foreground">{role.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card key="skill-analyzer-placeholder-content" className="border-dashed border-primary/50 bg-primary/5">
      <CardContent className="pt-6 text-center min-h-[200px] flex flex-col items-center justify-center">
        <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-primary">Ready to Dive Deeper?</h3>
        <p className="text-muted-foreground">
          Enter a skill you're curious about, or one you're considering learning.
          Our AI will provide insights to help you make informed decisions about your career path and income potential.
          You can also optionally list your current skills for a more personalized synergy analysis.
        </p>
      </CardContent>
    </Card>
  );
}

export default function SkillAnalyzerPage() {
  const [skillName, setSkillName] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalyzeSkillRelevanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!skillName.trim()) {
      toast({ title: "Error", description: "Please enter a skill name to analyze.", variant: "destructive" });
      return;
    }
    setAnalysisResult(null); 
    setIsLoading(true);      
    try {
      const input: AnalyzeSkillRelevanceInput = { skillName: skillName.trim() };
      if (userSkills.trim()) {
        input.userSkills = userSkills.trim();
      }
      const result = await analyzeSkillRelevance(input);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing skill:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Could not analyze the skill. Please try again later.",
        variant: "destructive",
      });
      setAnalysisResult(null); // Explicitly set to null on error
    } finally {
      setIsLoading(false);
    }
  };

  const getDisplaySectionKey = () => {
    if (isLoading) return 'loading-section';
    if (analysisResult && typeof analysisResult === 'object' && analysisResult.skillName) return `results-section-${analysisResult.skillName.replace(/\s+/g, '-')}`;
    return 'placeholder-section';
  };

  return (
    <AppLayout title="AI Skill Analyzer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BrainCircuit className="h-6 w-6 text-primary" />
              Analyze a Skill
            </CardTitle>
            <CardDescription>
              Enter a skill to get AI-powered insights on its market relevance and potential.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="skillName" className="font-medium">Skill to Analyze</Label>
                <Input
                  id="skillName"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g., Python, Prompt Engineering"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="userSkills" className="font-medium">Your Current Skills (Optional)</Label>
                <Textarea
                  id="userSkills"
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                  placeholder="e.g., JavaScript, Project Management, Data Analysis (comma-separated)"
                  rows={3}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Providing your current skills helps the AI analyze synergy.
                </p>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Skill"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <div key={getDisplaySectionKey()}> {/* Outer key based on overall state (loading, results, placeholder) */}
            {isLoading ? (
              <Card key="loading-card-instance"> {/* Instance key for loading card */}
                <CardContent className="pt-6 text-center flex flex-col items-center justify-center min-h-[200px]">
                  <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
                  <p className="text-muted-foreground">Analizando habilidad...</p>
                </CardContent>
              </Card>
            ) : (
              // SkillAnalysisDisplay itself gets a key based on whether it's showing results or placeholder
              // This forces it to re-mount when switching between placeholder and results.
              <SkillAnalysisDisplay
                key={analysisResult ? `display-results-${analysisResult.skillName.replace(/\s+/g, '-')}` : 'display-placeholder'}
                analysisResult={analysisResult}
              />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
