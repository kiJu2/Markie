import { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

import { useStorage } from '@plasmohq/storage/hook';

import './styles/globals.css';

import {
  defaultOptions,
  TURNDOWN_STORAGE_KEY,
  type TurndownService,
} from 'src/libs/turndown';

// import { sendToBackground } from '@plasmohq/messaging';

function IndexPopup() {
  const [turndownSettings, setTurndownSettings, { isLoading }] =
    useStorage<TurndownService.Options>(TURNDOWN_STORAGE_KEY);

  useEffect(() => {
    if (isLoading) return;

    if (!turndownSettings) {
      setTurndownSettings(defaultOptions);
    }
  }, [turndownSettings, isLoading]);

  if (!turndownSettings) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleChange = (key: keyof TurndownService.Options, value: any) => {
    setTurndownSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const currentLang = browser.i18n.getUILanguage();
  const isRTL = currentLang.startsWith('ar');

  return (
    <div
      className={`p-4 space-y-4 w-80 ${isRTL ? 'text-right' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}>
      <h1 className="text-lg font-bold text-center">
        📝 {browser.i18n.getMessage('popupHeader')}
      </h1>

      {/* headingStyle */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupHeadingStyle')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.headingStyle}
          onChange={(e) => handleChange('headingStyle', e.target.value)}>
          <option value="atx">atx (#)</option>
          <option value="setext">setext (=, -)</option>
        </select>
      </div>

      {/* bulletListMarker */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupBulletListMarker')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.bulletListMarker}
          onChange={(e) => handleChange('bulletListMarker', e.target.value)}>
          <option value="-">-</option>
          <option value="+">+</option>
          <option value="*">*</option>
        </select>
      </div>

      {/* codeBlockStyle */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupCodeBlockStyle')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.codeBlockStyle}
          onChange={(e) => handleChange('codeBlockStyle', e.target.value)}>
          <option value="fenced">fenced (```)</option>
          <option value="indented">indented</option>
        </select>
      </div>

      {/* emDelimiter */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupEmDelimiter')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.emDelimiter}
          onChange={(e) => handleChange('emDelimiter', e.target.value)}>
          <option value="_">_</option>
          <option value="*">*</option>
        </select>
      </div>

      {/* strongDelimiter */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupStrongDelimiter')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.strongDelimiter}
          onChange={(e) => handleChange('strongDelimiter', e.target.value)}>
          <option value="__">__</option>
          <option value="**">**</option>
        </select>
      </div>

      {/* fence */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupFencedCodeBlockDelimiter')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.fence}
          onChange={(e) => handleChange('fence', e.target.value)}>
          <option value="```">```</option>
          <option value="~~~">~~~</option>
        </select>
      </div>

      {/* linkStyle */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupLinkStyle')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.linkStyle}
          onChange={(e) => handleChange('linkStyle', e.target.value)}>
          <option value="inlined">inlined</option>
          <option value="referenced">referenced</option>
        </select>
      </div>

      {/* linkReferenceStyle */}
      <div className="form-control">
        <label className="label">
          {browser.i18n.getMessage('popupLinkReferenceStyle')}
        </label>
        <select
          className="select select-bordered select-sm"
          value={turndownSettings.linkReferenceStyle}
          onChange={(e) => handleChange('linkReferenceStyle', e.target.value)}>
          <option value="full">full</option>
          <option value="collapsed">collapsed</option>
          <option value="shortcut">shortcut</option>
        </select>
      </div>

      {/* preformattedCode */}
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">
            {browser.i18n.getMessage('popupPreformattedCode')}
          </span>
          <input
            type="checkbox"
            className="checkbox"
            checked={turndownSettings.preformattedCode}
            onChange={(e) => handleChange('preformattedCode', e.target.checked)}
          />
        </label>
      </div>

      <div className="mt-2 text-xs text-center text-gray-500">
        {browser.i18n.getMessage('popupSettingsDescription')} 💾
      </div>
    </div>
  );
}

export default IndexPopup;
