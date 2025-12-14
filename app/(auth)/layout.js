"use client";

import BounceLoader from "@/components/Customloader2";
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
  if (status === "loading"){
    return <div className="flex justify-center items-center h-dvh"><BounceLoader /></div>;
  }
  if (status === "authenticated") {
    return <>{children}</>;
  }
  return null;
}
