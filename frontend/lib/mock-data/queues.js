/**
 * Mock data for Inbound IVR, Queues, Routing Rules, and Callbacks
 */

export const mockQueues = [
  {
    id: "q-001",
    name: "Sales Inbound",
    priority: 1,
    status: "active",
    strategy: "skill-based",
    agents: 15,
    available: 8,
    waiting: 12,
    avgWaitTime: "0:45",
    longestWait: "2:34",
    sla: 85,
    serviceLevel: 92,
    callsToday: 3240,
    maxWaitTime: 120,
  },
  {
    id: "q-002",
    name: "Customer Support",
    priority: 2,
    status: "active",
    strategy: "longest-idle",
    agents: 25,
    available: 18,
    waiting: 8,
    avgWaitTime: "0:32",
    longestWait: "1:45",
    sla: 90,
    serviceLevel: 88,
    callsToday: 5620,
    maxWaitTime: 180,
  },
  {
    id: "q-003",
    name: "Technical Support",
    priority: 3,
    status: "active",
    strategy: "skill-based",
    agents: 12,
    available: 6,
    waiting: 5,
    avgWaitTime: "1:12",
    longestWait: "3:45",
    sla: 80,
    serviceLevel: 76,
    callsToday: 1890,
    maxWaitTime: 300,
  },
  {
    id: "q-004",
    name: "Billing",
    priority: 4,
    status: "active",
    strategy: "priority",
    agents: 8,
    available: 4,
    waiting: 3,
    avgWaitTime: "0:28",
    longestWait: "1:12",
    sla: 85,
    serviceLevel: 94,
    callsToday: 1240,
    maxWaitTime: 120,
  },
  {
    id: "q-005",
    name: "VIP Support",
    priority: 0,
    status: "active",
    strategy: "vip-first",
    agents: 5,
    available: 3,
    waiting: 1,
    avgWaitTime: "0:15",
    longestWait: "0:45",
    sla: 95,
    serviceLevel: 98,
    callsToday: 340,
    maxWaitTime: 60,
  }
];

export const mockIvrFlows = [
  {
    id: "flow-001",
    name: "Main Customer Service",
    description: "Primary inbound routing for customer support",
    status: "active",
    nodes: 15,
    callsHandled: 45230,
    avgHandlingTime: "2:34",
    successRate: 94.2,
    lastModified: "2024-01-15",
  },
  {
    id: "flow-002",
    name: "Sales Hotline",
    description: "Direct routing to sales team with qualification",
    status: "active",
    nodes: 12,
    callsHandled: 12840,
    avgHandlingTime: "1:45",
    successRate: 89.5,
    lastModified: "2024-01-12",
  },
  {
    id: "flow-003",
    name: "Technical Support",
    description: "Tiered technical support IVR with ticket creation",
    status: "active",
    nodes: 18,
    callsHandled: 8920,
    avgHandlingTime: "4:12",
    successRate: 87.3,
    lastModified: "2024-01-10",
  }
];

export const mockRoutingRules = [
  {
    id: "rule-001",
    name: "Business Hours - Sales",
    description: "Route to sales during business hours",
    priority: 1,
    status: "active",
    type: "time-based",
    conditions: ["Time: 9AM-6PM", "Day: Mon-Fri"],
    target: "Sales Inbound Queue",
    matches: 8450,
    successRate: 98.2,
  },
  {
    id: "rule-002",
    name: "VIP Customers",
    description: "Priority routing for VIP customers",
    priority: 2,
    status: "active",
    type: "caller-id",
    conditions: ["Caller: VIP List", "Priority: High"],
    target: "VIP Support Queue",
    matches: 2340,
    successRate: 99.1,
  },
  {
    id: "rule-003",
    name: "Spanish Speaking",
    description: "Route Spanish callers to bilingual agents",
    priority: 5,
    status: "active",
    type: "language",
    conditions: ["Language: Spanish", "Skill: Bilingual"],
    target: "Spanish Support",
    matches: 1230,
    successRate: 97.8,
  }
];

export const mockCallbacks = [
  {
    id: "cb-001",
    customerName: "John Smith",
    phoneNumber: "+1-555-0123",
    queue: "Sales Inbound",
    scheduledTime: "2024-01-20 14:30",
    status: "scheduled",
    waitTime: 45,
    attempts: 1,
    reason: "Customer requested callback",
    notes: "Interested in premium package",
  },
  {
    id: "cb-002",
    customerName: "Sarah Johnson",
    phoneNumber: "+1-555-0456",
    queue: "Customer Support",
    scheduledTime: "2024-01-20 15:00",
    status: "scheduled",
    waitTime: 120,
    attempts: 0,
    reason: "Long wait time - auto-scheduled",
    notes: "Billing inquiry",
  },
  {
    id: "cb-003",
    customerName: "Mike Williams",
    phoneNumber: "+1-555-0789",
    queue: "Technical Support",
    scheduledTime: "2024-01-20 10:00",
    status: "completed",
    waitTime: 30,
    attempts: 1,
    reason: "Follow-up on ticket #45678",
    notes: "Issue resolved",
  }
];

export const mockRoutingStrategies = [
  { id: "skill-based", label: "Skill-Based Routing" },
  { id: "longest-idle", label: "Longest Idle Agent" },
  { id: "priority", label: "Priority Based" },
  { id: "vip-first", label: "VIP First" },
  { id: "round-robin", label: "Round Robin" },
  { id: "least-cost", label: "Least Cost Routing" },
];

export const mockRuleTypes = [
  { id: "time-based", label: "Time-Based" },
  { id: "caller-id", label: "Caller ID" },
  { id: "ani", label: "ANI/Phone Number" },
  { id: "language", label: "Language" },
  { id: "custom", label: "Custom" },
];

export const mockCallbackSettings = {
  enableAutoCallback: true,
  maxWaitTime: 180,
  maxAttempts: 3,
  retryInterval: 30,
  customerConfirmation: true,
  preservePosition: true,
  voicenotification: true,
  estimatedWaitTime: true,
};

// Helper functions (compatible with original signatures but updated for new data structure)
export const getQueueById = (id) => mockQueues.find(queue => queue.id === id);

export const getQueuesWithAlerts = () => mockQueues.filter(queue => queue.waiting > 5 || queue.serviceLevel < 80);

export const getTotalCallsWaiting = () => mockQueues.reduce((sum, q) => sum + q.waiting, 0);

export const getTotalAgentsAvailable = () => mockQueues.reduce((sum, q) => sum + q.available, 0);

// Default export alias for compatibility if needed
export const queues = mockQueues;
