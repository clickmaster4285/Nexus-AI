export const crmConnectors = [
   {
      id: "crm-01",
      name: "Salesforce",
      type: "CRM",
      status: "Connected",
      lastSync: "2 min ago",
      objects: ["Contact", "Account", "Lead", "Case"],
      leadsTransferred: 1240,
      image: "/icons/salesforce.svg"
   },
   {
      id: "crm-02",
      name: "Zendesk",
      type: "Helpdesk",
      status: "Connected",
      lastSync: "15 min ago",
      objects: ["Ticket", "User", "Organization"],
      leadsTransferred: 850,
      image: "/icons/zendesk.svg"
   },
   {
      id: "crm-03",
      name: "HubSpot",
      type: "Marketing/Sales",
      status: "Disconnected",
      lastSync: "2 days ago",
      objects: ["Contact", "Deal", "Task"],
      leadsTransferred: 0,
      image: "/icons/hubspot.svg"
   },
   {
      id: "crm-04",
      name: "Microsoft Dynamics",
      type: "CRM",
      status: "Available",
      lastSync: null,
      objects: [],
      leadsTransferred: 0,
      image: "/icons/dynamics.svg"
   }
];

export const webhooks = [
   {
      id: "wh-7721",
      url: "https://api.customer-app.io/webhooks/nexus",
      event: "interaction.completed",
      status: "Active",
      successRate: 98.4,
      latency: "340ms"
   },
   {
      id: "wh-8902",
      url: "https://webhooks.slack.com/services/...",
      event: "alert.critical",
      status: "Active",
      successRate: 100,
      latency: "125ms"
   },
   {
      id: "wh-1102",
      url: "https://internal-bi.nexus.io/ingest",
      event: "qa.scored",
      status: "Paused",
      successRate: 85.2,
      latency: "1.2s"
   }
];

export const apiKeys = [
   {
      id: "key-pro-01",
      name: "Production Default",
      prefix: "nx_live_...",
      created: "2024-01-15",
      lastUsed: "Active now",
      scopes: ["Read", "Write"],
      status: "Active"
   },
   {
      id: "key-dev-01",
      name: "Dev Sandbox",
      prefix: "nx_test_...",
      created: "2024-02-10",
      lastUsed: "4 hours ago",
      scopes: ["Read"],
      status: "Active"
   }
];

export const webhookLogs = [
   { time: "10:45:02", event: "interaction.completed", target: "customer-app.io", status: 200, duration: "320ms" },
   { time: "10:44:58", event: "qa.scored", target: "internal-bi.nexus.io", status: 204, duration: "1.1s" },
   { time: "10:44:15", event: "interaction.started", target: "customer-app.io", status: 200, duration: "290ms" },
   { time: "10:43:22", event: "alert.critical", target: "slack.com", status: 200, duration: "150ms" },
   { time: "10:42:10", event: "interaction.completed", target: "customer-app.io", status: 500, duration: "4.2s" }
];
