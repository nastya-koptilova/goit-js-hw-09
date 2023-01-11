import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeDifferents = options.defaultDate - selectedDates[0];
    if (timeDifferents >= 0) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
    options.chooseDate = selectedDates[0];
  },
};

const timer = {
  start() {
    setInterval(() => {
      const timerData = (options.chooseDate || 0) - Date.now();

      const { days, hours, minutes, seconds } = timer.convertMs(timerData);

      document.querySelector('[data-days]').textContent =
        timer.addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        timer.addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        timer.addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        timer.addLeadingZero(seconds);
    }, 1000);
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};

flatpickr(dataInput, options);

startButton.addEventListener('click', timer.start);
