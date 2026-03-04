export const workforceAgents = [
   {
      id: "A001",
      fullName: "Sarah Jenkins",
      employeeId: "EMP-001",
      email: "sarah.j@nexus-ai.com",
      extension: "4401",
      department: "Customer Service",
      team: "North America Support",
      supervisor: "David Miller",
      location: "Remote - US",
      employmentType: "Full-Time",
      startDate: "2023-05-15",
      languages: ["English", "Spanish"],
      status: "Active",
      skills: [
         { queue: "Billing Support", level: 5 },
         { queue: "Technical Support", level: 4 },
         { queue: "Account Management", level: 3 }
      ],
      performance: {
         callsHandled: 1245,
         aht: 342, // seconds
         fcr: 82, // %
         csat: 4.8, // 1-5
         qaScore: 94, // %
         complianceScore: 98, // %
         occupancy: 88, // %
         attendance: 98 // %
      },
      wellbeing: {
         burnoutScore: 12,
         riskLevel: "Low",
         lastPto: "2026-02-10",
         sentimentTrend: "Stable"
      },
      gamification: {
         points: 1250,
         badges: ["Fast Learner", "CSAT Champion", "Compliance Pro"],
         streak: 7
      }
   },
   {
      id: "A002",
      fullName: "Michael Chen",
      employeeId: "EMP-002",
      email: "m.chen@nexus-ai.com",
      extension: "4402",
      department: "Technical Support",
      team: "Tier 2 Escalations",
      supervisor: "Sarah Jenkins",
      location: "Singapore Hub",
      employmentType: "Full-Time",
      startDate: "2024-01-10",
      languages: ["English", "Mandarin"],
      status: "Active",
      skills: [
         { queue: "Technical Support", level: 5 },
         { queue: "Advanced Networking", level: 5 },
         { queue: "Security", level: 4 }
      ],
      performance: {
         callsHandled: 890,
         aht: 512,
         fcr: 76,
         csat: 4.5,
         qaScore: 91,
         complianceScore: 95,
         occupancy: 82,
         attendance: 95
      },
      wellbeing: {
         burnoutScore: 45,
         riskLevel: "Medium",
         lastPto: "2025-12-20",
         sentimentTrend: "Declining"
      },
      gamification: {
         points: 980,
         badges: ["Problem Solver", "Tech Guru"],
         streak: 3
      }
   },
   {
      id: "A003",
      fullName: "Elena Rodriguez",
      employeeId: "EMP-003",
      email: "e.rodriguez@nexus-ai.com",
      extension: "4403",
      department: "Sales",
      team: "Enterprise Accounts",
      supervisor: "David Miller",
      location: "Madrid Office",
      employmentType: "Full-Time",
      startDate: "2023-11-01",
      languages: ["Spanish", "English", "Portuguese"],
      status: "Active",
      skills: [
         { queue: "Enterprise Sales", level: 5 },
         { queue: "Inbound Sales", level: 5 },
         { queue: "Upsell Specials", level: 4 }
      ],
      performance: {
         callsHandled: 650,
         aht: 420,
         fcr: 88,
         csat: 4.9,
         qaScore: 96,
         complianceScore: 100,
         occupancy: 75,
         attendance: 100
      },
      wellbeing: {
         burnoutScore: 5,
         riskLevel: "Low",
         lastPto: "2026-02-25",
         sentimentTrend: "Positive"
      },
      gamification: {
         points: 2100,
         badges: ["Sales Star", "Closer", "Client Whisperer", "Top Performer"],
         streak: 15
      }
   },
   {
      id: "A004",
      fullName: "John Smith",
      employeeId: "EMP-004",
      email: "j.smith@nexus-ai.com",
      extension: "4404",
      department: "Customer Service",
      team: "North America Support",
      supervisor: "David Miller",
      location: "Remote - US",
      employmentType: "Contingent",
      startDate: "2025-02-01",
      languages: ["English"],
      status: "Active",
      skills: [
         { queue: "General Inquiry", level: 4 },
         { queue: "Billing Support", level: 3 }
      ],
      performance: {
         callsHandled: 150,
         aht: 450,
         fcr: 65,
         csat: 4.1,
         qaScore: 85,
         complianceScore: 92,
         occupancy: 90,
         attendance: 85
      },
      wellbeing: {
         burnoutScore: 68,
         riskLevel: "High",
         lastPto: "None",
         sentimentTrend: "Rising Risk"
      },
      gamification: {
         points: 250,
         badges: ["Newcomer"],
         streak: 0
      }
   }
];

export const performanceTrends = [
   { day: "Mon", calls: 120, aht: 340, csat: 4.5 },
   { day: "Tue", calls: 145, aht: 320, csat: 4.7 },
   { day: "Wed", calls: 132, aht: 335, csat: 4.6 },
   { day: "Thu", calls: 150, aht: 310, csat: 4.8 },
   { day: "Fri", calls: 115, aht: 350, csat: 4.4 },
   { day: "Sat", calls: 45, aht: 380, csat: 4.2 },
   { day: "Sun", calls: 38, aht: 395, csat: 4.1 }
];

export const achievements = [
   { id: 1, name: "CSAT Champion", event: "CSAT > 4.8 for 7 days", points: 500, badge: "shield-check", color: "text-yellow-500" },
   { id: 2, name: "Fast Learner", event: "Complete all training tasks", points: 200, badge: "rocket", color: "text-blue-500" },
   { id: 3, name: "Compliance Pro", event: "100% compliance for 30 days", points: 1000, badge: "target", color: "text-green-500" },
   { id: 4, name: "Night Owl", event: "Handle 50+ night shift calls", points: 300, badge: "moon", color: "text-purple-500" }
];

export const volumeForecast = [
   { time: "08:00", forecast: 45, actual: 42, staffing: 5, gap: -1 },
   { time: "09:00", forecast: 85, actual: 88, staffing: 8, gap: 0 },
   { time: "10:00", forecast: 120, actual: 115, staffing: 12, gap: 1 },
   { time: "11:00", forecast: 140, actual: 145, staffing: 12, gap: -2 },
   { time: "12:00", forecast: 110, actual: null, staffing: 10, gap: 0 },
   { time: "13:00", forecast: 95, actual: null, staffing: 10, gap: 1 },
   { time: "14:00", forecast: 105, actual: null, staffing: 10, gap: 0 },
   { time: "15:00", forecast: 130, actual: null, staffing: 14, gap: 2 }
];
