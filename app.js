// app.js - 7-Parameter Self-Defence Needs Assessment & Radar Comparison Engine

// State
let userScores = {
  threatSurvival: 85,
  deEscalation: 80,
  sport: 15,
  fitness: 75,
  mental: 80,
  accessibility: 85,
  progression: 80
};

let activeOverlays = new Set(["jethRandolph"]); // Jeth's class enabled by default
let radarChart = null;

// Valid passcode SHA-256 hashes (e.g. "stroud" or "jeth2026")
const VALID_PASSCODE_HASHES = [
  "fe16d282230543a5340456b397ae636da7389ab3b2ab3c53e6ebb998f156f4ff", // "stroud"
  "800f6b9550ec19d2fdc6c482e80023303f35b47b8df321e343bf24bd3cc5ea8f"  // "jeth2026"
];

// Helper to hash string to hex using Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function initAuth() {
  const isUnlocked = sessionStorage.getItem("jeth_assessment_auth") === "unlocked";
  const authGate = document.getElementById("authGate");
  const authInput = document.getElementById("authPassword");

  if (isUnlocked) {
    document.body.classList.remove("locked");
    document.title = "Self-Defence Needs Diagnostic & Training Matcher";
    if (authGate) authGate.classList.add("hidden");
  } else {
    document.body.classList.add("locked");
    document.title = "Project Preview";
    if (authGate) authGate.classList.remove("hidden");
    if (authInput) setTimeout(() => authInput.focus(), 100);
  }
}

window.verifyPassword = async function() {
  const input = document.getElementById("authPassword");
  const errorElem = document.getElementById("authError");
  const authGate = document.getElementById("authGate");

  if (!input) return;
  const hash = await sha256(input.value);

  if (VALID_PASSCODE_HASHES.includes(hash)) {
    sessionStorage.setItem("jeth_assessment_auth", "unlocked");
    document.body.classList.remove("locked");
    document.title = "Self-Defence Needs Diagnostic & Training Matcher";
    if (authGate) authGate.classList.add("hidden");
    if (errorElem) errorElem.classList.remove("visible");
    input.value = "";
  } else {
    if (errorElem) errorElem.classList.add("visible");
    input.focus();
    input.select();
  }
};

window.lockAssessment = function() {
  sessionStorage.removeItem("jeth_assessment_auth");
  const authGate = document.getElementById("authGate");
  const authInput = document.getElementById("authPassword");
  document.body.classList.add("locked");
  document.title = "Project Preview";
  if (authGate) authGate.classList.remove("hidden");
  if (authInput) {
    authInput.value = "";
    authInput.focus();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  initPresets();
  initSliders();
  initChart();
  initSystemToggles();
  updateAnalysis();
});

// Setup Persona Preset Buttons
function initPresets() {
  const container = document.getElementById("presetsGrid");
  if (!container) return;

  container.innerHTML = "";
  PRESETS.forEach((preset, index) => {
    const btn = document.createElement("button");
    btn.className = `preset-btn ${index === 0 ? "active" : ""}`;
    btn.innerHTML = `
      <span class="preset-name">${preset.name}</span>
      <span class="preset-tagline">${preset.tagline}</span>
    `;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyScores(preset.scores);
    });
    container.appendChild(btn);
  });
}

