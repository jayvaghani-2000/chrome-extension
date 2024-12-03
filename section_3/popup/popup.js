chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("#####", message);
  console.log(sender);
});

chrome.storage.local.get(["shows"], (res) => {
    for(const show of res.shows) {
        showShows(show);
    }
});

function showShows(show) {
  const showDiv = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = show.show.name;

  showDiv.appendChild(title)

  if (show.show.image?.medium) {
    const image = document.createElement("img");
    image.src = show.show.image?.medium;

    showDiv.appendChild(image)
  }


  document.body.appendChild(showDiv)
}
