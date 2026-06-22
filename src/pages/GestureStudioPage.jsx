import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

// ─── Image sources ────────────────────────────────────────────────────────────
// Pexels is called through our own /api/pexels serverless function (see /api/pexels.js)
// instead of directly from the browser. This keeps the API key server-side and avoids
// the cross-origin issues a direct browser→Pexels call runs into. Adding a new source
// later (e.g. Supabase) only requires a new entry in SOURCES.
const SOURCES = {
  pexels: {
    label: "Pexels",
    async fetch(queries) {
      const all = [];
      for (const q of queries.slice(0, 2)) {
        const r = await fetch(`/api/pexels?query=${encodeURIComponent(q)}&orientation=portrait&per_page=40`);
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || `Henting feilet (${r.status})`);
        all.push(...(d.photos || []));
      }
      return all;
    },
  },
  gallery: {
    label: "Mitt galleri",
    async fetch() {
      const { data, error } = await supabase.storage
        .from("sketches")
        .list("gesture-gallery", { sortBy: { column: "name", order: "asc" } });
      if (error) throw new Error("Kunne ikke hente galleri: " + error.message);
      return (data || [])
        .filter(f => f.name && !f.name.startsWith("."))
        .map(f => {
          const { data: urlData } = supabase.storage
            .from("sketches")
            .getPublicUrl(`gesture-gallery/${f.name}`);
          return { id: f.name, url: urlData.publicUrl, credit: null, creditUrl: null };
        });
    },
  },
};

// ─── Config ───────────────────────────────────────────────────────────────────
const CATS = [
  { id: "figure", label: "Helfigur",  q: ["yoga pose full body", "dance pose", "gymnastics", "fitness workout pose"] },
  { id: "hands",  label: "Hender",    q: ["hand gesture close up", "hands detail photography"] },
  { id: "face",   label: "Ansikt",    q: ["portrait face expression natural", "face close up light"] },
  { id: "animal", label: "Dyr",       q: ["wild animal nature", "animal wildlife close up"] },
];

const TIMERS = [
  { l: "30 sek", v: 30 }, { l: "1 min", v: 60 },
  { l: "2 min",  v: 120 }, { l: "5 min", v: 300 }, { l: "Fri", v: null },
];

const SESSIONS = [
  { l: "10 min",    type: "time",  v: 600  },
  { l: "20 min",    type: "time",  v: 1200 },
  { l: "30 min",    type: "time",  v: 1800 },
  { l: "15 bilder", type: "count", v: 15   },
  { l: "30 bilder", type: "count", v: 30   },
  { l: "Fri",       type: "free",  v: null },
];

// ─── Utilities ────────────────────────────────────────────────────────────────
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = 0 | Math.random() * (i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fmt = s => `${String(0 | s / 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  paper:   "#f4efe5",
  ink:     "#1c1008",
  warm:    "#2c1810",
  muted:   "#8a7060",
  accent:  "#c85000",
  accentL: "#e07030",
  card:    "#ffffff",
  border:  "#e8ddd0",
  dark:    "#0c0a08",
  darkMid: "#141008",
  darkBar: "#100d08",
};

// ─── Components ───────────────────────────────────────────────────────────────
function Ring({ left, total, size = 68 }) {
  const r = (size - 10) / 2, c = 2 * Math.PI * r;
  const pct = total ? Math.max(0, left / total) : 1;
  const col = pct > 0.5 ? T.accentL : pct > 0.25 ? "#d09010" : "#cc2010";
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#221a10" strokeWidth="6"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth="6"
          strokeDasharray={`${c * pct} ${c}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.4s" }}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "#e0e0e0",
        fontVariantNumeric: "tabular-nums" }}>
        {total === null ? "∞" : left > 99 ? fmt(left) : left}
      </div>
    </div>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 18px", borderRadius: 99, border: "none",
      cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600,
      background: active ? T.accent : T.border, color: active ? "#fff" : T.warm,
      boxShadow: active ? `0 2px 10px rgba(200,80,0,.3)` : "none",
      transition: "all .15s", whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
}