// Setup Colorful Sliders with Questions & Descriptions
function initSliders() {
  const container = document.getElementById("slidersContainer");
  if (!container) return;

  container.innerHTML = "";
  PARAMETER_CONFIG.forEach(param => {
    const group = document.createElement("div");
    group.className = "slider-group";
    group.style.setProperty("--param-color", param.color);

    const initialVal = userScores[param.id] ?? 50;

    group.innerHTML = `
      <div class="slider-header">
        <label for="slider-${param.id}" class="slider-label" style="color: ${param.color};">
          ${param.label}
        </label>
        <span class="slider-value-pill" id="val-${param.id}">${initialVal}%</span>
      </div>
      <p class="slider-question"><strong>Question:</strong> ${param.question}</p>
      <p class="slider-desc">${param.description}</p>
      <input 
        type="range" 
        id="slider-${param.id}" 
        min="0" 
        max="100" 
        step="5" 
        value="${initialVal}" 
        aria-label="${param.label}"
      />
      <div class="slider-scale">
        <span>${param.lowLabel || "Low (0%)"}</span>
        <span>Moderate (50%)</span>
        <span>${param.highLabel || "High (100%)"}</span>
      </div>
    `;

    const input = group.querySelector("input");
    const valDisplay = group.querySelector(`#val-${param.id}`);

    // Update track gradient fill
    const updateTrackFill = (val) => {
      input.style.background = `linear-gradient(to right, ${param.color} 0%, ${param.color} ${val}%, #1f2937 ${val}%, #1f2937 100%)`;
    };

    updateTrackFill(initialVal);

    input.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      userScores[param.id] = val;
      valDisplay.textContent = `${val}%`;
      updateTrackFill(val);

      // Deselect preset buttons if manually tweaked
      document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));

      updateChart();
      updateAnalysis();
    });

    container.appendChild(group);
  });
}

// Apply Scores Programmatically (from Presets)
function applyScores(scores) {
  userScores = { ...scores };
  PARAMETER_CONFIG.forEach(param => {
    const input = document.getElementById(`slider-${param.id}`);
    const valDisplay = document.getElementById(`val-${param.id}`);
    if (input && valDisplay) {
      input.value = userScores[param.id];
      valDisplay.textContent = `${userScores[param.id]}%`;
      input.style.background = `linear-gradient(to right, ${param.color} 0%, ${param.color} ${userScores[param.id]}%, #1f2937 ${userScores[param.id]}%, #1f2937 100%)`;
    }
  });
  updateChart();
  updateAnalysis();
}

// Chart.js Radar Setup for 7 Parameters
function initChart() {
  const ctx = document.getElementById("spiderChart");
  if (!ctx) return;

  const labels = PARAMETER_CONFIG.map(p => p.shortLabel);

  radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: buildDatasets()
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: "#d1d5db",
            font: {
              family: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto",
              size: 11
            },
            padding: 12,
            boxWidth: 14,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: "rgba(17, 24, 39, 0.95)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          borderWidth: 1,
          titleColor: "#fff",
          bodyColor: "#d1d5db",
          padding: 10,
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        r: {
          angleLines: {
            color: "rgba(255, 255, 255, 0.12)"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.08)"
          },
          pointLabels: {
            color: "#f3f4f6",
            font: {
              size: 11.5,
              weight: "600"
            }
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            display: false,
            stepSize: 20
          }
        }
      },
      animation: {
        duration: 300
      }
    }
  });
}

function buildDatasets() {
  const datasets = [];

  // 1. User Profile Dataset
  const userData = PARAMETER_CONFIG.map(p => userScores[p.id]);
  datasets.push({
    label: "Your Requirements",
    data: userData,
    borderColor: "#38bdf8", // Sky blue for user
    backgroundColor: "rgba(56, 189, 248, 0.35)",
    borderWidth: 3,
    pointBackgroundColor: "#fff",
    pointBorderColor: "#0284c7",
    pointHoverBackgroundColor: "#38bdf8",
    pointRadius: 4,
    order: 1
  });

  // 2. Active System Overlays
  Object.keys(SYSTEMS_DATA).forEach(sysKey => {
    if (activeOverlays.has(sysKey)) {
      const sys = SYSTEMS_DATA[sysKey];
      const sysData = PARAMETER_CONFIG.map(p => sys.scores[p.id]);
      datasets.push({
        label: sys.name,
        data: sysData,
        borderColor: sys.borderColor,
        backgroundColor: sys.backgroundColor,
        borderWidth: sys.isPrimary ? 2.8 : 1.5,
        borderDash: sys.isPrimary ? [] : [4, 4],
        pointBackgroundColor: sys.color,
        pointBorderColor: "#fff",
        pointRadius: sys.isPrimary ? 4 : 2,
        order: sys.isPrimary ? 2 : 3
      });
    }
  });

  return datasets;
}

