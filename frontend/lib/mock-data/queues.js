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
  },
  {
    id: "Q005",
    name: "Onboarding",
    callsWaiting: 0,
    longestWaitTime: 0,
    agentsAvailable: 0,
    agentsBusy: 1,
    abandonmentRate: 0,
    slaPercentage: 100,
    priority: 3,
  },
  {
    id: "Q006",
    name: "VIP Support",
    callsWaiting: 0,
    longestWaitTime: 0,
    agentsAvailable: 3,
    agentsBusy: 2,
    abandonmentRate: 0,
    slaPercentage: 99.2,
    priority: 10,
  },
];

export const getQueueById = (id) => queues.find(queue => queue.id === id);

export const getQueuesWithAlerts = () => queues.filter(queue => queue.callsWaiting > 5 || queue.slaPercentage < 80);

export const getTotalCallsWaiting = () => queues.reduce((sum, q) => sum + q.callsWaiting, 0);

export const getTotalAgentsAvailable = () => queues.reduce((sum, q) => sum + q.agentsAvailable, 0);
