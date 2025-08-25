"use server";

import { calculateMilkRequirement, CalculateMilkRequirementOutput } from "@/ai/flows/calculate-milk-requirement";
import { milkCalculatorSchema, MilkCalculatorValues } from "@/lib/schemas";

type FormState = {
    message: string;
    result?: CalculateMilkRequirementOutput;
    success: boolean;
}

export async function handleCalculation(
  prevState: FormState,
  formData: MilkCalculatorValues
): Promise<FormState> {
  const validatedFields = milkCalculatorSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      message: "Invalid form data. Please check your inputs.",
      success: false
    };
  }

  try {
    const result = await calculateMilkRequirement(validatedFields.data);
    return {
        message: "Calculation successful!",
        result,
        success: true
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred during calculation. Please try again.",
      success: false
    };
  }
}
