import { useEffect, useState } from 'react';

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

  return (
    <div className="p-4 space-y-4 w-80">
      <h1 className="text-lg font-bold text-center">📝 Markie 설정</h1>

      {/* headingStyle */}
      <div className="form-control">
        <label className="label">제목 스타일</label>
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
        <label className="label">리스트 마커</label>
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
        <label className="label">코드 블럭 스타일</label>
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
        <label className="label">기울임 구분자</label>
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
        <label className="label">굵게 구분자</label>
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
        <label className="label">코드 Fence</label>
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
        <label className="label">링크 스타일</label>
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
        <label className="label">링크 참조 방식</label>
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
          <span className="label-text">프리포맷 코드 유지</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={turndownSettings.preformattedCode}
            onChange={(e) => handleChange('preformattedCode', e.target.checked)}
          />
        </label>
      </div>

      <div className="mt-2 text-xs text-center text-gray-500">
        설정은 자동으로 저장됩니다 💾
      </div>
    </div>
  );
}

export default IndexPopup;
