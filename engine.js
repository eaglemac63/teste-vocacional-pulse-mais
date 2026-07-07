// Pulse Mais — motor genérico dos testes vocacionais
// Toda a lógica roda no navegador. Nenhum dado é enviado ou persistido.
// Espera encontrar um objeto global TEST (definido em cada pasta de teste, em data.js)

function emptyAnswer() {
  if (TEST.mode === "rank") {
    const obj = {};
    TEST.letters.forEach(letter => { obj[letter] = null; });
    return obj;
  }
  return null;
}

function getMaxScale() {
  return TEST.questions.length * (TEST.mode === "rank" ? 3 : 1);
}

const state = {
  user: { nome: "", email: "", whatsapp: "" },
  answers: TEST.questions.map(() => emptyAnswer()),
  currentQuestion: 0,
  scores: null,
  topLetters: []
};

let radarChart = null;

document.title = `Pulse Mais — ${TEST.meta.testName}`;
document.getElementById("test-title").textContent = TEST.meta.testName;
document.getElementById("test-subtitle").textContent = TEST.meta.subtitle;

const instructionsEl = document.getElementById("test-instructions");
if (TEST.meta.instructions) {
  const legendHtml = TEST.meta.scoreLegend
    ? `<ul class="score-legend">${TEST.meta.scoreLegend.map(item => `<li><strong>${item.v}</strong> — ${item.label}</li>`).join("")}</ul>`
    : "";
  instructionsEl.innerHTML = `<p>${TEST.meta.instructions}</p>${legendHtml}`;
} else {
  instructionsEl.style.display = "none";
}

// ---------- Navegação entre etapas ----------
function goToStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById(`step-${step}`).classList.add("active");
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("active", t.dataset.step === step);
  });
}

function enableTab(step) {
  const tab = document.querySelector(`.tab[data-step="${step}"]`);
  tab.disabled = false;
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    if (!tab.disabled) goToStep(tab.dataset.step);
  });
});

// ---------- Etapa 1: Cadastro ----------
const formCadastro = document.getElementById("form-cadastro");
const btnStart = document.getElementById("btn-start");
const inputNome = document.getElementById("input-nome");
const inputEmail = document.getElementById("input-email");
const inputWhatsapp = document.getElementById("input-whatsapp");
const inputLgpd = document.getElementById("input-lgpd");

function validateCadastro() {
  const valid = inputNome.value.trim().length > 1 &&
    inputEmail.validity.valid &&
    inputWhatsapp.value.trim().length > 7 &&
    inputLgpd.checked;
  btnStart.disabled = !valid;
}
[inputNome, inputEmail, inputWhatsapp, inputLgpd].forEach(el =>
  el.addEventListener("input", validateCadastro)
);

formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  state.user.nome = inputNome.value.trim();
  state.user.email = inputEmail.value.trim();
  state.user.whatsapp = inputWhatsapp.value.trim();

  enableTab("perguntas");
  renderQuestion(0);
  goToStep("perguntas");
});

// ---------- Etapa 2: Perguntas ----------
const questionContainer = document.getElementById("question-container");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

function renderQuestion(index) {
  state.currentQuestion = index;
  const q = TEST.questions[index];

  progressFill.style.width = `${((index + 1) / TEST.questions.length) * 100}%`;
  progressLabel.textContent = `Pergunta ${index + 1} de ${TEST.questions.length}`;

  if (TEST.mode === "rank") {
    renderRankQuestion(index, q);
  } else {
    renderSingleQuestion(index, q);
  }

  btnPrev.disabled = index === 0;
  btnNext.textContent = index === TEST.questions.length - 1 ? "Ver resultado" : "Próxima";
}

function renderSingleQuestion(index, q) {
  const selected = state.answers[index];

  const rows = TEST.letters.map(letter => `
      <button type="button" class="option-row ${selected === letter ? "selected" : ""}" data-letter="${letter}">
        <span class="option-letter">${letter}</span>
        <span class="option-text">${q.options[letter]}</span>
      </button>`
  ).join("");

  questionContainer.innerHTML = `
    <div class="question-title">${q.n}) ${q.text}</div>
    ${rows}
    <p class="score-hint">Escolha a alternativa com a qual mais se identifica.</p>
  `;

  questionContainer.querySelectorAll(".option-row").forEach(btn => {
    btn.addEventListener("click", () => {
      state.answers[index] = btn.dataset.letter;
      renderQuestion(index);
    });
  });

  btnNext.disabled = state.answers[index] === null;
}

