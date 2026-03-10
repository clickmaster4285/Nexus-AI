"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FileText, BookOpen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { id: "scripts", label: "Script Builder", icon: FileText, route: "/scripts-kb/scripts" },
  { id: "kb", label: "KB Manager", icon: BookOpen, route: "/scripts-kb/kb" },
];

export default function ScriptsKBLayout({ children }) {
  const pathname = usePathname();

  const activeTab = pathname.includes("/kb") ? "kb" : "scripts";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
            <FileText className="h-8 w-8" />
            Script & KB Builder
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage call scripts and knowledge base articles
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Total Scripts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">24</div>
            <p className="text-xs text-muted-foreground">Active Scripts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">KB Articles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Agent Adoption</p>
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
