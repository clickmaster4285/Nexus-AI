// Module configuration matching the Excel specification
export const MODULES = [
  { id: "M01", name: "Real-Time Operations Dashboard", route: "/realtime-operation", menuItems: 12 },
  { id: "M02", name: "AI Conversation Intelligence", route: "/ai-conversation", menuItems: 10 },
  { id: "M03", name: "Quality Assurance & Compliance", route: "/qa-compliance", menuItems: 11 },
  { id: "M04", name: "Revenue Intelligence Layer", route: "/revenue-intelligence", menuItems: 10 },
  { id: "M05", name: "Workforce Intelligence", route: "/workforce-intelligence", menuItems: 12 },
  { id: "M06", name: "Customer Experience & Journey", route: "/cx-journey", menuItems: 9 },
  { id: "M07", name: "Reporting & BI Studio", route: "/reporting-bi", menuItems: 10 },
  { id: "M08", name: "AI Supervisor Copilot", route: "/supervisor-ai", menuItems: 8 },
  { id: "M09", name: "Call Recording & Playback", route: "/recording-playback", menuItems: 9 },
  { id: "M10", name: "Telephony Integration Hub", route: "/telephony-hub", menuItems: 8 },
  { id: "M11", name: "Integrations & Ecosystem", route: "/integrations-ecosystem", menuItems: 10 },
  { id: "M12", name: "Administration & Settings", route: "/admin-settings", menuItems: 14 },
  { id: "M13", name: "Agent Self-Service Portal", route: "/agent-portal", menuItems: 9 },
  { id: "M14", name: "Security & Compliance Center", route: "/security-compliance", menuItems: 8 },
  { id: "M15", name: "Native CRM Management", route: "/crm-native", menuItems: 6 },
  { id: "M16", name: "Agent Desktop", route: "/agent-desktop", menuItems: 6 },
  { id: "M17", name: "Outbound Dialer", route: "/outbound-dialer", menuItems: 3 },
  { id: "M18", name: "Inbound Routing & IVR", route: "/inbound-ivr", menuItems: 4 },
  { id: "M19", name: "Data Upload Engine", route: "/data-upload", menuItems: 2 },
  { id: "M20", name: "Agentic Automation", route: "/supervisor-agentic", menuItems: 3 },
  { id: "M21", name: "Asterisk Deep-Dive", route: "/asterisk-config", menuItems: 4 },
  { id: "M22", name: "Script & KB Builder", route: "/scripts-kb", menuItems: 2 },
  { id: "M23", name: "Robocall Campaign", route: "/robocall-engine", menuItems: 1 },
  { id: "M24", name: "ACW & Disposition", route: "/acw-disposition", menuItems: 2 },
  { id: "M25", name: "DNC & Compliance", route: "/dnc-management", menuItems: 3 },
  { id: "M26", name: "Transfer & Conference", route: "/transfer-conference", menuItems: 2 },
];

// Agent status types with colors
export const AGENT_STATUSES = {
  AVAILABLE: { label: "Available", color: "green" },
  BUSY: { label: "Busy", color: "yellow" },
  ACW: { label: "After Call Work", color: "blue" },
  HOLD: { label: "On Hold", color: "blue" },
  BREAK: { label: "On Break", color: "orange" },
  TRAINING: { label: "Training", color: "purple" },
  OFFLINE: { label: "Offline", color: "gray" },
};

// Call directions
export const CALL_DIRECTIONS = {
  INBOUND: "inbound",
  OUTBOUND: "outbound",
};

// Call outcomes
export const CALL_OUTCOMES = {
  RESOLVED: "resolved",
  ESCALATED: "escalated",
  SALE: "sale",
  NO_SALE: "no-sale",
  FOLLOW_UP: "follow-up",
};

// Sentiment ranges
export const SENTIMENT_RANGES = {
  POSITIVE: { min: 70, max: 100, label: "Positive" },
  NEUTRAL: { min: 40, max: 69, label: "Neutral" },
  NEGATIVE: { min: 0, max: 39, label: "Negative" },
};

// SLA thresholds
export const SLA_THRESHOLDS = {
  EXCELLENT: 95,
  GOOD: 85,
  WARNING: 70,
  CRITICAL: 50,
};

// Time formats
export const TIME_FORMATS = {
  DISPLAY: "HH:mm:ss",
  SHORT: "HH:mm",
  DATE: "yyyy-MM-dd",
  DATETIME: "yyyy-MM-dd HH:mm:ss",
};

