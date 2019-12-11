import API from "../../http/httpClientAxios";
 export function PostRequest(payload){
     console.log(payload);
     
     return API.post(payload[0],payload[1])
 }