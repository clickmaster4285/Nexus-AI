export default function SupervisorAIPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Supervisor Copilot</h1>
      <p className="text-muted-foreground">Real-time assist, coaching AI, NL query, shift briefings, and alerts</p>

      <div className="p-4 bg-card rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">Copilot Chat Interface</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            {['Who needs help right now?', 'What is my SLA risk this hour?', 'Show me top performers'].map((query) => (
              <button
                key={query}
                className="px-3 py-1 text-sm bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-muted-foreground">Ask me anything about your contact center operations...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
