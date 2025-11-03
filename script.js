// LOGIN
const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) {
      alert('Preencha todos os campos!');
      return;
    }

    const savedUser = localStorage.getItem('growaUser');
    const savedPass = localStorage.getItem('growaPass');

    if (!savedUser && !savedPass) {
      // cria conta nova
      localStorage.setItem('growaUser', user);
      localStorage.setItem('growaPass', pass);
      window.location.href = 'home.html';
    } else if (user === savedUser && pass === savedPass) {
      // login correto
      window.location.href = 'home.html';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });
}

// LOGOUT
const logoutBtn = document.getElementById('logoutButton');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logoutBtn.style.animation = 'shake 0.4s ease';
    setTimeout(() => {
      logoutBtn.style.animation = 'fadeOut 0.5s forwards';
    }, 300);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = 'index.html';
    }, 800);
  });
}

// CURSOR FANTASMA
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
