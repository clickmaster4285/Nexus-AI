export const contacts = [
  {
    id: "CON-001",
    firstName: "Sarah",
    lastName: "Jenkins",
    phonePrimary: "+1-555-0101",
    emailPrimary: "s.jenkins@example.com",
    company: "Acme Corp",
    jobTitle: "Procurement Manager",
    city: "San Francisco",
    country: "USA",
    status: "Active",
    clvScore: 850,
    clvTier: "VIP",
    lastCallDate: "2026-03-05",
    totalCalls: 12,
    tags: ["High Value", "Key Decision Maker"],
    consentStatus: ["Voice", "Email"]
  },
  {
    id: "CON-002",
    firstName: "Michael",
    lastName: "Chen",
    phonePrimary: "+1-555-0102",
    emailPrimary: "m.chen@techglobal.io",
    company: "TechGlobal",
    jobTitle: "CTO",
    city: "Seattle",
    country: "USA",
    status: "Active",
    clvScore: 920,
    clvTier: "VIP",
    lastCallDate: "2026-03-08",
    totalCalls: 8,
    tags: ["Technical", "Renewals"],
    consentStatus: ["Voice", "SMS", "Email"]
  },
  {
    id: "CON-003",
    firstName: "Emma",
    lastName: "Rodriguez",
    phonePrimary: "+1-555-0103",
    emailPrimary: "emma.r@retailworks.com",
    company: "RetailWorks",
    jobTitle: "Operations Lead",
    city: "Austin",
    country: "USA",
    status: "Inactive",
    clvScore: 450,
    clvTier: "Standard",
    lastCallDate: "2025-12-15",
    totalCalls: 24,
    tags: ["Churn Risk"],
    consentStatus: ["Email"]
  },
  {
    id: "CON-004",
    firstName: "David",
    lastName: "Smith",
    phonePrimary: "+1-555-0104",
    emailPrimary: "d.smith@buildit.com",
    company: "BuildIt Construction",
    jobTitle: "Project Director",
    city: "Chicago",
    country: "USA",
    status: "Active",
    clvScore: 680,
    clvTier: "Gold",
    lastCallDate: "2026-03-01",
    totalCalls: 5,
    tags: ["New Client"],
    consentStatus: ["Voice", "SMS"]
  }
];

export const accounts = [
  {
    id: "ACC-001",
    name: "Acme Corp",
    industry: "Manufacturing",
    type: "Enterprise",
    status: "Active",
    website: "https://acme-corp.com",
    revenue: "$500M",
    employees: 5000,
    owner: "John Doe",
    city: "New York"
  },
  {
    id: "ACC-002",
    name: "TechGlobal",
    industry: "Software",
    type: "Enterprise",
    status: "Active",
    website: "https://techglobal.io",
    revenue: "$1.2B",
    employees: 12000,
    owner: "Jane Smith",
    city: "San Francisco"
  },
  {
    id: "ACC-003",
    name: "RetailWorks",
    industry: "Retail",
    type: "SMB",
    status: "Warning",
    website: "https://retailworks.com",
    revenue: "$25M",
    employees: 150,
    owner: "Robert Brown",
    city: "Austin"
  }
];

export const leads = [
  {
    id: "LEA-001",
    name: "Alice Thompson",
    phone: "+1-555-0201",
    email: "a.thompson@startup.io",
    source: "Web Form",
    score: 78,
    status: "Qualified",
    assignedTo: "John Doe",
    lastAttempt: "2026-03-07"
  },
  {
    id: "LEA-002",
    name: "James Wilson",
    phone: "+1-555-0202",
    email: "j.wilson@corp.com",
    source: "Referral",
    score: 92,
    status: "New",
    assignedTo: "Jane Smith",
    lastAttempt: "2026-03-09"
  },
  {
    id: "LEA-003",
    name: "Linda Garcia",
    phone: "+1-555-0203",
    email: "l.garcia@gmail.com",
    source: "Cold Call",
    score: 45,
    status: "Contacted",
    assignedTo: "Robert Brown",
    lastAttempt: "2026-03-08"
  }
];

export const deals = [
  {
    id: "DEAL-001",
    name: "Enterprise Expansion - Acme",
    pipeline: "Sales Pipeline",
    stage: "Negotiation",
    value: "$120,000",
    probability: 75,
    contact: "Sarah Jenkins",
    account: "Acme Corp",
    owner: "John Doe",
    closeDate: "2026-04-15"
  },
  {
    id: "DEAL-002",
    name: "Cloud Migration - TechGlobal",
    pipeline: "Sales Pipeline",
    stage: "Discovery",
    value: "$450,000",
    probability: 20,
    contact: "Michael Chen",
    account: "TechGlobal",
    owner: "Jane Smith",
    closeDate: "2026-06-30"
  },
  {
    id: "DEAL-003",
    name: "Renewal - RetailWorks",
    pipeline: "Retention Pipeline",
    stage: "Contracting",
    value: "$45,000",
    probability: 90,
    contact: "Emma Rodriguez",
    account: "RetailWorks",
    owner: "Robert Brown",
    closeDate: "2026-03-25"
  }
];

export const tasks = [
  {
    id: "TSK-001",
    title: "Follow up on proposal",
    type: "Call",
    dueDate: "2026-03-10T14:00:00",
    priority: "High",
    status: "Pending",
    contact: "Sarah Jenkins",
    assignedTo: "John Doe"
  },
  {
    id: "TSK-002",
    title: "Send contract draft",
    type: "Email",
    dueDate: "2026-03-11T09:00:00",
    priority: "Medium",
    status: "In Progress",
    contact: "Emma Rodriguez",
    assignedTo: "Robert Brown"
  },
  {
    id: "TSK-003",
    title: "Quarterly review meeting",
    type: "Meeting",
    dueDate: "2026-03-15T11:30:00",
    priority: "Low",
    status: "Pending",
    contact: "Michael Chen",
    assignedTo: "Jane Smith"
  }
];

export const interactionHistory = [
  {
    id: "INT-001",
    contactId: "CON-001",
    type: "Inbound Call",
    date: "2026-03-05T10:20:00",
    duration: "05:24",
    agent: "John Doe",
    outcome: "Success",
    sentiment: "Positive",
    summary: "Customer inquired about pricing for enterprise expansion. Sent proposal."
  },
  {
    id: "INT-002",
    contactId: "CON-001",
    type: "Email",
    date: "2026-03-05T11:45:00",
    duration: "-",
    agent: "John Doe",
    outcome: "Sent",
    sentiment: "Neutral",
    summary: "Sent proposal PDF as requested during the call."
  },
  {
    id: "INT-003",
    contactId: "CON-002",
    type: "Outbound Call",
    date: "2026-03-08T14:10:00",
    duration: "12:15",
    agent: "Jane Smith",
    outcome: "Follow-up Needed",
    sentiment: "Positive",
    summary: "Discussed cloud migration strategy. CTO is interested but needs technical docs."
  }
];
