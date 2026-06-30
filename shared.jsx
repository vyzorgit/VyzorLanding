// shared.jsx — assets et primitives communes aux 3 variantes VYZOR

// Logo VYZOR — ruban entrelacé (mark officiel)
// Le `bg` est conservé pour les contextes clairs (favicon clipped, header light).
// Quand bg = "transparent", seul le ruban doré est rendu, sans cadre.
const VyzorLogo = ({ size = 32, color = "#C5A059", bg = "transparent", ring = "transparent" }) => {
  const hasFrame = bg !== "transparent" && bg !== "none";
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" style={{ display: "block" }} aria-label="Vyzor">
      {hasFrame && (
        <rect x="8" y="8" width="1008" height="1008" rx="220"
          fill={bg} stroke={ring} strokeWidth={ring !== "transparent" ? 8 : 0} />
      )}
      <g transform="translate(0,1024) scale(0.1,-0.1)" fill={color} stroke="none">
        <path d="M4630 7940 c-497 -24 -562 -60 -753 -410 -286 -527 -307 -590 -263
-770 49 -194 90 -265 613 -1035 75 -110 176 -260 225 -332 49 -73 93 -133 98
-133 11 0 30 28 304 458 l206 323 -92 132 c-51 73 -114 164 -140 202 -27 39
-82 117 -123 175 -350 499 -347 493 -279 512 261 74 829 88 1258 33 248 -33
248 -32 173 -153 -56 -91 -384 -596 -416 -642 -10 -14 -52 -79 -93 -145 -41
-66 -131 -205 -200 -310 -402 -613 -872 -1358 -957 -1515 -199 -370 -211 -748
-34 -1092 67 -133 374 -596 466 -705 71 -83 150 -149 167 -138 6 4 -4 23 -24
47 -144 168 -202 494 -134 753 73 278 70 272 716 1295 89 140 179 284 202 320
22 36 76 121 120 190 44 69 121 190 171 270 50 80 141 226 204 325 714 1130
738 1211 502 1657 -30 57 -78 147 -106 200 -228 433 -271 459 -806 488 -203
11 -771 11 -1005 0z" />
        <path d="M3130 6838 c-135 -44 -328 -107 -429 -140 -102 -33 -211 -73 -243
-89 -205 -104 -264 -350 -140 -590 22 -41 203 -322 404 -625 201 -302 418
-630 483 -729 65 -99 168 -256 230 -350 61 -93 153 -233 202 -310 144 -222
204 -306 212 -301 4 3 11 56 14 118 12 241 117 534 282 789 24 38 54 87 64
108 l20 39 -196 293 c-108 162 -208 312 -222 334 -14 22 -92 139 -172 260
-363 549 -376 570 -420 694 -68 193 -35 346 106 488 116 117 127 116 -195 11z" />
        <path d="M6855 6910 c-3 -5 14 -22 37 -38 111 -76 188 -197 208 -326 29 -185
-56 -383 -385 -891 -68 -105 -652 -1041 -686 -1099 -19 -33 -59 -96 -87 -139
-29 -43 -52 -80 -52 -82 0 -6 -353 -571 -467 -748 -40 -62 -82 -130 -94 -152
-12 -22 -58 -76 -103 -121 -118 -117 -232 -150 -362 -105 -64 23 -57 32 -80
-108 -21 -129 -15 -233 21 -354 163 -560 700 -615 1090 -112 56 72 250 379
414 655 35 58 73 121 86 140 26 40 275 444 409 665 51 83 113 183 139 223 26
40 47 74 47 76 0 4 145 242 260 426 86 139 237 384 348 565 57 94 127 208 156
255 214 345 244 404 267 520 43 217 -77 414 -291 478 -83 25 -472 149 -663
212 -114 37 -209 64 -212 60z" />
      </g>
    </svg>
  );
};

