export const setJsonData = data => {
   return JSON.stringify(data);
};

export const getJsonData = data => {
   return JSON.parse(data);
}

export const setUserInfo = value => {
   if (typeof value === 'object') {
      value = setJsonData(value);
   }
   localStorage.setItem("userInfo", value);
};

export const getUserInfo = () => {
   return getJsonData(localStorage.getItem("userInfo"));
};

export const clearUserInfo = () => {
   localStorage.removeItem("userInfo");
};
