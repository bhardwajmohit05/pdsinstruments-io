
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Users, 
  Server, 
  Settings, 
  BarChart, 
  FilePieChart, 
  Menu, 
  ChevronRight, 
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      title: "Users",
      icon: <Users className="h-5 w-5" />,
      path: "/users",
    },
    {
      title: "Devices",
      icon: <Server className="h-5 w-5" />,
      path: "/devices",
    },
    {
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      path: "/analytics",
    },
    {
      title: "Reports",
      icon: <FilePieChart className="h-5 w-5" />,
      path: "/reports",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  return (
    <aside
      className={cn(
        "border-r bg-card transition-all duration-300 overflow-hidden",
        collapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      <div className="h-full py-4 flex flex-col">
        <div className="flex justify-end px-4 mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <Separator className="mb-4" />
        <nav className="flex flex-col gap-1 px-2 flex-1">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className={cn(
                "justify-start",
                collapsed && "justify-center px-2"
              )}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {!collapsed && <span className="ml-2">{item.title}</span>}
            </Button>
          ))}
        </nav>
        <Separator className="my-4" />
        <div className="px-4">
          <Button 
            variant="outline" 
            className={cn("w-full", collapsed && "p-2")}
          >
            <Menu className="h-5 w-5" />
            {!collapsed && <span className="ml-2">Help</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
