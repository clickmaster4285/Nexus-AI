export const users = [
   { id: "u-001", name: "Sarah Chen", email: "s.chen@nexus-ai.com", role: "Super Admin", status: "Active", lastLogin: "10 mins ago", avatar: "SC" },
   { id: "u-002", name: "Marcus Wright", email: "m.wright@nexus-ai.com", role: "Supervisor", status: "Active", lastLogin: "2 hours ago", avatar: "MW" },
   { id: "u-003", name: "Elena Rodriguez", email: "e.rodriguez@nexus-ai.com", role: "Supervisor", status: "Inactive", lastLogin: "3 days ago", avatar: "ER" },
   { id: "u-004", name: "David Kim", email: "d.kim@nexus-ai.com", role: "Agent", status: "Active", lastLogin: "5 mins ago", avatar: "DK" },
   { id: "u-005", name: "Aria Thorne", email: "a.thorne@nexus-ai.com", role: "Agent", status: "Active", lastLogin: "1 hour ago", avatar: "AT" },
   { id: "u-006", name: "James Wilson", email: "j.wilson@nexus-ai.com", role: "Agent", status: "On Leave", lastLogin: "1 week ago", avatar: "JW" }
];

export const roles = [
   {
      id: "role-admin",
      name: "Super Admin",
      description: "Full system access including billing and user management.",
      userCount: 2,
      permissions: ["Full Access"]
   },
   {
      id: "role-supervisor",
      name: "Supervisor",
      description: "Manage teams, review recordings, and access analytics.",
      userCount: 8,
      permissions: ["Analytics", "Quality Assurance", "Team Management"]
   },
   {
      id: "role-agent",
      name: "Agent",
      description: "Standard access to interaction hub and personal stats.",
      userCount: 145,
      permissions: ["Interaction Hub", "Personal Analytics"]
   }
];

export const auditLogs = [
   { id: "log-1", timestamp: "2024-05-20 10:45:12", user: "Sarah Chen", action: "Updated API Key", target: "Production Key", ip: "192.168.1.45" },
   { id: "log-2", timestamp: "2024-05-20 09:32:05", user: "Marcus Wright", action: "Deleted IVR Flow", target: "Main_Menu_v2", ip: "192.168.1.12" },
   { id: "log-3", timestamp: "2024-05-19 16:20:44", user: "System", action: "Auto-Scale", target: "EU-West SIP Node", ip: "Internal" },
   { id: "log-4", timestamp: "2024-05-19 14:10:33", user: "Sarah Chen", action: "Reset Password", target: "David Kim", ip: "192.168.1.45" },
   { id: "log-5", timestamp: "2024-05-19 11:05:12", user: "Elena Rodriguez", action: "Modified Role", target: "Agent Permissions", ip: "172.16.0.8" }
];

export const accountUsage = {
   plan: "Enterprise Pro",
   billingCycle: "Monthly",
   nextBillingDate: "June 15, 2024",
   stats: [
      { label: "Active Agents", current: 154, limit: 500, color: "bg-blue-500" },
      { label: "Storage Used", current: 842, limit: 2000, unit: "GB", color: "bg-green-500" },
      { label: "API Requests", current: 1.2, limit: 5, unit: "M", color: "bg-purple-500" }
   ]
};
