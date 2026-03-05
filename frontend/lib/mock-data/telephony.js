export const sipTrunks = [
   {
      id: "TR-001",
      carrier: "Global Telecom",
      region: "US East",
      status: "Active",
      channels: 250,
      utilization: 45,
      latency: "24ms",
      endpoint: "sip.us-east.global-tel.net"
   },
   {
      id: "TR-002",
      carrier: "Verizon Connect",
      region: "US West",
      status: "Active",
      channels: 500,
      utilization: 82,
      latency: "38ms",
      endpoint: "sip.us-west.verizon.vzsip.com"
   },
   {
      id: "TR-003",
      carrier: "BT Business",
      region: "UK / Europe",
      status: "Maintenance",
      channels: 100,
      utilization: 0,
      latency: "115ms",
      endpoint: "sip.lon.bt-sip.co.uk"
   }
];

export const phoneNumbers = [
   {
      id: "DID-101",
      number: "+1 (555) 123-4567",
      region: "North America",
      assignment: "Customer Service Main",
      type: "Toll-Free",
      status: "Active",
      provider: "Global Telecom"
   },
   {
      id: "DID-102",
      number: "+1 (555) 987-6543",
      region: "North America",
      assignment: "Billing Department",
      type: "Local",
      status: "Active",
      provider: "Verizon Connect"
   },
   {
      id: "DID-103",
      number: "+44 20 7946 0123",
      region: "United Kingdom",
      assignment: "London Office",
      type: "Local",
      status: "Porting",
      provider: "BT Business"
   },
   {
      id: "DID-104",
      number: "+1 (800) NEXUS-AI",
      region: "North America",
      assignment: "Marketing Campaign",
      type: "Toll-Free",
      status: "Active",
      provider: "Global Telecom"
   }
];

export const ivrFlows = [
   {
      id: "FLOW-01",
      name: "Main Welcome Flow",
      nodes: 12,
      lastModified: "2024-03-04",
      status: "Published",
      version: "v2.4",
      efficiency: 94
   },
   {
      id: "FLOW-02",
      name: "Billing FAQ Automation",
      nodes: 8,
      lastModified: "2024-03-05",
      status: "Draft",
      version: "v1.2",
      efficiency: null
   },
   {
      id: "FLOW-03",
      name: "Support Escalation Path",
      nodes: 15,
      lastModified: "2024-03-01",
      status: "Published",
      version: "v3.0",
      efficiency: 88
   }
];

export const qosMetrics = [
   { time: "10:00", mos: 4.4, jitter: 12, latency: 25 },
   { time: "10:15", mos: 4.2, jitter: 15, latency: 28 },
   { time: "10:30", mos: 3.8, jitter: 22, latency: 45 },
   { time: "10:45", mos: 4.3, jitter: 10, latency: 22 },
   { time: "11:00", mos: 4.5, jitter: 8, latency: 20 }
];
