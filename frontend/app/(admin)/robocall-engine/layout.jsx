"use client";

import { Suspense } from "react";
import { Megaphone, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


export default function RobocallEngineLayout({ children }) {

  return (
    <div className="p-4 space-y-6">
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

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-75 w-full border-2 border-dashed rounded-xl bg-muted/30">
            <Loader2 className="h-10 w-10 animate-spin text-primary opacity-40" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-4">
              Synchronizing Engine Data...
            </p>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
