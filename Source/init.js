chrome.runtime.onInstalled.addListener(function(details) {
  chrome.storage.sync.set({"replace_elite" : true, "ask_elite" : true});
})