"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import SecurityMonitoring from "@/components/security-compliance/SecurityMonitoring";
import ComplianceFrameworks from "@/components/security-compliance/ComplianceFrameworks";
import PrivacyDataProtection from "@/components/security-compliance/PrivacyDataProtection";
import EncryptionManagement from "@/components/security-compliance/EncryptionManagement";

export default function SecurityCompliancePage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "monitor";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Security & Compliance Hub</h1>
          <p className="text-muted-foreground">Global oversight for platform integrity, regulatory compliance, and data privacy.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="monitor" className="mt-0 border-none p-0 outline-hidden">
          <SecurityMonitoring />
        </TabsContent>
        <TabsContent value="compliance" className="mt-0 border-none p-0 outline-hidden">
          <ComplianceFrameworks />
        </TabsContent>
        <TabsContent value="privacy" className="mt-0 border-none p-0 outline-hidden">
          <PrivacyDataProtection />
        </TabsContent>
        <TabsContent value="encryption" className="mt-0 border-none p-0 outline-hidden">
          <EncryptionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
