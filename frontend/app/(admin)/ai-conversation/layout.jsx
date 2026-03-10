"use client";

import { 
  MessageSquare, 
  Sparkles
} from "lucide-react";

export default function AIConversationLayout({ children }) {

  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="border-b bg-background px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              AI CONVERSATION <span className="text-primary/80 uppercase text-lg">Intelligence</span>
            </h1>
            <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
              Natural Language Processing & Topic Extraction
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 flex items-center gap-1 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              AI CORE ACTIVE
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}

// Simple internal Badge if not imported correctly
function Badge({ children, className, variant }) {
  const variants = {
    outline: "border border-input bg-background hover:bg-accent hover:text-sidebar-accent-foreground",
  };
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
