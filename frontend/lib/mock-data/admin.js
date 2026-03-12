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

export const billingStats = {
   currentBalance: 1240.50,
   lastPayment: 1150.00,
   lastPaymentDate: "May 15, 2024",
   paymentMethod: "Visa •••• 9012",
   billingContact: "billing@nexus-ai.com",
   tier: "Enterprise Pro",
   monthlyBase: 999.00
};

export const agentExpenses = [
   { id: "A001", name: "Sarah Johnson", team: "Sales", sessionHours: 165, callMinutes: 4200, totalCost: 345.50, status: "Active" },
   { id: "A002", name: "Michael Chen", team: "Support", sessionHours: 158, callMinutes: 3850, totalCost: 312.20, status: "Active" },
   { id: "A003", name: "Emily Rodriguez", team: "Billing", sessionHours: 172, callMinutes: 4500, totalCost: 368.40, status: "Active" },
   { id: "A004", name: "James Wilson", team: "Sales", sessionHours: 140, callMinutes: 2900, totalCost: 245.10, status: "Active" },
   { id: "A005", name: "Priya Patel", team: "Onboarding", sessionHours: 160, callMinutes: 0, totalCost: 160.00, status: "Training" },
   { id: "A006", name: "David Kim", team: "Technical", sessionHours: 155, callMinutes: 3100, totalCost: 285.50, status: "Active" },
];

export const invoiceHistory = [
   { id: "INV-2024-005", date: "May 15, 2024", amount: 1150.00, status: "Paid", method: "Visa •••• 9012" },
   { id: "INV-2024-004", date: "Apr 15, 2024", amount: 1125.50, status: "Paid", method: "Visa •••• 9012" },
   { id: "INV-2024-003", date: "Mar 15, 2024", amount: 1080.00, status: "Paid", method: "Visa •••• 9012" },
   { id: "INV-2024-002", date: "Feb 15, 2024", amount: 1190.25, status: "Paid", method: "Visa •••• 9012" },
   { id: "INV-2024-001", date: "Jan 15, 2024", amount: 1050.00, status: "Paid", method: "Visa •••• 9012" },
];
