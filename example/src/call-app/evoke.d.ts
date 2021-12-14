/**
 * 通过 top.location.href 跳转
 * @param {string}} [uri] - 需要打开的地址
 */
export declare function evokeByLocation(uri: string): void;
/**
 * 通过 A 标签唤起
 * @param {string} uri - 需要打开的地址
 */
export declare function evokeByTagA(uri: string): void;
/**
 * 通过 iframe 唤起
 * @param {string} [uri] - 需要打开的地址
 */
export declare function evokeByIFrame(uri: string): void;
/**
 * 检测是否唤端成功
 * @param cb - 唤端失败回调函数
 * @param timeout
 */
export declare function checkOpen(failure: () => void, timeout: number): void;
