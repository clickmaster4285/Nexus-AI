export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">NEXUS AI</h1>
          <p className="text-muted-foreground">Contact Center Intelligence Platform</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
