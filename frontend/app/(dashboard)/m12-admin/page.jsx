"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import UserManagement from "@/components/m12/UserManagement";
import RolePermissions from "@/components/m12/RolePermissions";
import AuditLogs from "@/components/m12/AuditLogs";
import AccountSettings from "@/components/m12/AccountSettings";

export default function AdministrativeControlsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "users";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Administrative Controls</h1>
          <p className="text-muted-foreground">Manage users, roles, system audits, and global account configuration.</p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="users" className="mt-0 border-none p-0 outline-hidden">
          <UserManagement />
        </TabsContent>
        <TabsContent value="roles" className="mt-0 border-none p-0 outline-hidden">
          <RolePermissions />
        </TabsContent>
        <TabsContent value="audit" className="mt-0 border-none p-0 outline-hidden">
          <AuditLogs />
        </TabsContent>
        <TabsContent value="usage" className="mt-0 border-none p-0 outline-hidden">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
