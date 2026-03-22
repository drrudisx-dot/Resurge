import { useState } from "react";

const AFFILIATE_URL = "https://f25ae9n832-7ph0etd8ho80p8e.hop.clickbank.net";
const SUPABASE_URL = "https://kqcitkqsoyjgutygtwmr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY2l0a3Fzb3lqZ3V0eWd0d21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxMzg5MTgsImV4cCI6MjA4OTcxNDkxOH0.u-o7Ye3OXil2F6Bl3oaNGMpx2NI3NxoG6ogOGpTTBEo";

const HERO_IMG = "https://media.base44.com/images/public/69bdd9ce10c93536e680620e/2805fe1e6_generated_image.png";
const PRODUCT_IMG = "https://media.base44.com/images/public/69bdd9ce10c93536e680620e/7b20ad625_generated_image.png";

const palette = {
  bg: "#f5f2ee",
  card: "#faf9f6",
  border: "#e8e2d9",
  text: "#1a1a18",
  muted: "#7a7468",
  accent: "#2d6a4f",
  accentLight: "#d8ede4",
  cta: "#1a3c2b",
  ctaHover: "#2d6a4f",
  warm: "#c8956c",
};

async function saveLead(email) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        email,
        source: "funnel_landing",
        redirected: true
      })
    });
    return res.ok || res.status === 409; // 409 = already exists, that's fine
  } catch (e) {
    console.error("Lead save error:", e);
    return false;
  }
}

function CTAButton({ children, onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-block",
        background: hov ? palette.ctaHover : palette.cta,
        color: "#fff",
        fontWeight: "700",
        fontSize: "17px",
        padding: "18px 40px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
        letterSpacing: "0.5px",
        transition: "all 0.2s",
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hov ? "0 8px 24px rgba(29,60,43,0.25)" : "0 4px 12px rgba(29,60,43,0.15)",
        ...style
      }}
    >
      {children}
    </button>
  );
}

