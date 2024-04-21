chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: copyNodeId
  });
});

function copyNodeId() {
  const url = window.location.href;
  const parts = url.split('node=');
  if (parts.length > 1) {
      const nodeId = parts[1];
      navigator.clipboard.writeText(nodeId)
          .then(() => {
              console.log('Node ID copied to clipboard:', nodeId);
          })
          .catch(err => {
              console.error('Erro copying Node ID:', err);
          });
  } else {
      console.error('Node ID not found.');
  }
}
