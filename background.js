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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: codeToInject
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyNodeId
  }, (result) => {
    console.log(result);

    if (result.length && result[0].result) {
      createToastNotification('success', 'Node ID ' + result[0].result + ' Success!');
    } else if (chrome.runtime.lastError) {
      createToastNotification('error', chrome.runtime.lastError.message);
    } else {
      createToastNotification('error', 'Node ID not found.');
    }
  });
});

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

// TODO: Implement notification
function createToastNotification(type, message) {

  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '10px';
  toast.style.backgroundColor = '#444';
  toast.style.color = '#fff';
  toast.style.opacity = '0.9';
  toast.style.borderRadius = '5px';
  toast.textContent = `${type}: ${message}`;
  toast.style.zIndex = '999';

  document.body.appendChild(toast);

  setTimeout(function () {
    document.body.removeChild(toast);
  }, 3000);
}