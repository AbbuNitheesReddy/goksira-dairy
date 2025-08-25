
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { products } from "@/lib/data";
import { Eye, RefreshCw, ChevronDown, Package, Truck, MapPin, User, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useAuthStore, useOrderStore } from "@/lib/store";
import { useEffect, useState } from "react";
import Link from "next/link";


function AuthWall() {
    return (
        <Card className="text-center p-12">
            <User className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-headline text-2xl mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-6">You need to be logged in to view your order history.</p>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        </Card>
    )
}

const OrderTracking = ({ status }: { status: 'pending' | 'confirmed' | 'delivered' | 'cancelled' }) => {
    
    const isProcessing = status === 'pending' || status === 'confirmed' || status === 'delivered';
    const isPacked = status === 'confirmed' || status === 'delivered';
    const isDelivered = status === 'delivered';
    const isCancelled = status === 'cancelled';

    if (isCancelled) {
        return (
             <div className="p-4 text-center">
                <h4 className="font-semibold text-lg text-destructive">Order Cancelled</h4>
                <p className="text-muted-foreground">This order has been cancelled.</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <h4 className="font-semibold mb-4 text-lg">Order Status</h4>
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isProcessing ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Package />
                    </div>
                    <p className="text-sm mt-2">Processing</p>
                </div>
                <div className={`flex-grow h-1 mx-2 ${isPacked ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className="flex flex-col items-center">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isPacked ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Truck />
                    </div>
                    <p className="text-sm mt-2">Out for Delivery</p>
                </div>
                <div className={`flex-grow h-1 mx-2 ${isDelivered ? 'bg-green-600' : 'bg-muted'}`}></div>
                <div className="flex flex-col items-center">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isDelivered ? 'bg-green-600 text-white' : 'bg-muted'}`}>
                        <MapPin />
                    </div>
                    <p className="text-sm mt-2">Delivered</p>
                </div>
            </div>
            {isPacked && !isDelivered && (
                 <div className="mt-6">
                    <h5 className="font-semibold mb-2">Live Tracking</h5>
                     <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                         <iframe 
                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30452.77953614!2d78.39916562431642!3d17.431179899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97031531026f%3A0xbf371f589b17fc02!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033!5e0!3m2!1sen!2sin!4v1716034069748!5m2!1sen!2sin" 
                             width="100%" 
                             height="100%" 
                             style={{ border: 0 }} 
                             allowFullScreen={false} 
                             loading="lazy" 
                             referrerPolicy="no-referrer-when-downgrade"
                             title="Delivery Tracking Map"
                         />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
                            <Truck className="h-8 w-8 animate-pulse" />
                         </div>
                     </div>
                </div>
            )}
        </div>
    );
}


export default function HistoryPage() {
  const getProduct = (id: string) => products.find(p => p.id === id);
  const { isLoggedIn } = useAuthStore();
  const { orders } = useOrderStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-center mb-8">Order History</h1>
      
      {orders.length === 0 ? (
        <Card className="text-center p-12">
            <ShoppingCart className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-headline text-2xl mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground mb-6">You haven't placed any orders with us yet.</p>
            <Button asChild>
                <Link href="/products">Start Shopping</Link>
            </Button>
        </Card>
      ) : (
      <Card className="bg-transparent shadow-none border-0">
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order) => (
              <AccordionItem value={order.id} key={order.id} className="border-b-0">
                <Card className="mb-4 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <AccordionTrigger className="w-full p-4 hover:no-underline">
                    <div className="flex justify-between items-center w-full">
                        <div className="text-left">
                            <p className="font-bold text-lg">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Badge variant={order.status === 'delivered' ? 'default' : order.status === 'cancelled' ? 'destructive' : 'secondary'}
                            className={`${order.status === 'delivered' ? 'bg-green-600/80 text-white' : ''} ${order.status === 'confirmed' ? 'bg-blue-500/80 text-white' : ''} ${order.status === 'pending' ? 'bg-yellow-500/80 text-white' : ''}`}
                        >
                            {order.status}
                        </Badge>
                         <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                         <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 pt-0 border-t">
                        <h4 className="font-semibold mb-4 text-lg">Order Details</h4>
                        {order.items.map(item => {
                            const product = getProduct(item.productId);
                            if (!product) return null;
                            return (
                                <div key={item.productId} className="flex justify-between items-center mb-2">
                                    <span>{product.name} x {item.quantity}</span>
                                    <span>₹{(product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            )
                        })}
                        <div className="flex justify-between font-bold mt-2">
                            <span>Total</span>
                            <span>₹{order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex gap-2 justify-end mt-4">
                          <Button variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View Invoice
                          </Button>
                          <Button>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reorder
                          </Button>
                        </div>
                    </div>
                    <div className="border-t">
                        <OrderTracking status={order.status} />
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
