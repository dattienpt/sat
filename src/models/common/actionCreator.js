export function setToken(token) {
   return { type: "common/setToken", payload: token };
}
export function clearToken() {
   return { type: "common/clearToken" };
}
export function renewToken(token) {
   return { type: "common/renewToken", payload: token };
}