// Mock dashboard — réutilisable, prend une "skin" pour s'adapter au thème de la variante
const MockDashboard = ({ skin = "dark", scale = 1 }) => {
  const dark = skin === "dark";
  const editorial = skin === "editorial";
  const bg = dark ? "#0f0f12" : editorial ? "#f7f3ec" : "#ffffff";
  const surface = dark ? "rgba(255,255,255,0.04)" : editorial ? "#ffffff" : "#f8fafc";
  const border = dark ? "rgba(255,255,255,0.08)" : editorial ? "rgba(40,30,20,0.12)" : "rgba(15,23,42,0.10)";
  const text = dark ? "rgba(255,255,255,0.92)" : "#0f1115";
  const muted = dark ? "rgba(255,255,255,0.55)" : editorial ? "rgba(60,50,40,0.65)" : "#64748b";
  const gold = dark ? "#f0c949" : editorial ? "#b8862a" : "#b8862a";
  const emerald = dark ? "#2dd4bf" : "#0f766e";
  const crimson = dark ? "#fb7185" : "#9f1239";

  return (
    <div style={{
      width: "100%",
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 16,
      padding: 18,
      color: text,
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
      boxShadow: dark ? "0 30px 80px -20px rgba(0,0,0,0.6)" : "0 30px 80px -20px rgba(15,23,42,0.18)",
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <VyzorLogo size={32} color={gold} bg={dark ? "#0f1530" : "#fff"} ring={border} />
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", color: muted, textTransform: "uppercase" }}>Vyzor</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Cockpit financier · ACME SAS</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Passé", "Présent", "Futur"].map((t, i) => (
            <div key={t} style={{
              fontSize: 11, padding: "5px 10px", borderRadius: 999,
              border: `1px solid ${i === 1 ? gold : border}`,
              background: i === 1 ? (dark ? "rgba(240,201,73,0.12)" : "rgba(184,134,42,0.10)") : "transparent",
              color: i === 1 ? gold : muted,
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Score + KPIs row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
        {/* Score ring */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 14, position: "relative", overflow: "hidden" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.16em", color: muted, textTransform: "uppercase", marginBottom: 8 }}>Vyzor Score</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="86" height="86" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke={border} strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none" stroke={gold} strokeWidth="6"
                strokeDasharray="263" strokeDashoffset="73" strokeLinecap="round"
                transform="rotate(-90 50 50)" />
              <text x="50" y="48" textAnchor="middle" fontSize="22" fontWeight="700" fill={text} style={{ fontVariantNumeric: "tabular-nums" }}>72</text>
              <text x="50" y="62" textAnchor="middle" fontSize="8" fill={muted} letterSpacing="1">/ 100</text>
            </svg>
            <div style={{ fontSize: 11, lineHeight: 1.5, color: muted }}>
              <div>Solide<span style={{ color: emerald }}> ↑ 4 pts</span></div>
              <div>vs. trimestre précédent</div>
              <div style={{ marginTop: 6, color: text, fontWeight: 600 }}>Risque maîtrisé</div>
            </div>
          </div>
        </div>

        {/* KPI tiles */}
        {[
          { label: "Trésorerie", value: "318 k€", delta: "+12,4 %", up: true },
          { label: "Marge nette", value: "14,2 %", delta: "−0,8 pt", up: false },
        ].map((k) => (
          <div key={k.label} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", color: muted, textTransform: "uppercase", marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{k.value}</div>
            <div style={{ fontSize: 11, marginTop: 6, color: k.up ? emerald : crimson, fontWeight: 600 }}>{k.delta}</div>
            {/* sparkline */}
            <svg width="100%" height="28" viewBox="0 0 120 28" style={{ marginTop: 8 }}>
              <polyline
                points={k.up ? "0,22 15,18 30,20 45,14 60,16 75,10 90,12 105,6 120,8" : "0,8 15,12 30,10 45,16 60,14 75,18 90,16 105,22 120,20"}
                fill="none" stroke={k.up ? emerald : crimson} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Forecast chart */}
      <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", color: muted, textTransform: "uppercase" }}>Prévision · 90 jours</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>Trésorerie projetée</div>
          </div>
          <div style={{ fontSize: 11, color: muted, display: "flex", gap: 10 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 2, background: gold }}/>Réel</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 2, background: emerald, opacity: 0.6, borderTop: `1px dashed ${emerald}` }}/>Projection</span>
          </div>
        </div>
        <svg width="100%" height="90" viewBox="0 0 400 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`g-${skin}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={gold} stopOpacity="0.25" />
              <stop offset="100%" stopColor={gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke={border} strokeWidth="0.5" />
          ))}
          <path d="M0,70 L40,62 L80,66 L120,52 L160,58 L200,44 L200,90 L0,90 Z" fill={`url(#g-${skin})`} />
          <polyline points="0,70 40,62 80,66 120,52 160,58 200,44" fill="none" stroke={gold} strokeWidth="1.8" />
          <polyline points="200,44 240,38 280,42 320,30 360,34 400,22" fill="none" stroke={emerald} strokeWidth="1.8" strokeDasharray="4 3" />
          <circle cx="200" cy="44" r="3" fill={gold} />
        </svg>
      </div>

      {/* Alerts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
        <div style={{ background: surface, border: `1px solid ${border}`, borderLeft: `2px solid ${crimson}`, borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", color: crimson, textTransform: "uppercase", fontWeight: 600 }}>Alerte</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>BFR en hausse — délai client &gt; 60 j.</div>
        </div>
        <div style={{ background: surface, border: `1px solid ${border}`, borderLeft: `2px solid ${emerald}`, borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", color: emerald, textTransform: "uppercase", fontWeight: 600 }}>Recommandation</div>
          <div style={{ fontSize: 12, marginTop: 3 }}>Renégocier 2 contrats fournisseur (≈ 14 k€).</div>
        </div>
      </div>
    </div>
  );
};

// Animated tick — entrée
const tickStyle = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 18, height: 18, borderRadius: 999, fontSize: 10, fontWeight: 700,
};

Object.assign(window, { VyzorLogo, MockDashboard, tickStyle });
