chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    shows: [],
  });
  chrome.contextMenus.create({
    title: "Search TV Show",
    id: "contextMenu1",
    contexts: ["page", "selection"],
  });
  chrome.contextMenus.create({
    title: "Read This Text",
    id: "contextMenu2",
    contexts: ["page", "selection"],
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "contextMenu1") {
      // chrome.search.query({
      //   text: event.selectionText,
      //   disposition: "NEW_TAB",
      // });
      fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          chrome.storage.local.set({
            shows: data,
          });
        });
    } else if (event.menuItemId === "contextMenu2") {
      chrome.tts.speak(event.selectionText, {
        lang: "zh-EN",
        rate: 1,
      });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  console.log("message, sender, sendResponse", message, sender, sendResponse)
  sendResponse("Popopopß")
  chrome.tabs.sendMessage(
    sender.tab.id,
    "OYEE oyee"
  )

});
