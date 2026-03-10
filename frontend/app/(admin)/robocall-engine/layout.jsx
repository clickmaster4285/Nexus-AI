"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Megaphone, Settings, BarChart3 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { id: "config", label: "Campaign Config", icon: Settings, route: "/robocall-engine/config" },
  { id: "analytics", label: "Delivery Analytics", icon: BarChart3, route: "/robocall-engine/analytics" },
];

export default function RobocallEngineLayout({ children }) {
  const pathname = usePathname();

  const activeTab = pathname.includes("/analytics") ? "analytics" : "config";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
            <Megaphone className="h-8 w-8" />
            Robocall Campaign
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure and monitor automated voice broadcast campaigns
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Active Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">45,231</div>
            <p className="text-xs text-muted-foreground">Calls Delivered Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">Delivery Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-muted-foreground">Opt-Out Rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsList>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.id} value={tab.id} asChild>
                <Link href={tab.route} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {children}
    </div>
  );
}
