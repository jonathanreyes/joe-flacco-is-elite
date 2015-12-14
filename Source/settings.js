document.addEventListener('DOMContentLoaded', function(){
  var replaceEnabled = document.getElementById('replaceCbox');

  chrome.storage.sync.get("replace_elite", function(data) {
    if (data["replace_elite"])
      replaceEnabled.checked = true;
    else
      replaceEnabled.checked = false;
  });

  replaceEnabled.addEventListener("change", function() {
    chrome.storage.sync.set({replace_elite: replaceEnabled.checked});
  })

  var askEnabled = document.getElementById('questionCbox');

  chrome.storage.sync.get("ask_elite", function(data) {
    if(data["ask_elite"])
      askEnabled.checked = true;
    else
      askEnabled.checked = false;
  });

  askEnabled.addEventListener("change", function() {
    chrome.storage.sync.set({ask_elite: askEnabled.checked});
  })
});