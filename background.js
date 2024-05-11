function codeToInject() {
  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'c') {
      const url = window.location.href;
      const parts = url.split('node=');
      let result;
      if (parts.length > 1) {
        const nodeId = parts[1];
        navigator.clipboard.writeText(nodeId)
          .then(() => {
            console.log('Node ID:', nodeId);
            result = nodeId;
          })
          .catch(err => {
            console.error('Error to copy Node ID:', err);
            result = false;
          })
        return result;

      } else {
        console.error('Node ID not found.');
        result = false;
        return result;
      }
    }
  });
}

function copyNodeId() {
  const url = window.location.href;
  const parts = url.split('node=');
  let result;
  if (parts.length > 1) {
    const nodeId = parts[1];
    navigator.clipboard.writeText(nodeId)
      .then(() => {
        console.log('Node ID:', nodeId);
        result = nodeId;
      })
      .catch(err => {
        console.error('Error to copy Node ID:', err);
        result = false;
      })
    return result;
  } else {
    console.error('Node ID not found.');
    result = false;
    return result;
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: codeToInject
    })
  }}
);

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyNodeId
  })
});