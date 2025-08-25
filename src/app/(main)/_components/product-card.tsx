
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          quality={100}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-headline text-xl font-bold text-gray-900">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.unit}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">{product.description}</p>

        <Link href="/order" className="block w-full">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-medium transition-all duration-300 transform hover:-translate-y-0.5"
            aria-label={`Order ${product.name}`}
          >
            <Zap className="h-4 w-4 mr-2" />
            ORDER NOW
          </Button>
        </Link>
      </div>
    </div>
  );
}
