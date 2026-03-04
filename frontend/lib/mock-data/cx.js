export const customerJourneys = [
   {
      customerId: "CUST-9921",
      name: "Alex Thompson",
      tier: "Platinum",
      totalInteractions: 12,
      firstContact: "2023-05-15",
      lastContact: "2024-03-01",
      channels: ["Voice", "Chat", "Email"],
      repeatContact: true,
      sentimentArc: [
         { date: "2023-11-01", score: 65 },
         { date: "2023-12-15", score: 40 },
         { date: "2024-01-10", score: 85 },
         { date: "2024-02-20", score: 90 },
         { date: "2024-03-01", score: 82 }
      ],
      timeline: [
         {
            id: "ev-001",
            date: "2024-03-01 10:30 AM",
            type: "Voice",
            agent: "Sarah Jenkins",
            outcome: "Resolved",
            sentiment: "Positive",
            details: "Technical support for software update. Customer was satisfied with the prompt resolution."
         },
         {
            id: "ev-002",
            date: "2024-02-28 02:15 PM",
            type: "Chat",
            agent: "AI Copilot",
            outcome: "Deflected",
            sentiment: "Neutral",
            details: "Self-service query regarding billing cycle. Successfully answered via KB."
         },
         {
            id: "ev-003",
            date: "2024-02-15 09:00 AM",
            type: "Email",
            agent: "Mark Chen",
            outcome: "In Progress",
            sentiment: "Negative",
            details: "Complaint regarding late delivery of hardware. Escalated to logistics."
         }
      ],
      unresolvedIssues: [
         { id: "iss-01", title: "Hardware Warranty Registration", priority: "Medium" }
      ]
   },
   {
      customerId: "CUST-4402",
      name: "Elena Rodriguez",
      tier: "Gold",
      totalInteractions: 5,
      firstContact: "2024-01-20",
      lastContact: "2024-03-03",
      channels: ["Voice", "Chat"],
      repeatContact: false,
      sentimentArc: [
         { date: "2024-01-20", score: 75 },
         { date: "2024-03-03", score: 95 }
      ],
      timeline: [
         {
            id: "ev-101",
            date: "2024-03-03 11:45 AM",
            type: "Voice",
            agent: "James Wilson",
            outcome: "Resolved",
            sentiment: "Positive",
            details: "Account upgrade inquiry. Customer converted to Premium plan."
         }
      ],
      unresolvedIssues: []
   }
];

export const vocMetrics = {
   nps: 42,
   npsTrend: [
      { month: "Oct", value: 35 },
      { month: "Nov", value: 38 },
      { month: "Dec", value: 32 },
      { month: "Jan", value: 40 },
      { month: "Feb", value: 42 }
   ],
   csat: 4.8,
   effortScore: 2.1,
   sentimentDistribution: [
      { name: "Positive", value: 65, color: "#10b981" },
      { name: "Neutral", value: 20, color: "#64748b" },
      { name: "Negative", value: 15, color: "#ef4444" }
   ],
   topThemes: [
      { theme: "Fast Resolution", count: 124, type: "Positive" },
      { theme: "Friendly Agents", count: 98, type: "Positive" },
      { theme: "Billing Confusion", count: 45, type: "Negative" },
      { theme: "App Lag", count: 32, type: "Negative" }
   ],
   productFeedback: [
      { feature: "AI Summaries", sentiment: 0.92, status: "Rising" },
      { feature: "Mobile UI", sentiment: 0.45, status: "Falling" },
      { feature: "Live Chat", sentiment: 0.78, status: "Stable" }
   ]
};

export const deflectionMetrics = {
   containmentRate: 72,
   abandonmentRate: 8,
   roi: 124500,
   ivrSatisaction: 4.2,
   pathAnalysis: {
      start: 1000,
      deflected: 720,
      transferred: 180,
      abandoned: 100
   },
   dropOffPoints: [
      { stage: "Identity Verification", rate: "12%", reason: "Complexity" },
      { stage: "Payment Menu", rate: "8%", reason: "Audio Quality" },
      { stage: "Support Routing", rate: "5%", reason: "Too Many Options" }
   ],
   opportunityTopics: [
      { topic: "Reset Password", count: 215, ease: "High" },
      { topic: "Order Status", count: 184, ease: "Medium" },
      { topic: "Billing FAQ", count: 142, ease: "High" }
   ]
};
