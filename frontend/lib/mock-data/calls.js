export const calls = [
  { id: "C001", customerId: "CU1234", agentId: "A001", queue: "Sales", duration: 245, sentiment: 85, status: "completed", outcome: "sale", direction: "inbound" },
  { id: "C002", customerId: "CU5678", agentId: "A002", queue: "Support", duration: 512, sentiment: 45, status: "completed", outcome: "escalated", direction: "inbound" },
  { id: "C003", customerId: "CU9012", agentId: "A003", queue: "Billing", duration: 189, sentiment: 92, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C004", customerId: "CU3456", agentId: "A001", queue: "Sales", duration: 312, sentiment: 78, status: "completed", outcome: "follow-up", direction: "inbound" },
  { id: "C005", customerId: "CU7890", agentId: "A006", queue: "Technical", duration: 678, sentiment: 32, status: "completed", outcome: "escalated", direction: "inbound" },
  { id: "C006", customerId: "CU2468", agentId: "A007", queue: "Support", duration: 145, sentiment: 88, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C007", customerId: "CU1357", agentId: "A009", queue: "Billing", duration: 234, sentiment: 71, status: "in-progress", outcome: null, direction: "inbound" },
  { id: "C008", customerId: "CU9753", agentId: "A010", queue: "Technical", duration: 89, sentiment: 65, status: "in-progress", outcome: null, direction: "inbound" },
  { id: "C009", customerId: "CU8642", agentId: "A012", queue: "Sales", duration: 456, sentiment: 82, status: "completed", outcome: "sale", direction: "outbound" },
  { id: "C010", customerId: "CU1593", agentId: "A013", queue: "Billing", duration: 123, sentiment: 95, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C011", customerId: "CU7531", agentId: "A014", queue: "Support", duration: 567, sentiment: 28, status: "in-progress", outcome: null, direction: "inbound" },
  { id: "C012", customerId: "CU9517", agentId: "A016", queue: "Technical", duration: 289, sentiment: 76, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C013", customerId: "CU3579", agentId: "A017", queue: "Billing", duration: 167, sentiment: 89, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C014", customerId: "CU4682", agentId: "A019", queue: "Sales", duration: 334, sentiment: 73, status: "completed", outcome: "no-sale", direction: "inbound" },
  { id: "C015", customerId: "CU6824", agentId: "A002", queue: "Support", duration: 445, sentiment: 52, status: "completed", outcome: "escalated", direction: "inbound" },
  { id: "C016", customerId: "CU2486", agentId: "A007", queue: "Support", duration: 198, sentiment: 87, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C017", customerId: "CU3691", agentId: "A001", queue: "Sales", duration: 267, sentiment: 81, status: "completed", outcome: "sale", direction: "inbound" },
  { id: "C018", customerId: "CU1470", agentId: "A009", queue: "Billing", duration: 312, sentiment: 68, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C019", customerId: "CU8520", agentId: "A013", queue: "Billing", duration: 156, sentiment: 94, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C020", customerId: "CU7410", agentId: "A016", queue: "Technical", duration: 523, sentiment: 41, status: "completed", outcome: "escalated", direction: "inbound" },
  { id: "C021", customerId: "CU9632", agentId: "A003", queue: "Billing", duration: 234, sentiment: 79, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C022", customerId: "CU2580", agentId: "A012", queue: "Sales", duration: 378, sentiment: 66, status: "completed", outcome: "no-sale", direction: "outbound" },
  { id: "C023", customerId: "CU7412", agentId: "A007", queue: "Support", duration: 145, sentiment: 91, status: "completed", outcome: "resolved", direction: "inbound" },
  { id: "C024", customerId: "CU9630", agentId: "A019", queue: "Sales", duration: 289, sentiment: 74, status: "completed", outcome: "sale", direction: "inbound" },
  { id: "C025", customerId: "CU1475", agentId: "A010", queue: "Technical", duration: 412, sentiment: 58, status: "in-progress", outcome: null, direction: "inbound" },
];

export const getCallById = (id) => calls.find(call => call.id === id);

export const getCallsByAgent = (agentId) => calls.filter(call => call.agentId === agentId);

export const getCallsByQueue = (queue) => calls.filter(call => call.queue === queue);

export const getActiveCalls = () => calls.filter(call => call.status === "in-progress");

export const getCompletedCalls = () => calls.filter(call => call.status === "completed");
