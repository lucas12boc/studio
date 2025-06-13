"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { GenerateIncomeStrategyInput, GenerateIncomeStrategyOutput } from "@/ai/flows/generate-income-strategy";
import { generateIncomeStrategy } from "@/ai/flows/generate-income-strategy";
import React from "react";
import { Loader2 } from "lucide-react";
import type { RiskTolerance } from "@/lib/types";

const formSchema = z.object({
  skills: z.string().min(10, {
    message: "Skills description must be at least 10 characters.",
  }),
  experience: z.string().min(10, {
    message: "Experience description must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  riskTolerance: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a risk tolerance level." }),
  }),
});

type StrategyFormProps = {
  onStrategyGenerated: (data: GenerateIncomeStrategyOutput) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export function StrategyForm({ onStrategyGenerated, setIsLoading, isLoading }: StrategyFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: "",
      experience: "",
      location: "",
      riskTolerance: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const input: GenerateIncomeStrategyInput = {
        ...values,
        riskTolerance: values.riskTolerance as RiskTolerance,
      };
      const result = await generateIncomeStrategy(input);
      onStrategyGenerated(result);
      toast({
        title: "Strategy Generated!",
        description: "Your personalized income strategies are ready.",
      });
    } catch (error) {
      console.error("Error generating strategy:", error);
      toast({
        title: "Error",
        description: "Failed to generate strategy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Skills</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Web development, graphic design, project management, financial analysis"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                List your key skills, separated by commas or as a short paragraph.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 5 years as a software engineer, 2 years in marketing at a startup"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                Briefly describe your relevant work experience.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., San Francisco, CA" {...field} />
              </FormControl>
              <FormDescription>
                Your city and state to help tailor local opportunities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="riskTolerance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk Tolerance</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your risk tolerance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How much risk are you willing to take for potential income?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate My Strategy"
          )}
        </Button>
      </form>
    </Form>
  );
}
