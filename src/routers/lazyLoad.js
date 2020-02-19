import { lazy } from 'react';
const lazyImport = (filename) => {
    return lazy(() => import('../views/' + filename))
}
export const userList = lazyImport('user-management/userList/userList');
export const userForm = lazyImport('user-management/userForm/userForm');
export const userDetail = lazyImport('user-management/userDetail/userDetail');
export const dashboard = lazyImport('dashboard/dashboard');
export const ClientList = lazyImport('clients/clientList/clientList');
export const clientDetail = lazyImport('clients/clientList/clientDetail/clientDetail');
export const productList = lazyImport('products/productList/productList');
export const LoginForm = lazyImport('authentication/loginForm');

