export default function WorkforceIntelPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Workforce Intelligence</h1>
      <p className="text-muted-foreground">Agent profiles, gamification, wellbeing engine, and WFM forecasting</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Agent Directory</h2>
          <p className="text-muted-foreground">Manage agent profiles and skills...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Gamification Engine</h2>
          <p className="text-muted-foreground">Points, badges, and leaderboards...</p>
        </div>
      </div>
    </div>
  );
}
