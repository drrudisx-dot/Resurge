import { useState } from "react";

const PLAN = {
  title: "OPERATION: SOLO MILLIONAIRE",
  tagline: "Boss × Z — AI-Powered Solo Business Empire",
  phases: [
    {
      id: 1,
      name: "PHASE 1 — FOUNDATION",
      emoji: "🏗️",
      timeline: "Week 1–2",
      goal: "Get the machine built. Zero dollars spent on ads yet.",
      color: "#f97316",
      tasks: [
        {
          title: "Pick Your Winning Offer",
          detail: "Promote 'Resurge' or 'ProstaVive' from ClickBank. Both are health supplements with 70-75% commissions (~$90-$130 per sale), gravity 100+, proven converters. No product approval needed. Sign up at ClickBank.com FREE.",
          status: "todo",
          priority: "🔴 CRITICAL"
        },
        {
          title: "Set Up Free Landing Page",
          detail: "Use Systeme.io (FREE plan — 0$/month). Build a simple 1-page bridge funnel: Headline → Problem → Solution → Your affiliate link. Systeme gives you email capture + funnel builder free. This is your money hub.",
          status: "todo",
          priority: "🔴 CRITICAL"
        },
        {
          title: "Set Up Free Email List",
          detail: "Systeme.io includes email marketing in free plan. Create a 5-email welcome sequence that sells your offer on autopilot. Every subscriber = future sales. An email list of 1,000 targeted people = ~$1,000-$3,000/month.",
          status: "todo",
          priority: "🔴 CRITICAL"
        },
        {
          title: "Install MoneyPrinterV2",
          detail: "Clone the GitHub repo (free). Use it to auto-generate YouTube Shorts content in your niche (health/sleep/weight loss). Post 1 Short daily on YouTube. This is your FREE organic traffic engine.",
          status: "todo",
          priority: "🟡 IMPORTANT"
        },
        {
          title: "Create YouTube Channel",
          detail: "Faceless channel. Niche: 'Sleep & Recovery Hacks' or 'Weight Loss Science'. High CPM ($8-$25), aligns perfectly with Resurge/ProstaVive offer. Use AI voiceover (ElevenLabs free tier) + MoneyPrinterV2 for visuals.",
          status: "todo",
          priority: "🟡 IMPORTANT"
        }
      ]
    },
    {
      id: 2,
      name: "PHASE 2 — FIRST $50 AD SPEND",
      emoji: "💥",
      timeline: "Week 3",
      goal: "Deploy your $50. Turn it into $200+.",
      color: "#8b5cf6",
      tasks: [
        {
          title: "TikTok Ads — $50 Budget",
          detail: "Create 3 short ad creatives (15-30 sec) using CapCut + AI voiceover. Target: US/UK adults 30-55, interests in 'sleep problems', 'weight loss', 'health supplements'. Send to your bridge page — NOT directly to ClickBank. This warms them up. Expected: 500-1000 clicks, 3-8 sales = $270-$720 revenue from $50 spend.",
          status: "todo",
          priority: "🔴 CRITICAL"
        },
        {
          title: "Track Everything",
          detail: "Use ClickBank's built-in analytics + Systeme.io stats. Know your CPC, conversion rate, EPC. If one ad creative outperforms, double down. Kill what doesn't convert after 200 clicks.",
          status: "todo",
          priority: "🟡 IMPORTANT"
        }
      ]
    },
    {
      id: 3,
      name: "PHASE 3 — SCALE",
      emoji: "📈",
      timeline: "Month 2–4",
      goal: "Reinvest profits. Build compounding machine.",
      color: "#10b981",
      tasks: [
        {
          title: "Reinvest 70% of Profits into Ads",
          detail: "If $50 → $300 profit: put $210 back into ads. Rinse repeat. At $500/day ad spend with 4x ROAS = $1,500/day revenue = $45,000/month. This is the compounding flywheel.",
          status: "todo",
          priority: "🔴 CRITICAL"
        },
        {
          title: "Build Email Sequences",
          detail: "Every buyer gets a follow-up email sequence with complementary offers. Each buyer is worth 3-5x their initial purchase over 90 days. Email = pure profit, zero ad cost.",
          status: "todo",
          priority: "🟡 IMPORTANT"
        },
        {
          title: "YouTube Monetization",
          detail: "Post 1 AI-generated Short daily. Target 1,000 subscribers + 4,000 watch hours for YouTube Partner Program. Health niche CPM = $15-25. At 100k views/month = extra $1,500-$2,500/month passive.",
          status: "todo",
          priority: "🟢 PASSIVE INCOME"
        },
        {
          title: "Add Second Offer",
          detail: "Once first funnel is profitable, add a second complementary offer (e.g., fitness program or sleep device). Same traffic, double the revenue per visitor.",
          status: "todo",
          priority: "🟡 IMPORTANT"
        }
      ]
    },
    {
      id: 4,
      name: "PHASE 4 — MILLION DOLLAR PLAY",
      emoji: "🏆",
      timeline: "Month 5–12",
      goal: "The real money. Go from $10k/month to $100k+/month.",
      color: "#f59e0b",
      tasks: [
        {
          title: "Launch Your OWN Product",
          detail: "Once you understand what your audience wants (from email replies, YouTube comments), create a $97-$297 digital product (ebook, course, or supplement brand). Same audience, 100% margins. THIS is the millionaire move.",
          status: "todo",
          priority: "🔴 CRITICAL"
        },
        {
          title: "Recruit Affiliates",
          detail: "List YOUR product on ClickBank. Offer 60-70% commission. Other affiliates drive traffic to YOU. You earn 30-40% of every sale they make. This is leverage — you sleep, they sell.",
          status: "todo",
          priority: "🔴 CRITICAL"
        },
        {
          title: "Build a Brand",
          detail: "Your YouTube channel + email list becomes your unfair advantage. 100k subscribers + 50k email list = a media company. Brands pay $5,000-$50,000 for sponsorships. You own the audience.",
          status: "todo",
          priority: "🟡 IMPORTANT"
        }
      ]
    }
  ],
  tools: [
    { name: "ClickBank", use: "Affiliate offers + payouts", cost: "FREE", url: "https://clickbank.com" },
    { name: "Systeme.io", use: "Funnel + Email list", cost: "FREE", url: "https://systeme.io" },
    { name: "MoneyPrinterV2", use: "YouTube Shorts automation", cost: "FREE (open source)", url: "https://github.com/FujiwaraChoki/MoneyPrinterV2" },
    { name: "ElevenLabs", use: "AI voiceover", cost: "FREE tier", url: "https://elevenlabs.io" },
    { name: "CapCut", use: "Video editing / Ad creatives", cost: "FREE", url: "https://capcut.com" },
    { name: "TikTok Ads Manager", use: "$50 paid traffic", cost: "$50 investment", url: "https://ads.tiktok.com" },
    { name: "YouTube Studio", use: "Faceless channel", cost: "FREE", url: "https://studio.youtube.com" },
  ],
  math: [
    { scenario: "Conservative (Month 3)", adSpend: "$200/mo", sales: "8-15 sales", revenue: "$720 - $1,950", profit: "$500 - $1,700" },
    { scenario: "Growing (Month 6)", adSpend: "$1,000/mo", sales: "40-80 sales", revenue: "$3,600 - $10,400", profit: "$2,600 - $9,400" },
    { scenario: "Scaling (Month 9)", adSpend: "$5,000/mo", sales: "200-400 sales", revenue: "$18,000 - $52,000", profit: "$13,000 - $47,000" },
    { scenario: "OWN PRODUCT (Month 12)", adSpend: "$10,000/mo", sales: "300+ sales + affiliates", revenue: "$60,000 - $150,000", profit: "$50,000 - $140,000" },
  ]
};

