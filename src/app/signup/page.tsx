"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type AccountType = "personal" | "business" | null;
type Step = 1 | 2 | 3 | 4 | 5;

// ─── STEP CONFIG ─────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Account type" },
  { id: 2, label: "Your details" },
  { id: 3, label: "Verify identity" },
  { id: 4, label: "Your corridor" },
  { id: 5, label: "All done" },
];

const CORRIDORS = [
  { from: "🇰🇪 Kenya", to: "🇦🇪 UAE" },
  { from: "🇺🇬 Uganda", to: "🇸🇦 Saudi Arabia" },
  { from: "🇹🇿 Tanzania", to: "🇶🇦 Qatar" },
  { from: "🇪🇹 Ethiopia", to: "🇦🇪 UAE" },
  { from: "🇷🇼 Rwanda", to: "🇰🇼 Kuwait" },
  { from: "🇰🇪 Kenya", to: "🇧🇭 Bahrain" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  hint,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  icon?: string;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#64748b", fontFamily: "var(--font-body)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "8px" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none" }}>{icon}</span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: icon ? "14px 16px 14px 42px" : "14px 16px",
            borderRadius: "14px",
            border: `2px solid ${focused ? "#00A86B" : "rgba(11,60,93,0.12)"}`,
            background: focused ? "rgba(0,168,107,0.02)" : "#FAFBFC",
            fontSize: "15px",
            fontWeight: "500",
            color: "#0B3C5D",
            fontFamily: "var(--font-body)",
            outline: "none",
            transition: "border-color 0.2s ease, background 0.2s ease",
            boxSizing: "border-box",
          }}
        />
      </div>
      {hint && <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "var(--font-body)", marginTop: "6px" }}>{hint}</div>}
    </div>
  );
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