function DarkBtn({ onClick, title, children, active, danger, large }) {
  const [hov, setHov] = useState(false);
  const bg = danger ? (hov ? "rgba(200,60,40,.25)" : "rgba(200,60,40,.12)")
    : active ? "rgba(255,255,255,.22)" : hov ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.07)";
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: bg, border: "none", borderRadius: 12, cursor: "pointer",
        padding: large ? "10px 20px" : "10px 14px", fontSize: large ? 26 : 18,
        color: danger ? "#e07060" : active ? "#fff" : "#c0b0a0",
        fontFamily: "inherit", transition: "all .15s", lineHeight: 1 }}>
      {children}
    </button>
  );
}

function Card({ children }) {
  return (
    <div style={{ background: T.card, borderRadius: 16, padding: "20px", marginBottom: 14,
      border: `1px solid ${T.border}`, boxShadow: "0 1px 8px rgba(0,0,0,.05)" }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: 1.4,
      color: T.muted, marginBottom: 12 }}>
      {children}
    </div>
  );
}

// ─── Setup Screen ─────────────────────────────────────────────────────────────
function SetupScreen({ onStart, loading, err }) {
  const [source, setSource] = useState("pexels");
  const [cat, setCat] = useState("figure");
  const [timer, setTimer] = useState(60);
  const [sess, setSess] = useState(SESSIONS[1]);

  return (
    <div style={{ minHeight: "100vh", background: T.paper, display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px 20px", fontFamily: "var(--font-body)",
      color: T.warm }}>
      <div style={{ maxWidth: 500, width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 3, color: T.muted, marginBottom: 8 }}>
            SKETCH ATTITUDE
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 34, color: T.ink, letterSpacing: 0.5 }}>
            Gesture Studio
          </div>
          <div style={{ fontSize: 14, color: T.muted, marginTop: 6 }}>
            Tegn fra levende referanser · tidsbasert økt
          </div>
        </div>

        {/* Source */}
        <Card>
          <SectionLabel>KILDE</SectionLabel>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Pill active={source === "pexels"} onClick={() => setSource("pexels")}>Pexels</Pill>
            <Pill active={source === "gallery"} onClick={() => setSource("gallery")}>Mitt galleri</Pill>
          </div>
        </Card>

        {/* Category — only relevant for Pexels, since the gallery has no tags */}
        {source === "pexels" && (
          <Card>
            <SectionLabel>KATEGORI</SectionLabel>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CATS.map(c => (
                <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</Pill>
              ))}
            </div>
          </Card>
        )}

        {/* Timer */}
        <Card>
          <SectionLabel>TID PER BILDE</SectionLabel>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TIMERS.map(t => (
              <Pill key={t.l} active={timer === t.v} onClick={() => setTimer(t.v)}>{t.l}</Pill>
            ))}
          </div>
        </Card>

        {/* Session length */}
        <Card>
          <SectionLabel>ØKTLENGDE</SectionLabel>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SESSIONS.map(s => (
              <Pill key={s.l} active={sess.l === s.l} onClick={() => setSess(s)}>{s.l}</Pill>
            ))}
          </div>
        </Card>

        {/* Error */}
        {err && (
          <div style={{ background: "#fce8e0", border: `1px solid #e0a090`, borderRadius: 10,
            padding: "10px 14px", fontSize: 13, color: "#a02010", marginBottom: 14 }}>
            ⚠️ {err}
          </div>
        )}

        {/* Start */}
        <button onClick={() => onStart(source, cat, timer, sess)} disabled={loading}
          style={{ width: "100%", padding: "16px", borderRadius: 16, border: "none",
            background: loading ? "#c8a080" : T.accent, color: "#fff", fontSize: 16,
            fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit", boxShadow: `0 4px 18px rgba(200,80,0,.35)`,
            transition: "all .2s", letterSpacing: 0.3 }}>
          {loading ? "Henter bilder…" : "Start økt →"}
        </button>
      </div>
    </div>
  );
}

