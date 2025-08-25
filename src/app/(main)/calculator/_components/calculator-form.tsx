
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCalculation } from "../actions";
import { milkCalculatorSchema, MilkCalculatorValues } from "@/lib/schemas";
import { products } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calculator, Lightbulb, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Calculating...
        </>
      ) : (
        <>
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </>
      )}
    </Button>
  );
}

export function CalculatorForm() {
  const [state, formAction] = useFormState(handleCalculation, {
    message: "",
    success: false,
  });

  const form = useForm<MilkCalculatorValues>({
    resolver: zodResolver(milkCalculatorSchema),
    defaultValues: {
      familySize: 2,
      frequency: "weekly",
      product: "Farm-Fresh Whole Milk",
    },
  });

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form action={(formData) => formAction(form.getValues())} >
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Tell us about your household</CardTitle>
            <CardDescription>Provide a few details for a personalized recommendation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="familySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Size</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How often do you buy milk?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row gap-4 pt-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="daily" /></FormControl>
                          <FormLabel className="font-normal">Daily</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="weekly" /></FormControl>
                          <FormLabel className="font-normal">Weekly</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="monthly" /></FormControl>
                          <FormLabel className="font-normal">Monthly</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Milk Product</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Form>
      
      {state.success && state.result && (
        <Card className="m-6 mt-0 bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> AI Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-bold text-lg">{state.result.recommendedAmount}</h3>
                    <p className="text-sm text-muted-foreground">{state.result.reasoning}</p>
                </div>
            </CardContent>
        </Card>
      )}

      {!state.success && state.message && (
         <div className="m-6 mt-0 p-4 bg-destructive/10 border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive-foreground">{state.message}</p>
         </div>
      )}
    </Card>
  );
}
