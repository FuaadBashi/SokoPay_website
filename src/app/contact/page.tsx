import Link from "next/link";

export const metadata = { title: "Contact | SOKOPAY" };

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        background: "linear-gradient(135deg, #0B3C5D 0%, #0f5a8a 100%)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          textAlign: "center",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px 32px",
        }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", color: "#0B3C5D", margin: "0 0 12px" }}>
          Talk to us
        </h1>
        <p style={{ color: "#5B7083", fontSize: "15px", lineHeight: 1.6, margin: "0 0 24px" }}>
          SOKOPAY is a product concept, so there’s no sales team behind this page. To ask about the
          project or how it’s built, open an issue on its GitHub repository.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://github.com/FuaadBashi/SokoPay_website/issues"
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              background: "#0B3C5D",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Open an issue
          </a>
          <Link
            href="/"
            style={{
              padding: "12px 20px",
              borderRadius: "12px",
              border: "2px solid rgba(11,60,93,0.15)",
              color: "#0B3C5D",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
