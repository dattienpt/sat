import { setupJsBridge } from './setupJsBridge';

export function getToken(options, callback) {
    if (typeof options !== 'string') {
        options = JSON.stringify(options);
    }
    setupJsBridge((_jsBridge) => { _jsBridge.callback('getToken', options, callback) });
}