export const mockQualityForms = [
   {
      id: "QF001",
      name: "General Support Evaluation",
      version: "2.1",
      sections: [
         {
            name: "Soft Skills",
            weight: 30,
            questions: [
               { id: "q1", text: "Agent was polite and professional", weight: 10, type: "scale" },
               { id: "q2", text: "Active listening demonstrated", weight: 10, type: "boolean" },
               { id: "q3", text: "Tone of voice was appropriate", weight: 10, type: "scale" }
            ]
         },
         {
            name: "Process Adherence",
            weight: 40,
            questions: [
               { id: "q4", text: "Verified customer identity (PII)", weight: 15, type: "boolean", critical: true },
               { id: "q5", text: "Followed standard greeting", weight: 5, type: "boolean" },
               { id: "q6", text: "Accurate solution provided", weight: 20, type: "scale" }
            ]
         },
         {
            name: "Compliance",
            weight: 30,
            questions: [
               { id: "q7", text: "Regulatory disclosure read", weight: 15, type: "boolean", critical: true },
               { id: "q8", text: "Proper call closing", weight: 15, type: "boolean" }
            ]
         }
      ]
   }
];

export const mockEvaluations = [
   {
      id: "EV001",
      callId: "C001",
      agentId: "A001",
      evaluatorId: "Nexus AI (Auto)",
      formId: "QF001",
      score: 88,
      status: "completed",
      date: "2026-03-04T10:30:00Z",
      scores: {
         q1: 9, q2: true, q3: 8,
         q4: true, q5: true, q6: 7,
         q7: true, q8: true
      },
      comments: "Great flow, missed minor branding point in closing.",
      disputed: false
   },
   {
      id: "EV002",
      callId: "C002",
      agentId: "A002",
      evaluatorId: "Supervisor JD",
      formId: "QF001",
      score: 72,
      status: "disputed",
      date: "2026-03-04T09:15:00Z",
      scores: {
         q1: 6, q2: false, q3: 7,
         q4: true, q5: true, q6: 5,
         q7: true, q8: true
      },
      comments: "Customer had to repeat themselves multiple times.",
      disputed: true,
      disputeReason: "Customer was cut off due to technical glitch, not agent error."
   }
];

export const mockComplianceRules = [
   {
      id: "R001",
      name: "PCI-DSS Credit Card Silence",
      description: "Detect if agent asks for CC number or if recording is not paused.",
      severity: "critical",
      category: "Financial",
      action: "Redact & Alert",
      status: "active"
   },
   {
      id: "R002",
      name: "Branding Compliance",
      description: "Opening must include 'Powered by Nexus AI'.",
      severity: "medium",
      category: "Marketing",
      action: "Flag & Score",
      status: "active"
   },
   {
      id: "R003",
      name: "GDPR Consent",
      description: "European callers must be asked for data processing consent.",
      severity: "high",
      category: "Legal",
      action: "Mandatory Flag",
      status: "active"
   }
];
