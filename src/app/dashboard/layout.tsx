import DashboardSidebar from "@/components/DashboardSidebar";
import PageTransition from "@/components/PageTransition";

export const metadata = {
  title: "Dashboard | SOKOPAY",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F4F6F8",
        fontFamily: "var(--font-body)",
      }}
    >
      <DashboardSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
