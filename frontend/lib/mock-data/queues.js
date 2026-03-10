export const queues = [
  {
    id: "Q001",
    name: "Sales",
    callsWaiting: 3,
    longestWaitTime: 145,
    agentsAvailable: 4,
    agentsBusy: 6,
    abandonmentRate: 4.2,
    slaPercentage: 94.5,
    priority: 8,
    strategy: "ringall",
    serviceLevelTarget: 20,
    timeout: 300,
    wrapupTime: 30
  },
  {
    id: "Q002",
    name: "Support",
    callsWaiting: 12,
    longestWaitTime: 567,
    agentsAvailable: 2,
    agentsBusy: 8,
    abandonmentRate: 8.5,
    slaPercentage: 78.3,
    priority: 10,
    strategy: "leastrecent",
    serviceLevelTarget: 30,
    timeout: 600,
    wrapupTime: 45
  },
  {
    id: "Q003",
    name: "Billing",
    callsWaiting: 1,
    longestWaitTime: 23,
    agentsAvailable: 5,
    agentsBusy: 4,
    abandonmentRate: 2.1,
    slaPercentage: 96.8,
    priority: 6,
    strategy: "fewestcalls",
    serviceLevelTarget: 30,
    timeout: 300,
    wrapupTime: 30
  },
  {
    id: "Q004",
    name: "Technical",
    callsWaiting: 8,
    longestWaitTime: 445,
    agentsAvailable: 1,
    agentsBusy: 5,
    abandonmentRate: 12.3,
    slaPercentage: 65.4,
    priority: 9,
    strategy: "rrmemory",
    serviceLevelTarget: 45,
    timeout: 900,
    wrapupTime: 60
  }
];

export const mockIvrFlows = [
  { id: "IVR-101", name: "Main Welcome Flow", entry: "+1800-NEXUS-01", status: "Published", lastEdited: "2024-03-01", nodes: 12 },
  { id: "IVR-102", name: "After Hours Support", entry: "+1800-NEXUS-02", status: "Published", lastEdited: "2024-02-28", nodes: 5 },
  { id: "IVR-103", name: "Marketing Campaign A", entry: "+1800-SALE-NOW", status: "Draft", lastEdited: "2024-03-04", nodes: 8 }
];

export const mockRoutingRules = [
  { id: "RR-01", name: "VIP Priority Path", condition: "CLV > 5000", skill: "VIP Support", priority: 1, status: "Active" },
  { id: "RR-02", name: "Spanish Language Routing", condition: "Lang == ES", skill: "Spanish", priority: 2, status: "Active" },
  { id: "RR-03", name: "Technical Overload", condition: "Wait > 5m", skill: "Multi-Skill Tier 2", priority: 3, status: "Active" }
];

export const mockCallbacks = [
  { id: "CB-001", customer: "Alex Johnson", phone: "+1 555-0123", requestedAt: "14:10", status: "Pending", queue: "Support" },
  { id: "CB-002", customer: "Maria Garcia", phone: "+1 555-0199", requestedAt: "14:25", status: "In Progress", queue: "Sales" },
  { id: "CB-003", customer: "David Wilson", phone: "+1 555-0244", requestedAt: "14:35", status: "Pending", queue: "Billing" }
];

export const getQueueById = (id) => queues.find(queue => queue.id === id);

export const getQueuesWithAlerts = () => queues.filter(queue => queue.callsWaiting > 5 || queue.slaPercentage < 80);

export const getTotalCallsWaiting = () => queues.reduce((sum, q) => sum + q.callsWaiting, 0);

export const getTotalAgentsAvailable = () => queues.reduce((sum, q) => sum + q.agentsAvailable, 0);
