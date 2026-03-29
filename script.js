// ================== STATE ==================
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let monthlyLimit = localStorage.getItem("limit") || 0;
let darkMode = localStorage.getItem("darkMode") === "true";

// ================== INIT ==================
document.getElementById("currentLimit").innerText = monthlyLimit;
if(darkMode) document.body.classList.add("dark");

// ================== NAVIGATION ==================
function showSection(section){
  document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
  const sec = document.getElementById(section);
  sec.classList.remove("hidden");

  if(section==="current"){
    // Delay rendering slightly to let browser calculate canvas size
    setTimeout(renderCurrent, 50);
  }
  if(section==="previous"){
    setTimeout(renderPrevious, 50);
  }
}

// ================== DARK MODE ==================
function toggleDarkMode(){
  document.body.classList.toggle("dark");
  darkMode = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", darkMode);
}

// ================== SET LIMIT ==================
function setLimit(){
  const val = +document.getElementById("limitInput").value;
  if(val>0){
    monthlyLimit = val;
    localStorage.setItem("limit", monthlyLimit);
    document.getElementById("currentLimit").innerText = monthlyLimit;
  }
}

// ================== ADD EXPENSE ==================
function addExpense(){
  const desc = document.getElementById("expDesc").value;
  const amt = +document.getElementById("expAmount").value;
  const cat = document.getElementById("expCategory").value;
  if(!desc || !amt || !cat) return;

  const now = new Date();
  const dateStr = now.toISOString().slice(0,10); // full date YYYY-MM-DD
  const monthStr = dateStr.slice(0,7);           // YYYY-MM

  expenses.push({
    id: Date.now(),
    desc,
    amt,
    cat,
    date: dateStr,
    month: monthStr
  });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderCurrent();
}

// ================== DELETE EXPENSE ==================
function deleteExpense(id){
  expenses = expenses.filter(e=>e.id!==id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderCurrent();
}

// ================== EDIT EXPENSE ==================
function editExpense(id){
  const e = expenses.find(ex=>ex.id===id);
  const newDesc = prompt("Edit description", e.desc);
  const newAmt = prompt("Edit amount", e.amt);
  const newCat = prompt("Edit category", e.cat);
  if(newDesc && newAmt && newCat){
    e.desc=newDesc; e.amt=+newAmt; e.cat=newCat;
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderCurrent();
  }
}

// ================== RENDER CURRENT MONTH ==================
function renderCurrent(){
  // ====== CURRENT MONTH EXPENSES ======
  const month = new Date().toISOString().slice(0,7);
  const currentExp = expenses.filter(e => e.month === month);

  // ====== GRID TOTALS ======
  let totalExp = currentExp.reduce((a,b)=>a+b.amt,0);
  let left = monthlyLimit - totalExp;
  let savings = Math.max(0, left);
  document.getElementById("totalExpense").innerText = totalExp;
  document.getElementById("totalSavings").innerText = savings;
  document.getElementById("leftBalance").innerText = left>0?left:0;

  // ====== EXPENSE LIST ======
  const list = document.getElementById("currentList");
  list.innerHTML = "";
  currentExp.forEach(e=>{
    const li = document.createElement("li");
    li.innerText = `${e.desc} - ₹${e.amt} (${e.cat})`;
    const editBtn = document.createElement("button");
    editBtn.innerText="Edit"; editBtn.onclick=()=>editExpense(e.id);
    const delBtn = document.createElement("button");
    delBtn.innerText="Delete"; delBtn.onclick=()=>deleteExpense(e.id);
    li.appendChild(editBtn); li.appendChild(delBtn);
    list.appendChild(li);
  });

  // ====== PIE CHART ======
  const catMap = {};
  currentExp.forEach(e => catMap[e.cat] = (catMap[e.cat] || 0) + e.amt);

  // Remove old chart if exists
  if(window.currentPie) window.currentPie.destroy();

  // Only render chart if there is at least one expense
  if(Object.keys(catMap).length > 0){
    const ctx = document.getElementById("currentPie").getContext("2d");
    const colors = Object.keys(catMap).map((_,i)=>`hsl(${i*60}, 70%, 50%)`);

    window.currentPie = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(catMap),
        datasets: [{
          data: Object.values(catMap),
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  } else {
    // Clear canvas if no data
    const ctx = document.getElementById("currentPie").getContext("2d");
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
  }
}

  // PIE CHART
  const catMap = {};
  currentExp.forEach(e=>catMap[e.cat]=(catMap[e.cat]||0)+e.amt);

  // Generate colors dynamically
  const colors = Object.keys(catMap).map((_,i)=>`hsl(${i*60}, 70%, 50%)`);

  // Destroy old chart if exists
  if(window.currentPie) window.currentPie.destroy();

  const ctx = document.getElementById("currentPie").getContext("2d");
  window.currentPie = new Chart(ctx,{
    type:"pie",
    data:{
      labels: Object.keys(catMap),
      datasets:[{
        data:Object.values(catMap),
        backgroundColor: colors
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{ position:'bottom' }
      }
    }
  });


// ================== PREVIOUS MONTHS ==================
function renderPrevious(){
  const monthMap = {};
  expenses.forEach(e=>monthMap[e.month]=(monthMap[e.month]||0)+e.amt);
  if(window.previousChart) window.previousChart.destroy();
  const ctx = document.getElementById("previousChart");
  window.previousChart = new Chart(ctx,{type:"bar",
    data:{
      labels: Object.keys(monthMap),
      datasets:[{label:"Monthly Expense", data:Object.values(monthMap), backgroundColor:'#6366f1'}]
    }
  });
}

// ================== INIT ==================
showSection("current");