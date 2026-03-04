export const mockTranscripts = [
   {
      id: "TR001",
      callId: "C001",
      agentId: "A001",
      customerId: "CUST-982",
      language: "en-US",
      duration: 412,
      sentiment: 45,
      confidence: 0.92,
      summary: {
         primaryReason: "Billing Dispute",
         agentActions: ["Verified account", "Explained charges", "Offered credit"],
         resolutionStatus: "resolved",
         keyPoints: [
            "Customer was charged twice for the monthly subscription.",
            "Agent identified a system glitch in the billing cycle.",
            "A credit of $29.99 was applied to the account."
         ],
         sentimentSummary: "Started frustrated, ended satisfied.",
         nextSteps: ["Monitor next billing cycle", "Send confirmation email"],
         templateUsed: "Standard Billing Support"
      },
      nlp: {
         intents: [
            { name: "Billing Inquiry", confidence: 0.98 },
            { name: "Refund Request", confidence: 0.85 },
            { name: "Complaint", confidence: 0.42 }
         ],
         topics: ["Overcharge", "Subscription", "System Error"],
         entities: [
            { type: "Customer Name", value: "John Doe", sentiment: "neutral" },
            { type: "Account Number", value: "AC-55421", sentiment: "neutral" },
            { type: "Monetary Amount", value: "$29.99", sentiment: "positive" },
            { type: "Order Number", value: "ORD-9901", sentiment: "neutral" }
         ],
         competitors: ["CompetitorX"],
         products: ["Premium Plan"]
      },
      segments: [
         { speaker: "agent", startTime: 0, endTime: 5, text: "Thank you for calling NEXUS AI Support, my name is Sarah. How can I help you today?", confidence: 0.99 },
         { speaker: "customer", startTime: 6, endTime: 12, text: "Hi Sarah, I'm calling because I see two charges on my credit card for this month.", confidence: 0.95 },
         { speaker: "agent", startTime: 13, endTime: 18, text: "I'm sorry to hear that. I can certainly look into those charges for you. May I have your account number?", confidence: 0.98 },
         { speaker: "customer", startTime: 19, endTime: 24, text: "Yes, it's AC-55421. I only signed up for one Premium Plan.", confidence: 0.75 }, // Low confidence for "Premium Plan" maybe?
         { speaker: "agent", startTime: 25, endTime: 35, text: "Thank you. One moment please... I see the issue. There was a temporary glitch in our system during your billing cycle.", confidence: 0.92 },
         { speaker: "customer", startTime: 36, endTime: 40, text: "That's frustrating. I shouldn't have to call to fix your mistakes.", confidence: 0.40 }, // Negative sentiment
         { speaker: "agent", startTime: 41, endTime: 50, text: "I completely understand. I've already processed a credit for the second charge of $29.99. You'll see it in 3-5 days.", confidence: 0.97 },
         { speaker: "customer", startTime: 51, endTime: 55, text: "Okay, thank you. I appreciate the quick resolution.", confidence: 0.96 }
      ]
   },
   {
      id: "TR002",
      callId: "C002",
      agentId: "A002",
      customerId: "CUST-112",
      language: "en-US",
      duration: 156,
      sentiment: 88,
      confidence: 0.98,
      summary: {
         primaryReason: "Feature Inquiry",
         agentActions: ["Explained AI features", "Provided documentation link"],
         resolutionStatus: "resolved",
         keyPoints: [
            "Customer asked about the new real-time translation feature.",
            "Agent provided a clear walkthrough."
         ],
         sentimentSummary: "Productive and positive interaction.",
         nextSteps: ["N/A"],
         templateUsed: "General Inquiry"
      },
      nlp: {
         intents: [
            { name: "Product Inquiry", confidence: 0.99 }
         ],
         topics: ["Translation", "Real-time"],
         entities: [
            { type: "Product", value: "Real-time Translation", sentiment: "positive" }
         ],
         competitors: [],
         products: ["Nexus Translator"]
      },
      segments: [
         { speaker: "agent", startTime: 0, endTime: 4, text: "Hello, this is Mike. How can I assist you?", confidence: 0.99 },
         { speaker: "customer", startTime: 5, endTime: 12, text: "Hi Mike, I saw a demo of the real-time translation. Does it support Spanish?", confidence: 0.98 },
         { speaker: "agent", startTime: 13, endTime: 20, text: "Yes, it supports Spanish and over 40 other languages. It's built into your existing dashboard.", confidence: 0.99 },
         { speaker: "customer", startTime: 21, endTime: 25, text: "That's great! Thanks for the info.", confidence: 0.99 }
      ]
   }
];

export const getTranscriptByCallId = (callId) => mockTranscripts.find(t => t.callId === callId) || mockTranscripts[0];
export const searchTranscripts = (query) => {
   if (!query) return mockTranscripts;
   const q = query.toLowerCase();
   return mockTranscripts.filter(t =>
      t.summary.primaryReason.toLowerCase().includes(q) ||
      t.segments.some(s => s.text.toLowerCase().includes(q))
   );
};
