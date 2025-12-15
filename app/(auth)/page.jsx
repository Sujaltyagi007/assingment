import AdminDashBoard from "@/components/(admin)/AdminDashBoard";
import React from "react";
export default function page() {
  const userRole = "SUPERADMIN"; // Example role, this should come from your auth logic
  const Tabs = {
    SUPERADMIN: <AdminDashBoard />,
  };
  return (
    <div className="flex justify-center items-center h-dvh">
      {Tabs[userRole]}
    </div>
  );
}
