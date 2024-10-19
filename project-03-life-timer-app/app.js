let isDOBOpen = false;
let dateOfBirth;
let lifeExpectancy = 75; // Default value, user can change it.
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");
const lifeExpectancyInputEl = document.getElementById("lifeExpectancyInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const progressBarEl = document.getElementById("progressBar");
const motivationalQuoteEl = document.getElementById("motivationalQuote");

const quotes = [
  "Time waits for no one.",
  "Live each day to the fullest.",
  "Don't count the days, make the days count.",
  "Life is what happens when you're busy making other plans.",
  "Your time is limited, don't waste it.",
];

// Helper function to get a random motivational quote
const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const makeTwoDigitNumber = (number) => (number > 9 ? number : `0${number}`);

const toggleDateOfBirthSelector = () => {
  settingContentEl.classList.toggle("hide");
  isDOBOpen = !isDOBOpen;
};

const updateAge = () => {
  const currentDate = new Date();
  const dateDiff = currentDate - dateOfBirth;
  const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
  const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
  const day = Math.floor((dateDiff / (1000 * 60 * 60 * 24)) % 30);
  const hour = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((dateDiff / (1000 * 60)) % 60);
  const second = Math.floor((dateDiff / 1000) % 60);

  yearEl.innerHTML = makeTwoDigitNumber(year);
  monthEl.innerHTML = makeTwoDigitNumber(month);
  dayEl.innerHTML = makeTwoDigitNumber(day);
  hourEl.innerHTML = makeTwoDigitNumber(hour);
  minuteEl.innerHTML = makeTwoDigitNumber(minute);
  secondEl.innerHTML = makeTwoDigitNumber(second);

  // Update the progress bar
  const lifeProgress = (year / lifeExpectancy) * 100;
  progressBarEl.style.width = `${lifeProgress}%`;

  // Display a random motivational quote
  motivationalQuoteEl.innerHTML = getRandomQuote();
};

const setDOBHandler = () => {
  const dateString = dobInputEl.value;
  const lifeExpectancyValue = lifeExpectancyInputEl.value;

  if (lifeExpectancyValue) {
    lifeExpectancy = lifeExpectancyValue;
  }

  dateOfBirth = dateString ? new Date(dateString) : null;

  if (dateOfBirth) {
    localStorage.setItem("year", dateOfBirth.getFullYear());
    localStorage.setItem("month", dateOfBirth.getMonth());
    localStorage.setItem("date", dateOfBirth.getDate());
    localStorage.setItem("lifeExpectancy", lifeExpectancy);
  }

  contentToggler();
  setInterval(() => updateAge(), 1000);
};

const localStorageGetter = () => {
  const year = localStorage.getItem("year");
  const month = localStorage.getItem("month");
  const date = localStorage.getItem("date");
  const savedLifeExpectancy = localStorage.getItem("lifeExpectancy");

  if (year && month && date) {
    dateOfBirth = new Date(year, month, date);
  }

  if (savedLifeExpectancy) {
    lifeExpectancy = savedLifeExpectancy;
  }

  updateAge();
};

const contentToggler = () => {
  updateAge();
  if (dateOfBirth) {
    initialTextEl.classList.add("hide");
    afterDOBBtnTxtEl.classList.remove("hide");
  } else {
    afterDOBBtnTxtEl.classList.add("hide");
    initialTextEl.classList.remove("hide");
  }
};

localStorageGetter();
contentToggler();

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);
