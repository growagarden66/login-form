const ghost = document.createElement('div');
ghost.classList.add('ghost');
document.body.appendChild(ghost);

window.addEventListener('mousemove', (e) => {
  ghost.style.left = `${e.clientX}px`;
  ghost.style.top = `${e.clientY}px`;
});
