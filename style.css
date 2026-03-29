/* ═══════════════════════════════════════════
   FINTRACK PRO — STYLESHEET
   Aesthetic: Refined dark-first finance UI
   Fonts: Syne (display) + DM Mono (numbers)
═══════════════════════════════════════════ */

:root {
  --bg: #0d0f14;
  --surface: #13161e;
  --surface2: #1a1e2a;
  --border: rgba(255,255,255,0.07);
  --text: #e8eaf0;
  --text-muted: #6b7080;
  --accent: #7c6dfa;
  --accent2: #f0a05a;
  --green: #3fd68f;
  --red: #f05a7c;
  --blue: #5ab4f0;
  --font-display: 'Syne', sans-serif;
  --font-mono: 'DM Mono', monospace;
  --radius: 16px;
  --radius-sm: 10px;
  --shadow: 0 4px 24px rgba(0,0,0,0.4);
}

[data-theme="light"] {
  --bg: #f0f2f8;
  --surface: #ffffff;
  --surface2: #f5f6fc;
  --border: rgba(0,0,0,0.08);
  --text: #1a1d28;
  --text-muted: #8a8fa8;
  --shadow: 0 4px 24px rgba(0,0,0,0.1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body { height: 100%; }

body {
  font-family: var(--font-display);
  background: var(--bg);
  color: var(--text);
  overflow: hidden;
  transition: background 0.3s, color 0.3s;
}

/* ── LAYOUT ── */
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* ── SIDEBAR ── */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 2rem 1.2rem;
  gap: 2.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.logo-icon {
  font-size: 1.6rem;
  color: var(--accent);
  line-height: 1;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
}

.nav-links { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }

.nav-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: background 0.2s, color 0.2s;
}

.nav-btn:hover { background: var(--surface2); color: var(--text); }
.nav-btn.active { background: var(--accent); color: #fff; }

.nav-icon { font-size: 1rem; opacity: 0.8; }

.sidebar-bottom { margin-top: auto; }

.theme-toggle {
  width: 42px; height: 42px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface2);
  color: var(--text);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.theme-toggle:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

/* ── MAIN ── */
.main {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 2.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.main::-webkit-scrollbar { width: 5px; }
.main::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

/* ── PAGE HEADER ── */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.page-label {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text);
}

.header-badge {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-weight: 500;
}

.badge-safe { background: rgba(63,214,143,0.12); color: var(--green); border: 1px solid rgba(63,214,143,0.25); }
.badge-warn { background: rgba(240,160,90,0.12); color: var(--accent2); border: 1px solid rgba(240,160,90,0.25); }
.badge-danger { background: rgba(240,90,124,0.12); color: var(--red); border: 1px solid rgba(240,90,124,0.25); }

/* ── STAT CARDS ── */
.stats-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.4rem 1.6rem;
  transition: transform 0.2s;
}

.stat-card:hover { transform: translateY(-2px); }

.stat-label {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--text);
}

.stat-expense .stat-value { color: var(--red); }
.stat-savings .stat-value { color: var(--green); }
.stat-balance .stat-value { color: var(--blue); }

.stat-bar {
  height: 3px;
  background: var(--surface2);
  border-radius: 10px;
  margin-top: 1rem;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: 10px;
  width: 0%;
  transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
}

.expense-fill { background: linear-gradient(90deg, var(--red), var(--accent2)); }

/* ── CHARTS ROW ── */
.charts-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.chart-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.6rem;
}

.chart-title {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1.2rem;
  font-weight: 600;
}

/* ── PIE CHART ── */
.pie-container {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 1rem;
}

.pie-center-label {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.pie-center-label span:first-child {
  display: block;
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
}

.pie-center-sub {
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

/* ── CUSTOM LEGEND ── */
.custom-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 140px;
  overflow-y: auto;
  scrollbar-width: none;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
}

.legend-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-name { color: var(--text-muted); flex: 1; }
.legend-val { font-family: var(--font-mono); color: var(--text); font-size: 0.75rem; }

/* ── FULL WIDTH CHART ── */
.full-width-chart canvas { max-height: 280px; }

/* ── ADD CARD ── */
.add-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.6rem;
  margin-bottom: 1.5rem;
}

.add-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: flex-end;
}

.input-group { display: flex; flex-direction: column; gap: 0.4rem; }

.input-group label {
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.input-group input,
.input-group select {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font-display);
  font-size: 0.9rem;
  padding: 0.65rem 0.9rem;
  outline: none;
  transition: border 0.2s;
  width: 100%;
}

.input-group input:focus,
.input-group select:focus {
  border-color: var(--accent);
}

.input-group select option { background: var(--surface); }

.add-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.65rem 1.4rem;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s, transform 0.15s;
}

.add-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.add-btn:active { transform: translateY(0); }

/* ── EXPENSE LIST ── */
.list-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.6rem;
  margin-bottom: 1.5rem;
}

.list-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: var(--surface2);
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover { color: var(--text); border-color: var(--accent); }
.filter-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

.expense-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }

.expense-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: var(--surface2);
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  transition: border-color 0.2s, transform 0.15s;
  animation: slideIn 0.3s ease;
}

.expense-item:hover { border-color: var(--border); transform: translateX(3px); }

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.expense-cat-badge {
  width: 36px; height: 36px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.expense-info { flex: 1; }

.expense-desc {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
}

.expense-meta {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}

.expense-amount {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--red);
}

.expense-delete {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.2rem;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.expense-delete:hover { color: var(--red); background: rgba(240,90,124,0.1); }

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.section.hidden { display: none !important; }

/* ── BUDGET SECTION ── */
.budget-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  max-width: 580px;
}

.budget-display { margin-bottom: 1.5rem; }

.budget-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.3rem;
}

.budget-amount {
  font-family: var(--font-mono);
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: -0.04em;
  color: var(--text);
}

.budget-progress-wrap { margin-bottom: 1.8rem; }

.budget-progress-bar {
  height: 6px;
  background: var(--surface2);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.budget-progress-fill {
  height: 100%;
  border-radius: 10px;
  width: 0%;
  transition: width 0.8s cubic-bezier(0.4,0,0.2,1), background 0.3s;
  background: var(--green);
}

.budget-progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
}

.budget-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-end;
}

.budget-form .add-btn { grid-column: span 2; }

.savings-breakdown {
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.8;
}

/* ── TOAST ── */
.toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.8rem 1.4rem;
  font-size: 0.85rem;
  color: var(--text);
  box-shadow: var(--shadow);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  pointer-events: none;
  z-index: 100;
}

.toast.show { transform: translateY(0); opacity: 1; }

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
  .stat-expense { grid-column: span 2; }
  .charts-row { grid-template-columns: 1fr; }
  .add-form { grid-template-columns: 1fr 1fr; }
  .add-btn { grid-column: span 2; }
}

@media (max-width: 640px) {
  body { overflow: auto; }
  .app-shell { flex-direction: column; height: auto; }
  .sidebar { width: 100%; flex-direction: row; padding: 1rem; gap: 1rem; }
  .nav-links { flex-direction: row; flex: 1; }
  .main { padding: 1.2rem; }
  .stats-row { grid-template-columns: 1fr; }
  .stat-expense { grid-column: auto; }
  .budget-form { grid-template-columns: 1fr; }
  .budget-form .add-btn { grid-column: auto; }
}
