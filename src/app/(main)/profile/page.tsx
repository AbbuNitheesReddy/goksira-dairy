
"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/store";
import { User, MapPin, Edit, CreditCard, Home, Briefcase, Lock, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";


function AuthWall() {
    return (
        <Card className="text-center p-12">
            <User className="h-20 w-20 mx-auto text-muted-foreground mb-4" />
            <h2 className="font-headline text-2xl mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-6">You need to be logged in to view your profile.</p>
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        </Card>
    )
}

export default function ProfilePage() {
  const { isLoggedIn, user } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  if (!isLoggedIn || !user) {
      return (
         <div className="container mx-auto px-4 py-8 bg-transparent">
             <AuthWall />
         </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="h-24 w-24">
            <AvatarImage src="/images/avatar.png" alt={user.name} data-ai-hint="user avatar" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Welcome, {user.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground text-lg">{user.email}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">

        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
            {/* Delivery Addresses */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><MapPin className="text-primary"/> Delivery Addresses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {user.addresses.map((address, index) => (
                        <React.Fragment key={address.id}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    {address.type === 'Home' ? <Home className="h-5 w-5 text-muted-foreground mt-1"/> : <Briefcase className="h-5 w-5 text-muted-foreground mt-1"/>}
                                    <div>
                                        <p className="font-semibold">{address.type} {address.isPrimary && <span className="text-xs font-normal text-primary">(Primary)</span>}</p>
                                        <p className="text-muted-foreground text-sm">{address.line1}, {address.city}, {address.state} {address.zip}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                            </div>
                            {index < user.addresses.length - 1 && <Separator/>}
                        </React.Fragment>
                    ))}
                    <Button variant="outline" className="w-full mt-4">
                        <PlusCircle className="mr-2"/> Add New Address
                    </Button>
                </CardContent>
            </Card>

             {/* Payment Methods */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2"><CreditCard className="text-primary"/> Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {user.paymentMethods.map((payment, index) => (
                        <React.Fragment key={payment.id}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <p className="font-semibold">{payment.type} ending in {payment.last4} {payment.isPrimary && <span className="text-xs font-normal text-primary">(Primary)</span>}</p>
                                        <p className="text-muted-foreground text-sm">Expires 12/2028</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                            </div>
                            {index < user.paymentMethods.length - 1 && <Separator/>}
                        </React.Fragment>
                    ))}
                     <Button variant="outline" className="w-full mt-4">
                        <PlusCircle className="mr-2"/> Add New Card
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><User className="text-primary"/> Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue={user.email} disabled />
                    </div>
                     <Button className="w-full">Save Changes</Button>
                </CardContent>
            </Card>

            {/* Security */}
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2"><Lock className="text-primary"/> Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password"/>
                    </div>
                     <Button className="w-full">Change Password</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
