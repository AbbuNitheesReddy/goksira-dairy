import { z } from "zod";

export const milkCalculatorSchema = z.object({
  familySize: z.coerce.number().min(1, "Family size must be at least 1 person."),
  frequency: z.enum(["daily", "weekly", "monthly"], {
    required_error: "Please select how often you consume milk.",
  }),
  product: z.string().min(1, "Please select a preferred product."),
});

export type MilkCalculatorValues = z.infer<typeof milkCalculatorSchema>;
