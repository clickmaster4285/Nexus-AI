"use client";


import { Ban } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function DNCManagementLayout({ children }) {

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
            <Ban className="h-8 w-8" />
            DNC & Compliance
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage Do-Not-Call lists and compliance settings
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12,458</div>
            <p className="text-xs text-muted-foreground">Internal DNC Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">National Registry Hits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active Calling Windows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">98.5%</div>
            <p className="text-xs text-muted-foreground">Compliance Rate</p>
          </CardContent>
        </Card>
      </div>

      {children}
    </div>
  );
}
