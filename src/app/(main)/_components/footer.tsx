
import Link from 'next/link';
import { GoksiraLogo } from './goksira-logo';

const HexagonIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-16 h-[88px] flex items-center justify-center">
    <svg className="absolute w-full h-full" viewBox="0 0 100 115.47">
      <path className="stroke-current text-primary" strokeWidth="2" fill="none" d="M50 2.88L97.5 29.88V85.59L50 112.59L2.5 85.59V29.88L50 2.88Z" />
    </svg>
    <div className="z-10 text-primary">
      {children}
    </div>
  </div>
);


export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4 text-center">

        <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-12">
            <HexagonIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-3 0-5.2 2.4-5.2 5.2 0 2.2 1 4 2.2 5.5.5.6.8 1.2.8 1.8v5.5c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V14.5c0-.6.3-1.2.8-1.8 1.2-1.5 2.2-3.3 2.2-5.5C17.2 4.4 15 2 12 2z"></path><path d="M12 2v2.5"></path></svg>
            </HexagonIcon>
            <HexagonIcon>
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </HexagonIcon>
             <HexagonIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 7.8 12 16l-8.2-8.2a2.4 2.4 0 0 1 3.4-3.4L12 9l4.8-4.8a2.4 2.4 0 0 1 3.4 3.4Z"></path><path d="M7.8 20.2 16 12l-8.2-8.2"></path></svg>
            </HexagonIcon>
            <HexagonIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 17.5c0 2.5-2 5-5 5s-5-2.5-5-5c0-2.5 2-5 5-5s5 2.5 5 5z"></path><path d="M5 12.5c0-2.5 2-5 5-5s5 2.5 5 5"></path><path d="M19 12.5c0-2.5 2-5 5-5s5 2.5 5 5"></path><path d="M8.5 12.5v10"></path><path d="M19.5 12.5v10"></path></svg>
            </HexagonIcon>
        </div>


        <div className="mb-8">
            <GoksiraLogo />
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-body font-light tracking-wider">
          <a href="#contact" className="hover:text-primary">CONTACT US</a>
          <a href="#try-sample" className="hover:text-primary">TRY SAMPLE</a>
          <a href="#our-cows" className="hover:text-primary">OUR COWS</a>
          <span className="text-muted-foreground/50">PRIVACY POLICY</span>
          <span className="text-muted-foreground/50">TERMS OF USE</span>
        </nav>
      </div>
    </footer>
  );
}
