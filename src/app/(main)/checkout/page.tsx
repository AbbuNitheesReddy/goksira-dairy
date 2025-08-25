
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuthStore, useCartStore, useOrderStore } from "@/lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

function AuthWall() {
    return (
        <Card className="text-center p-12">
            <User className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-headline text-2xl mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-6">You need to be logged in to proceed to checkout.</p>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        </Card>
    )
}

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const { isLoggedIn } = useAuthStore();
    const addOrder = useOrderStore((state) => state.addOrder);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const deliveryFee = 5.00; // Example fee
    const tax = subtotal * 0.08;
    const total = subtotal + tax + deliveryFee;
    
    const handlePlaceOrder = () => {
        const orderItems = items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price
        }));
        addOrder({
            id: `MW-${Math.floor(Math.random() * 90000) + 10000}`,
            userId: "user1", // Mock user ID
            items: orderItems,
            total: total,
            status: 'pending',
            createdAt: new Date(),
            deliveryAddress: "123 Dairy Lane, Jubilee Hills, Hyderabad", // Mock address
        });
        clearCart();
        router.push('/history');
    }


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
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <form className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Milky Way" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Mootown" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                 <Select>
                    <SelectTrigger id="state">
                        <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">Zip Code</Label>
                <Input id="zip" placeholder="12345" />
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Delivery Time</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="standard" className="grid md:grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                  <Label htmlFor="standard" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Standard (2-3 days)
                    <span className="font-bold mt-1">Free</span>
                  </Label>
                </div>
                 <div>
                  <RadioGroupItem value="express" id="express" className="peer sr-only" />
                  <Label htmlFor="express" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Express (Tomorrow)
                    <span className="font-bold mt-1">₹{deliveryFee.toFixed(2)}</span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="MM / YY" />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map(item => (
                    <div key={item.product.id} className="flex justify-between">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}

              <Separator />
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Taxes</span><span>₹{tax.toFixed(2)}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePlaceOrder} className="w-full" size="lg">Place Order</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
