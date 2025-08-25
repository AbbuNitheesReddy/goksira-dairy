
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Quote, Menu, User, X, LogOut } from 'lucide-react';
import { products, categories, howItWorks, testimonials } from '@/lib/data';
import { mainNavItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/lib/store';
import { ProductCard } from './(main)/_components/product-card';
import { Header } from './(main)/_components/header';
import { Footer } from './(main)/_components/footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slideshow } from '@/components/ui/slideshow';


export default function Home() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();
  const featuredProducts = products;
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isContactFormSubmitted, setIsContactFormSubmitted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Toggle mobile menu and handle body scroll
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };
  
  // Close mobile menu when route changes
  React.useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = 'unset';
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSampleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setIsSuccess(true);
      
      // Reset form and close popover after delay
      setTimeout(() => {
        setIsPopoverOpen(false);
        setIsSuccess(false);
        setIsSubmitting(false);
        // Reset form
        const form = e.target as HTMLFormElement;
        form.reset();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setIsContactFormSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        form.reset();
        setIsContactFormSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  // Prevent background scrolling when popover is open
  React.useEffect(() => {
    if (isPopoverOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopoverOpen]);

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b h-16 flex items-center px-4">
        <div className="flex items-center justify-between w-full">
          {/* Enhanced Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              'md:hidden relative w-10 h-10 rounded-full transition-all duration-200',
              'text-muted-foreground hover:text-foreground hover:bg-accent/50',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              isMobileMenuOpen ? 'bg-accent/20' : 'bg-transparent'
            )}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-5 h-5">
              <span 
                className={cn(
                  'absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-300',
                  'transform',
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                )}
                style={{ top: '50%' }}
              />
              <span 
                className={cn(
                  'absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-300',
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100',
                  'transform',
                  'top-1/2 -translate-y-1/2'
                )}
              />
              <span 
                className={cn(
                  'absolute block w-5 h-0.5 bg-current rounded-full transition-all duration-300',
                  'transform',
                  isMobileMenuOpen ? '-rotate-45 -translate-y-0' : 'translate-y-1.5'
                )}
                style={{ top: '50%' }}
              />
            </div>
            <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
          </Button>
          
          {/* Centered Logo */}
          <Link 
            href="/" 
            className="font-heading text-lg font-bold text-primary tracking-wider"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            GOKSIRA
          </Link>
          
          {/* User Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground hover:bg-transparent"
            asChild
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Link href={isLoggedIn ? "/profile" : "/login"}>
              <User className="h-5 w-5" />
              <span className="sr-only">{isLoggedIn ? 'Profile' : 'Login'}</span>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay - Hidden on desktop */}
      <div 
        id="mobile-menu"
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-sm z-30 transition-all duration-300 ease-in-out',
          'md:hidden', // Completely hide on desktop
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none',
          'pt-20' // Add padding to account for the fixed header
        )}
      >
        <div className="container mx-auto px-4 h-full flex flex-col">
          <div className="flex-1 flex flex-col pt-4">
            <nav className="flex flex-col space-y-1">
              {mainNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {isLoggedIn && (
                <a
                  href="/history"
                  className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Orders
                </a>
              )}
            </nav>
          </div>
          {/* Removed login/sign-in button from mobile menu */}
          {isLoggedIn && (
            <div className="py-4 border-t border-border/50 mt-auto">
              <Button 
                variant="outline" 
                className="w-full h-12 text-base gap-2"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add padding to account for fixed header only on mobile */}
      <div className="h-16 md:hidden"></div>
      
    
      
      <section id="home" className="pt-6 pb-10 sm:pt-8 sm:pb-12 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 md:order-1 h-[350px] sm:h-[400px] md:h-[450px] w-full">
              <Slideshow
                images={[
                  { src: "/images/newhero1.png", alt: "Hero image 1" },
                ]}
                interval={4000}
              />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6">
                We Believe Happy Cows Give Healthy Milk!
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                A devoted father sought pure, fresh milk for his baby girl, wanting it from healthy cows without hormones, antibiotics, or drugs. After failing to persuade local milkmen, he bought two cows and started a small dairy for his family and friends. This modest beginning grew into Pure Harvest, a farm in Jaurasi dedicated to caring for cows and providing milk free of harmful additives. We started with love and determination, and we carry these values forward to ensure you get milk as it was meant to be.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                We deliver fresh and pure A2 milk produced by our indigenous-breed cows within 4 hours of milking.
              </p>
            </div>
          </div>
        </div>
      </section>

        <section className="py-10 sm:py-12 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold">Our Unique Selling</h2>
              <p className="max-w-3xl mx-auto text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 px-2 sm:px-0">
                This milk is fresh with live probiotic bacteria because we don't pasteurize, homogenize, or alter, straight from the cow to your home.
              </p>
            </div>
            <div className="relative h-[40vh] sm:h-[50vh] md:h-[80vh] flex items-center justify-center mb-6 sm:mb-8">
              <Image
                src="/images/FarmProducts.png"
                alt="Farm Products"
                fill
                className="object-cover z-0 rounded-lg"
                quality={95}
                sizes="100vw"
                data-ai-hint="farm products"
              />
            </div>
          </div>
        </section>

        <section id="products" className="py-10 sm:py-12 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Our Products</h2>
              <p className="text-base sm:text-lg text-muted-foreground px-2 sm:px-0">
                We deliver in 4 hrs of milking - unprocessed and whole in eco-friendly glass bottles, preserving flavor and freshness, preventing chemical leaching, and promoting sustainability through reuse.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="h-48 w-full relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="font-headline text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{product.unit}</p>
                    <p className="text-lg font-bold text-primary mb-4">₹{product.price}</p>
                    <button 
                      className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium"
                      onClick={() => {
                        // Add to cart or navigate to order page
                        console.log(`Ordering: ${product.name}`);
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="our-cows" className="py-10 sm:py-12 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="order-2 md:order-1 h-[350px] sm:h-[400px] md:h-[450px] w-full">
                <Slideshow
                  images={[
                    {
                      src: "/images/OurCows 2.jpg",
                      alt: "Healthy cows in our farm"
                    },
                    {
                      src: "/images/Selling1.jpg",
                      alt: "Fresh milk products ready for delivery"
                    },
                    {
                      src: "/images/Selling2.jpg",
                      alt: "Our farm fresh dairy products"
                    },
                    {
                      src: "/images/Selling3.jpg",
                      alt: "Quality dairy products from our farm"
                    }
                  ]}
                  interval={4000}
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">Our Cows: Free Range, Grass Fed</h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                  At the core of our operations is green grass and fodder for the cows, grown in our own living soils, pesticide free and reinforced with natural minerals and sea salts.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                  Our cows roam free on the farm and are not separated from their calves. The calves are allowed unrestricted milk access for the first three months, which is a critical period for their health and growth.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Currently we have Gir/Sahiwal breeds and are in the process of getting more Indian breeds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold">How It Works</h2>
                    <p className="max-w-3xl mx-auto text-muted-foreground mt-2 sm:mt-4 text-sm sm:text-base px-2 sm:px-0">A simple process to get fresh milk delivered to your home.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center max-w-5xl mx-auto">
                    {howItWorks.map((step, index) => (
                        <div key={index} className="p-4 sm:p-6 bg-background rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300">
                            <div className="flex items-center justify-center bg-primary/10 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
                                <step.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                            </div>
                            <h3 className="font-headline text-xl sm:text-2xl font-extrabold mb-1 sm:mb-2">{step.title}</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="try-sample" className="py-12 sm:py-16 md:py-20 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6">Try Free Sample</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 px-2 sm:px-0">
                As they say, the best way to judge a pudding is to eat it! So go ahead and give our milk a shot—your taste buds will thank you for the VIP treatment!
              </p>
              <Popover open={isPopoverOpen} onOpenChange={(open) => {
                setIsPopoverOpen(open);
                if (!open) {
                  setIsSuccess(false);
                  setIsSubmitting(false);
                }
              }}>
                <PopoverTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Try Sample
                  </Button>
                </PopoverTrigger>
                {isPopoverOpen && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsPopoverOpen(false)} />
                )}
                <PopoverContent 
                  className="w-[calc(100vw-2rem)] sm:w-[32rem] p-6 z-50"
                  align="center"
                  sideOffset={0}
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                  }}
                >
                  {isSuccess ? (
                    <div className="text-center p-6">
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Submitted Successfully!</h3>
                      <p className="text-sm text-gray-500">We'll get back to you soon with your free sample.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-headline text-xl font-extrabold text-center">Request Free Sample</h3>
                      <form onSubmit={handleSampleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-body">First Name</Label>
                            <Input id="firstName" name="firstName" placeholder="First Name" required disabled={isSubmitting} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-body">Last Name</Label>
                            <Input id="lastName" name="lastName" placeholder="Last Name" required disabled={isSubmitting} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sampleEmail" className="text-sm font-body">Email</Label>
                          <Input id="sampleEmail" name="email" type="email" placeholder="your@email.com" required disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="samplePhone" className="text-sm font-body">Phone Number</Label>
                          <Input id="samplePhone" name="phone" type="tel" placeholder="+91 9876543210" required disabled={isSubmitting} />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : 'Request Sample'}
                        </Button>
                      </form>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  We would be delighted to welcome you to our farm in Khori Khurd, Haryana to meet our cows and understand our farming practices.
                </p>
                <p className="text-muted-foreground mb-4">
                  We are reachable on call or whatsapp at +91 9810649456 / 9667035805 or <a href="mailto:info@goksira.com" className="text-primary hover:underline">info@goksira.com</a>
                </p>
                <p className="text-muted-foreground mb-6">
                  You can also fill up the form below to request a call back
                </p>
                {isContactFormSubmitted ? (
                  <div className="text-center p-6 border border-green-200 bg-green-50 rounded-lg">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Submitted Successfully!</h3>
                    <p className="text-sm text-gray-500">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" name="firstName" placeholder="First Name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" name="lastName" placeholder="Last Name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (required)</Label>
                      <Input id="phone" name="phone" type="tel" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (required)</Label>
                      <Textarea id="message" name="message" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                )}
              </div>
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-4">Our Farm</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>GOKSIRA Dairy Works</p>
                  <p>Khori Khurd, Haryana, India</p>
                  <p>Pincode: 131021</p>
                </div>
                <div className="mt-6 rounded-lg shadow-lg overflow-hidden" style={{ height: '400px' }}>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.786506696537!2d76.89535907116468!3d28.241849146652992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDE0JzMwLjciIE4gNzfCsDUzJzQzLjMiRQ!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&q=Pure+Harvest+Dairy+Farm" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pure Harvest Dairy Farm Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      <div className="bg-primary text-white">
        <Footer />
      </div>
    </>
  );
}
