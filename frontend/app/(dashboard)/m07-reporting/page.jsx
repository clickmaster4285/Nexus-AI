export default function ReportingBIPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Reporting & BI Studio</h1>
      <p className="text-muted-foreground">Dashboard builder, report library, scheduled distribution, and executive AI</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Dashboard Builder</h2>
          <p className="text-muted-foreground">Create custom dashboards with widgets...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Report Library</h2>
          <p className="text-muted-foreground">Manage and schedule reports...</p>
        </div>
      </div>
    </div>
  );
}
