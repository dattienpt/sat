export function setToken(token) {
   return { type: "common/setToken", payload: token };
}
export function clearToken() {
   return { type: "common/clearToken" };
}
export function getToken(token) {
   return { type: "common/getToken", payload: token };
}
