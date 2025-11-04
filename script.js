// --- LOGIN E CONTA ---
const loginContainer = document.getElementById('login-container');
const mainContainer = document.getElementById('main-container');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const returnBtn = document.getElementById('returnBtn');
const logoutBtn = document.getElementById('logoutBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsMenu = document.getElementById('settings-menu');

let users = JSON.parse(localStorage.getItem('users')) || {};

loginBtn.onclick = () => {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (users[user] && users[user] === pass) {
    localStorage.setItem('currentUser', user);
    loginContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
  } else alert("Usuário ou senha incorretos!");
};

registerBtn.onclick = () => {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  users[user] = pass;
  localStorage.setItem('users', JSON.stringify(users));
  alert("Conta criada com sucesso!");
};

returnBtn.onclick = () => {
  alert("Use seu nome e senha criados para retornar!");
};

logoutBtn.onclick = () => {
  localStorage.removeItem('currentUser');
  mainContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
};

// --- TEMA ---
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = () => {
  document.body.classList.toggle('light-mode');
};

settingsBtn.onclick = () => {
  settingsMenu.classList.toggle('hidden');
};

// --- PESQUISA E NOTÍCIAS ---
const apiKey = "473185ce15637acf18323bb9c226e5ba"; // <-- cole sua chave da GNews aqui
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('results-section');
const resultsDiv = document.getElementById('results');

async function buscarNoticias() {
  const res = await fetch(`https://gnews.io/api/v4/top-headlines?lang=pt&token=${apiKey}`);
  const data = await res.json();
  mostrarNoticias(data.articles);
}

function mostrarNoticias(news) {
  const container = document.getElementById('news-container');
  container.innerHTML = news.map(n => `
    <div class="card">
      <h3>${n.title}</h3>
      <p>${n.description || ""}</p>
      <a href="${n.url}" target="_blank">Ler mais</a>
    </div>`).join('');
}

searchBtn.onclick = async () => {
  const query = searchInput.value;
  const res = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=pt&token=${apiKey}`);
  const data = await res.json();
  resultsSection.classList.remove('hidden');
  resultsDiv.innerHTML = data.articles.map(r => `
    <div class="card">
      <h3>${r.title}</h3>
      <p>${r.description || ""}</p>
      <a href="${r.url}" target="_blank">Abrir</a>
    </div>`).join('');
};

buscarNoticias();