function updateChart() {
  if (!radarChart) return;
  radarChart.data.datasets = buildDatasets();
  radarChart.update();
}

// Systems Comparison Toggle Bar
function initSystemToggles() {
  const container = document.getElementById("systemToggles");
  if (!container) return;

  container.innerHTML = "";
  Object.keys(SYSTEMS_DATA).forEach(key => {
    const sys = SYSTEMS_DATA[key];
    const chip = document.createElement("button");
    const isActive = activeOverlays.has(key);
    chip.className = `toggle-chip ${isActive ? "active" : ""}`;
    chip.setAttribute("data-sys", key);
    chip.innerHTML = `
      <span class="chip-dot" style="background: ${sys.color};"></span>
      <span>${sys.name}</span>
    `;

    chip.addEventListener("click", () => {
      if (activeOverlays.has(key)) {
        activeOverlays.delete(key);
        chip.classList.remove("active");
      } else {
        activeOverlays.add(key);
        chip.classList.add("active");
      }
      updateChart();
    });

    container.appendChild(chip);
  });
}

// Calculate Compatibility & Fit Analysis
function calculateMatch(user, systemScores) {
  let totalDiff = 0;
  let maxPossibleDiff = 0;

  PARAMETER_CONFIG.forEach(param => {
    const uVal = user[param.id] ?? 50;
    const sVal = systemScores[param.id] ?? 50;
    
    // Balanced weighting across parameters
    let weight = 1.0;
    if (param.id === "threatSurvival") weight = 1.3;
    if (param.id === "sport") weight = 1.2;

    totalDiff += Math.abs(uVal - sVal) * weight;
    maxPossibleDiff += 100 * weight;
  });

  const similarity = Math.max(0, Math.round((1 - totalDiff / maxPossibleDiff) * 100));
  return similarity;
}

function updateAnalysis() {
  const jeth = SYSTEMS_DATA.jethRandolph;
  const jethMatch = calculateMatch(userScores, jeth.scores);

  // Update Score Badge & Verdict
  const matchPercentElem = document.getElementById("jethMatchPercent");
  const verdictTitleElem = document.getElementById("verdictTitle");
  const verdictDescElem = document.getElementById("verdictDesc");
  const verdictHighlightsElem = document.getElementById("verdictHighlights");

  if (matchPercentElem) {
    matchPercentElem.textContent = `${jethMatch}%`;
  }

  // Dynamic feedback interpretation
  let title = "";
  let desc = "";
  let highlights = [];

  const wantThreatSurvival = userScores.threatSurvival >= 70;
  const wantDeEscalation = userScores.deEscalation >= 70;
  const wantSport = userScores.sport >= 65;
  const wantAccessibility = userScores.accessibility >= 75;
  const wantProgression = userScores.progression >= 75;

  if (jethMatch >= 80) {
    title = "Excellent Fit for Jeth Randolph's Stroud Classes!";
    desc = `Your requirements are an outstanding match for the <strong>Force Necessary</strong> curriculum taught by Jeth Randolph in Stroud. You prioritize realistic protection against uncooperative street violence, edged-weapon awareness, and UK reasonable force law, within a safe, ego-free environment.`;
    highlights = [
      "✓ Reality-Based Knife & Unarmed Tactics",
      "✓ UK Law & Verbal De-Escalation Built-In",
      "✓ Ego-Free, Low-Injury Training at Lansdown Hall",
      "✓ Clear Hochheim Syllabus Progression"
    ];
  } else if (wantSport && !wantThreatSurvival) {
    title = "You Are Strongly Oriented Towards Competitive Combat Sports";
    desc = `You have scored high on <strong>tournaments, medals, and rule-governed sport competition</strong>. Jeth's Stroud classes focus entirely on practical self-protection where rules and weight classes don't exist. If your main objective is winning medals or athletic sparring under referee supervision, a sport MMA, BJJ, or Boxing gym is your ideal match.`;
    highlights = [
      "⚠ Jeth's class does not offer sport tournaments or medals",
      "✓ Excellent if you want to cross-train for street reality",
      "→ Best matched with Competitive BJJ, MMA, or Boxing"
    ];
  } else if (wantThreatSurvival && wantSport) {
    title = "Dual Interest: Street Safety & Athletic Sparring";
    desc = `You want both realistic street defence and the thrill of competitive combat sports. Training with Jeth in Stroud will address the critical blind spots that sport gyms leave behind (knife awareness, multiple attackers, UK legal limits) while building functional combat fitness.`;
    highlights = [
      "✓ Covers weapon & multi-attacker realities banned in sports",
      "✓ Solid functional conditioning & stamina",
      "✓ Highly complementary with cross-training"
    ];
  } else if (wantAccessibility && wantDeEscalation) {
    title = "Strong Match: Accessible, Safe & Preventive Training";
    desc = `You place a high premium on <strong>safety, conflict prevention, and a welcoming learning space</strong>. Jeth's class at Lansdown Hall is specifically designed to be inclusive and ego-free, allowing adults of all backgrounds and fitness levels to build practical confidence without injury.`;
    highlights = [
      "✓ Safe, controlled drills without reckless injury",
      "✓ Practical avoidance and de-escalation",
      "✓ Beginner-friendly and welcoming community"
    ];
  } else {
    title = "Positive Potential Match with Custom Focus";
    desc = `Jeth Randolph's classes offer a structured, progressive approach to personal safety. Even if you're exploring different aspects of martial arts, his modular syllabus allows you to develop functional confidence at your own pace.`;
    highlights = [
      "✓ Accredited Level 12 Master Instructor",
      "✓ Step-by-step modular curriculum",
      "✓ Accessible Tuesday evening training in Stroud"
    ];
  }

  if (verdictTitleElem) verdictTitleElem.innerHTML = title;
  if (verdictDescElem) verdictDescElem.innerHTML = desc;
  if (verdictHighlightsElem) {
    verdictHighlightsElem.innerHTML = highlights.map(h => `<span class="highlight-pill">${h}</span>`).join("");
  }

  // Render System Ranking Cards
  renderRankingGrid();
}

