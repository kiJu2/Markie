// background.ts
chrome.runtime.onInstalled.addListener(() => {
  console.log('Markie extension installed');
  chrome.contextMenus.create({
    id: 'copy-markdown',
    title: '📝 Markie로 마크다운 복사',
    contexts: ['selection'],
  });
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('Connected to port:', port);
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copy-markdown' && tab?.id != null) {
    chrome.tabs.sendMessage(tab.id, { action: 'COPY_MARKDOWN' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Response from content script:', response);
      }
    });
  }
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "CONVERT_TO_MD") {
//     const { html } = message
//     console.log("html:", html)
//     // const markdown = turndownService.turndown(html)

//     // console.log("Converted Markdown:", markdown)
//   }
// })

export {};

// @NOTE 깃 로그에서 tailwind 설치부터 문제가 있는 것 같음.
// @WARNING 기존 탭에서 다른 탭으로 이동하면 안되는 문제가 있는 것 같음. 확인 필요