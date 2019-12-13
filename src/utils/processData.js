
export const parseQuery = (obj) => {
    let str = '';
    for (const key in obj) {
        const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
        str += `&` + key + `=` + value;
    }
    return str.substr(1);
}