'use server';

/**
 * @fileOverview An AI agent that generates personalized income strategies for users.
 *
 * - generateIncomeStrategy - A function that generates income strategies based on user input.
 * - GenerateIncomeStrategyInput - The input type for the generateIncomeStrategy function.
 * - GenerateIncomeStrategyOutput - The return type for the generateIncomeStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIncomeStrategyInputSchema = z.object({
  skills: z
    .string()
    .describe('A comma-separated list of the user\u2019s skills.'),
  experience: z
    .string()
    .describe('A description of the user\u2019s work experience.'),
  location: z
    .string()
    .describe('The user\u2019s current city and state.'),
  riskTolerance: z
    .string()
    .describe(
      'The user\u2019s risk tolerance, as a string (e.g., \"high\", \"medium\", \"low\").'
    ),
});
export type GenerateIncomeStrategyInput = z.infer<
  typeof GenerateIncomeStrategyInputSchema
>;

const GenerateIncomeStrategyOutputSchema = z.object({
  strategies: z
    .array(z.string())
    .describe('A list of personalized income strategies for the user.'),
});
export type GenerateIncomeStrategyOutput = z.infer<
  typeof GenerateIncomeStrategyOutputSchema
>;

export async function generateIncomeStrategy(
  input: GenerateIncomeStrategyInput
): Promise<GenerateIncomeStrategyOutput> {
  return generateIncomeStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIncomeStrategyPrompt',
  input: {schema: GenerateIncomeStrategyInputSchema},
  output: {schema: GenerateIncomeStrategyOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized income strategies for users based on their skills, experience, location, and risk tolerance.

  Skills: {{{skills}}}
  Experience: {{{experience}}}
  Location: {{{location}}}
  Risk Tolerance: {{{riskTolerance}}}

  Generate a list of income strategies that are tailored to the user's specific circumstances. Consider various factors such as job market trends, salary data, and the user's risk appetite.
  Strategies:`, // The prompt should ask to generate a list of income strategies
});

const generateIncomeStrategyFlow = ai.defineFlow(
  {
    name: 'generateIncomeStrategyFlow',
    inputSchema: GenerateIncomeStrategyInputSchema,
    outputSchema: GenerateIncomeStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
