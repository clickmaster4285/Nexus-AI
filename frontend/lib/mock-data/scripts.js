export const scripts = [
  {
    id: "SCR-001",
    name: "Inbound Sales - Standard",
    type: "Inbound",
    steps: [
      { id: 1, title: "Greeting", content: "Thank you for calling NEXUS AI. My name is {agentName}. How can I help you today?", type: "Opening" },
      { id: 2, title: "Discovery", content: "I understand you're interested in {product}. Can you tell me a bit more about your current setup?", type: "Standard" },
      { id: 3, title: "Pitch", content: "Based on what you've told me, I recommend our Enterprise plan. It includes...", type: "Offer" },
      { id: 4, title: "Objection Handling - Price", content: "I completely understand budget is a concern. However, considering the ROI...", type: "Objection" },
      { id: 5, title: "Closing", content: "Would you like to proceed with the trial?", type: "Closing" }
    ]
  },
  {
    id: "SCR-002",
    name: "Support - Technical Issue",
    type: "Inbound",
    steps: [
      { id: 1, title: "Empathy", content: "I'm sorry to hear you're experiencing issues with {product}. Let's get that sorted out.", type: "Opening" },
      { id: 2, title: "Triage", content: "Are you seeing any error messages?", type: "Standard" }
    ]
  },
  {
    id: "SCR-003",
    name: "Outbound - Renewal",
    type: "Outbound",
    steps: [
      { id: 1, title: "Intro", content: "Hi {customerName}, this is {agentName} from NEXUS AI calling about your upcoming renewal.", type: "Opening" }
    ]
  }
];

export const kbArticles = [
  {
    id: "KB-101",
    title: "Resetting User Password",
    category: "Account Management",
    preview: "To reset a user password, navigate to Admin Settings > Users...",
    views: 1250,
    rating: 4.8
  },
  {
    id: "KB-102",
    title: "Configuring SIP Trunks",
    category: "Technical",
    preview: "SIP Trunks require port 5060 to be open. Ensure your firewall...",
    views: 850,
    rating: 4.5
  },
  {
    id: "KB-103",
    title: "Refund Policy",
    category: "Billing",
    preview: "Refunds are processed within 5-7 business days. Full refunds are available...",
    views: 3200,
    rating: 4.2
  }
];
