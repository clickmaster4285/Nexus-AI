export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Administration & Settings</h1>
      <p className="text-muted-foreground">Tenant config, user management, roles, billing, audit, and white-label</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">User Management</h2>
          <p className="text-muted-foreground">Manage users, roles, and permissions...</p>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h2 className="text-lg font-semibold mb-4">Tenant Configuration</h2>
          <p className="text-muted-foreground">Organization settings and branding...</p>
        </div>
      </div>
    </div>
  );
}