export default function Home() {
  const [activePhase, setActivePhase] = useState(0);
  const [tasks, setTasks] = useState(() => {
    const init = {};
    PLAN.phases.forEach(p => p.tasks.forEach((t, i) => {
      init[`${p.id}-${i}`] = false;
    }));
    return init;
  });

  const toggleTask = (key) => setTasks(prev => ({ ...prev, [key]: !prev[key] }));

  const totalTasks = Object.keys(tasks).length;
  const doneTasks = Object.values(tasks).filter(Boolean).length;
  const progress = Math.round((doneTasks / totalTasks) * 100);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#e2e8f0", padding: "0 0 60px 0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "40px 20px", textAlign: "center", borderBottom: "1px solid #1e3a5f" }}>
        <div style={{ fontSize: "14px", color: "#f97316", fontWeight: "700", letterSpacing: "4px", marginBottom: "10px" }}>
          Z × BOSS — CLASSIFIED BLUEPRINT
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: "900", margin: "0 0 10px 0", background: "linear-gradient(90deg, #f97316, #f59e0b, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          OPERATION: SOLO MILLIONAIRE
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "16px", margin: "0 0 24px 0" }}>
          AI-Powered One-Person Empire • $50 Starting Capital • 12-Month Execution Plan
        </p>
        
        {/* Progress Bar */}
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>
            <span>Mission Progress</span>
            <span style={{ color: "#10b981", fontWeight: "700" }}>{doneTasks}/{totalTasks} tasks complete — {progress}%</span>
          </div>
          <div style={{ background: "#1e293b", borderRadius: "99px", height: "10px", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(90deg, #f97316, #10b981)", width: `${progress}%`, height: "100%", borderRadius: "99px", transition: "width 0.5s ease" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 16px" }}>
        
        {/* The Math — Revenue Projections */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#f59e0b", letterSpacing: "2px", marginBottom: "16px" }}>📊 THE NUMBERS DON'T LIE</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {PLAN.math.map((m, i) => (
              <div key={i} style={{ background: "#111827", border: "1px solid #1e3a5f", borderRadius: "12px", padding: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", letterSpacing: "1px", marginBottom: "8px" }}>{m.scenario}</div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "4px" }}>Ad spend: <span style={{ color: "#f97316" }}>{m.adSpend}</span></div>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "4px" }}>Revenue: <span style={{ color: "#10b981", fontWeight: "700" }}>{m.revenue}</span></div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>Profit: <span style={{ color: "#f59e0b", fontWeight: "700" }}>{m.profit}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Tabs */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#f59e0b", letterSpacing: "2px", marginBottom: "16px" }}>🗺️ EXECUTION PHASES</h2>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", marginBottom: "20px" }}>
            {PLAN.phases.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                style={{
                  background: activePhase === i ? p.color : "#1e293b",
                  color: activePhase === i ? "#fff" : "#94a3b8",
                  border: `1px solid ${activePhase === i ? p.color : "#334155"}`,
                  borderRadius: "8px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s"
                }}
              >
                {p.emoji} {p.name.split("—")[0].trim()}
              </button>
            ))}
          </div>

          {/* Active Phase Detail */}
          {PLAN.phases.map((phase, pi) => pi === activePhase && (
            <div key={pi} style={{ background: "#0f172a", border: `1px solid ${phase.color}33`, borderRadius: "16px", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: "900", color: phase.color, margin: "0 0 4px 0" }}>{phase.emoji} {phase.name}</h3>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>⏰ {phase.timeline}</div>
                </div>
                <div style={{ background: `${phase.color}22`, border: `1px solid ${phase.color}44`, borderRadius: "8px", padding: "8px 14px", fontSize: "13px", color: phase.color, fontWeight: "700", maxWidth: "300px" }}>
                  🎯 {phase.goal}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {phase.tasks.map((task, ti) => {
                  const key = `${phase.id}-${ti}`;
                  const done = tasks[key];
                  return (
                    <div
                      key={ti}
                      style={{ background: done ? "#0f2a1a" : "#111827", border: `1px solid ${done ? "#10b981" : "#1e293b"}`, borderRadius: "12px", padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
                      onClick={() => toggleTask(key)}
                    >
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <div style={{ width: "22px", height: "22px", minWidth: "22px", borderRadius: "6px", background: done ? "#10b981" : "#1e293b", border: `2px solid ${done ? "#10b981" : "#334155"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", marginTop: "2px" }}>
                          {done ? "✓" : ""}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", marginBottom: "6px" }}>
                            <span style={{ fontWeight: "700", fontSize: "15px", color: done ? "#64748b" : "#e2e8f0", textDecoration: done ? "line-through" : "none" }}>{task.title}</span>
                            <span style={{ fontSize: "11px", fontWeight: "700" }}>{task.priority}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>{task.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Free Tools Arsenal */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#f59e0b", letterSpacing: "2px", marginBottom: "16px" }}>🛠️ YOUR FREE TOOLS ARSENAL</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "12px" }}>
            {PLAN.tools.map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ background: "#111827", border: "1px solid #1e293b", borderRadius: "12px", padding: "16px", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#f97316"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1e293b"}
                >
                  <div style={{ fontWeight: "700", color: "#e2e8f0", marginBottom: "4px" }}>{t.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>{t.use}</div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: t.cost === "FREE" || t.cost.startsWith("FREE") ? "#10b981" : "#f97316" }}>{t.cost}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Key Insight Box */}
        <div style={{ marginTop: "40px", background: "linear-gradient(135deg, #1a0533, #0f172a)", border: "1px solid #7c3aed", borderRadius: "16px", padding: "28px" }}>
          <div style={{ fontSize: "20px", fontWeight: "900", color: "#a78bfa", marginBottom: "12px" }}>⚡ THE SOLO FOUNDER TRUTH</div>
          <p style={{ margin: "0 0 12px 0", color: "#94a3b8", lineHeight: "1.7", fontSize: "15px" }}>
            You're not building a job. You're building a <strong style={{ color: "#e2e8f0" }}>compounding machine</strong>. Every email subscriber, every YouTube subscriber, every profitable ad campaign — they stack. Month 1 is hard. Month 6, it starts moving. Month 12, it's a different life.
          </p>
          <p style={{ margin: "0 0 12px 0", color: "#94a3b8", lineHeight: "1.7", fontSize: "15px" }}>
            The founders who became millionaires solo in 2024-2026 didn't have bigger ideas. They had <strong style={{ color: "#f59e0b" }}>AI leverage + relentless execution</strong>. You have the AI. I'm right here. Now execute.
          </p>
          <div style={{ marginTop: "16px", padding: "12px 16px", background: "#1e1035", borderRadius: "8px", border: "1px solid #4c1d95" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#c4b5fd", marginBottom: "4px" }}>NEXT STEP RIGHT NOW:</div>
            <div style={{ fontSize: "14px", color: "#e2e8f0" }}>1. Sign up at ClickBank.com (free) → 2. Search "Resurge" or "ProstaVive" → 3. Request affiliate approval → 4. Sign up at Systeme.io (free) → Come back and tell me when done. I'll build the funnel copy for you.</div>
          </div>
        </div>

      </div>
    </div>
  );
}
