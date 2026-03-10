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

export const mockAsteriskConfig = {
   ami: {
      host: "10.0.45.10",
      port: 5038,
      username: "nexus_ami_user",
      secret: "••••••••••••••••",
      tls: true,
      heartbeat: 30,
      reconnect: 5,
      status: "Connected",
      permissions: "system,call,log,verbose,command,agent,user,config,command,dtmf,reporting,cdr,dialplan,originate,message"
   },
   ari: {
      host: "https://10.0.45.10",
      port: 8089,
      username: "nexus_ari_user",
      password: "••••••••••••••••",
      tls: true,
      stasisApp: "nexus_app",
      wsUrl: "wss://10.0.45.10:8089/ari/events?api_key=nexus_ari_user:secret&app=nexus_app",
      status: "Active"
   }
};

export const mockDetailedPjsipTrunks = [
   {
      id: "PJSIP-001",
      name: "Twilio-US-East",
      type: "PJSIP",
      server: "nexus-east.pstn.twilio.com",
      username: "nexus_voice_01",
      status: "Registered",
      channels: 100,
      transport: "UDP",
      nat: "force_rport,comedia",
      codecs: ["ulaw", "alaw", "g729"],
      dtmfMode: "rfc4733"
   },
   {
      id: "PJSIP-002",
      name: "Bandwidth-Carrier",
      type: "PJSIP",
      server: "trunk.bandwidth.com",
      username: "nexus_bw_trunk",
      status: "Registered",
      channels: 500,
      transport: "TLS",
      nat: "force_rport,comedia",
      codecs: ["ulaw", "g722", "opus"],
      dtmfMode: "info"
   }
];

export const mockWebRtcConfig = {
   transport: "transport-wss",
   bindAddress: "0.0.0.0:8089",
   stunServer: "stun.l.google.com:19302",
   turnServer: "turn:turn.nexus-ai.com:3478",
   turnUsername: "webrtc_agent",
   turnSecret: "••••••••••••••••",
   iceSupport: true,
   dtlsSrtp: true,
   sipPattern: "agent-${EXTEN}",
   validity: 3600
};

export const mockDialplanContexts = [
   {
      id: "CTX-001",
      name: "nexus-inbound",
      bridge: "agi://localhost/nexus_bridge.agi",
      queueContext: "nexus-queues",
      recordingPath: "/var/spool/asterisk/monitor/nexus/",
      format: "wav",
      backend: "res_odbc",
      variables: ["NEXUS_CID", "NEXUS_UUID", "TENANT_ID"]
   },
   {
      id: "CTX-002",
      name: "nexus-outbound",
      bridge: "Dial(PJSIP/${EXTEN}@twilio)",
      queueContext: "none",
      recordingPath: "/var/spool/asterisk/monitor/nexus-out/",
      format: "mp3",
      backend: "res_cdr_custom",
      variables: ["CAMPAIGN_ID", "LEAD_ID"]
   }
];

export const phoneNumbers = [
// ... (rest of the file)
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

export const aiConnectors = [
   {
      id: "AI-001",
      provider: "Amazon Lex",
      type: "Conversational AI",
      status: "Connected",
      lastUsed: "2 mins ago",
      region: "us-east-1",
      latency: "145ms"
   },
   {
      id: "AI-002",
      provider: "Google Dialogflow",
      type: "NLU Engine",
      status: "Active",
      lastUsed: "15 mins ago",
      region: "global",
      latency: "210ms"
   },
   {
      id: "AI-003",
      provider: "Azure Bot Service",
      type: "Virtual Assistant",
      status: "Disconnected",
      lastUsed: "2 days ago",
      region: "westeurope",
      latency: "N/A"
   }
];

export const qosMetrics = [
   { time: "10:00", mos: 4.4, jitter: 12, latency: 25 },
   { time: "10:15", mos: 4.2, jitter: 15, latency: 28 },
   { time: "10:30", mos: 3.8, jitter: 22, latency: 45 },
   { time: "10:45", mos: 4.3, jitter: 10, latency: 22 },
   { time: "11:00", mos: 4.5, jitter: 8, latency: 20 }
];
