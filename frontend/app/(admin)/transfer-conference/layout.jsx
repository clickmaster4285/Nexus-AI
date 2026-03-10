"use client";

import { Shuffle, PhoneTransfer, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


export default function TransferConferenceLayout({ children }) {

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
            <Shuffle className="h-8 w-8" />
            Transfer & Conference
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage call transfers and conference bridges
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active Transfers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active Conferences</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Participants in Conferences</p>
          </CardContent>
        </Card>
      </div>

      {children}
    </div>
  );
}
