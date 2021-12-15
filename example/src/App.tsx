import React from 'react';
import CallApp, {
  Browser, generate, evokeByLocation, evokeByTagA, evokeByIFrame, checkOpen, copy
} from './lib/index.js';
import './App.css';

const option: any = {
  scheme: {
    protocol: 'zhihu',
  },
  intent: {
    package: 'com.zhihu.android',
    scheme: 'zhihu',
  },
  universal: {
    host: 'oia.zhihu.com',
  },
  appstore: 'https://itunes.apple.com/cn/app/id432274380',
  yingyongbao: '//a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android',
  fallback: 'https://oia.zhihu.com/',
  timeout: 2000,
};

const lib = new CallApp(option);

const ua = navigator.userAgent || '';

function evoke(url: string) {
  var iFrame;

  iFrame = document.createElement('iframe');
  iFrame.setAttribute('src', url);
  iFrame.setAttribute('style', 'display:none;');
  iFrame.setAttribute('height', '0px');
  iFrame.setAttribute('width', '0px');
  iFrame.setAttribute('frameborder', '0');
  document.body.appendChild(iFrame);

  iFrame = null;
}

function evokeByLocationByTsx(uri: string): void {
  window.location.href = uri;
}

function evokeByTagAByTsx(uri: string): void {
  const tagA = document.createElement('a');

  tagA.setAttribute('href', uri);
  tagA.style.display = 'none';
  document.body.append(tagA);

  tagA.click();
}

function App() {
  return (
    <div className="App">
      <button
        onClick={() => {
          alert(ua);
        }}
      >
        ua
      </button>
      <button
        onClick={() => {
          evoke('zhihu://question/270839820');
        }}
      >
        schema - iframe
      </button>
      <button
        onClick={() => {
          evokeByLocationByTsx('zhihu://question/270839820');
        }}
      >
        schema - location
      </button>
      <button
        onClick={() => {
          evokeByTagAByTsx('zhihu://question/270839820');
        }}
      >
        schema - A Tag
      </button>
      <button
        onClick={() => {
          evokeByLocationByTsx(lib.generateIntent({ path: '' }));
        }}
      >
        intent - location
      </button>
      <button
        onClick={() => {
          evokeByLocation('https://oia.zhihu.com/question/270839820/answer/477722658');
        }}
      >
        universal-link
      </button>
      <button
        onClick={() => {
          lib.open({ path: 'question/270839820/answer/477722658' });
          console.log(lib.generateUniversalLink({
            path: 'aaa',
            param: { a: 1, b: 2 },
            callback: () => {
              console.log(11);
            }
          }));
          copy('11111');    // 剪贴板
          console.log({ Browser, generate, evokeByLocation, evokeByTagA, evokeByIFrame, checkOpen })
        }}
      >
        callapp-lib 唤端
      </button>
    </div >
  );
}

export default App;
