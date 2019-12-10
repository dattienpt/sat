import dev from './dev';
import prod from './prod';

const baseUrl = (function getBaseUrl() {
    console.log('ENV: ', process.env);
    switch (process.env.NODE_ENV) {
        case 'dev':
            return dev;
        case 'prod':
            return prod
        default:
            return dev;
    }
})();
export default { baseUrl };