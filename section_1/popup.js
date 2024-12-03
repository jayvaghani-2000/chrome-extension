const timeElemet = document.getElementById("time");
const timerElemet = document.getElementById("timer");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

function updateTimeElement() {
  const time = new Date().toLocaleTimeString();

  timeElemet.textContent = `The time is ${time}`;

  chrome.storage.local.get("timer", (res) => {
    const timer = res.timer ?? 0;

    timerElemet.textContent = `The timer is at ${timer}`;
  });
}

updateTimeElement();
setInterval(updateTimeElement, 1000);

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
    timer: 0
  });
});

//Runs when popup is opened

// chrome.action.setBadgeText(
//   {
//     text: "AA",
//   },
//   () => {}
// );

// chrome.action.setBadgeBackgroundColor(
//   { color: "#00FF00" }, // Green
//   () => {
//     /* ... */
//   }
// );

// console.log(this);
