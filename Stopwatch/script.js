let lapButton = document.querySelector(".lap");
let startButton = document.querySelector(".start");
let reveal = document.querySelectorAll(".reveal");
let mainTimer = document.querySelector(".timer");
let secondTimer = document.querySelector(".second-timer");
let finishedLaps = document.querySelector(".finished-laps");
let allowTransform = false;
let startingState = true;
let [max, min] = [0, 0];
let [fMili, sMili, fSecond, sSecond, fMinute, sMinute] = [0, 0, 0, 0, 0, 0];
let [
  fMilisecond,
  sMilisecond,
  fSecondsecond,
  sSecondsecond,
  fMinutesecond,
  sMinutesecond,
] = [0, 0, 0, 0, 0, 0];
let [lapNumber, lapTime, totalTime] = [0, 0, 0];
let currentTime;
let currentTimeSecondClock;
let counting;
let countingSecond;
let restartTimer = true;
let defaultClockValue = "00:00.00";
let counter = 0;
let minMaxDifferentiation = 0;

function transform() {
  if (allowTransform && lapButton.innerHTML === "Lap") {
    for (let i = 0; i < reveal.length; i++) {
      reveal[i].classList.add("active");
      mainTimer = document.querySelector(".timer");
      finishedLaps = document.querySelector(".finished-laps");
      finishedLaps.classList.add("border-reveal");
      function addingClassToMainTimer() {
        mainTimer.classList.add("reveal");
        mainTimer.classList.add("active");
      }
      setTimeout(addingClassToMainTimer, 1000 / 100);
    }
  }
  if (!allowTransform) {
    for (let i = 0; i < reveal.length; i++) {
      reveal[i].classList.remove("active");
      mainTimer = document.querySelector(".timer");
      finishedLaps = document.querySelector(".finished-laps");
      finishedLaps.classList.remove("border-reveal");
      mainTimer.classList.remove("reveal");
      mainTimer.classList.remove("active");
    }
  }
}

function startMainTimer() {
  if (restartTimer) {
    allowTransform = true;
    lapButton.style.opacity = 1;
    counting = setInterval(addingTImeToMainClock, 10);
    countingSecond = setInterval(addingTimeToSecondClock, 10);
    restartTimer = false;
  } else {
    restartTimer = true;
  }
}

function addingTImeToMainClock() {
  sMili += 1;
  adjustingSeconds();
  adjustingMinutes();
  adjustingHours();
  changingTimeDisplay();
}

function adjustingSeconds() {
  if (fMili * 10 + sMili === 100) {
    sMili = 0;
    fMili = 0;
    sSecond += 1;
  }
  if (sMili === 10) {
    sMili = 0;
    fMili += 1;
  }
}

function adjustingMinutes() {
  if (fSecond * 10 + sSecond === 60) {
    fSecond = 0;
    sSecond = 0;
    sMinute += 1;
  }
  if (sSecond === 10) {
    sSecond = 0;
    fSecond += 1;
  }
}

function adjustingHours() {
  if (sMinute === 10) {
    sMinute = 0;
    fMinute += 1;
  }
}

function changingTimeDisplay() {
  currentTime =
    fMinute.toString() +
    sMinute.toString() +
    ":" +
    fSecond.toString() +
    sSecond.toString() +
    "." +
    fMili.toString() +
    sMili.toString();
  mainTimer.innerHTML = currentTime;
}

function addingTimeToSecondClock() {
  counter++;
  sMilisecond += 1;
  adjustingSecondsOnSecondClock();
  adjustingMinutesOnSecondClock();
  adjustingHoursOnSecondClock();
  changingTimeDisplayOnSecondClock();
}

function adjustingSecondsOnSecondClock() {
  if (fMilisecond * 10 + sMilisecond === 100) {
    sMilisecond = 0;
    fMilisecond = 0;
    sSecondsecond += 1;
  }
  if (sMilisecond === 10) {
    sMilisecond = 0;
    fMilisecond += 1;
  }
}

