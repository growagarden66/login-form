const uname = document.querySelector('#uname');
const pass = document.querySelector('#pass');
const btn = document.querySelector('#login-btn');
const msg = document.querySelector('#msg');

btn.disabled = true;

function shiftButton() {
  const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
  const currentPosition = positions.find(dir => btn.classList.contains(dir));
  const nextPosition = positions[(positions.indexOf(currentPosition) + 1) % positions.length];

  btn.classList.remove(currentPosition);
  btn.classList.add(nextPosition);

  msg.style.visibility = "visible";
}

uname.addEventListener('input', checkInputs);
pass.addEventListener('input', checkInputs);

function checkInputs() {
  if (uname.value && pass.value) {
    btn.disabled = false;
    btn.classList.remove('shift-left', 'shift-right', 'shift-top', 'shift-bottom');
    msg.style.visibility = "hidden";
  } else {
    btn.disabled = true;
  }
}

btn.addEventListener('mouseover', () => {
  if (btn.disabled) shiftButton();
});