function renderRankQuestion(index, q) {
  const ans = state.answers[index];

  const rows = TEST.letters.map(letter => {
    const value = ans[letter];
    const pips = [3, 2, 1, 0].map(v => {
      const usedByOther = TEST.letters.some(l2 => l2 !== letter && ans[l2] === v);
      return `<button type="button" class="rank-pip ${value === v ? "selected" : ""}" data-letter="${letter}" data-value="${v}" ${usedByOther ? "disabled" : ""}>${v}</button>`;
    }).join("");

    return `
      <div class="rank-row">
        <span class="option-letter">${letter}</span>
        <span class="rank-text">${q.options[letter]}</span>
        <span class="rank-pips">${pips}</span>
      </div>`;
  }).join("");

  questionContainer.innerHTML = `
    <div class="question-title">${q.n}) ${q.text}</div>
    ${rows}
    <p class="score-hint">Toque nos números para atribuir a pontuação de cada alternativa.</p>
  `;

  questionContainer.querySelectorAll(".rank-pip").forEach(btn => {
    btn.addEventListener("click", () => {
      const letter = btn.dataset.letter;
      const value = Number(btn.dataset.value);
      if (ans[letter] === value) {
        ans[letter] = null;
      } else {
        TEST.letters.forEach(l2 => { if (ans[l2] === value) ans[l2] = null; });
        ans[letter] = value;
      }
      renderQuestion(index);
    });
  });

  btnNext.disabled = false;
}

btnPrev.addEventListener("click", () => {
  if (state.currentQuestion > 0) renderQuestion(state.currentQuestion - 1);
});

btnNext.addEventListener("click", () => {
  if (state.currentQuestion < TEST.questions.length - 1) {
    renderQuestion(state.currentQuestion + 1);
  } else {
    computeResults();
    enableTab("resultado");
    goToStep("resultado");
  }
});

// ---------- Etapa 3: Resultado ----------
function computeResults() {
  const totals = {};
  TEST.letters.forEach(letter => { totals[letter] = 0; });

  if (TEST.mode === "rank") {
    state.answers.forEach(ans => {
      TEST.letters.forEach(letter => { if (ans[letter] != null) totals[letter] += ans[letter]; });
    });
  } else {
    state.answers.forEach(letter => {
      if (letter) totals[letter] += 1;
    });
  }
  state.scores = totals;

  const max = Math.max(...Object.values(totals));
  state.topLetters = Object.keys(totals)
    .filter(letter => totals[letter] === max)
    .map(letter => letter.toUpperCase());

  renderResults();
}

function renderResults() {
  const maxScale = getMaxScale();

  document.getElementById("result-greeting").textContent =
    `${state.user.nome ? "Olá, " + state.user.nome.split(" ")[0] + "! " : ""}Seu resultado`;

  const numbersEl = document.getElementById("result-numbers");
  numbersEl.innerHTML = TEST.letters.map(letter => {
    const upper = letter.toUpperCase();
    const value = state.scores[letter];
    const pct = (value / maxScale) * 100;
    const color = TEST.colors[letter];
    return `
      <div class="score-line">
        <span class="score-label" style="color:${color}">${upper}</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width:${pct}%;background:${color}"></div></div>
        <span class="score-value">${value}</span>
      </div>`;
  }).join("");

  renderChart();
  renderProfile();
}

