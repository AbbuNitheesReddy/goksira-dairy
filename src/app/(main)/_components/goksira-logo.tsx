export function GoksiraLogo({ small }: { small?: boolean }) {
  if (small) {
    return (
       <div className="flex items-center gap-2" aria-label="Goksira Logo">
        <span className="font-headline text-2xl font-bold text-primary tracking-widest">
          GK
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center" aria-label="Goksira Logo">
      <span className="font-headline text-5xl font-bold text-primary tracking-widest">
        GOKSIRA
      </span>
      <span className="text-sm font-semibold text-muted-foreground tracking-widest mt-1">
        DAIRY WORKS
      </span>
    </div>
  );
}
