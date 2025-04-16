// content.ts
// import TurndownService from 'turndown';
import { defaultOptions, TURNDOWN_STORAGE_KEY } from 'src/libs/turndown';
import TurndownService from 'turndown';
import browser from 'webextension-polyfill';

import { Storage } from '@plasmohq/storage';

/**
 * @todo ~~마크다운 변환 옵션~~
 * @todo 각 옵션에 대한 설명 추가
 * @todo 다국어(중국어, 일본어, 한국어, 영어)
 * @todo 단축키 설정
 * @todo 복사 되었다는 피드백(사용자 경험 해치지 않도록 주의)
 */

async function getTurndown() {
  const storage = new Storage({
    area: 'sync',
  });

  const turndownStorage =
    await storage.get<TurndownService.Options>(TURNDOWN_STORAGE_KEY);

  if (!turndownStorage) {
    await storage.set(TURNDOWN_STORAGE_KEY, defaultOptions);
  }

  return new TurndownService({
    ...turndownStorage,
  });
}

type CopyMarkdownMessage = {
  action: 'COPY_MARKDOWN';
};

browser.runtime.onMessage.addListener(async (message: CopyMarkdownMessage) => {
  if (message.action === 'COPY_MARKDOWN') {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const container = document.createElement('div');

    const turndown = await getTurndown();

    if (range) {
      container.appendChild(range.cloneContents());
    }

    const html = container.innerHTML;
    const markdown = turndown.turndown(html);

    try {
      await navigator.clipboard.writeText(markdown);
      console.log(markdown);
    } catch (err) {
      console.error('❌ Failed to copy:', err);
    }

    // 리턴값으로 응답
    return Promise.resolve({ status: 'success', markdown });
  }

  return false; // 메시지가 아닌 경우 false 반환
});

export {};
