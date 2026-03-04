export const dashboards = [
   {
      id: "dash-001",
      name: "Executive Overview",
      description: "High-level performance metrics for leadership.",
      layout: "3-Col",
      refreshInterval: "5m",
      widgets: [
         { id: "w-01", title: "Total Revenue", type: "KPI Card", metric: "Revenue", value: "$1.2M", trend: "+12%" },
         { id: "w-02", title: "Customer Satisfaction", type: "Gauge", metric: "CSAT", value: "4.8/5", trend: "+0.2" },
         { id: "w-03", title: "Active Opportunities", type: "Number", metric: "Deals", value: "84", trend: "+5" }
      ]
   },
   {
      id: "dash-002",
      name: "Operational Efficiency",
      description: "Daily queue and agent productivity tracking.",
      layout: "Masonry",
      refreshInterval: "1m",
      widgets: [
         { id: "w-04", title: "Avg Handle Time", type: "Line Chart", metric: "AHT", trend: "-15s" },
         { id: "w-05", title: "SLA Adherence", type: "Progress", metric: "SLA", value: "94%", trend: "+2%" }
      ]
   }
];

export const reports = [
   {
      id: "rpt-001",
      name: "Monthly Compliance Audit",
      category: "Compliance",
      type: "Tabular",
      lastRun: "2024-03-01",
      formats: ["PDF", "CSV"],
      status: "Active"
   },
   {
      id: "rpt-002",
      name: "Agent Performance Ranking",
      category: "Workforce",
      type: "Leaderboard",
      lastRun: "2024-03-04",
      formats: ["JSON", "XLSX"],
      status: "Draft"
   }
];

export const schedules = [
   {
      id: "sch-001",
      name: "Weekly CEO Briefing",
      report: "Executive Overview",
      frequency: "Weekly",
      delivery: "Email",
      recipients: ["ceo@nexus-ai.com"],
      status: "Scheduled"
   },
   {
      id: "sch-002",
      name: "Daily Operations Sync",
      report: "Operational Efficiency",
      frequency: "Daily",
      delivery: "Slack",
      recipients: ["#ops-team"],
      status: "Active"
   }
];

export const executiveBriefing = {
   date: "2024-03-04",
   tone: "Professional",
   summary: "Overall performance is strong this week, with a 12% increase in revenue signals and a stable CSAT of 4.8. Churn risk has decreased by 5% following the implementation of the new retention playbooks.",
   highlights: [
      "Revenue reached $1.2M (+12% WoW)",
      "SLA Adherence at 94% across all queues",
      "Burnout risk in Support team reduced via load balancing"
   ],
   risks: [
      "Billing queue wait times peaking at 11:00 AM",
      "Minor sentiment decline in Mobile App feedback"
   ]
};
