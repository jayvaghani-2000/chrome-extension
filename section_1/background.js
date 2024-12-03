chrome.alarms.create("timer-alarm", { periodInMinutes: 1 / 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "timer-alarm") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      const time = res.timer ?? 0;
      const isRunning = res.isRunning ?? true;

      if (!isRunning) return;
      chrome.action.setBadgeText({
        text: `${time + 1}`,
      });

      chrome.storage.local.set({
        timer: time + 1,
      });

      this.registration.showNotification("Chrome timer extension", {
        body: "1 second has passed",
        icon: "/icon.png",
      });
    });
  }
});

console.log(this);