// ─── Session Screen ───────────────────────────────────────────────────────────
function SessionScreen({ images, idx, playing, setPlaying, timeLeft, timer,
  sessElapsed, drawn, session, catLabel, flipped, setFlipped, gray, setGray,
  onNext, onPrev, onEnd }) {

  const photo = images[idx];
  if (!photo) return null;

  const sessionPct =
    session.type === "time"  && session.v ? Math.min(1, sessElapsed / session.v) :
    session.type === "count" && session.v ? Math.min(1, drawn / session.v) : 0;

  const sessionLabel =
    session.type === "count" && session.v ? `${drawn + 1} / ${session.v}` :
    `${drawn + 1}`;

  return (
    <div style={{ height: "100vh", background: T.dark, display: "flex",
      flexDirection: "column", fontFamily: "var(--font-body)",
      overflow: "hidden", userSelect: "none" }}>

      {/* Session progress bar */}
      <div style={{ height: 3, background: "#1c1408", flexShrink: 0 }}>
        <div style={{ height: "100%", width: `${sessionPct * 100}%`,
          background: T.accent, transition: "width 1s linear" }}/>
      </div>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "8px 20px", flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#6a5a48", letterSpacing: 0.5 }}>
          {catLabel.toUpperCase()}
        </span>
        <span style={{ fontSize: 13, color: "#6a5a48", fontVariantNumeric: "tabular-nums" }}>
          {sessionLabel}
          <span style={{ marginLeft: 10, color: "#4a3a28" }}>{fmt(sessElapsed)}</span>
        </span>
      </div>

      {/* Image area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "8px 24px", overflow: "hidden",
        position: "relative" }}>
        <img
          key={photo.id}
          src={photo.url}
          alt="Pose reference"
          style={{
            maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
            transform: flipped ? "scaleX(-1)" : "scaleX(1)",
            filter: gray ? "grayscale(100%)" : "none",
            transition: "filter .3s, transform .2s",
            display: "block", borderRadius: 4,
          }}
          onError={onNext}
        />
        {/* Credit */}
        {photo.credit && (
          <div style={{ position: "absolute", bottom: 12, right: 28,
            fontSize: 10, color: "rgba(255,255,255,.18)", letterSpacing: 0.3 }}>
            📷 {photo.credit}
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ background: T.darkBar, borderTop: "1px solid #1c1408",
        padding: "12px 20px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>

        {/* Left tools */}
        <DarkBtn onClick={() => setGray(g => !g)} title="Gråtoner" active={gray}>◑</DarkBtn>
        <DarkBtn onClick={() => setFlipped(f => !f)} title="Speilvend" active={flipped}>↔</DarkBtn>

        {/* Spacer */}
        <div style={{ flex: 1 }}/>

        {/* Navigation + timer */}
        <DarkBtn onClick={onPrev} title="Forrige  ←" large>‹</DarkBtn>

        <div onClick={() => setPlaying(p => !p)}
          style={{ cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4 }}>
          <Ring left={timeLeft} total={timer} size={68}/>
          <span style={{ fontSize: 10, letterSpacing: 0.8,
            color: playing ? T.accentL : "#554438" }}>
            {playing ? "▶ KJØRER" : "⏸ PAUSE"}
          </span>
        </div>

        <DarkBtn onClick={onNext} title="Neste  →" large>›</DarkBtn>

        {/* Spacer */}
        <div style={{ flex: 1 }}/>

        {/* End */}
        <DarkBtn onClick={onEnd} title="Avslutt økt" danger>✕</DarkBtn>
      </div>
    </div>
  );
}

// ─── Done Screen ──────────────────────────────────────────────────────────────
function DoneScreen({ drawn, sessElapsed, onRestart }) {
  return (
    <div style={{ minHeight: "100vh", background: T.paper, display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "var(--font-body)",
      color: T.warm, padding: 32 }}>
      <div style={{ textAlign: "center", maxWidth: 360 }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>✏️</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: T.ink, marginBottom: 8 }}>
          Økt fullført
        </div>
        <div style={{ fontSize: 15, color: T.muted, marginBottom: 36 }}>
          Bra jobbet — konsistent praksis er nøkkelen.
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 36 }}>
          {[["bilder tegnet", drawn], ["tid brukt", fmt(sessElapsed)]].map(([lab, val]) => (
            <div key={lab} style={{ background: T.card, borderRadius: 16, padding: "20px 28px",
              border: `1px solid ${T.border}`, textAlign: "center", minWidth: 110 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, color: T.accent }}>{val}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 4, letterSpacing: 0.8 }}>
                {lab.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <button onClick={onRestart} style={{ padding: "14px 36px", borderRadius: 16,
          border: "none", background: T.accent, color: "#fff", fontSize: 15,
          fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          boxShadow: `0 4px 18px rgba(200,80,0,.35)` }}>
          Ny økt →
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
import { useUIChrome } from "../contexts/UIChromeContext";

export default function GestureApp() {
  const { setImmersive } = useUIChrome();
  const [screen, setScreen]   = useState("setup");
  const [loadErr, setLoadErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages]   = useState([]);
  const [idx, setIdx]         = useState(0);
  const [playing, setPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [sessElapsed, setSessElapsed] = useState(0);
  const [drawn, setDrawn]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [gray, setGray]       = useState(false);

  // Session config kept in a ref so timer callbacks always see latest values
  const cfg = useRef({ timer: 60, session: SESSIONS[1], catLabel: "Helfigur" });

  // Current state snapshot for timer callbacks
  const snap = useRef({});
  snap.current = { idx, images, timer: cfg.current.timer, session: cfg.current.session, drawn, screen };

  // ── Image timer ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "session" || !playing || cfg.current.timer === null) return;
    const tick = setInterval(() => {
      setTimeLeft(tl => {
        if (tl > 1) return tl - 1;
        // Advance image
        const s = snap.current;
        const next = s.idx + 1;
        if (next >= s.images.length) { setScreen("done"); return s.timer; }
        setIdx(next);
        setDrawn(d => {
          const nd = d + 1;
          if (s.session.type === "count" && s.session.v && nd >= s.session.v) setScreen("done");
          return nd;
        });
        setFlipped(false);
        return s.timer;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [screen, playing]); // intentionally omit timer — handled via cfg ref

  // ── Session elapsed timer ────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "session") return;
    const tick = setInterval(() => {
      setSessElapsed(s => {
        const ns = s + 1;
        const se = snap.current.session;
        if (se.type === "time" && se.v && ns >= se.v) setScreen("done");
        return ns;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [screen]);

  // ── Hide bottom nav during the actual drawing session only ─────────────────
  useEffect(() => {
    setImmersive(screen === "session");
    return () => setImmersive(false);
  }, [screen, setImmersive]);

  // ── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== "session") return;
    const onKey = e => {
      if (e.code === "Space")      { e.preventDefault(); setPlaying(p => !p); }
      if (e.code === "ArrowRight") advance();
      if (e.code === "ArrowLeft")  retreat();
      if (e.code === "KeyF")       setFlipped(f => !f);
      if (e.code === "KeyG")       setGray(g => !g);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

  const advance = () => {
    const s = snap.current;
    const next = s.idx + 1;
    if (next >= s.images.length) { setScreen("done"); return; }
    setIdx(next); setDrawn(d => d + 1); setFlipped(false);
    setTimeLeft(cfg.current.timer ?? 0);
  };

  const retreat = () => {
    setIdx(i => Math.max(0, i - 1));
    setFlipped(false);
    setTimeLeft(cfg.current.timer ?? 0);
  };

  // ── Load images & start session ──────────────────────────────────────────────
  const startSession = async (sourceId, catId, timer, sess) => {
    setLoading(true); setLoadErr("");
    try {
      let photos, catLabel;
      if (sourceId === "gallery") {
        photos = await SOURCES.gallery.fetch();
        catLabel = "Mitt galleri";
        if (!photos.length) throw new Error("Ingen bilder funnet i galleriet ennå");
      } else {
        const cat = CATS.find(c => c.id === catId);
        photos = await SOURCES.pexels.fetch(cat.q);
        catLabel = cat.label;
        if (!photos.length) throw new Error("Ingen bilder funnet — prøv en annen kategori");
      }

      cfg.current = { timer, session: sess, catLabel };
      setImages(shuffle(photos));
      setIdx(0); setDrawn(0); setSessElapsed(0);
      setTimeLeft(timer ?? 0);
      setFlipped(false); setGray(false); setPlaying(true);
      setScreen("session");
    } catch (e) {
      setLoadErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const restart = () => { setScreen("setup"); setImages([]); setIdx(0); };

  // ── Render ───────────────────────────────────────────────────────────────────
  if (screen === "setup") return (
    <SetupScreen onStart={startSession} loading={loading} err={loadErr}/>
  );
  if (screen === "done") return (
    <DoneScreen drawn={drawn} sessElapsed={sessElapsed} onRestart={restart}/>
  );
  return (
    <SessionScreen
      images={images} idx={idx}
      playing={playing} setPlaying={setPlaying}
      timeLeft={timeLeft} timer={cfg.current.timer}
      sessElapsed={sessElapsed} drawn={drawn}
      session={cfg.current.session}
      catLabel={cfg.current.catLabel}
      flipped={flipped} setFlipped={setFlipped}
      gray={gray} setGray={setGray}
      onNext={advance} onPrev={retreat}
      onEnd={() => setScreen("done")}
    />
  );
}
