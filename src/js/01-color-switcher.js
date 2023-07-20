const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let timerId = null;

makeBtnInactive(refs.stopBtn);

function onStartBtnClick(e) {
  timerId = setInterval(setBodyBgColor, 1000);

  makeBtnInactive(refs.startBtn);

  makeBtnActive(refs.stopBtn);
}

function onStopBtnClick() {
  clearInterval(timerId);

  makeBtnActive(refs.startBtn);

  makeBtnInactive(refs.stopBtn);
}

function setBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function makeBtnActive(btn) {
  btn.removeAttribute('disabled');
}

function makeBtnInactive(btn) {
  btn.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
