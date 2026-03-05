export const supervisorAgents = [
   {
      id: "ag-001",
      name: "Sarah Jenkins",
      status: "On Call",
      duration: "04:20",
      workload: 85,
      customer: "Alex Thompson",
      sentiment: "Positive",
      alerts: [],
      skills: ["Technical Support", "Billing"],
      avatar: "SJ"
   },
   {
      id: "ag-002",
      name: "Mark Chen",
      status: "Available",
      duration: "02:15",
      workload: 0,
      customer: null,
      sentiment: null,
      alerts: [],
      skills: ["Hardware", "Logistics"],
      avatar: "MC"
   },
   {
      id: "ag-003",
      name: "James Wilson",
      status: "Wrap Up",
      duration: "01:05",
      workload: 10,
      customer: "Elena Rodriguez",
      sentiment: "Positive",
      alerts: [],
      skills: ["Sales", "Account Mgmt"],
      avatar: "JW"
   },
   {
      id: "ag-004",
      name: "Emily Davis",
      status: "On Call",
      duration: "12:45",
      workload: 95,
      customer: "Michael Brown",
      sentiment: "Negative",
      alerts: ["Long Call", "Sentiment Drop"],
      skills: ["Billing", "Escalations"],
      avatar: "ED"
   }
];

export const queueHealth = [
   {
      id: "q-01",
      name: "Technical Support",
      activeAgents: 12,
      waitingCalls: 3,
      longestWait: "02:30",
      sla: 94,
      status: "Healthy",
      thresholds: { warning: 5, critical: 10 }
   },
   {
      id: "q-02",
      name: "Billing & Accounts",
      activeAgents: 8,
      waitingCalls: 12,
      longestWait: "08:45",
      sla: 65,
      status: "Critical",
      thresholds: { warning: 5, critical: 8 }
   },
   {
      id: "q-03",
      name: "Sales Inquiries",
      activeAgents: 6,
      waitingCalls: 2,
      longestWait: "01:15",
      sla: 98,
      status: "Healthy",
      thresholds: { warning: 3, critical: 6 }
   }
];

export const coachingSuggestions = [
   {
      id: "sug-01",
      trigger: "Long Pause",
      suggestion: "Ask the customer if they are still on the line or need a moment.",
      category: "Communication"
   },
   {
      id: "sug-02",
      trigger: "Negative Sentiment",
      suggestion: "Acknowledge the customer's frustration and offer a small credit.",
      category: "Empathy"
   },
   {
      id: "sug-03",
      trigger: "Product Mention",
      suggestion: "Highlight the 20% discount currently available for the Nexus Pro plan.",
      category: "Sales"
   }
];

export const liveInteractions = [
   {
      id: "int-001",
      agent: "Sarah Jenkins",
      customer: "Alex Thompson",
      duration: "04:20",
      sentiment: "Positive",
      topic: "Software Update",
      confidence: 92,
      transcript: [
         { speaker: "Customer", text: "I'm having trouble with the latest update." },
         { speaker: "Agent", text: "I'm sorry to hear that. Let's look into it together." }
      ]
   },
   {
      id: "int-002",
      agent: "Emily Davis",
      customer: "Michael Brown",
      duration: "12:45",
      sentiment: "Negative",
      topic: "Billing Overcharge",
      confidence: 85,
      transcript: [
         { speaker: "Customer", text: "This is the third time I've been overcharged!" },
         { speaker: "Agent", text: "I completely understand your frustration, Michael." }
      ]
   }
];
