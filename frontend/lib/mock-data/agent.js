export const agentStats = {
   dailyKpis: [
      { label: "Handle Time", value: "4m 12s", target: "4m 30s", trend: "up", color: "text-blue-500" },
      { label: "FCR Rate", value: "84%", target: "80%", trend: "up", color: "text-green-500" },
      { label: "CSAT Score", value: "4.8/5", target: "4.5", trend: "stable", color: "text-purple-500" },
      { label: "QA Average", value: "92%", target: "90%", trend: "up", color: "text-emerald-500" }
   ],
   shiftProgress: 65,
   status: "Available",
   statusTime: "01:24:45"
};

export const activeInteractions = [
   {
      id: "int-001",
      customer: "Jonathan Reed",
      channel: "Voice",
      duration: "03:15",
      sentiment: "Neutral",
      tier: "Gold",
      issue: "Billing Adjustment"
   },
   {
      id: "int-002",
      customer: "Maya Jenkins",
      channel: "Chat",
      duration: "08:42",
      sentiment: "Positive",
      tier: "Platinum",
      issue: "Technical Support"
   }
];

export const badges = [
   { id: "b1", name: "Fast Responder", icon: "Zap", color: "text-amber-500", date: "May 12" },
   { id: "b2", name: "Sentiment Master", icon: "Smile", color: "text-green-500", date: "May 15" },
   { id: "b3", name: "QA Perfect 10", icon: "CheckCircle2", color: "text-blue-500", date: "May 18" },
   { id: "b4", name: "Century Club", icon: "Award", color: "text-purple-500", date: "May 20" }
];

export const leaderboard = [
   { rank: 1, name: "Maria Garcia", points: 12450, avatar: "MG", isMe: false },
   { rank: 2, name: "David Kim", points: 11800, avatar: "DK", isMe: true },
   { rank: 3, name: "Aria Thorne", points: 11550, avatar: "AT", isMe: false },
   { rank: 4, name: "James Wilson", points: 10900, avatar: "JW", isMe: false }
];

export const kbArticles = [
   { id: "kb1", title: "Handling Refund Exceptions", category: "Billing", views: 1240 },
   { id: "kb2", title: "SIP Trunk Troubleshooting", category: "Technical", views: 850 },
   { id: "kb3", title: "ESCALATION Path v3.2", category: "Policy", views: 2100 },
   { id: "kb4", title: "De-escalation Techniques", category: "Soft Skills", views: 1650 }
];
