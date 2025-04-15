import browser from 'webextension-polyfill';

// background.ts
browser.runtime.onInstalled.addListener(() => {
  console.log('Markie extension installed');
  browser.contextMenus.create({
    id: 'copy-markdown',
    title: '📝 Markie로 마크다운 복사',
    contexts: ['selection'],
  });
});

browser.runtime.onConnect.addListener((port) => {
  console.log('Connected to port:', port);
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copy-markdown' && tab?.id != null) {
    browser.tabs
      .sendMessage(tab.id, { action: 'COPY_MARKDOWN' })
      .then((response) => {
        console.log('Response from content script:', response);
      })
      .catch((error) => {
        console.error('Error sending message to content script:', error);
      });
  }
});

export {};

// @WARNING 기존 탭에서 다른 탭으로 이동하면 안되는 문제가 있는 것 같음. 확인 필요
