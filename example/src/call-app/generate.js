
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateYingYongBao = exports.generateUniversalLink = exports.generateIntent = exports.generateScheme = exports.buildScheme = void 0;
// 根据 param 生成 queryString
function generateQS(param) {
    const qs = typeof param !== 'undefined'
        ? Object.keys(param)
            .map((key) => `${key}=${param[key]}`)
            .join('&')
        : '';
    return qs ? `?${qs}` : '';
}
// 生成基本的 url scheme
function buildScheme(config, options) {
    const { path, param } = config;
    const { scheme, buildScheme: customBuildScheme } = options;
    if (typeof customBuildScheme !== 'undefined') {
        return customBuildScheme(config, options);
    }
    const { host, port, protocol } = scheme;
    const portPart = port ? `:${port}` : '';
    const hostPort = host ? `${host}${portPart}/` : '';
    const qs = generateQS(param);
    return `${protocol}://${hostPort}${path}${qs}`;
}
exports.buildScheme = buildScheme;
// 生成业务需要的 url scheme（区分是否是外链）
function generateScheme(config, options) {
    const { outChain } = options;
    let uri = buildScheme(config, options);
    if (typeof outChain !== 'undefined' && outChain) {
        const { protocol, path, key } = outChain;
        uri = `${protocol}://${path}?${key}=${encodeURIComponent(uri)}`;
    }
    return uri;
}
exports.generateScheme = generateScheme;
// 生成 android intent
function generateIntent(config, options) {
    const { outChain } = options;
    const { intent, fallback } = options;
    if (typeof intent === 'undefined')
        return '';
    const keys = Object.keys(intent);
    const intentParam = keys.map((key) => `${key}=${intent[key]};`).join('');
    const intentTail = `#Intent;${intentParam}S.browser_fallback_url=${encodeURIComponent(fallback)};end;`;
    let urlPath = buildScheme(config, options);
    if (typeof outChain !== 'undefined' && outChain) {
        const { path, key } = outChain;
        return `intent://${path}?${key}=${encodeURIComponent(urlPath)}${intentTail}`;
    }
    urlPath = urlPath.slice(urlPath.indexOf('//') + 2);
    return `intent://${urlPath}${intentTail}`;
}
exports.generateIntent = generateIntent;
// 生成 universalLink
function generateUniversalLink(config, options) {
    const { universal } = options;
    if (typeof universal === 'undefined')
        return '';
    const { host, pathKey } = universal;
    const { path, param } = config;
    const qs = generateQS(param);
    const newUniversalLink = `https://${host}/${path}${qs}`;
    const oldUniversalLink = `https://${host}?${pathKey}=${path}${qs.replace('?', '&')}`;
    return pathKey ? oldUniversalLink : newUniversalLink;
}
exports.generateUniversalLink = generateUniversalLink;
// 生成 应用宝链接
function generateYingYongBao(config, options) {
    const url = generateScheme(config, options);
    // 支持 AppLink
    return `${options.yingyongbao}&android_schema=${encodeURIComponent(url)}`;
}
exports.generateYingYongBao = generateYingYongBao;
