import browser from 'webextension-polyfill';

// background.ts
browser.runtime.onInstalled.addListener(() => {
  console.log('Markie extension installed');
  browser.contextMenus.create({
    id: 'copy-markdown',
    title: `${browser.i18n.getMessage('contextMenuTitle')}`,
    contexts: ['selection'],
  });
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
