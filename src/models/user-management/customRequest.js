import API from '../../http/httpClientAxios';
 export function postApi(payload){
     return API.post(payload[0],payload[1]);
     
 } 