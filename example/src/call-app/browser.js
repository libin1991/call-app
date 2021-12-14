
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOriginalChrome = exports.isQzone = exports.isQQBrowser = exports.isQQ = exports.isBaidu = exports.isWeibo = exports.isWechat = exports.isIos = exports.isAndroid = exports.getWeChatVersion = exports.getIOSVersion = exports.semverCompare = void 0;
const ua = navigator.userAgent || '';
// 版本号比较
const semverCompare = (verionA, versionB) => {
    // eslint-disable-next-line no-restricted-properties
    const { isNaN } = window;
    const splitA = verionA.split('.');
    const splitB = versionB.split('.');
    for (let i = 0; i < 3; i++) {
        const snippetA = Number(splitA[i]);
        const snippetB = Number(splitB[i]);
        if (snippetA > snippetB)
            return 1;
        if (snippetB > snippetA)
            return -1;
        // e.g. '1.0.0-rc' -- Number('0-rc') = NaN
        if (!isNaN(snippetA) && isNaN(snippetB))
            return 1;
        if (isNaN(snippetA) && !isNaN(snippetB))
            return -1;
    }
    return 0;
};
exports.semverCompare = semverCompare;
/**
 * 获取 ios 大版本号
 */
const getIOSVersion = () => {
    const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return Number.parseInt(version[1], 10);
};
exports.getIOSVersion = getIOSVersion;
/**
 * 获取 微信 版本号
 */
const getWeChatVersion = () => {
    const version = navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i);
    return version[1];
};
exports.getWeChatVersion = getWeChatVersion;
exports.isAndroid = /android/i.test(ua);
exports.isIos = /iphone|ipad|ipod/i.test(ua);
exports.isWechat = /micromessenger\/([\d.]+)/i.test(ua);
exports.isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua);
exports.isBaidu = /(baiduboxapp)\/([\d.]+)/i.test(ua);
exports.isQQ = /qq\/([\d.]+)/i.test(ua);
exports.isQQBrowser = /(qqbrowser)\/([\d.]+)/i.test(ua);
exports.isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua);
// 安卓 chrome 浏览器，包含 原生chrome浏览器、三星自带浏览器、360浏览器以及早期国内厂商自带浏览器
exports.isOriginalChrome = /chrome\/[\d.]+ mobile safari\/[\d.]+/i.test(ua) && exports.isAndroid && ua.indexOf('Version') < 0;
