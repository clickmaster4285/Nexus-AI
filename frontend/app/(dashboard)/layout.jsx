import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <Breadcrumb />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
