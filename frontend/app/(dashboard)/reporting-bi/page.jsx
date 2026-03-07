"use client";

import { useSearchParams } from "next/navigation";

export default function ReportingAndBIPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reporting & BI</h1>
        <p className="text-muted-foreground mt-2">
          Module interface for Reporting & BI. Currently viewing {activeTab} tab.
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-12 flex flex-col items-center justify-center text-center">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <span className="text-primary font-bold text-xl">!</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Module Under Construction</h2>
        <p className="text-muted-foreground max-w-md">
          The full interface for Reporting & BI is currently being developed. 
          Please check back later for the complete set of features and analytics.
        </p>
      </div>
    </div>
  );
}
