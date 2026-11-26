"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          {user.image && (
            <img
              src={user.image}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <Link href="/dashboard/profile" className="text-sm underline">
            {user.name} ({user.role})
          </Link>
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
