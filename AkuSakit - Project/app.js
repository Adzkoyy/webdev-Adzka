// Navigation & Offcanvas Helper
function openAIChat() {
    const sidebarEl = document.getElementById('ai-chat-sidebar');
    if (window.innerWidth < 992) {
      const bsOffcanvas = new bootstrap.Offcanvas(sidebarEl);
      bsOffcanvas.show();
    } else {
      sidebarEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // User Authentication Handler (Swaps Login -> Profile Dashboard)
  function handleLogin(event) {
    event.preventDefault();
    const modalEl = document.getElementById('loginModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  
    // Update UI State[cite: 4]
    document.getElementById('auth-buttons').classList.add('d-none');
    document.getElementById('profile-button-container').classList.remove('d-none');
    alert("Berhasil masuk! Akses Profile Dashboard diaktifkan.");
  }
  
  // BMI Calculator
  function calculateBMI(e) {
    e.preventDefault();
    const w = parseFloat(document.getElementById('weightInput').value);
    const h = parseFloat(document.getElementById('heightInput').value) / 100;
    const bmi = (w / (h * h)).toFixed(1);
  
    const resDiv = document.getElementById('bmiResult');
    resDiv.classList.remove('d-none', 'alert-success', 'alert-warning', 'alert-danger');
  
    if (bmi < 18.5) {
      resDiv.className = "mt-3 alert alert-warning d-block";
      resDiv.innerHTML = `<strong>BMI: ${bmi} (Underweight)</strong>. Tingkatkan asupan nutrisi dan pola makan teratur.`;
    } else if (bmi <= 24.9) {
      resDiv.className = "mt-3 alert alert-success d-block";
      resDiv.innerHTML = `<strong>BMI: ${bmi} (Normal)</strong>. Pertahankan gaya hidup aktif dan konsumsi makanan bergizi.`;
    } else {
      resDiv.className = "mt-3 alert alert-danger d-block";
      resDiv.innerHTML = `<strong>BMI: ${bmi} (Overweight)</strong>. Luangkan waktu 30 menit olahraga di sela jadwal kuliah.`;
    }
  }
  
  // Stress Assessment Tool
  function calculateStress(e) {
    e.preventDefault();
    const sleep = parseInt(document.getElementById('sleepHours').value);
    const overwhelm = parseInt(document.getElementById('overwhelm').value);
    const score = overwhelm - sleep;
  
    const resDiv = document.getElementById('stressResult');
    resDiv.classList.remove('d-none', 'alert-info', 'alert-danger');
  
    if (score >= 1) {
      resDiv.className = "mt-3 alert alert-danger d-block";
      resDiv.innerHTML = "<strong>Tingkat Stres Tinggi:</strong> Kamu terindikasi mengalami fatigue/burnout. Cobalah konsultasi ke Asisten AI kami untuk tips relaksasi.";
    } else {
      resDiv.className = "mt-3 alert alert-info d-block";
      resDiv.innerHTML = "<strong>Tingkat Stres Terkendali:</strong> Pertahankan keseimbangan waktu tidur dan jadwal studi.";
    }
  }
  
  // Gemini API Integration for Chat Assistant
  const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual key or backend proxy
  
  async function sendChatMessage(e) {
    e.preventDefault();
    const inputEl = document.getElementById('user-input');
    const query = inputEl.value.trim();
    if (!query) return;
  
    const chatBox = document.getElementById('chat-box');
  
    // Render User Message
    chatBox.innerHTML += `
      <div class="chat-message user mb-3">
        <div class="p-3 shadow-sm text-white">${query}</div>
      </div>
    `;
    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Placeholder Bot Loading Indicator
    const loadingId = 'loading-' + Date.now();
    chatBox.innerHTML += `
      <div class="chat-message bot mb-3" id="${loadingId}">
        <div class="p-3 bg-white rounded-3 shadow-sm border text-muted">
          <i class="bi bi-three-dots"></i> AI sedang mengetik...
        </div>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  
    try {
      // Call Gemini REST API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Kamu adalah EduSehat AI, konsultan kesehatan ramah untuk mahasiswa di Indonesia. Pertanyaan: ${query}` }]
          }]
        })
      });
  
      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, terjadi gangguan koneksi ke AI Consultant.";
  
      document.getElementById(loadingId).querySelector('.p-3').innerText = botText;
    } catch (err) {
      document.getElementById(loadingId).querySelector('.p-3').innerText = "Fitur AI Consultant siap digunakan dengan memasukkan Gemini API Key valid.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  }