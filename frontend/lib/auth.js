export const USER_PROFILES = {
  SUPER_ADMIN: {
    id: "super_admin",
    label: "Super Admin",
    description: "Full system control, billing, and architectural settings.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    testCredentials: {
      email: "admin@nexus-ai.com",
      password: "password123"
    },
    modules: ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M12", "M14", "M15", "M18", "M19", "M20", "M21", "M23", "M25"]
  },
  SUPERVISOR: {
    id: "supervisor",
    label: "Supervisor",
    description: "Team performance, real-time monitoring, and QA coaching.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    testCredentials: {
      email: "supervisor@nexus-ai.com",
      password: "password123"
    },
    modules: ["M01", "M02", "M03", "M08", "M09", "M10", "M13", "M15", "M20", "M22", "M24"]
  },
  AGENT: {
    id: "agent",
    label: "Agent",
    description: "Desktop utilities, customer records, and self-service portal.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=800&auto=format&fit=crop",
    testCredentials: {
      email: "agent.smith@nexus-ai.com",
      password: "password123"
    },
    modules: ["M00", "M10", "M13", "M15", "M16", "M17", "M22", "M24", "M26"]
  }
};

export const getModulesForRole = (roleId) => {
  const profile = Object.values(USER_PROFILES).find(p => p.id === roleId);
  return profile ? profile.modules : [];
};
