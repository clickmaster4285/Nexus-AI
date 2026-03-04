export const mockRevenueKpis = {
   upsellOpportunities: 142,
   upsellConversion: 12.4,
   missedOpportunities: 28,
   churnRiskCalls: 15,
   revenueAtRisk: 45000,
   retentionSaves: 24,
   revenueSaved: 72000,
   salesCallScore: 78,
   topAgent: "Sarah Jenkins"
};

export const mockOpportunitySignals = [
   { id: "S1", name: "Upgrade Professional", type: "upsell", phrases: ["more licenses", "upgrade plan"], offer: "20% discount on Pro", threshold: 85, active: true },
   { id: "S2", name: "Add-on Security Pack", type: "cross-sell", phrases: ["security concerns", "data protection"], offer: "Security Suite trial", threshold: 70, active: true }
];

export const mockOpportunities = [
   { id: "OPP-001", callRef: "C-902", signal: "Upgrade Professional", timestamp: "2024-03-04 10:15", offerMade: true, response: "Accepted", value: 1200, crmDeal: true, verified: true },
   { id: "OPP-002", callRef: "C-905", signal: "Add-on Security Pack", timestamp: "2024-03-04 11:30", offerMade: false, response: "Considering", value: 500, crmDeal: false, verified: false },
   { id: "OPP-003", callRef: "C-910", signal: "Upgrade Professional", timestamp: "2024-03-04 14:00", offerMade: true, response: "Declined", value: 1200, crmDeal: false, verified: true }
];

export const mockChurnRisks = [
   { id: "C1", vocab: ["cancel", "unhappy", "too expensive"], sentiment: 30, alert: 70, playbook: "P1", lookback: 30, highValue: 80 }
];

export const mockPlaybooks = [
   { id: "P1", name: "Value Preservation", trigger: "Price Concern", offerType: "Credit", details: "Apply $50 credit for 3 months", auth: "Supervisor", max: 1, success: "Retention", escalation: "Retention Desk" }
];

export const mockSalesScores = [
   {
      id: "SS-001",
      opening: 85,
      discovery: 90,
      valueProp: 75,
      objectionHandling: 80,
      closeAttempt: true,
      talkListenRatio: 45,
      questionRatio: 15,
      competitorMention: false,
      outcome: "Sold",
      totalScore: 82
   },
   {
      id: "SS-002",
      opening: 70,
      discovery: 60,
      valueProp: 50,
      objectionHandling: 40,
      closeAttempt: false,
      talkListenRatio: 70,
      questionRatio: 5,
      competitorMention: true,
      outcome: "Lost",
      totalScore: 48
   }
];
