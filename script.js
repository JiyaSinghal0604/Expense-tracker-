/* ═══════════════════════════════════════════
   FINTRACK PRO — SCRIPT
═══════════════════════════════════════════ */

// ── STATE ──────────────────────────────────
let state = JSON.parse(localStorage.getItem('fintrack_v3')) || {
  expenses: [],
  limit: 0,
  income: 0,
  theme: 'dark'
};

const CATEGORY_META = {
  Food:          { emoji: '🍔', color: '#f05a7c' },
  Transport:     { emoji: '🚌', color: '#5ab4f0' },
  Shopping:      { emoji: '🛍', color: '#f0a05a' },
  Utilities:     { emoji: '💡', color: '#7c6dfa' },
  Health:        { emoji: '💊', color: '#3fd68f' },
  Entertainment: { emoji: '🎬', color: '#fa6db5' },
  Other:         { emoji: '📦', color: '#a0a8c0' },
};

// ── PERSIST ────────────────────────────────
function save() {
  localStorage.setItem('fintrack_v3', JSON.stringify(state));
}

// ── MONTH HELPERS ──────────────────────────
function currentMonthKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}

function currentMonthExpenses() {
  const key = currentMonthKey();
  return state.expenses.filter(e => e.month === key);
}

function totalFor(expenses) {
  return expenses.reduce((s, e) => s + e.amount, 0);
}

// ── SECTION NAV ────────────────────────────
function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById(id).classList.remove('hidden');
  if (btn) btn.classList.add('active');

  if (id === 'previous') renderHistory();
  if (id === 'limit') renderBudget();
}

// ── DARK MODE ──────────────────────────────
function toggleDarkMode() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  document.getElementById('themeIcon').textContent = next === 'dark' ? '☀' : '☾';
  state.theme = next;
  save();
  reRenderCharts();
}

// ── TOAST ──────────────────────────────────
function toast(msg, type = 'info') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.borderLeftColor = type === 'success' ? 'var(--green)' : type === 'warn' ? 'var(--accent2)' : 'var(--red)';
  el.style.borderLeftWidth = '3px';
  el.style.borderLeftStyle = 'solid';
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

// ── ADD EXPENSE ────────────────────────────
function addExpense() {
  const desc   = document.getElementById('expDesc').value.trim();
  const amount = parseFloat(document.getElementById('expAmount').value);
  const cat    = document.getElementById('expCategory').value;

  if (!desc)          return toast('Please enter a description.', 'error');
  if (!amount || amount <= 0) return toast('Please enter a valid amount.', 'error');

  const expense = {
    id: Date.now(),
    desc, amount, category: cat,
    month: currentMonthKey(),
    date: new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short' })
  };

  state.expenses.unshift(expense);
  save();

  document.getElementById('expDesc').value   = '';
  document.getElementById('expAmount').value = '';

  toast('Expense added!', 'success');
  renderDashboard();
}

// ── DELETE EXPENSE ─────────────────────────
function deleteExpense(id) {
  state.expenses = state.expenses.filter(e => e.id !== id);
  save();
  renderDashboard();
  toast('Removed.', 'warn');
}

// ── FILTER ─────────────────────────────────
let activeFilter = 'all';
function filterList(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderExpenseList();
}

// ── RENDER EXPENSE LIST ────────────────────
function renderExpenseList() {
  const list = document.getElementById('currentList');
  let expenses = currentMonthExpenses();
  if (activeFilter !== 'all') expenses = expenses.filter(e => e.category === activeFilter);

  if (!expenses.length) {
    list.innerHTML = `<li class="empty-state">No expenses yet — add one above ↑</li>`;
    return;
  }

  list.innerHTML = expenses.map(e => {
    const meta = CATEGORY_META[e.category] || CATEGORY_META.Other;
    return `
      <li class="expense-item">
        <div class="expense-cat-badge" style="background:${meta.color}22">
          ${meta.emoji}
        </div>
        <div class="expense-info">
          <div class="expense-desc">${e.desc}</div>
          <div class="expense-meta">${e.category} · ${e.date}</div>
        </div>
        <div class="expense-amount">-₹${e.amount.toLocaleString('en-IN')}</div>
        <button class="expense-delete" onclick="deleteExpense(${e.id})" title="Delete">✕</button>
      </li>`;
  }).join('');
}

