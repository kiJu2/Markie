import TurndownService from 'turndown';

const TURNDOWN_STORAGE_KEY = 'turndown-settings';

const defaultOptions: TurndownService.Options = {
  headingStyle: 'atx',
  hr: '---',
  br: '\n',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  fence: '```',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  preformattedCode: true,
};

export { defaultOptions, TURNDOWN_STORAGE_KEY };

export type { TurndownService };
