"use client";
import Analytics from "@/components/tabs/Analytics";
import Clients from "@/components/tabs/Clients";
import {
  IconDashboard,
  IconFolder,
  IconReceiptRupeeFilled,
  IconUserFilled,
  IconUsers,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";
export const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
  const tabName = [
    {
      title: "Analytics",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Clients",
      url: "#",
      icon: IconUserFilled,
    },
    {
      title: "Invoices",
      url: "#",
      icon: IconReceiptRupeeFilled,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ];
  const tabsComponents = {
    Analytics: <Analytics />,
    Clients: <Clients />,
    Invoices: (
      <div className=" flex justify-center items-center h-dvh">
        Invoices Content
      </div>
    ),
    Projects: (
      <div className=" flex justify-center items-center h-dvh">
        Projects Content
      </div>
    ),
    Team: (
      <div className=" flex justify-center items-center h-dvh">
        Team Content
      </div>
    ),
  };
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(tabName[0].title);
  const user = session?.user;
  const OpenTab = tabsComponents[activeTab];
  return (
    <DataContext.Provider
      value={{ user, tabName, activeTab, setActiveTab, OpenTab }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useDataProvider = () => useContext(DataContext);
