"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDataProvider } from "@/store/DataProvider";

export function NavMain() {
  const { tabName: items, setActiveTab, activeTab } = useDataProvider();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => setActiveTab(item.title)}
                className={` ${
                  activeTab === item.title ? "bg-muted" : "hover:bg-muted"
                } min-w-8 duration-200 ease-linear cursor-pointer`}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