function StepAccountType({ accountType, setAccountType, onNext }: { accountType: AccountType; setAccountType: (t: AccountType) => void; onNext: () => void }) {
  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", margin: "0 0 8px" }}>
        What brings you to SOKOPAY?
      </h2>
      <p style={{ color: "#64748b", fontSize: "16px", fontFamily: "var(--font-body)", margin: "0 0 36px", lineHeight: 1.5 }}>
        We’ll personalise your experience based on your account type.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
        {([
          {
            type: "personal" as AccountType,
            icon: "👤",
            title: "Personal Account",
            desc: "Send money to family and friends across East Africa and the GCC",
            tags: ["Mobile wallet", "Bank transfer", "Instant delivery"],
            color: "#4DA8DA",
          },
          {
            type: "business" as AccountType,
            icon: "🏢",
            title: "Business Account",
            desc: "Manage cross-border payroll, supplier payments and B2B transfers",
            tags: ["API access", "Batch transfers", "Custom FX rates"],
            color: "#00A86B",
          },
        ] as { type: AccountType; icon: string; title: string; desc: string; tags: string[]; color: string }[]).map(opt => (
          <div
            key={opt.type as string}
            onClick={() => setAccountType(opt.type)}
            style={{
              padding: "24px",
              borderRadius: "20px",
              border: `2px solid ${accountType === opt.type ? opt.color : "rgba(11,60,93,0.1)"}`,
              background: accountType === opt.type ? `${opt.color}08` : "white",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: accountType === opt.type ? `0 4px 20px ${opt.color}20` : "0 2px 8px rgba(11,60,93,0.04)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${opt.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                {opt.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: "800", color: "#0B3C5D", fontSize: "17px", fontFamily: "var(--font-display)" }}>{opt.title}</div>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${accountType === opt.type ? opt.color : "rgba(11,60,93,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: accountType === opt.type ? opt.color : "transparent", flexShrink: 0 }}>
                    {accountType === opt.type && <span style={{ color: "white", fontSize: "10px", fontWeight: "900" }}>✓</span>}
                  </div>
                </div>
                <p style={{ color: "#64748b", fontSize: "14px", fontFamily: "var(--font-body)", margin: "6px 0 12px", lineHeight: 1.5 }}>{opt.desc}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {opt.tags.map(tag => (
                    <span key={tag} style={{ padding: "3px 10px", borderRadius: "100px", background: `${opt.color}12`, border: `1px solid ${opt.color}25`, color: opt.color, fontSize: "11px", fontWeight: "600", fontFamily: "var(--font-body)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!accountType}
        style={{
          width: "100%", padding: "16px", borderRadius: "14px", border: "none",
          background: accountType ? "linear-gradient(135deg, #00A86B, #7ED957)" : "rgba(11,60,93,0.08)",
          color: accountType ? "white" : "#94a3b8",
          fontSize: "16px", fontWeight: "700",
          fontFamily: "var(--font-display)",
          cursor: accountType ? "pointer" : "not-allowed",
          boxShadow: accountType ? "0 4px 20px rgba(0,168,107,0.35)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        Continue →
      </button>
    </div>
  );
}

function StepDetails({ accountType, form, setForm, onNext, onBack }: {
  accountType: AccountType;
  form: Record<string, string>;
  setForm: (f: Record<string, string>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const set = (key: string) => (v: string) => setForm({ ...form, [key]: v });
  const isValid = form.firstName && form.lastName && form.email && form.phone && form.password;

  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", margin: "0 0 8px" }}>
        {accountType === "business" ? "Tell us about your business" : "Create your account"}
      </h2>
      <p style={{ color: "#64748b", fontSize: "15px", fontFamily: "var(--font-body)", margin: "0 0 28px" }}>
        Your info is encrypted and never shared.
      </p>

      {accountType === "business" && (
        <InputField label="Company name" placeholder="Acme Trading Ltd" value={form.company || ""} onChange={set("company")} icon="🏢" />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <InputField label="First name" placeholder="Fuaad" value={form.firstName || ""} onChange={set("firstName")} />
        <InputField label="Last name" placeholder="Shurie" value={form.lastName || ""} onChange={set("lastName")} />
      </div>

      <InputField label="Email address" type="email" placeholder="fuaad@example.com" value={form.email || ""} onChange={set("email")} icon="✉️" />
      <InputField label="Phone number" type="tel" placeholder="+971 50 000 0000" value={form.phone || ""} onChange={set("phone")} icon="📱" hint="We'll send your OTP to this number" />
      <InputField label="Password" type="password" placeholder="Min. 8 characters" value={form.password || ""} onChange={set("password")} icon="🔒" />

      {/* Password strength */}
      {form.password && (
        <div style={{ marginTop: "-10px", marginBottom: "18px" }}>
          <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ flex: 1, height: "3px", borderRadius: "2px", background: i <= Math.min(Math.floor(form.password.length / 3), 4) ? (form.password.length < 8 ? "#F59E0B" : "#00A86B") : "rgba(11,60,93,0.1)", transition: "background 0.3s ease" }} />
            ))}
          </div>
          <span style={{ fontSize: "11px", color: form.password.length < 8 ? "#F59E0B" : "#00A86B", fontFamily: "var(--font-body)", fontWeight: "600" }}>
            {form.password.length < 6 ? "Weak" : form.password.length < 8 ? "Fair" : form.password.length < 12 ? "Good" : "Strong"}
          </span>
        </div>
      )}

      {/* Terms */}
      <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "24px", cursor: "pointer" }}>
        <input type="checkbox" style={{ marginTop: "2px", accentColor: "#00A86B", width: "16px", height: "16px", flexShrink: 0 }} />
        <span style={{ fontSize: "13px", color: "#64748b", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
          I agree to SOKOPAY’s <a href="#" style={{ color: "#00A86B", textDecoration: "none", fontWeight: "600" }}>Terms of Service</a> and <a href="#" style={{ color: "#00A86B", textDecoration: "none", fontWeight: "600" }}>Privacy Policy</a>
        </span>
      </label>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} style={{ padding: "15px 24px", borderRadius: "14px", border: "2px solid rgba(11,60,93,0.12)", background: "white", color: "#0B3C5D", fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-body)", cursor: "pointer" }}>← Back</button>
        <button onClick={onNext} disabled={!isValid} style={{ flex: 1, padding: "15px", borderRadius: "14px", border: "none", background: isValid ? "linear-gradient(135deg, #00A86B, #7ED957)" : "rgba(11,60,93,0.08)", color: isValid ? "white" : "#94a3b8", fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: isValid ? "pointer" : "not-allowed", boxShadow: isValid ? "0 4px 20px rgba(0,168,107,0.35)" : "none", transition: "all 0.3s ease" }}>
          Continue →
        </button>
      </div>
    </div>
  );
}

function StepVerify({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [resent, setResent] = useState(false);

  const handleOtp = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => { setUploading(false); setUploaded(true); }, 1600);
  };

  const otpFilled = otp.every(d => d !== "");

  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", margin: "0 0 8px" }}>
        Verify your identity
      </h2>
      <p style={{ color: "#64748b", fontSize: "15px", fontFamily: "var(--font-body)", margin: "0 0 32px" }}>
        We need to confirm it’s really you — this takes under 2 minutes.
      </p>

      {/* OTP */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", fontFamily: "var(--font-body)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>
          📱 Enter the 6-digit code sent to your phone
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          {otp.map((d, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              maxLength={1}
              value={d}
              onChange={e => handleOtp(i, e.target.value)}
              onKeyDown={e => { if (e.key === "Backspace" && !d && i > 0) document.getElementById(`otp-${i - 1}`)?.focus(); }}
              style={{
                width: "48px", height: "56px",
                borderRadius: "14px",
                border: `2px solid ${d ? "#00A86B" : "rgba(11,60,93,0.12)"}`,
                background: d ? "rgba(0,168,107,0.04)" : "#FAFBFC",
                fontSize: "22px", fontWeight: "800", textAlign: "center",
                color: "#0B3C5D", fontFamily: "var(--font-display)",
                outline: "none", transition: "border-color 0.2s ease",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setResent(true)}
          style={{ fontSize: "13px", color: resent ? "#00A86B" : "#94a3b8", fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: resent ? "700" : "400" }}
        >
          {resent ? "✓ Code resent!" : "Didn't receive it? Resend"}
        </button>
      </div>

      {/* ID upload */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: "#64748b", fontFamily: "var(--font-body)", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "12px" }}>
          🪪 Upload a government ID
        </div>
        <div
          onClick={handleUpload}
          style={{
            padding: "28px",
            borderRadius: "18px",
            border: `2px dashed ${uploaded ? "#00A86B" : "rgba(11,60,93,0.15)"}`,
            background: uploaded ? "rgba(0,168,107,0.04)" : "#FAFBFC",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {uploading ? (
            <div>
              <div style={{ fontSize: "28px", marginBottom: "8px", animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
              <div style={{ color: "#64748b", fontSize: "14px", fontFamily: "var(--font-body)" }}>Uploading...</div>
            </div>
          ) : uploaded ? (
            <div>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>✅</div>
              <div style={{ color: "#00A86B", fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-body)" }}>passport_fuaad.jpg uploaded</div>
              <div style={{ color: "#94a3b8", fontSize: "12px", fontFamily: "var(--font-body)", marginTop: "4px" }}>Click to replace</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📁</div>
              <div style={{ color: "#0B3C5D", fontSize: "14px", fontWeight: "600", fontFamily: "var(--font-body)" }}>Passport or National ID</div>
              <div style={{ color: "#94a3b8", fontSize: "12px", fontFamily: "var(--font-body)", marginTop: "4px" }}>PNG, JPG or PDF · max 5MB</div>
            </div>
          )}
        </div>
      </div>

      {/* Compliance note */}
      <div style={{ padding: "14px 18px", borderRadius: "14px", background: "rgba(77,168,218,0.06)", border: "1px solid rgba(77,168,218,0.15)", marginBottom: "24px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "16px", flexShrink: 0 }}>🛡️</span>
        <p style={{ margin: 0, fontSize: "12px", color: "#64748b", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
          SOKOPAY is regulated and compliant with AML/KYC requirements in all operating jurisdictions. Your data is encrypted and never sold.
        </p>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} style={{ padding: "15px 24px", borderRadius: "14px", border: "2px solid rgba(11,60,93,0.12)", background: "white", color: "#0B3C5D", fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-body)", cursor: "pointer" }}>← Back</button>
        <button onClick={onNext} disabled={!otpFilled || !uploaded} style={{ flex: 1, padding: "15px", borderRadius: "14px", border: "none", background: otpFilled && uploaded ? "linear-gradient(135deg, #00A86B, #7ED957)" : "rgba(11,60,93,0.08)", color: otpFilled && uploaded ? "white" : "#94a3b8", fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: otpFilled && uploaded ? "pointer" : "not-allowed", boxShadow: otpFilled && uploaded ? "0 4px 20px rgba(0,168,107,0.35)" : "none", transition: "all 0.3s ease" }}>
          Verify & Continue →
        </button>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function StepCorridor({ selected, setSelected, onNext, onBack }: {
  selected: number | null;
  setSelected: (i: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-0.8px", margin: "0 0 8px" }}>
        Which corridor will you use most?
      </h2>
      <p style={{ color: "#64748b", fontSize: "15px", fontFamily: "var(--font-body)", margin: "0 0 28px" }}>
        We’ll pre-load the best rates for your route. You can always add more later.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
        {CORRIDORS.map((c, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            style={{
              padding: "18px 20px",
              borderRadius: "16px",
              border: `2px solid ${selected === i ? "#00A86B" : "rgba(11,60,93,0.1)"}`,
              background: selected === i ? "rgba(0,168,107,0.06)" : "white",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: selected === i ? "0 4px 16px rgba(0,168,107,0.12)" : "0 1px 4px rgba(11,60,93,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>{c.from}</div>
              <div style={{ fontSize: "12px", color: "#7ED957", fontWeight: "700", fontFamily: "var(--font-body)", margin: "2px 0" }}>↕</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#0B3C5D", fontFamily: "var(--font-display)" }}>{c.to}</div>
            </div>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${selected === i ? "#00A86B" : "rgba(11,60,93,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", background: selected === i ? "#00A86B" : "transparent", flexShrink: 0 }}>
              {selected === i && <span style={{ color: "white", fontSize: "10px", fontWeight: "900" }}>✓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Rate preview */}
      {selected !== null && (
        <div style={{ padding: "16px 20px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(0,168,107,0.06), rgba(126,217,87,0.06))", border: "1px solid rgba(0,168,107,0.15)", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-body)", marginBottom: "4px" }}>Live rate for your corridor</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
              1 USD = 130 KES
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-body)", marginBottom: "4px" }}>Transfer fee</div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#00A86B", fontFamily: "var(--font-display)" }}>Free ✓</div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onBack} style={{ padding: "15px 24px", borderRadius: "14px", border: "2px solid rgba(11,60,93,0.12)", background: "white", color: "#0B3C5D", fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-body)", cursor: "pointer" }}>← Back</button>
        <button onClick={onNext} disabled={selected === null} style={{ flex: 1, padding: "15px", borderRadius: "14px", border: "none", background: selected !== null ? "linear-gradient(135deg, #00A86B, #7ED957)" : "rgba(11,60,93,0.08)", color: selected !== null ? "white" : "#94a3b8", fontSize: "15px", fontWeight: "700", fontFamily: "var(--font-display)", cursor: selected !== null ? "pointer" : "not-allowed", boxShadow: selected !== null ? "0 4px 20px rgba(0,168,107,0.35)" : "none", transition: "all 0.3s ease" }}>
          Finish Setup →
        </button>
      </div>
    </div>
  );
}

// Pseudo-random but deterministic, so the confetti is identical on the server and in the
// browser (Math.random here caused hydration mismatches and moved dots on every re-render).
const scatter = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const DOTS = Array.from({ length: 18 }, (_, i) => ({
  x: scatter(i + 1) * 100,
  delay: scatter(i + 101) * 0.8,
  color: ["#00A86B", "#7ED957", "#4DA8DA", "#F59E0B"][i % 4],
  size: 6 + scatter(i + 201) * 8,
}));

function StepDone({ accountType }: { accountType: AccountType }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      {/* Confetti dots */}
      <div style={{ position: "relative", height: "80px", marginBottom: "8px", overflow: "hidden" }}>
        {DOTS.map((d, i) => (
          <motion.div
            key={i}
            initial={{ top: "-10px" }}
            animate={{ top: "100%" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: d.delay }}
            style={{
              position: "absolute",
              left: `${d.x}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              borderRadius: "50%",
              background: d.color,
              opacity: 0.8,
              transform: "translateX(-50%)",
            }}
          />
        ))}
      </div>

      {/* Check animation */}
      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #00A86B, #7ED957)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "36px", boxShadow: "0 8px 32px rgba(0,168,107,0.35)", animation: "popIn 0.5s ease" }}>
        ✓
      </div>

      <h2 style={{ fontSize: "30px", fontWeight: "800", color: "#0B3C5D", fontFamily: "var(--font-display)", letterSpacing: "-1px", margin: "0 0 10px" }}>
        You’re all set! 🎉
      </h2>
      <p style={{ color: "#64748b", fontSize: "16px", fontFamily: "var(--font-body)", margin: "0 0 36px", lineHeight: 1.6, maxWidth: "360px", marginLeft: "auto", marginRight: "auto" }}>
        Your {accountType} account is ready. Start sending money across borders — instantly.
      </p>

      {/* Summary cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px", textAlign: "left" }}>
        {[
          { icon: "✅", label: "Identity verified", desc: "KYC complete" },
          { icon: "⚡", label: "Account activated", desc: "Transfers enabled" },
          { icon: "🌍", label: "Corridor ready", desc: "East Africa ↔ GCC" },
          { icon: "💳", label: "Free transfer waiting", desc: "Your first send is on us" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", borderRadius: "14px", background: "rgba(0,168,107,0.04)", border: "1px solid rgba(0,168,107,0.1)" }}>
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: "700", color: "#0B3C5D", fontSize: "14px", fontFamily: "var(--font-display)" }}>{item.label}</div>
              <div style={{ color: "#94a3b8", fontSize: "12px", fontFamily: "var(--font-body)" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/dashboard" style={{ display: "block", padding: "16px", borderRadius: "14px", background: "linear-gradient(135deg, #00A86B, #7ED957)", color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "700", fontFamily: "var(--font-display)", boxShadow: "0 4px 20px rgba(0,168,107,0.35)", marginBottom: "12px" }}>
        Go to Dashboard →
      </Link>
      <Link href="/" style={{ display: "block", padding: "14px", borderRadius: "14px", border: "2px solid rgba(11,60,93,0.1)", color: "#0B3C5D", textDecoration: "none", fontSize: "15px", fontWeight: "600", fontFamily: "var(--font-body)" }}>
        Back to Home
      </Link>

      <style>{`@keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function SignUp() {
  const [step, setStep] = useState<Step>(1);
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [corridor, setCorridor] = useState<number | null>(null);
  const go = (next: Step) => {
    setTimeout(() => setStep(next), 60);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "#F4F6F8",
      fontFamily: "var(--font-body)",
    }}>
      {/* Left panel — branding */}
      <div style={{
        width: "420px",
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0B3C5D 0%, #0d4a72 50%, #083a28 100%)",
        padding: "48px 44px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        flexShrink: 0,
        overflow: "hidden",
      }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,168,107,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "60px", left: "-80px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(77,168,218,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "60px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "linear-gradient(135deg, #00A86B, #7ED957)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "17px", color: "white", fontFamily: "var(--font-display)" }}>S</div>
          <span style={{ fontWeight: "800", fontSize: "20px", color: "white", letterSpacing: "-0.5px", fontFamily: "var(--font-display)" }}>SOKO<span style={{ color: "#00A86B" }}>PAY</span></span>
        </div>

        {/* Steps progress */}
        <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", marginBottom: "8px" }}>Step {step} of {STEPS.length}</div>
            <div style={{ height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.1)" }}>
              <div style={{ height: "100%", width: `${progress}%`, borderRadius: "2px", background: "linear-gradient(90deg, #00A86B, #7ED957)", transition: "width 0.5s ease" }} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {STEPS.map((s) => {
              const done = s.id < step;
              const active = s.id === step;
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", borderRadius: "14px", background: active ? "rgba(255,255,255,0.08)" : "transparent", transition: "background 0.3s ease" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: done ? "#00A86B" : active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)", border: `2px solid ${done ? "#00A86B" : active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s ease" }}>
                    {done ? <span style={{ color: "white", fontSize: "12px", fontWeight: "900" }}>✓</span> : <span style={{ color: active ? "white" : "rgba(255,255,255,0.3)", fontSize: "12px", fontWeight: "700" }}>{s.id}</span>}
                  </div>
                  <span style={{ color: done || active ? "white" : "rgba(255,255,255,0.35)", fontSize: "14px", fontWeight: active ? "700" : "500", fontFamily: "var(--font-body)", transition: "color 0.3s ease" }}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom trust badge */}
        <div style={{ position: "relative", zIndex: 1, marginTop: "auto", padding: "20px", borderRadius: "16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
            {["🔒 Encrypted", "🛡️ AML Compliant", "⚡ Instant KYC"].map(b => (
              <span key={b} style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", fontWeight: "500" }}>{b}</span>
            ))}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>
            Regulated by CBK, FSCA &amp; CBUAE. Your funds are protected.
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
        minHeight: "100vh",
        overflowY: "auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: "520px" }}
        >
          {step === 1 && <StepAccountType accountType={accountType} setAccountType={setAccountType} onNext={() => go(2)} />}
          {step === 2 && <StepDetails accountType={accountType} form={form} setForm={setForm} onNext={() => go(3)} onBack={() => go(1)} />}
          {step === 3 && <StepVerify onNext={() => go(4)} onBack={() => go(2)} />}
          {step === 4 && <StepCorridor selected={corridor} setSelected={setCorridor} onNext={() => go(5)} onBack={() => go(3)} />}
          {step === 5 && <StepDone accountType={accountType} />}

          {step < 5 && (
            <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", fontFamily: "var(--font-body)", marginTop: "28px" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#00A86B", fontWeight: "700", textDecoration: "none" }}>Log in →</Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
