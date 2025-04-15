import TurndownService from 'turndown';

import { Storage } from '@plasmohq/storage';

class Turndown {
  private storage: Storage;
  private turndownService: TurndownService;

  constructor() {
    this.storage = new Storage({
      area: 'sync',
    });
  }

  async init() {
    let settings = await this.getSettings();
    if (settings) {
      this.turndownService = new TurndownService(settings);
    }

    const defaultSettings: TurndownService.Options = {
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

    await this.setSettings(defaultSettings);

    this.turndownService = new TurndownService(defaultSettings);
  }

  async getSettings() {
    const settings = await this.storage.get('turndown-settings');
    return settings || {};
  }

  async setSettings(settings: TurndownService.Options) {
    await this.storage.set('turndown-settings', settings);

    this.turndownService = new TurndownService(settings);
  }

  convert(html: string) {
    return this.turndownService.turndown(html);
  }
}
const turndown = new Turndown();

turndown.init().then(() => {
  console.log('Turndown settings storage initialized');
});

export default turndown;
