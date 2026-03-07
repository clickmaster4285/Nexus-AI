"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Contacts from '@/components/crm-native/Contacts';
import Accounts from '@/components/crm-native/Accounts';
import Leads from '@/components/crm-native/Leads';
import Pipeline from '@/components/crm-native/Pipeline';
import Tasks from '@/components/crm-native/Tasks';

export default function NativeCRMManagementPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "contacts";

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Native CRM Management</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive interface for Native CRM Management. Currently viewing {activeTab} tab.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsContent value="contacts" className="mt-0 border-none p-0 outline-hidden">
          <Contacts />
        </TabsContent>
        <TabsContent value="accounts" className="mt-0 border-none p-0 outline-hidden">
          <Accounts />
        </TabsContent>
        <TabsContent value="leads" className="mt-0 border-none p-0 outline-hidden">
          <Leads />
        </TabsContent>
        <TabsContent value="pipeline" className="mt-0 border-none p-0 outline-hidden">
          <Pipeline />
        </TabsContent>
        <TabsContent value="tasks" className="mt-0 border-none p-0 outline-hidden">
          <Tasks />
        </TabsContent>
      </Tabs>
    </div>
  );
}
