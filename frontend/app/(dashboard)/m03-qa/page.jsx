export default function QACompliancePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Quality Assurance & Compliance</h1>
      <p className="text-muted-foreground">Automated scorecards, compliance packs, and coaching workflows</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Scorecard Builder</h2>
          <p className="text-muted-foreground">Create and manage QA scorecards...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Evaluation Queue</h2>
          <p className="text-muted-foreground">Review and evaluate calls...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Compliance Monitoring</h2>
          <p className="text-muted-foreground">Track compliance violations...</p>
        </div>
      </div>
    </div>
  );
}
