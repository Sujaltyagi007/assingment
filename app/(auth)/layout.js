"use client";

import BounceLoader from "@/components/Customloader2";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DataProvider } from "@/store/DataProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-dvh">
        <BounceLoader />
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DataProvider>{children}</DataProvider>
      </ThemeProvider>
    );
  }
  return null;
}
