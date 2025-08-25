import { CalculatorForm } from "./_components/calculator-form";

export default function CalculatorPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">AI Milk Calculator</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Not sure how much milk you need? Let our smart assistant help you estimate your family's weekly needs to reduce waste and save money.
        </p>
      </div>
      <CalculatorForm />
    </div>
  );
}
