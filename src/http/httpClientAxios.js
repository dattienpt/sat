import evnConfig from '../configs/env';
import Axios from 'axios';
import { app } from '../index';
import { OauthUrl } from './api/requestApi';
import { requestStatus } from './requestConfig';

const commonReqConfig = {
    baseUrl: evnConfig.baseUrl.host,
    transfromRespones: [(data, header) => { return data; }],
    responesType: 'json',
    timeout: 30000,
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    }

};
const connectedFailed = {
    errorType: 2,
    message: {
        title: 'Can not connect to server'
    }
};
const axiosInstance = Axios.create(commonReqConfig);

export class NetworkAxios {
    static get token() {
        return app._store.getState().common.token;
    };
    static parseQuery = (obj) => {
        let str = '';
        for (const key in obj) {
            const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
            str += `&` + key + `=` + value;
        }
        return str.substr(1);
    };
    static reload = () => {
        //clear token
        const _host = window.location.href;
        const urlPrefix = _host.split('#')[0];
        window.location.href = `${urlPrefix}#/login`;
    };

    static getTokenRequest = (data) => {
        let url = evnConfig.baseUrl.tokenHost + OauthUrl;
        url += `?` + this.parseQuery(data);
        return axiosInstance.get(url).then(respone => respone.data)
            .catch(
                ({ respone }) => {
                    if (respone.status === 400 || respone.status === 401) {
                        return respone;
                    }
                    else {
                        return ({ data: { message: 'Sorry, the system is unstable, please try again later', code: '' } });
                    }
                }
            )
    };
    static checkStatus = async (respone) => {
        if (respone.status === requestStatus.expired) {
            await app._store.dispatch({ type: 'common/getToken', payload: 'refresh' });
            if (this.token) {
                return axiosInstance({
                    ...respone.config,
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
            }
            else {
                //reload 
            }
        }
        else if (respone.status === requestStatus.forceExpired) {
            //reload Url
        }
        else {
            return ({ data: { message: 'Sorry, the system is unstable, please try again later', code: '' } });
        }
    };
    static get = async (ulr, data) => {
        if (data) {
            url += `?` + this.parseQuery(data);
        }
        else {
            //exception
        }
        console.log(url);
        return axiosInstance.get(url, { headers: { 'Authorization': `Bearer ${this.token}` } })
            .then(respone => { return respone.data })
            .catch(respone => {
                if (respone)
                    return this.checkStatus(respone);
                else
                    return respone;
            })
    };

    static delete = async (url, options = {}) => {
        return axiosInstance.delete(url, { headers: { 'Authorization': `Bearer ${this.token}` } }, ...options)
            .then(respone => { return respone.data })
            .catch(respone => {
                if (respone)
                    return this.checkStatus(respone);
                else
                    return respone;
            });
    };
    static post = async (url, data = {}, options = {}) => {
        return axiosInstance.post(url, data, { headers: { 'Authorization': `Bearer ${this.token}` } }, ...options)
            .then(respone => { return respone.data })
            .catch(respone => {
                if (respone)
                    return this.checkStatus(respone);
                else
                    return respone;
            })
    };
    static put = async (url, data = {}, options = {}) => {
        return axiosInstance.put(url, data, { headers: { 'Authorization': `Bearer ${this.token}` } }, ...options)
            .then(respone => { return respone.data })
            .catch(respone => {
                if (respone)
                    return this.checkStatus(respone);
                else
                    return respone;
            })
    }
    static patch = async (url, data = {}, options = {}) => {
        return axiosInstance.patch(url, data, { headers: { 'Authorization': `Bearer ${this.token}` } }, ...options)
            .then(respone => { return respone.data })
            .catch(respone => {
                if (respone)
                    return this.checkStatus(respone);
                else
                    return respone;
            })
    }
}
export default {
    get(url, data) {
        return NetworkAxios.get(url, data);
    },
    post(url, data) {
        return NetworkAxios.post(url, data)
    },
    put(url, data) {
        return NetworkAxios.post(url, data)
    },
    patch(url, data) {
        return NetworkAxios.post(url, data)
    },
    delete(url, data) {
        return NetworkAxios.delete(url, data);
    }
}