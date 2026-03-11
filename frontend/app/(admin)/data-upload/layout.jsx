"use client";

import { Suspense } from "react";
import { Upload, Loader2 } from "lucide-react";

export default function DataUploadLayout({ children }) {

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Upload className="h-6 w-6 text-primary" />
              DATA UPLOAD <span className="text-primary/80 uppercase text-lg">Engine</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Bulk data import, file validation & mapping configuration
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Pending Imports</p>
              <p className="text-xl font-black text-yellow-600">3</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right hidden md:block">
              <p className="text-[10px] text-muted-foreground uppercase font-black">Records Today</p>
              <p className="text-xl font-black text-primary">24,580</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center min-h-100">
              <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}
