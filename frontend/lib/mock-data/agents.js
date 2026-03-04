export const agents = [
  { id: "A001", name: "Sarah Johnson", status: "available", timeInState: 245, queue: "Sales", callsToday: 12, aht: 245, sentiment: 85 },
  { id: "A002", name: "Michael Chen", status: "busy", timeInState: 124, queue: "Support", callsToday: 8, aht: 312, sentiment: 72 },
  { id: "A003", name: "Emily Rodriguez", status: "acw", timeInState: 45, queue: "Billing", callsToday: 15, aht: 198, sentiment: 91 },
  { id: "A004", name: "James Wilson", status: "break", timeInState: 890, queue: "Sales", callsToday: 6, aht: 267, sentiment: 68 },
  { id: "A005", name: "Priya Patel", status: "training", timeInState: 3600, queue: "Onboarding", callsToday: 0, aht: 0, sentiment: 0 },
  { id: "A006", name: "David Kim", status: "hold", timeInState: 67, queue: "Technical", callsToday: 9, aht: 423, sentiment: 55 },
  { id: "A007", name: "Lisa Thompson", status: "available", timeInState: 567, queue: "Support", callsToday: 18, aht: 189, sentiment: 88 },
  { id: "A008", name: "Robert Brown", status: "offline", timeInState: 0, queue: "Sales", callsToday: 0, aht: 0, sentiment: 0 },
  { id: "A009", name: "Amanda Davis", status: "busy", timeInState: 312, queue: "Billing", callsToday: 11, aht: 234, sentiment: 79 },
  { id: "A010", name: "Chris Martinez", status: "available", timeInState: 123, queue: "Technical", callsToday: 7, aht: 356, sentiment: 82 },
  { id: "A011", name: "Jennifer Lee", status: "acw", timeInState: 89, queue: "Support", callsToday: 14, aht: 201, sentiment: 76 },
  { id: "A012", name: "Kevin Anderson", status: "busy", timeInState: 456, queue: "Sales", callsToday: 10, aht: 278, sentiment: 64 },
  { id: "A013", name: "Michelle Garcia", status: "available", timeInState: 789, queue: "Billing", callsToday: 16, aht: 176, sentiment: 93 },
  { id: "A014", name: "Daniel Taylor", status: "hold", timeInState: 23, queue: "Support", callsToday: 5, aht: 445, sentiment: 48 },
  { id: "A015", name: "Stephanie White", status: "break", timeInState: 1200, queue: "Sales", callsToday: 9, aht: 234, sentiment: 71 },
  { id: "A016", name: "Ryan Clark", status: "available", timeInState: 234, queue: "Technical", callsToday: 13, aht: 312, sentiment: 85 },
  { id: "A017", name: "Nicole Lewis", status: "busy", timeInState: 678, queue: "Billing", callsToday: 19, aht: 167, sentiment: 89 },
  { id: "A018", name: "Brandon Walker", status: "offline", timeInState: 0, queue: "Support", callsToday: 0, aht: 0, sentiment: 0 },
  { id: "A019", name: "Rachel Hall", status: "available", timeInState: 445, queue: "Sales", callsToday: 11, aht: 289, sentiment: 77 },
  { id: "A020", name: "Tyler Allen", status: "acw", timeInState: 156, queue: "Technical", callsToday: 8, aht: 398, sentiment: 62 },
];

export const getAgentById = (id) => agents.find(agent => agent.id === id);

export const getAgentsByStatus = (status) => agents.filter(agent => agent.status === status);

export const getAvailableAgents = () => getAgentsByStatus("available");

export const getBusyAgents = () => agents.filter(agent => ["busy", "acw", "hold"].includes(agent.status));
