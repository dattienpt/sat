export const setupJsBridge = (callback) => {
    debugger
    var ua = navigator.userAgent.toLowerCase();
    console.log('Flatform', ua);
    let isIOS = ua.match(/(iphone|ipod|ipad);?/i);
    let isAndroid = ua.match('android');
    if (isIOS) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var FH5Iframe = document.createElement('iframe');
        FH5Iframe.style.display = 'none';
        FH5Iframe.src = 'https://__bridge_loaded__';
        //FH5Iframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(FH5Iframe);
        setTimeout(() => {
            document.documentElement.removeChild(FH5Iframe);
        }, 0);
    }
    else {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () { callback(window.WebViewJavascriptBridge) }, false);
        }
    }
};
