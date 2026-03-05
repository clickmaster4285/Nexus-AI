export const securityMetrics = {
   threatLevel: "Low",
   activeAlerts: 0,
   lastScan: "14 mins ago",
   healthScore: 98,
   events: [
      { id: 1, type: "Login", status: "Success", user: "a.pierce@nexus.ai", ip: "192.168.1.45", location: "New York, US", time: "2 mins ago" },
      { id: 2, type: "API Access", status: "Blocked", user: "Unknown", ip: "45.12.33.201", location: "Moscow, RU", time: "8 mins ago" },
      { id: 3, type: "Config Change", status: "Success", user: "d.kim@nexus.ai", ip: "10.0.4.12", location: "Internal", time: "45 mins ago" },
   ],
   loginsByRegion: [
      { region: "North America", count: 1240, status: "Normal" },
      { region: "Europe", count: 850, status: "Normal" },
      { region: "Asia", count: 320, status: "High Activity" },
   ]
};

export const compliancePacks = [
   { id: "soc2", name: "SOC2 Type II", status: "Compliant", lastAudit: "Feb 2024", nextAudit: "Feb 2025", checks: 42, passed: 42 },
   { id: "gdpr", name: "GDPR", status: "Compliant", lastAudit: "Jan 2024", nextAudit: "July 2024", checks: 28, passed: 28 },
   { id: "hipaa", name: "HIPAA", status: "Compliant", lastAudit: "Dec 2023", nextAudit: "Dec 2024", checks: 15, passed: 15 },
   { id: "pci", name: "PCI-DSS v4.0", status: "In Progress", lastAudit: "N/A", nextAudit: "June 2024", checks: 35, passed: 31 },
];

export const privacyRules = [
   { id: "red-1", name: "Standard Credit Card", type: "Pattern", mask: "****-****-****-1234", active: true },
   { id: "red-2", name: "Social Security Number", type: "Regex", mask: "***-**-****", active: true },
   { id: "red-3", name: "Email Address", type: "Partial", mask: "a***@example.com", active: false },
];

export const encryptionStatus = {
   sslCerts: [
      { domain: "api.nexus-ai.com", provider: "DigiCert", expires: "245 days", strength: "RSA 4096" },
      { domain: "portal.nexus-ai.com", provider: "Let's Encrypt", expires: "12 days", strength: "ECC P-384" },
   ],
   keyRotation: "Enabled",
   lastRotation: "3 days ago",
   encryptionAlgorithm: "AES-256-GCM"
};
