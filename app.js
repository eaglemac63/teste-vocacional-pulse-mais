// Pulse Mais — Teste Vocacional de Profissão
// Toda a lógica roda no navegador. Nenhum dado é enviado ou persistido.

const state = {
  user: { nome: "", email: "", whatsapp: "" },
  answers: QUESTIONS.map(() => null), // letra escolhida (a/b/c/d) em cada pergunta
  currentQuestion: 0,
  scores: null,
  topLetters: []
};

let radarChart = null;

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
  const q = QUESTIONS[index];
  const selected = state.answers[index];

  progressFill.style.width = `${((index + 1) / QUESTIONS.length) * 100}%`;
  progressLabel.textContent = `Pergunta ${index + 1} de ${QUESTIONS.length}`;

  const rows = ["a", "b", "c", "d"].map(letter => `
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

  btnPrev.disabled = index === 0;
  btnNext.disabled = state.answers[index] === null;
  btnNext.textContent = index === QUESTIONS.length - 1 ? "Ver resultado" : "Próxima";
}

btnPrev.addEventListener("click", () => {
  if (state.currentQuestion > 0) renderQuestion(state.currentQuestion - 1);
});

btnNext.addEventListener("click", () => {
  if (state.currentQuestion < QUESTIONS.length - 1) {
    renderQuestion(state.currentQuestion + 1);
  } else {
    computeResults();
    enableTab("resultado");
    goToStep("resultado");
  }
});

// ---------- Etapa 3: Resultado ----------
function computeResults() {
  const totals = { a: 0, b: 0, c: 0, d: 0 };
  state.answers.forEach(letter => {
    if (letter) totals[letter] += 1;
  });
  state.scores = totals;

  const max = Math.max(totals.a, totals.b, totals.c, totals.d);
  state.topLetters = Object.keys(totals)
    .filter(letter => totals[letter] === max)
    .map(letter => letter.toUpperCase());

  renderResults();
}

function renderResults() {
  const { a, b, c, d } = state.scores;
  const maxScale = QUESTIONS.length; // 20

  document.getElementById("result-greeting").textContent =
    `${state.user.nome ? "Olá, " + state.user.nome.split(" ")[0] + "! " : ""}Seu resultado`;

  const numbersEl = document.getElementById("result-numbers");
  numbersEl.innerHTML = ["A", "B", "C", "D"].map(letter => {
    const value = state.scores[letter.toLowerCase()];
    const pct = (value / maxScale) * 100;
    return `
      <div class="score-line ${letter}">
        <span class="score-label">Tipo ${letter}</span>
        <div class="score-bar-bg"><div class="score-bar-fill" style="width:${pct}%"></div></div>
        <span class="score-value">${value}</span>
      </div>`;
  }).join("");

  renderChart();
  renderProfile();
}

function renderChart() {
  const ctx = document.getElementById("radar-chart").getContext("2d");
  const data = {
    labels: ["Tipo A", "Tipo B", "Tipo C", "Tipo D"],
    datasets: [{
      label: "Pontuação",
      data: [state.scores.a, state.scores.b, state.scores.c, state.scores.d],
      backgroundColor: "rgba(91, 61, 240, 0.2)",
      borderColor: "rgba(91, 61, 240, 1)",
      pointBackgroundColor: "rgba(91, 61, 240, 1)",
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
        r: { min: 0, max: QUESTIONS.length, ticks: { stepSize: 5 } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function renderProfile() {
  const container = document.getElementById("result-profile");
  const isTie = state.topLetters.length > 1;

  const blocks = state.topLetters.map(letter => {
    const profile = PROFILES[letter];
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
}

// ---------- Geração de PDF ----------
document.getElementById("btn-pdf").addEventListener("click", generatePDF);

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = 60;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(91, 61, 240);
  doc.text("Pulse Mais", margin, y);

  doc.setFontSize(14);
  doc.setTextColor(36, 31, 54);
  y += 26;
  doc.text("Teste Vocacional de Profissão — Resultado", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(109, 103, 133);
  y += 18;
  const today = new Date().toLocaleDateString("pt-BR");
  doc.text(`Nome: ${state.user.nome}    |    Data: ${today}`, margin, y);

  y += 30;
  doc.setDrawColor(227, 221, 245);
  doc.line(margin, y, pageWidth - margin, y);
  y += 30;

  // Placar numérico
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(36, 31, 54);
  doc.text("Pontuação por tipo", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  ["A", "B", "C", "D"].forEach(letter => {
    const value = state.scores[letter.toLowerCase()];
    doc.text(`Tipo ${letter}: ${value} / ${QUESTIONS.length}`, margin, y);
    y += 16;
  });

  y += 16;

  // Gráfico radar (canvas -> imagem), centralizado abaixo do placar
  const chartCanvas = document.getElementById("radar-chart");
  const chartImg = chartCanvas.toDataURL("image/png", 1.0);
  const imgSize = 200;
  doc.addImage(chartImg, "PNG", (pageWidth - imgSize) / 2, y, imgSize, imgSize);

  y += imgSize + 30;

  // Perfil(s)
  const pageBottom = 780;
  state.topLetters.forEach(letter => {
    const profile = PROFILES[letter];

    doc.setFontSize(10.5);
    const textLines = doc.splitTextToSize(profile.text, pageWidth - margin * 2);
    const careersLines = doc.splitTextToSize(profile.careers.join(", "), pageWidth - margin * 2);
    const blockHeight = 18 + textLines.length * 13 + 10 + 14 + careersLines.length * 13 + 24;

    if (y + blockHeight > pageBottom && y > 60) { doc.addPage(); y = 60; }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`${profile.label} — ${profile.title}`, margin, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(textLines, margin, y);
    y += textLines.length * 13 + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("Carreiras mais apropriadas:", margin, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.text(careersLines, margin, y);
    y += careersLines.length * 13 + 24;
  });

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Documento gerado localmente. Nenhum dado foi armazenado em servidores.", margin, 820);

  const fileName = `teste-vocacional-${(state.user.nome || "resultado").replace(/\s+/g, "-").toLowerCase()}.pdf`;
  doc.save(fileName);
}