function adjustingMinutesOnSecondClock() {
  if (fSecondsecond * 10 + sSecondsecond === 60) {
    fSecondsecond = 0;
    sSecondsecond = 0;
    sMinutesecond += 1;
  }
  if (sSecondsecond === 10) {
    sSecondsecond = 0;
    fSecondsecond += 1;
  }
}

function adjustingHoursOnSecondClock() {
  if (sMinutesecond === 10) {
    sMinutesecond = 0;
    fMinutesecond += 1;
  }
}

function changingTimeDisplayOnSecondClock() {
  currentTimeSecondClock =
    fMinutesecond.toString() +
    sMinutesecond.toString() +
    ":" +
    fSecondsecond.toString() +
    sSecondsecond.toString() +
    "." +
    fMilisecond.toString() +
    sMilisecond.toString();
  secondTimer.innerHTML = currentTimeSecondClock;
}

function recordedLap() {
  if (lapButton.innerHTML === "Lap") {
    lapNumber += 1;
    lapTime = currentTimeSecondClock;
    totalTime = currentTime;
    let contentArray = [lapNumber, lapTime, totalTime];
    creatingHTMLElement(contentArray);
    counter = 0;
    fMilisecond = 0;
    sMilisecond = 0;
    fSecondsecond = 0;
    sSecondsecond = 0;
    fMinutesecond = 0;
    sMinutesecond = 0;
    minMaxDifferentiation++;
  }
}

function creatingHTMLElement(array) {
  let finishedLap = document.createElement("div");
  finishedLap.classList.add("laps");
  finishedLaps.prepend(finishedLap);
  if (minMaxDifferentiation === 0) {
    max = counter;
    min = counter;
  } else if (minMaxDifferentiation === 1) {
    if (max < counter) {
      max = counter;
    }
    if (min > counter) {
      min = counter;
    }
  } else if (minMaxDifferentiation > 1) {
    if (max < counter) {
      finishedLap.classList.add("max");
      max = counter;
    }
    if (min > counter) {
      finishedLap.classList.add("min");
      min = counter;
    }
  }

  for (let i = 0; i < array.length; i++) {
    let content = document.createElement("div");
    content.innerHTML = array[i];
    finishedLap.appendChild(content);
  }
}

function buttonLapToStartOver(startingState) {
  if (startingState) {
    lapButton.innerHTML = "Lap";
  } else {
    lapButton.innerHTML = "Start over";
  }
}

function changeButtons() {
  if (startingState) {
    buttonLapToStartOver(startingState);
    startButton.classList.remove("start");
    startButton.classList.add("stop");
    startButton.innerHTML = "Stop";
    startingState = false;
  } else {
    clearInterval(counting);
    clearInterval(countingSecond);
    startButton.innerHTML = "Continue";
    startButton.classList.remove("stop");
    startButton.classList.add("start");
    buttonLapToStartOver(startingState);
    startingState = true;
  }
}

function resetField() {
  if (lapButton.innerHTML === "Start over") {
    fMinute = 0;
    sMinute = 0;
    fSecond = 0;
    sSecond = 0;
    fMili = 0;
    sMili = 0;
    fMilisecond = 0;
    sMilisecond = 0;
    fSecondsecond = 0;
    sSecondsecond = 0;
    fMinutesecond = 0;
    sMinutesecond = 0;
    allowTransform = false;
    transform();
    mainTimer.innerHTML = defaultClockValue;
    secondTimer.innerHTML = defaultClockValue;
    startButton.innerHTML = "Start";
    lapButton.innerHTML = "Lap";
    lapButton.style.opacity = 0.3;
    finishedLaps.innerHTML = "";
    lapNumber = 0;
    totalTime = 0;
    min = 0;
    max = 0;
    minMaxDifferentiation = 0;
  } else {
    return;
  }
}

lapButton.addEventListener("click", transform);
lapButton.addEventListener("click", recordedLap);
lapButton.addEventListener("click", resetField);
startButton.addEventListener("click", startMainTimer);
startButton.addEventListener("click", changeButtons);
