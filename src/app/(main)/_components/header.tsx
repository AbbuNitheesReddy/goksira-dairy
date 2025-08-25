"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { mainNavItems } from "@/lib/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const mainHeader = document.getElementById('main-header');
      if (mainHeader) {
        const headerHeight = mainHeader.offsetHeight;
        if (window.scrollY > headerHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    // Initial check in case page loads with scroll position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = mainNavItems;

  return (
    <>
      {/* Main Header - Only show on desktop */}
      <header id="main-header" className="hidden md:block border-b bg-background">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="h-2"></div>
          
          {/* Centered Title */}
          <div className="flex flex-col items-center py-4">
            <Link href="/" className="flex flex-col items-center">
              <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary tracking-wider">GOKSIRA</h1>
              <div className="w-full max-w-xs h-px bg-foreground/20 my-2"></div>
              <p className="text-muted-foreground text-lg tracking-wider">Dairy Works</p>
            </Link>
            
            {/* Desktop Navigation Items - Hidden on mobile */}
            <nav className="mt-2 hidden md:block">
              <div className="flex items-center justify-center gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Sticky Navbar - Shows when header is scrolled out of view */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-all duration-300 shadow-sm",
          isScrolled ? "translate-y-0" : "-translate-y-full opacity-0",
          "md:block"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link href="/" className="font-headline text-xl font-bold text-primary tracking-widest">
              GOKSIRA
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={`sticky-${item.name}`}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="w-9"></div>
          </div>
        </div>
      </div>
    </>
  );
}
