export default function IntegrationsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Integrations & Ecosystem</h1>
      <p className="text-muted-foreground">CRM sync, collaboration tools, data warehouse, and webhook management</p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">CRM Integration</h2>
          <p className="text-muted-foreground">Connect to Salesforce, HubSpot, etc...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Webhook Management</h2>
          <p className="text-muted-foreground">Configure outgoing webhooks...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">API Keys</h2>
          <p className="text-muted-foreground">Manage developer API access...</p>
        </div>
      </div>
    </div>
  );
}
