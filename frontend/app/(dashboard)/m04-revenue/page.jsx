export default function RevenueIntelPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Revenue Intelligence Layer</h1>
      <p className="text-muted-foreground">Churn prediction, upsell signals, CLV tracking, and sales analytics</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Upsell Opportunities", value: "12" },
          { label: "Churn Risk Calls", value: "5", alert: true },
          { label: "Revenue at Risk", value: "$24,500" },
          { label: "Sales Score Avg", value: "78%" },
        ].map((kpi) => (
          <div key={kpi.label} className="p-4 bg-card rounded-lg border">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.alert ? 'text-red-500' : ''}`}>{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
