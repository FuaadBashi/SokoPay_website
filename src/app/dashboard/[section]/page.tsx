import Link from "next/link";
import { notFound } from "next/navigation";

// Dashboard areas that appear in the navigation but aren't part of this prototype yet. Each
// gets a clear placeholder instead of a 404; any other path is still a real 404.
const SECTIONS: Record<string, string> = {
  receive: "Receive",
  exchange: "FX Exchange",
  transactions: "Transactions",
  scheduled: "Scheduled transfers",
  recipients: "Recipients",
  profile: "Profile",
  settings: "Settings",
  topup: "Top up",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return { title: `${SECTIONS[section] ?? "Dashboard"} | SOKOPAY` };
}

export default async function ComingSoon({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const title = SECTIONS[section];
  if (!title) notFound();

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          maxWidth: "440px",
          textAlign: "center",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px 32px",
          boxShadow: "0 4px 24px rgba(11,60,93,0.08)",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🚧</div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            color: "#0B3C5D",
            margin: "0 0 8px",
          }}
        >
          {title}
        </h1>
        <p style={{ color: "#5B7083", fontSize: "15px", lineHeight: 1.6, margin: "0 0 24px" }}>
          This part of the dashboard isn’t built in the prototype yet. The overview and the
          send-money flow are fully interactive.
        </p>
        <Link
          href="/dashboard/send"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #00A86B, #7ED957)",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Try sending money →
        </Link>
      </div>
    </div>
  );
}
