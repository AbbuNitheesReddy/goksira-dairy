
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthStore, useCartStore } from "@/lib/store";
import { Minus, Plus, Trash2, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function AuthWall() {
    return (
        <Card className="text-center p-12">
            <User className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-headline text-2xl mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-6">You need to be logged in to view your cart.</p>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        </Card>
    )
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (!isClient) {
    return null; 
  }

  if (!isLoggedIn) {
      return (
         <div className="container mx-auto px-4 py-8 bg-transparent">
             <AuthWall />
         </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-transparent">
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-center mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <Card className="text-center p-12">
            <ShoppingCart className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-headline text-2xl mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
                <Link href="/products">Continue Shopping</Link>
            </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4">
                      <Image src={item.product.image} alt={item.product.name} width={100} height={100} className="rounded-md object-cover"/>
                      <div className="flex-grow">
                        <h2 className="font-headline text-lg">{item.product.name}</h2>
                        <p className="text-sm text-muted-foreground">{item.product.unit}</p>
                        <p className="font-bold text-lg mt-2">₹{item.product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                          <Input type="number" value={item.quantity} readOnly className="h-8 w-12 text-center" />
                          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                  </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
