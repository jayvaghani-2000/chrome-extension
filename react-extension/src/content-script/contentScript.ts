console.log("content scripting")

chrome.runtime.sendMessage("From the service worker",  () => {
  console.log("Oyee oyee oyee")
})