function renderRankingGrid() {
  const container = document.getElementById("rankingGrid");
  if (!container) return;

  const ranked = Object.keys(SYSTEMS_DATA).map(key => {
    const sys = SYSTEMS_DATA[key];
    const match = calculateMatch(userScores, sys.scores);
    return { ...sys, match };
  }).sort((a, b) => b.match - a.match);

  container.innerHTML = "";
  ranked.forEach(sys => {
    const card = document.createElement("div");
    card.className = `system-card ${sys.isPrimary ? "featured" : ""}`;
    
    card.innerHTML = `
      <div>
        <div class="sys-card-header">
          <div>
            <div class="sys-card-title">${sys.name}</div>
            <div class="sys-card-tag">${sys.tag}</div>
          </div>
          <div class="sys-match-pill" style="color: ${sys.color}; border: 1px solid ${sys.color}40;">
            ${sys.match}% Match
          </div>
        </div>
        <p class="sys-card-desc">${sys.summary}</p>
        <ul class="sys-card-points">
          ${sys.strengths.slice(0, 2).map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <div>
        <button class="btn-secondary" style="width: 100%; font-size: 0.8rem; padding: 0.5rem;" onclick="toggleSystemOnChart('${sys.id}')">
          ${activeOverlays.has(sys.id) ? "Hide on Spider Chart" : "Compare on Spider Chart"}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Global helper for toggling from cards
window.toggleSystemOnChart = function(sysId) {
  if (activeOverlays.has(sysId)) {
    activeOverlays.delete(sysId);
  } else {
    activeOverlays.add(sysId);
  }
  
  document.querySelectorAll(".toggle-chip").forEach(chip => {
    if (chip.getAttribute("data-sys") === sysId) {
      chip.classList.toggle("active", activeOverlays.has(sysId));
    }
  });

  updateChart();
};

window.printReport = function() {
  window.print();
};