// ── CHARTS STORE ───────────────────────────
const charts = {};

function destroyChart(key) {
  if (charts[key]) { charts[key].destroy(); delete charts[key]; }
}

function chartColors() {
  return Object.values(CATEGORY_META).map(m => m.color);
}

// ── PIE CHART ──────────────────────────────
function renderPieChart(expenses) {
  destroyChart('pie');
  const ctx = document.getElementById('currentPie').getContext('2d');
  const catMap = {};
  expenses.forEach(e => { catMap[e.category] = (catMap[e.category]||0) + e.amount; });
  const labels = Object.keys(catMap);
  const data   = Object.values(catMap);
  const colors = labels.map(l => (CATEGORY_META[l]||CATEGORY_META.Other).color);
  const total  = data.reduce((s,v)=>s+v,0);

  document.getElementById('pieCenterValue').textContent = '₹' + total.toLocaleString('en-IN');

  if (!labels.length) {
    document.getElementById('legendContainer').innerHTML = '';
    return;
  }

  charts['pie'] = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: getComputedStyle(document.documentElement).getPropertyValue('--surface').trim(), hoverOffset: 8 }] },
    options: {
      cutout: '72%',
      plugins: { legend: { display: false }, tooltip: {
        callbacks: { label: c => ` ₹${c.parsed.toLocaleString('en-IN')} (${Math.round(c.parsed/total*100)}%)` }
      }},
      animation: { animateRotate: true, duration: 700 }
    }
  });

  // Custom legend
  const leg = document.getElementById('legendContainer');
  leg.innerHTML = labels.map((l,i) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${colors[i]}"></div>
      <span class="legend-name">${l}</span>
      <span class="legend-val">₹${data[i].toLocaleString('en-IN')}</span>
    </div>`).join('');
}

// ── DAILY BAR CHART ────────────────────────
function renderDailyBar(expenses) {
  destroyChart('daily');
  const ctx = document.getElementById('dailyBar').getContext('2d');
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const dailyTotals = Array(daysInMonth).fill(0);

  expenses.forEach(e => {
    // Rough day extraction from date string or use today
    const idx = (new Date().getDate()) - 1;
    const stored = state.expenses.find(ex => ex.id === e.id);
    if (stored && stored.dayIndex !== undefined) {
      dailyTotals[stored.dayIndex] = (dailyTotals[stored.dayIndex]||0) + e.amount;
    } else {
      dailyTotals[idx] = (dailyTotals[idx]||0) + e.amount;
    }
  });

  const labels = Array.from({length: daysInMonth}, (_,i) => i+1);
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();
  const accent = '#7c6dfa';

  charts['daily'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: dailyTotals,
        backgroundColor: dailyTotals.map((v,i) => i === now.getDate()-1 ? accent : accent+'55'),
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      plugins: { legend: { display: false }, tooltip: {
        callbacks: { label: c => ` ₹${c.parsed.y.toLocaleString('en-IN')}` }
      }},
      scales: {
        x: { ticks: { color: textColor, font: { family: 'DM Mono', size: 10 } }, grid: { display: false } },
        y: { ticks: { color: textColor, font: { family: 'DM Mono', size: 10 },
              callback: v => '₹'+v.toLocaleString('en-IN') }, grid: { color: 'rgba(255,255,255,0.04)' } }
      },
      animation: { duration: 600 }
    }
  });
}

// ── HISTORY CHARTS ─────────────────────────
function renderHistory() {
  // Build last 6 months data
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth()-i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    const exps = state.expenses.filter(e => e.month === key);
    months.push({ key, label, total: totalFor(exps), exps });
  }

  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();

  // Line chart
  destroyChart('prev');
  const ctx1 = document.getElementById('previousChart').getContext('2d');
  const accent = '#7c6dfa';
  charts['prev'] = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: months.map(m => m.label),
      datasets: [{
        label: 'Total Spending',
        data: months.map(m => m.total),
        borderColor: accent,
        backgroundColor: accent + '22',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: accent,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    },
    options: {
      plugins: { legend: { display: false }, tooltip: {
        callbacks: { label: c => ` ₹${c.parsed.y.toLocaleString('en-IN')}` }
      }},
      scales: {
        x: { ticks: { color: textColor, font:{family:'DM Mono',size:11} }, grid: { color: 'rgba(255,255,255,0.04)' } },
        y: { ticks: { color: textColor, font:{family:'DM Mono',size:11}, callback: v=>'₹'+v.toLocaleString('en-IN') }, grid: { color: 'rgba(255,255,255,0.04)' } }
      },
      animation: { duration: 700 }
    }
  });

  // Stacked bar by category
  destroyChart('trend');
  const ctx2 = document.getElementById('categoryTrendChart').getContext('2d');
  const categories = Object.keys(CATEGORY_META);
  const datasets = categories.map(cat => ({
    label: cat,
    data: months.map(m => totalFor(m.exps.filter(e => e.category === cat))),
    backgroundColor: (CATEGORY_META[cat]||CATEGORY_META.Other).color + 'cc',
    borderRadius: 4,
    borderSkipped: false,
  }));

  charts['trend'] = new Chart(ctx2, {
    type: 'bar',
    data: { labels: months.map(m => m.label), datasets },
    options: {
      plugins: { legend: {
        position: 'bottom',
        labels: { color: textColor, font:{family:'Syne',size:11}, padding: 16, usePointStyle: true }
      }, tooltip: {
        callbacks: { label: c => ` ${c.dataset.label}: ₹${c.parsed.y.toLocaleString('en-IN')}` }
      }},
      scales: {
        x: { stacked: true, ticks:{color:textColor,font:{family:'DM Mono',size:11}}, grid:{display:false} },
        y: { stacked: true, ticks:{color:textColor,font:{family:'DM Mono',size:11},callback:v=>'₹'+v.toLocaleString('en-IN')}, grid:{color:'rgba(255,255,255,0.04)'} }
      },
      animation: { duration: 700 }
    }
  });
}

// ── BUDGET SECTION ─────────────────────────
function renderBudget() {
  const spent = totalFor(currentMonthExpenses());
  const limit = state.limit;
  const income = state.income;

  document.getElementById('currentLimit').textContent = limit.toLocaleString('en-IN');
  document.getElementById('limitInput').value = limit || '';
  document.getElementById('incomeInput').value = income || '';
  document.getElementById('budgetSpent').textContent = `Spent: ₹${spent.toLocaleString('en-IN')}`;

  if (limit > 0) {
    const pct = Math.min(100, Math.round(spent / limit * 100));
    document.getElementById('budgetProgressFill').style.width = pct + '%';
    document.getElementById('budgetProgressFill').style.background =
      pct > 90 ? 'var(--red)' : pct > 70 ? 'var(--accent2)' : 'var(--green)';
    document.getElementById('budgetPct').textContent = pct + '%';
  }

  if (income > 0) {
    const savings = income - spent;
    const savPct = Math.round(savings / income * 100);
    document.getElementById('savingsBreakdown').innerHTML = `
      <strong style="color:var(--text)">Income Breakdown</strong><br>
      Income: ₹${income.toLocaleString('en-IN')}<br>
      Spent: ₹${spent.toLocaleString('en-IN')}<br>
      Saved: <span style="color:var(--green)">₹${Math.max(0,savings).toLocaleString('en-IN')} (${Math.max(0,savPct)}%)</span>
    `;
  }
}

function setLimit() {
  const l = parseFloat(document.getElementById('limitInput').value) || 0;
  const i = parseFloat(document.getElementById('incomeInput').value) || 0;
  state.limit = l;
  state.income = i;
  save();
  renderBudget();
  renderDashboard();
  toast('Budget saved!', 'success');
}

// ── MAIN DASHBOARD ─────────────────────────
function renderDashboard() {
  const expenses = currentMonthExpenses();
  const spent  = totalFor(expenses);
  const limit  = state.limit;
  const income = state.income;
  const savings = income > 0 ? Math.max(0, income - spent) : 0;
  const left    = limit  > 0 ? Math.max(0, limit  - spent) : 0;

  // Cards
  document.getElementById('totalExpense').textContent = '₹' + spent.toLocaleString('en-IN');
  document.getElementById('totalSavings').textContent = '₹' + savings.toLocaleString('en-IN');
  document.getElementById('leftBalance').textContent  = '₹' + left.toLocaleString('en-IN');

  // Month label
  const now = new Date();
  document.getElementById('currentMonthLabel').textContent =
    now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  // Expense bar
  if (limit > 0) {
    const pct = Math.min(100, Math.round(spent/limit*100));
    document.getElementById('expenseBar').style.width = pct + '%';
  }

  // Limit badge
  const badge = document.getElementById('limitBadge');
  if (limit > 0) {
    const pct = Math.round(spent/limit*100);
    if (pct >= 100) {
      badge.textContent = '⚠ Over Budget'; badge.className = 'header-badge badge-danger';
    } else if (pct >= 75) {
      badge.textContent = `${pct}% used`; badge.className = 'header-badge badge-warn';
    } else {
      badge.textContent = `${pct}% of budget`; badge.className = 'header-badge badge-safe';
    }
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }

  renderPieChart(expenses);
  renderDailyBarFixed(expenses);
  renderExpenseList();
}

// Fixed daily bar that uses stored day index
function renderDailyBarFixed(expenses) {
  destroyChart('daily');
  const ctx = document.getElementById('dailyBar').getContext('2d');
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const dailyTotals = Array(daysInMonth).fill(0);

  expenses.forEach(e => {
    const day = (e.day || now.getDate()) - 1;
    if (day >= 0 && day < daysInMonth) dailyTotals[day] += e.amount;
  });

  const labels = Array.from({length: daysInMonth}, (_,i) => i+1);
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim();
  const accent = '#7c6dfa';

  charts['daily'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: dailyTotals,
        backgroundColor: dailyTotals.map((_,i) => i === now.getDate()-1 ? accent : accent+'55'),
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      plugins: { legend: { display: false }, tooltip: {
        callbacks: { label: c => ` ₹${c.parsed.y.toLocaleString('en-IN')}` }
      }},
      scales: {
        x: { ticks: { color: textColor, font:{family:'DM Mono',size:10} }, grid: { display: false } },
        y: { ticks: { color: textColor, font:{family:'DM Mono',size:10},
              callback: v=>'₹'+v.toLocaleString('en-IN') }, grid: { color: 'rgba(255,255,255,0.04)' } }
      },
      animation: { duration: 600 }
    }
  });
}

function reRenderCharts() {
  const activeSection = document.querySelector('.section.active')?.id;
  if (activeSection === 'current') renderDashboard();
  else if (activeSection === 'previous') renderHistory();
}

// Patch addExpense to store day
const _origAdd = addExpense;
window.addExpense = function() {
  const desc   = document.getElementById('expDesc').value.trim();
  const amount = parseFloat(document.getElementById('expAmount').value);
  const cat    = document.getElementById('expCategory').value;
  if (!desc) return toast('Please enter a description.', 'error');
  if (!amount || amount <= 0) return toast('Please enter a valid amount.', 'error');

  const now = new Date();
  const expense = {
    id: Date.now(),
    desc, amount, category: cat,
    month: currentMonthKey(),
    day: now.getDate(),
    date: now.toLocaleDateString('en-IN', { day:'2-digit', month:'short' })
  };
  state.expenses.unshift(expense);
  save();
  document.getElementById('expDesc').value   = '';
  document.getElementById('expAmount').value = '';
  toast('Expense added!', 'success');
  renderDashboard();
};

// ── INIT ───────────────────────────────────
(function init() {
  document.documentElement.setAttribute('data-theme', state.theme || 'dark');
  document.getElementById('themeIcon').textContent = state.theme === 'light' ? '☾' : '☀';
  renderDashboard();
})();
