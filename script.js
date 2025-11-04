// Growa Search Engine ❄️
// Desenvolvido com integração GNews API

const apiKey = "473185ce15637acf18323bb9c226e5ba";

const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginContainer = document.getElementById("loginContainer");
const home = document.getElementById("home");
const logoutBtn = document.getElementById("logoutBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const newsContainer = document.getElementById("newsContainer");

loginBtn.addEventListener("click", () => {
  const user = usernameInput.value;
  const pass = passwordInput.value;
  if (!user || !pass) {
    alert("Preencha usuário e senha!");
    return;
  }

  localStorage.setItem("userGrowa", JSON.stringify({ user, pass }));
  loginContainer.style.display = "none";
  home.style.display = "block";
  loadNews("tecnologia");
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userGrowa");
  home.style.display = "none";
  loginContainer.style.display = "flex";
});

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) loadNews(query);
});

async function loadNews(query) {
  try {
    const res = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=pt&country=br&max=10&apikey=${apiKey}`);
    const data = await res.json();

    newsContainer.innerHTML = "";

    if (data.articles && data.articles.length > 0) {
      data.articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <h3>${article.title}</h3>
          <p>${article.description || "Sem descrição disponível."}</p>
          <a href="${article.url}" target="_blank">Ler mais 🔗</a>
        `;
        newsContainer.appendChild(card);
      });
    } else {
      newsContainer.innerHTML = "<p>Nenhuma notícia encontrada 😢</p>";
    }
  } catch (err) {
    console.error(err);
    newsContainer.innerHTML = "<p>Erro ao carregar notícias ⚠️</p>";
  }
}

// Verifica login automático
window.onload = () => {
  const user = JSON.parse(localStorage.getItem("userGrowa"));
  if (user) {
    loginContainer.style.display = "none";
    home.style.display = "block";
    loadNews("tecnologia");
  }
};
