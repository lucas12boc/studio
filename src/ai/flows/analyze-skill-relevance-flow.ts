
'use server';
/**
 * @fileOverview An AI agent that analyzes the relevance of a specific skill.
 *
 * - analyzeSkillRelevance - A function that analyzes a skill's market demand, synergy, income potential, and suggests learning resources.
 * - AnalyzeSkillRelevanceInput - The input type for the analyzeSkillRelevance function.
 * - AnalyzeSkillRelevanceOutput - The return type for the analyzeSkillRelevance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSkillRelevanceInputSchema = z.object({
  skillName: z.string().describe('The name of the skill to be analyzed.'),
  userSkills: z
    .string()
    .optional()
    .describe(
      'Optional: A comma-separated list of the user’s current skills for synergy analysis.'
    ),
});
export type AnalyzeSkillRelevanceInput = z.infer<
  typeof AnalyzeSkillRelevanceInputSchema
>;

const SuggestedItemSchema = z.object({
  name: z.string().describe('Name of the suggested course or job role.'),
  reason: z.string().describe('A brief reason why this is suggested.'),
});

const AnalyzeSkillRelevanceOutputSchema = z.object({
  skillName: z.string().describe('The skill that was analyzed.'),
  marketDemand: z
    .string()
    .describe(
      'An analysis of the current market demand for this skill (e.g., High, Medium, Low, Emerging).'
    ),
  synergyWithUserSkills: z
    .string()
    .optional()
    .describe(
      'How this skill synergizes with the user’s existing skills, if provided.'
    ),
  incomeImpactPotential: z
    .string()
    .describe(
      'A qualitative assessment of the potential impact on income by acquiring this skill.'
    ),
  suggestedCourses: z
    .array(SuggestedItemSchema)
    .min(2)
    .max(3)
    .describe('A list of 2 to 3 suggested course types or topics.'),
  suggestedJobRoles: z
    .array(SuggestedItemSchema)
    .min(2)
    .max(3)
    .describe('A list of 2 to 3 suggested job roles where this skill is valuable.'),
});
export type AnalyzeSkillRelevanceOutput = z.infer<
  typeof AnalyzeSkillRelevanceOutputSchema
>;

export async function analyzeSkillRelevance(
  input: AnalyzeSkillRelevanceInput
): Promise<AnalyzeSkillRelevanceOutput> {
  return analyzeSkillRelevanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSkillRelevancePrompt',
  input: {schema: AnalyzeSkillRelevanceInputSchema},
  output: {schema: AnalyzeSkillRelevanceOutputSchema},
  prompt: `You are an AI career advisor. A user wants to analyze the relevance of the skill: {{{skillName}}}.
  {{#if userSkills}}
  The user's current skills are: {{{userSkills}}}.
  Please analyze how {{{skillName}}} synergizes with these existing skills.
  {{else}}
  The user has not provided their current skills. Focus the synergy analysis on general complementarity.
  {{/if}}

  Provide an analysis covering:
  1.  Market Demand: Current market demand for {{{skillName}}}. Categorize as High, Medium, Low, or Emerging, and briefly explain.
  2.  Synergy: {{#if userSkills}}How {{{skillName}}} complements or enhances the user's skills: {{{userSkills}}}.{{else}}General synergies of {{{skillName}}} with common professional skills.{{/if}}
  3.  Income Impact Potential: Qualitatively describe how learning {{{skillName}}} could impact income potential.
  4.  Suggested Courses: List 2 or 3 diverse course types or specific learning topics relevant to {{{skillName}}}. For each, provide a brief reason.
  5.  Suggested Job Roles: List 2 or 3 diverse job roles where {{{skillName}}} is highly valued. For each, provide a brief reason.

  Ensure the output strictly follows the AnalyzeSkillRelevanceOutputSchema.
  The skillName in the output must be exactly "{{{skillName}}}".
  `,
});

const analyzeSkillRelevanceFlow = ai.defineFlow(
  {
    name: 'analyzeSkillRelevanceFlow',
    inputSchema: AnalyzeSkillRelevanceInputSchema,
    outputSchema: AnalyzeSkillRelevanceOutputSchema,
  },
  async (input: AnalyzeSkillRelevanceInput) => {
    const {output} = await prompt(input);
    // Ensure the output skillName matches the input, as per instructions.
    // This is a failsafe in case the LLM deviates.
    if (output && output.skillName !== input.skillName) {
        console.warn(`LLM modified skillName. Correcting from "${output.skillName}" to "${input.skillName}".`);
        output.skillName = input.skillName;
    }
    return output!;
  }
);

