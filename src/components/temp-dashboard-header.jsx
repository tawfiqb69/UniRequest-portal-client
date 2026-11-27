"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";

// TEMPORARY header. The final dashboard layout replaces it in step M5.4.
const TempDashboardHeader = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <header className="glass sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3">
      <Logo />

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {isPending ? (
          <span className="text-sm text-muted-foreground">Loading...</span>
        ) : user ? (
          <>
            {user.image && (
              <Image src={user.image} alt="" width={32} height={32} unoptimized className="h-8 w-8 rounded-full object-cover" />
            )}
            <Link href="/dashboard/profile" className="text-sm font-medium hover:underline">
              {user.name}
            </Link>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
              {user.role}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">Not signed in</span>
        )}
      </div>
    </header>
  );
};

export default TempDashboardHeader;