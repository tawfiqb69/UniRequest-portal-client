"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

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
    <header className="flex items-center justify-between border-b px-4 py-3">
      <span className="font-semibold">UniRequest</span>

      {isPending ? (
        <span className="text-sm text-muted-foreground">Loading...</span>
      ) : user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm">
            {user.name} ({user.role})
          </span>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">Not signed in</span>
      )}
    </header>
  );
};

export default TempDashboardHeader;