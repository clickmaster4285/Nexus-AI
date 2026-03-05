export const recordings = [
   {
      id: "REC-1001",
      agent: "Sarah Jenkins",
      customer: "Alex Thompson",
      dateTime: "2024-03-04 10:20 AM",
      duration: "14:25",
      direction: "Inbound",
      sentiment: "Positive",
      topic: "Technical Support",
      status: "Stored",
      retention: "90 Days",
      fileSize: "12.4 MB",
      flagged: false,
      tags: ["High Impact", "Resolution"]
   },
   {
      id: "REC-1002",
      agent: "Emily Davis",
      customer: "Michael Brown",
      dateTime: "2024-03-04 11:45 AM",
      duration: "25:10",
      direction: "Inbound",
      sentiment: "Negative",
      topic: "Billing Escalation",
      status: "Stored",
      retention: "365 Days",
      fileSize: "22.8 MB",
      flagged: true,
      tags: ["Escalated", "Manager Review"]
   },
   {
      id: "REC-1003",
      agent: "Mark Chen",
      customer: "John Doe",
      dateTime: "2024-03-04 01:15 PM",
      duration: "08:30",
      direction: "Outbound",
      sentiment: "Neutral",
      topic: "Follow-up",
      status: "Archived",
      retention: "7 Years",
      fileSize: "7.2 MB",
      flagged: false,
      tags: ["Sales", "Archive"]
   },
   {
      id: "REC-1004",
      agent: "James Wilson",
      customer: "Emma Watson",
      dateTime: "2024-03-04 02:40 PM",
      duration: "12:15",
      direction: "Inbound",
      sentiment: "Positive",
      topic: "Feature Inquiry",
      status: "Stored",
      retention: "90 Days",
      fileSize: "10.8 MB",
      flagged: false,
      tags: ["Product Feedback"]
   }
];

export const retentionPolicies = [
   {
      id: "pol-01",
      name: "Standard Audio",
      duration: "90 Days",
      description: "Default retention for all non-escalated audio interactions.",
      autoArchive: true,
      status: "Active"
   },
   {
      id: "pol-02",
      name: "Legal Hold",
      duration: "Indefinite",
      description: "For interactions marked for legal or compliance review.",
      autoArchive: false,
      status: "Active"
   },
   {
      id: "pol-03",
      name: "Financial Data",
      duration: "7 Years",
      description: "Regulatory requirement for billing and payment discussions.",
      autoArchive: true,
      status: "Active"
   }
];

export const mediaEvents = [
   { time: "02:15", type: "Sentiment Drop", description: "Customer expressed frustration with wait time." },
   { time: "05:40", type: "Keyword Match", description: "Competitor 'CloudSync' mentioned." },
   { time: "10:12", type: "Resolution", description: "Agent successfully applied billing credit." }
];
