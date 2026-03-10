"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Clock, List, Timer } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { id: "codes", label: "Disposition Codes", icon: List, route: "/acw-disposition/codes" },
  { id: "timers", label: "ACW Timers", icon: Timer, route: "/acw-disposition/timers" },
];

export default function ACWDispositionLayout({ children }) {
  const pathname = usePathname();

  const activeTab = pathname.includes("/timers") ? "timers" : "codes";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
            <Clock className="h-8 w-8" />
            ACW & Disposition
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage disposition codes and after-call work timers
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Total Disposition Codes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">18</div>
            <p className="text-xs text-muted-foreground">Active Codes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">45s</div>
            <p className="text-xs text-muted-foreground">Avg ACW Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Code Completion Rate</p>
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
