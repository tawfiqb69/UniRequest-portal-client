"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Temporary page: only to test that shadcn Button and sonner toast work
const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Button onClick={() => toast.success("Toast works!")}>
        Test toast
      </Button>
    </main>
  );
};

export default Home;