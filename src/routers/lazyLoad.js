import { lazy } from 'react';
const lazyImport = (filename) => {
    return lazy(() => import('../views/' + filename))
}
export const userList = lazyImport('user-management/userList/userList');
export const userForm = lazyImport('user-management/userForm/userForm');
export const dashboard = lazyImport('dashboard/dashboard');
export const LoginForm = lazyImport('authentication/loginForm');

