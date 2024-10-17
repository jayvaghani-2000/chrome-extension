const timeElemet = document.getElementById("name-input");
const save = document.getElementById("save-button");

save.addEventListener("click", () => {
  const name = timeElemet.value;

  chrome.storage.sync.set({ name }, () => {
    console.log("Set name", name);
  });
});

chrome.storage.sync.get("name", (res) => {
  console.log("Get name", res);
});
