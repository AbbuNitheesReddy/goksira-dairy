
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { branches } from "@/lib/data";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function BranchSelectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Select Your Branch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
          Choose a branch closest to you for the freshest delivery.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {branches.map((branch) => (
          <Card key={branch.name} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
             <CardHeader className="p-0">
                <div className="aspect-video relative">
                     <Image
                        src="/images/store.png"
                        alt={`${branch.name} branch`}
                        fill
                        className="object-cover"
                        data-ai-hint="store front"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow space-y-2">
              <CardTitle className="font-headline">{branch.name}</CardTitle>
              <CardDescription className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>{branch.address}</span>
              </CardDescription>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
                <Button className="w-full">Select Branch</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
