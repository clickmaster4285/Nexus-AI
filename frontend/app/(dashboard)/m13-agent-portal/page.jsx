export default function AgentPortalPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Agent Self-Service Portal</h1>
      <p className="text-muted-foreground">Agent dashboard, performance, coaching inbox, gamification, and schedule</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "My Calls Today", value: "12" },
          { label: "My AHT", value: "4:32" },
          { label: "My QA Score", value: "92%" },
          { label: "Total Points", value: "1,250" },
        ].map((kpi) => (
          <div key={kpi.label} className="p-4 bg-card rounded-lg border">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-bold">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">My Coaching & Feedback</h2>
          <p className="text-muted-foreground">View coaching sessions and feedback...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">My Schedule</h2>
          <p className="text-muted-foreground">View your schedule and request time off...</p>
        </div>
      </div>
    </div>
  );
}
