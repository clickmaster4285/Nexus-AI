// Module configuration matching the Excel specification
export const MODULES = [
  { id: "M01", name: "Real-Time Operations Dashboard", route: "/m01-realtime", menuItems: 12 },
  { id: "M02", name: "AI Conversation Intelligence", route: "/m02-conversation", menuItems: 10 },
  { id: "M03", name: "Quality Assurance & Compliance", route: "/m03-qa", menuItems: 11 },
  { id: "M04", name: "Revenue Intelligence Layer", route: "/m04-revenue", menuItems: 10 },
  { id: "M05", name: "Workforce Intelligence", route: "/m05-workforce", menuItems: 12 },
  { id: "M06", name: "Customer Experience & Journey", route: "/m06-cx-journey", menuItems: 9 },
  { id: "M07", name: "Reporting & BI Studio", route: "/m07-reporting", menuItems: 10 },
  { id: "M08", name: "AI Supervisor Copilot", route: "/m08-supervisor-ai", menuItems: 8 },
  { id: "M09", name: "Call Recording & Playback", route: "/m09-recording", menuItems: 9 },
  { id: "M10", name: "Telephony Integration Hub", route: "/m10-telephony", menuItems: 8 },
  { id: "M11", name: "Integrations & Ecosystem", route: "/m11-integrations", menuItems: 10 },
  { id: "M12", name: "Administration & Settings", route: "/m12-admin", menuItems: 14 },
  { id: "M13", name: "Agent Self-Service Portal", route: "/m13-agent-portal", menuItems: 9 },
  { id: "M14", name: "Security & Compliance Center", route: "/m14-security", menuItems: 8 },
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
