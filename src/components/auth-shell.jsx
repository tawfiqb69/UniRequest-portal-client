import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";

// Shared layout of the sign-in and sign-up pages
const AuthShell = ({ children }) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel (only on large screens) */}
      <aside className="relative hidden overflow-hidden bg-brand-gradient p-12 text-white lg:flex lg:flex-col lg:justify-between">
        {/* Soft aurora glow */}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <Logo onDark />
        </div>

        {/* Request stack: three offset document cards */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-2xl bg-white/15" />
          <div className="absolute inset-0 translate-x-2 translate-y-2 -rotate-2 rounded-2xl bg-white/25" />
          <div className="relative space-y-4 rounded-2xl bg-card p-6 text-card-foreground shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold tabular-nums text-muted-foreground">URP-2026-0001</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-under-review-border bg-under-review px-2.5 py-0.5 text-xs font-medium text-under-review-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                Under Review
              </span>
            </div>
            <p className="text-lg font-semibold">Recommendation letter for MSc application</p>
            {/* Mini tracking line */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-0.5 flex-1 bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-0.5 flex-1 bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Submitted</span>
              <span>Review</span>
              <span>Decision</span>
            </div>
          </div>
        </div>

        <div className="relative space-y-3">
          <div className="h-0.5 w-12 bg-brand-gold" />
          <h2 className="text-3xl font-bold tracking-tight">Submit requests. Track every step.</h2>
          <p className="text-lg text-white/90">One place for your documents, decisions and remarks.</p>
        </div>
      </aside>

      {/* Right: the form */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4 lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <ThemeToggle />
        </div>
        <main className="flex flex-1 items-center justify-center p-4 pb-12">
          <div className="reveal w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AuthShell;