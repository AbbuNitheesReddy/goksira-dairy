export function MilkyWayLogo({ small }: { small?: boolean }) {
  if (small) {
    return (
       <div className="flex items-center gap-2" aria-label="MilkyWay Logo">
        <span className="font-headline text-2xl font-bold text-primary tracking-widest">
          MW
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center" aria-label="MilkyWay Logo">
      <span className="font-headline text-5xl font-bold text-primary tracking-widest">
        MILKYWAY
      </span>
      <span className="text-sm font-semibold text-muted-foreground tracking-widest mt-1">
        DAIRY WORKS
      </span>
    </div>
  );
}
