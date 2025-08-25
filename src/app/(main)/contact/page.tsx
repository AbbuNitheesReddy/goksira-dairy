
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                We'd love to hear from you! Whether you have a question, a comment, or just want to say hello, here's how to reach us.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
                <h2 className="font-headline text-3xl font-bold mb-4">Contact Form</h2>
                <p className="text-muted-foreground mb-6">
                    Fill up the form below to request a call back from our team.
                </p>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="First Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Last Name" />
                    </div>
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (required)</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (required)</Label>
                    <Textarea id="message" required />
                  </div>
                  <Button type="submit">Submit</Button>
                </form>
            </div>
            <div>
                <h2 className="font-headline text-3xl font-bold mb-4">Our Farm</h2>
                <div className="space-y-2 text-muted-foreground mb-6">
                    <p>We would be delighted to welcome you to the farm to meet our cows and understand our farming practices.</p>
                    <p className="font-bold pt-4">Address:</p>
                    <p>MILKYWAY Dairy Works</p>
                </div>
                <div className="mt-6 rounded-lg shadow-lg overflow-hidden" style={{ height: '400px' }}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30452.77953614!2d78.39916562431642!3d17.431179899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97031531026f%3A0xbf371f589b17fc02!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033!5e0!3m2!1sen!2sin!4v1716034069748!5m2!1sen!2sin" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="MilkyWay Farm Location"
                        aria-label="Google Maps showing MilkyWay Farm location in Jubilee Hills, Hyderabad"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
