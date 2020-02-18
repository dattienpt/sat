import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';
import dev from '../configs/dev';
import moment from 'moment';
export const aesPub = getAESKey();

export function processRequest(params) {
    const nowtime = new Date();
    const timestamp = nowtime.getTime();
    let result = {};
    let requestData = null;
    let encodeKey = null;
    requestData = encryptAES((JSON.stringify(Object.assign({}, params))), aesPub);
    encodeKey = encryptRSA(aesPub);
    Object.assign(result, dev.params, {
        requestId: timestamp,
        timestamp: moment(nowtime).format('YYYYMMDDhhmmss'),
        requestData,
        encodeKey
    });
    result.sign = addSign(result);
    console.log(result);
    return result;
}

export function encryptData(data) {
    const res = CryptoJS.enc.Utf8.parse(CryptoJS.AES.encrypt(JSON.stringify(data), '12345678'));
    return CryptoJS.enc.Base64.stringify(res);
}
export function decryptData(data) {
    const res = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    return JSON.parse(CryptoJS.AES.decrypt(res, '12345678').toString(CryptoJS.enc.Utf8));
}
export function processResponse(data) {
    if (data) {
        if (typeof data == 'string') {
            return JSON.parse(decodeAES(data, aesPub));
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

function encryptRSA(value) {
    let encryptObj = new JSEncrypt();
    encryptObj.setPublicKey(dev.publicKey);
    return encryptObj.encrypt(value);
}
function addSign(params) {
    let source = "";
    Object.keys(params).sort().forEach((key) => {
        source += `${key}=${params[key]}, `;
    });
    source = source.slice(0, -2);
    return CryptoJS.SHA256(`{${source}}`).toString(CryptoJS.enc.Hex);
}


export function encryptPassToken(password) {
    const passwordTime = password + "$CurTime=" + (new Date().valueOf());
    let encryptOjc = new JSEncrypt();
    encryptOjc.setPublicKey(dev.rsa_publicKey);
    return encryptOjc.getKey().encrypt(passwordTime).toUpperCase();
}