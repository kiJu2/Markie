// content.ts
import TurndownService from 'turndown';
import browser from 'webextension-polyfill';

/**
 * @todo 마크다운 변환 옵션
 * @todo 다국어(중국어, 일본어, 한국어, 영어)
 * @todo 단축키 설정
 * @todo 복사 되었다는 피드백(사용자 경험 해치지 않도록 주의)
 */

type CopyMarkdownMessage = {
  action: 'COPY_MARKDOWN';
};

const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  br: '\n',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  fence: '```',
  strongDelimiter: '__',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  preformattedCode: true,
});

browser.runtime.onMessage.addListener(
  async (message: CopyMarkdownMessage, sender) => {
    if (message.action === 'COPY_MARKDOWN') {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const container = document.createElement('div');
      if (range) {
        container.appendChild(range.cloneContents());
      }

      const html = container.innerHTML;
      const markdown = turndownService.turndown(html);

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
  },
);

export {};
