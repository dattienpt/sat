import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';
import evnConfig from "../configs/env";
import { FormattedDate } from 'umi-plugin-react/locale';
import NetworkAxios  from './httpClientAxios';
const aesPub = getAESKey();
const rsa_publicKey = '30819F300D06092A864886F70D010101050003818D00308189028181008E5328628A0B061237AD991C84C64EE2DD8B335641AB6C002901E850C5D2F6BF60FF9B21A82AC1BB58A3BF8379624FC9E0989D6C96A51D8A57303B4D759E95448EFCFE503FD3F1B69CB6D41D1D8DA0FA502547BD5FC3D8D14ABF70962E5BE35A94F2B2067977E8D96D3D6F0875316D9B6C7EF3CBBCFF40B3F70B4D788D6C2DF70203010001'
const publicKey = '98789ufijksbdghjdasjfafoidpbhjersoidhjresoghfsdogifhdjrwesgipfjekkogfjdk';

export function encryptPassToken(password) {
    //const key1 = CryptoJS.MD5('295990').toString(CryptoJS.enc.Hex);
    //const key2 = CryptoJS.HmacSHA256(password, key1).toString(CryptoJS.enc.Base64);
    const passwordTime = password + "$CurTime=" + (new Date().valueOf());
    let encryptOjc = new JSEncrypt();
    encryptOjc.setPublicKey(rsa_publicKey);
    return encryptOjc.getKey().encrypt(passwordTime).toUpperCase();
}

function getAESKey() {
    let key = [];
    for (let i = 0; i < 16; i++) {
        let num = Math.floor(Math.random() * 26);
        let charStr = String.fromCharCode(97 + num);
        key.push(charStr.toUpperCase());
    }
    const result = key.join('');
    return result;
}

function addSign(params) {
    let source = "";
    Object.keys(params).sort().forEach((key) => {
        source += `${key}=${params[key]},`;
    });
    source.slice(0, -2);
    return CryptoJS.SHA256(`{${source}}`).toString(CryptoJS.enc.Hex);
}

function processRespone(data) {
    if (data) {
        if (typeof data == 'string') {
            const result = JSON.parse(decodeAES(data, aesPub));
            return result;
        }
        else {
            return data;
        }
    }
    return data;
}

function decodeAES(value, aesPub) {
    const aesKey = CryptoJS.enc.Utf8.parse(aesPub);
    const decrypted = CryptoJS.AES.decrypt(value, aesKey, {
        iv: CryptoJS.enc.Utf8.parse('1234567812345678'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Utf8.stringify(decrypted).trim();
}
function encryptAES(value, aesPub) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.AES.encrypt(value, CryptoJS.enc.Utf8.parse(aesPub), {
        iv: CryptoJS.enc.Utf8.parse('1234567812345678'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    }).ciphertext);
}

function processRequest(params, cfg) {
    const nowtime = new Date();
    const timestamp = nowtime.getTime();
    let result = {};
    let requestData = null;
    let encodeKey = null;
    if (cfg.req !== false) {
        requestData = encryptAES(JSON.stringify(Object.assign({}, params), aesPub));
        encodeKey = encryptRSA(aesPub);
        Object.assign(result, evnConfig.baseUrl.params, {
            requestId: timestamp,
            timestamp: FormattedDate(nowtime, 'yyyyMMddhhmmss'),
            requestData,
            encodeKey
        });
        const sign = addSign(result);
        result.sign = sign;
    }
    else {
        result = Object.assign(evnConfig.baseUrl.params, params, {
            requestId: timestamp,
            timestamp: FormattedDate(nowtime, 'yyyyMMddhhmmss')
        });
    }
    return result;
}


function encryptRSA(value) {
    let encryptObj = new JSEncrypt();
    encryptObj.setPublicKey(publicKey);
    return encryptObj.encrypt(value);
}

// export default new NetworkAxios({
//     processRequest, processRespone, aesPub
// });
export function decrypt(data) {
    return processRespone(data);
}
