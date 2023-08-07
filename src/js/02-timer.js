import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  datetimePicker: document.querySelector('#datetime-picker'),
};

let selectedDate = null;

makeBtnInactive(refs.startBtn);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.datetimePicker.setAttribute('disabled', 'true');

  makeBtnInactive(refs.startBtn);

  const timerId = setInterval(() => {
    let ms = selectedDate - Date.now();
    let remainedTimeOdject = convertMs(ms);

    refs.days.textContent = addLeadingZero(remainedTimeOdject.days);
    refs.hours.textContent = addLeadingZero(remainedTimeOdject.hours);
    refs.minutes.textContent = addLeadingZero(remainedTimeOdject.minutes);
    refs.seconds.textContent = addLeadingZero(remainedTimeOdject.seconds);

    if (ms < 1000) {
      clearInterval(timerId);
      makeBtnActive(refs.startBtn);
      refs.datetimePicker.removeAttribute('disabled');
    }
  }, 1000);
}

Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      makeBtnInactive(refs.startBtn);
    } else {
      makeBtnActive(refs.startBtn);
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function makeBtnInactive(btn) {
  btn.setAttribute('disabled', 'true');
}

function makeBtnActive(btn) {
  btn.removeAttribute('disabled');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return (value = value.toString().padStart(2, '0'));
}