function renderChart() {
  const ctx = document.getElementById("radar-chart").getContext("2d");
  const data = {
    labels: TEST.letters.map(l => l.toUpperCase()),
    datasets: [{
      label: "Pontuação",
      data: TEST.letters.map(l => state.scores[l]),
      backgroundColor: "rgba(0, 71, 143, 0.2)",
      borderColor: "rgba(0, 71, 143, 1)",
      pointBackgroundColor: "rgba(0, 71, 143, 1)",
      borderWidth: 2
    }]
  };
  if (radarChart) radarChart.destroy();
  radarChart = new Chart(ctx, {
    type: "radar",
    data,
    options: {
      responsive: false,
      animation: false,
      scales: {
        r: { min: 0, max: getMaxScale(), ticks: { stepSize: Math.ceil(getMaxScale() / 4) } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function renderProfile() {
  const container = document.getElementById("result-profile");
  const isTie = state.topLetters.length > 1;

  const blocks = state.topLetters.map(letter => {
    const profile = TEST.profiles[letter];
    return `
      <h2>${profile.label} — ${profile.title}</h2>
      <p>${profile.text}</p>
      <div class="careers">
        <strong>Carreiras mais apropriadas:</strong>
        ${profile.careers.join(", ")}
      </div>`;
  }).join("<hr style='margin:20px 0;border:none;border-top:1px solid var(--border)'>");

  container.innerHTML = `
    ${isTie ? "<p><em>Seu resultado combina mais de um perfil, com pontuação empatada.</em></p>" : ""}
    ${blocks}
  `;

  const linkHome = document.getElementById("link-home");
  const linkOther = document.getElementById("link-other");
  linkHome.href = TEST.meta.homeHref;
  linkOther.href = TEST.meta.otherHref;
  linkOther.textContent = TEST.meta.otherLabel;
}

// ---------- Geração de PDF ----------
const NAVY = [0, 56, 112];
const SLATE = [95, 99, 110];
const LIGHT_PANEL = [244, 246, 250];
const LIGHT_LINE = [222, 227, 235];

document.getElementById("btn-pdf").addEventListener("click", generatePDF);

function loadImageAsDataURL(url) {
  return fetch(url)
    .then(res => res.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }));
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const pageBottom = 780;

  const logoDataUrl = await loadImageAsDataURL("../assets/logo-pulse-mais.png");
  const logoW = 96;
  const logoH = logoW * (123 / 402);

  function drawTopBar() {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageWidth, 8, "F");
  }

  drawTopBar();
  doc.addImage(logoDataUrl, "PNG", margin, 28, logoW, logoH);

  let y = 28 + logoH + 26;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...NAVY);
  doc.text(`${TEST.meta.pdfHeading} — Resultado`, margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...SLATE);
  y += 18;
  const today = new Date().toLocaleDateString("pt-BR");
  doc.text(`Nome: ${state.user.nome}    |    Data: ${today}`, margin, y);

  y += 22;
  doc.setDrawColor(...LIGHT_LINE);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 32;

  // Placar numérico
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text("Pontuação por perfil", margin, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 46);
  const maxScale = getMaxScale();
  TEST.letters.forEach(letter => {
    const value = state.scores[letter];
    doc.text(`${letter.toUpperCase()}: ${value} / ${maxScale}`, margin, y);
    y += 17;
  });

  y += 14;

  // Gráfico radar (canvas -> imagem), centralizado abaixo do placar
  const chartCanvas = document.getElementById("radar-chart");
  const chartImg = chartCanvas.toDataURL("image/png", 1.0);
  const imgSize = 200;
  doc.addImage(chartImg, "PNG", (pageWidth - imgSize) / 2, y, imgSize, imgSize);

  y += imgSize + 34;

  // Perfil(s)
  state.topLetters.forEach(letter => {
    const profile = TEST.profiles[letter];

    doc.setFontSize(10.5);
    const textLines = doc.splitTextToSize(profile.text, pageWidth - margin * 2 - 28);
    const careersLines = doc.splitTextToSize(profile.careers.join(", "), pageWidth - margin * 2 - 28);
    const innerHeight = 24 + textLines.length * 13 + 12 + 14 + careersLines.length * 13;
    const blockHeight = innerHeight + 32;

    if (y + blockHeight > pageBottom && y > 60) {
      doc.addPage();
      drawTopBar();
      y = 60;
    }

    // painel de fundo
    doc.setFillColor(...LIGHT_PANEL);
    doc.roundedRect(margin - 14, y - 20, pageWidth - margin * 2 + 28, blockHeight, 8, 8, "F");

    const textX = margin;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...NAVY);
    doc.text(`${profile.label} — ${profile.title}`, textX, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(40, 40, 46);
    doc.text(textLines, textX, y);
    y += textLines.length * 13 + 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...NAVY);
    doc.text("Carreiras mais apropriadas:", textX, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 46);
    doc.text(careersLines, textX, y);
    y += careersLines.length * 13 + 32;
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 155);
  doc.text("Documento gerado localmente pela Pulse Mais. Nenhum dado foi armazenado em servidores.", margin, 815);

  const fileName = `${TEST.meta.fileBase}-${(state.user.nome || "resultado").replace(/\s+/g, "-").toLowerCase()}.pdf`;
  doc.save(fileName);
}
