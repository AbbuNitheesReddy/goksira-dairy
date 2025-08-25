'use server';

/**
 * @fileOverview A milk requirement calculator AI agent.
 *
 * - calculateMilkRequirement - A function that handles the milk requirement calculation process.
 * - CalculateMilkRequirementInput - The input type for the calculateMilkRequirement function.
 * - CalculateMilkRequirementOutput - The return type for the calculateMilkRequirement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateMilkRequirementInputSchema = z.object({
  familySize: z
    .number()
    .describe('The number of people in the family.'),
  frequency: z
    .string()
    .describe(
      'How often the family consumes milk (e.g., daily, weekly, monthly).' 
    ),
  product: z.string().describe('The type of milk product preferred.'),
});
export type CalculateMilkRequirementInput = z.infer<
  typeof CalculateMilkRequirementInputSchema
>;

const CalculateMilkRequirementOutputSchema = z.object({
  recommendedAmount: z
    .string()
    .describe(
      'The recommended amount of milk to purchase, including units (e.g., 2 gallons per week).' 
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the recommended amount, considering family size, frequency, and product.'
    ),
});
export type CalculateMilkRequirementOutput = z.infer<
  typeof CalculateMilkRequirementOutputSchema
>;

export async function calculateMilkRequirement(
  input: CalculateMilkRequirementInput
): Promise<CalculateMilkRequirementOutput> {
  return calculateMilkRequirementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'calculateMilkRequirementPrompt',
  input: {schema: CalculateMilkRequirementInputSchema},
  output: {schema: CalculateMilkRequirementOutputSchema},
  prompt: `You are an AI assistant specialized in calculating milk requirements for families.

  Based on the following information, determine the appropriate amount of milk to recommend and explain your reasoning.

  Family Size: {{familySize}}
  Consumption Frequency: {{frequency}}
  Preferred Milk Product: {{product}}

  Consider factors such as typical serving sizes and waste reduction.

  Additional considerations:
  - For daily consumption: Ensure the recommended amount aligns with daily consumption habits to prevent frequent shopping trips
  - For weekly consumption: Calculate based on 7-day requirements with some buffer
  - For monthly consumption: Consider bulk purchasing with proper storage recommendations
  - Account for family size with appropriate per-person consumption estimates
  - Consider the specific product type and its typical usage patterns
  `,
});

const calculateMilkRequirementFlow = ai.defineFlow(
  {
    name: 'calculateMilkRequirementFlow',
    inputSchema: CalculateMilkRequirementInputSchema,
    outputSchema: CalculateMilkRequirementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