export default function Funnel() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hov, setHov] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    await saveLead(email);
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => { window.location.href = AFFILIATE_URL; }, 1800);
  };

  const goToOffer = () => { window.location.href = AFFILIATE_URL; };

  if (submitted) {
    return (
      <div style={{ background: palette.bg, minHeight: "100vh", fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", maxWidth: "520px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: palette.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", margin: "0 auto 24px" }}>✓</div>
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: palette.text, marginBottom: "12px" }}>You're in. Redirecting you now...</h2>
          <p style={{ color: palette.muted, fontSize: "16px", lineHeight: "1.8", fontFamily: "sans-serif" }}>
            We're taking you to the short video that explains exactly what Resurge does — and why thousands of people won't go to bed without it.
          </p>
          <div style={{ marginTop: "24px", width: "100%", maxWidth: "300px", height: "4px", background: palette.accentLight, borderRadius: "99px", margin: "24px auto 0", overflow: "hidden" }}>
            <div style={{ height: "100%", background: palette.accent, borderRadius: "99px", animation: "load 1.8s linear forwards" }} />
          </div>
          <style>{`@keyframes load { from { width: 0% } to { width: 100% } }`}</style>
        </div>
      </div>
    );
  }

  const EmailForm = ({ dark = false }) => (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px", ...(dark ? { margin: "0 auto" } : {}) }}>
      <input
        type="email" required placeholder="Your best email address"
        value={email} onChange={e => setEmail(e.target.value)}
        style={{
          padding: "16px 18px",
          border: dark ? "1px solid rgba(255,255,255,0.2)" : `1px solid ${palette.border}`,
          borderRadius: "4px",
          background: dark ? "rgba(255,255,255,0.1)" : palette.card,
          color: dark ? "#fff" : palette.text,
          fontSize: "16px", outline: "none", fontFamily: "sans-serif",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          padding: "17px", border: "none", borderRadius: "4px",
          background: dark ? "#fff" : (hov ? palette.ctaHover : palette.cta),
          color: dark ? palette.cta : "#fff",
          fontSize: "16px", fontWeight: "700", cursor: loading ? "wait" : "pointer",
          letterSpacing: "0.5px", transition: "all 0.2s",
          transform: (!dark && hov) ? "translateY(-1px)" : "translateY(0)",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Saving..." : "Yes — Show Me The Free Video →"}
      </button>
      <p style={{ fontSize: "12px", color: dark ? "rgba(255,255,255,0.4)" : palette.muted, margin: 0 }}>
        🔒 No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  );

  return (
    <div style={{ background: palette.bg, minHeight: "100vh", fontFamily: "sans-serif", color: palette.text }}>

      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: palette.cta, padding: "11px 20px", textAlign: "center" }}>
        <span style={{ color: "#fff", fontSize: "13px", letterSpacing: "1.5px", fontWeight: "600" }}>
          FREE GUIDE — ENTER YOUR EMAIL TO WATCH THE VIDEO
        </span>
      </div>

      {/* NAV */}
      <div style={{ borderBottom: `1px solid ${palette.border}`, padding: "18px 40px", display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: "20px", fontWeight: "700", letterSpacing: "3px", color: palette.text, fontFamily: "'Georgia', serif" }}>
          SLEEP WELL
        </span>
      </div>

      {/* HERO */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-block", background: palette.accentLight, color: palette.accent, fontSize: "11px", fontWeight: "700", letterSpacing: "2.5px", padding: "6px 14px", borderRadius: "2px", marginBottom: "24px" }}>
            FREE — WATCH NOW
          </div>
          <h1 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: "700", lineHeight: "1.2", fontFamily: "'Georgia', serif", marginBottom: "20px", color: palette.text }}>
            Wake Up Without Pain or Exhaustion — Starting Night One.
          </h1>
          <p style={{ fontSize: "17px", color: palette.muted, lineHeight: "1.8", marginBottom: "12px" }}>
            Discover the <strong style={{ color: palette.text }}>one deep-sleep nutrient</strong> most adults over 35 are deficient in — and how fixing it can transform your mornings in less than a week.
          </p>
          <p style={{ fontSize: "15px", color: palette.muted, lineHeight: "1.7", marginBottom: "32px" }}>
            Enter your email below to watch the free video presentation.
          </p>
          <EmailForm />
          <div style={{ display: "flex", gap: "20px", marginTop: "28px", flexWrap: "wrap" }}>
            {["⭐ 4.9 / 5 rating", "✓ 12,400+ people helped", "✓ 100% free"].map((b, i) => (
              <span key={i} style={{ fontSize: "13px", color: palette.muted, fontWeight: "600" }}>{b}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img src={HERO_IMG} alt="Peaceful sleep" style={{ width: "100%", borderRadius: "6px", objectFit: "cover", aspectRatio: "4/5", display: "block", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }} />
          <div style={{ position: "absolute", bottom: "24px", left: "24px", background: "rgba(245,242,238,0.95)", borderRadius: "4px", padding: "14px 18px", border: `1px solid ${palette.border}`, maxWidth: "220px" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: palette.text, marginBottom: "4px" }}>"I sleep through the night now."</div>
            <div style={{ fontSize: "12px", color: palette.muted }}>— Maria T., 47</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ borderTop: `1px solid ${palette.border}` }} />
      </div>

      {/* PAIN POINTS */}
      <div style={{ background: palette.card, padding: "80px 24px", borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "2.5px", color: palette.muted, textAlign: "center", marginBottom: "16px" }}>DOES THIS SOUND FAMILIAR?</p>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: "700", fontFamily: "'Georgia', serif", textAlign: "center", marginBottom: "48px", lineHeight: "1.3" }}>
            You go to bed tired, but wake up even more exhausted.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {[
              { icon: "☁️", text: "You wake up foggy and stiff no matter how long you slept" },
              { icon: "🌀", text: "You toss and turn for hours before your brain switches off" },
              { icon: "💊", text: "You've tried pills, apps, and gadgets — nothing sticks" },
              { icon: "😩", text: "You're exhausted all day but wide awake at midnight" },
              { icon: "🦴", text: "Neck and shoulder pain greet you every single morning" },
              { icon: "📉", text: "Your energy, mood, and focus are getting worse every year" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", padding: "18px", background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: "4px" }}>
                <span style={{ fontSize: "20px", minWidth: "28px" }}>{p.icon}</span>
                <span style={{ fontSize: "15px", color: palette.muted, lineHeight: "1.6" }}>{p.text}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "36px", fontSize: "17px", color: palette.text, fontFamily: "'Georgia', serif", lineHeight: "1.7" }}>
            You're not broken. Your body just needs the right signal. <strong>The video explains everything.</strong>
          </p>
          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <CTAButton onClick={goToOffer} style={{ fontSize: "16px", padding: "16px 36px" }}>
              Watch The Free Video →
            </CTAButton>
          </div>
        </div>
      </div>

      {/* WHAT YOU'LL DISCOVER */}
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <img src={PRODUCT_IMG} alt="Deep sleep supplement" style={{ width: "100%", borderRadius: "6px", objectFit: "cover", display: "block", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }} />
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "2.5px", color: palette.muted, marginBottom: "16px" }}>IN THE FREE VIDEO YOU'LL DISCOVER</p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: "700", fontFamily: "'Georgia', serif", marginBottom: "36px", lineHeight: "1.3" }}>
              Why sleeping more isn't fixing your exhaustion.
            </h2>
            {[
              { num: "01", title: "The Real Cause", desc: "Why hours in bed don't matter if your body isn't hitting the deep sleep stage — and what's blocking it." },
              { num: "02", title: "The Missing Nutrient", desc: "The 8 clinically-studied nutrients most adults over 35 are deficient in that directly control deep sleep quality." },
              { num: "03", title: "The Simple Fix", desc: "How thousands of people reversed years of bad sleep in under 7 days — without drugs, gadgets, or lifestyle overhauls." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: i < 2 ? "28px" : 0 }}>
                <div style={{ fontSize: "12px", fontWeight: "700", color: palette.accent, letterSpacing: "1px", minWidth: "24px", marginTop: "3px" }}>{item.num}</div>
                <div style={{ borderLeft: `1px solid ${palette.border}`, paddingLeft: "20px" }}>
                  <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "6px" }}>{item.title}</div>
                  <div style={{ color: palette.muted, fontSize: "15px", lineHeight: "1.6" }}>{item.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "40px" }}>
              <CTAButton onClick={goToOffer}>Watch Free Video Now →</CTAButton>
              <p style={{ marginTop: "12px", fontSize: "13px", color: palette.muted }}>No cost. No obligation. Just the truth about your sleep.</p>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: palette.card, padding: "80px 24px", borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}` }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "2.5px", color: palette.muted, textAlign: "center", marginBottom: "16px" }}>REAL STORIES</p>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: "700", fontFamily: "'Georgia', serif", textAlign: "center", marginBottom: "48px" }}>
            What people are saying
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[
              { name: "Maria T.", age: 47, stars: 5, text: "I was skeptical but after the first week I woke up without neck pain for the first time in years. Watching that video was the best thing I did." },
              { name: "James R.", age: 52, stars: 5, text: "I've spent hundreds on fancy pillows and sleep trackers. This free video gave me more real information than all of them combined." },
              { name: "Sandra K.", age: 39, stars: 5, text: "My husband and I both tried this. We're sleeping through the night now. I almost cried the first morning I woke up feeling genuinely rested." },
            ].map((t, i) => (
              <div key={i} style={{ background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: "4px", padding: "28px" }}>
                <div style={{ color: palette.warm, fontSize: "15px", marginBottom: "14px", letterSpacing: "2px" }}>{"★".repeat(t.stars)}</div>
                <p style={{ margin: "0 0 16px 0", color: palette.text, fontSize: "15px", lineHeight: "1.75", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ fontSize: "13px", color: palette.muted, fontWeight: "600" }}>— {t.name}, {t.age}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background: palette.cta, padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "2.5px", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>FREE VIDEO PRESENTATION</p>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: "700", fontFamily: "'Georgia', serif", color: "#fff", marginBottom: "16px", maxWidth: "600px", margin: "0 auto 16px" }}>
          One good night's sleep changes everything.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "16px", maxWidth: "480px", margin: "0 auto 36px", lineHeight: "1.7" }}>
          Enter your email and we'll send you straight to the free video. No credit card. No catch.
        </p>
        <EmailForm dark={true} />
      </div>

      {/* FOOTER */}
      <div style={{ background: "#111", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#444", margin: 0, maxWidth: "700px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.8" }}>
          © 2026 SleepWell Guide. All Rights Reserved. &nbsp;·&nbsp; Affiliate Disclosure: This page contains affiliate links. We may earn a commission if you purchase through our link, at no extra cost to you. &nbsp;·&nbsp; Results may vary. These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}
