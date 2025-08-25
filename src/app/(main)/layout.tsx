"use client";

import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
