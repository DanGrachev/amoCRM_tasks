const inputEl = document.querySelector('.timer__input');
const btnStart = document.querySelector('.timer__btn-start');
const btnStop = document.querySelector('.timer__btn-stop');
const btnReset = document.querySelector('.timer__btn-reset');
const btnEl = document.querySelector('button');

const hoursNum = document.querySelector('.timer__hh .timer__number')
const minutesNum = document.querySelector('.timer__mm .timer__number')
const secondsNum = document.querySelector('.timer__ss .timer__number')

const hoursSing = document.querySelector('.timer__hh .timer__sign')
const minutesSing = document.querySelector('.timer__mm .timer__sign')
const secondsSing = document.querySelector('.timer__ss .timer__sign')


const timer = {
  interval: null,
  seconds: 0
}

// функция для склонения числительных 
function declOfNum(n, titles) {  
  return titles[
    (n % 10 === 1 && n % 100 !== 11) 
    ? 0 
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) 
    ? 1 
    : 2
  ];  
}

// функция преобразовывает время к нужному формату
function timeConversion(seconds) {
  let hh = Math.floor(seconds / 60 / 60);
  let mm = Math.floor(seconds / 60) - (hh * 60);
  let ss = seconds % 60;

  hoursNum.textContent = hh.toString().padStart(2, '0');
  minutesNum.textContent = mm.toString().padStart(2, '0');
  secondsNum.textContent = ss.toString().padStart(2, '0');

  hoursSing.textContent = declOfNum(hh, ['час', 'часа', 'часов'])
  minutesSing.textContent = declOfNum(mm, ['минута', 'минуты', 'минут'])
  secondsSing.textContent = declOfNum(ss, ['секунда', 'секунды', 'секунд'])
}

// функция создающая таймер
function createTimerAnimator(timer) {
  if (timer.interval) {
    clearInterval(timer.interval)
  }
  timer.interval = setInterval(() => {
    if (timer.seconds >= 0) {
      timeConversion(timer.seconds)
    } else {
      clearInterval(timer.interval);
      btnEl.disabled = false; 
    }

    timer.seconds--;
  }, 1000)
};

// функция запускает таймер
btnStart.addEventListener('click', () => {
  // проверка является ли входные данные числом
  if (typeof Number(inputEl.value) === 'number' && !isNaN(inputEl.value)) {
    timer.seconds = Number(inputEl.value) || timer.seconds;
    createTimerAnimator(timer);

    btnStart.disabled = true;
    btnStop.disabled = false;
    inputEl.value = '';
  } else {
    alert('Введите число');
    inputEl.value = '';
  }
});

// функция останавливает таймер
btnStop.addEventListener('click', () => {
  btnStop.disabled = true;
  btnStart.disabled = false;

  clearInterval(timer.interval);
});

// функция сбрасывает таймер
btnReset.addEventListener('click', () => {
  clearInterval(timer.interval);
  timeConversion(0)
  timer.seconds = 0;

  btnStop.disabled = false;
  btnStart.disabled = false;
});



