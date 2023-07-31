import axios from 'axios';
//

import mockData from './mockData.js';

const instance = axios.create({
    baseURL: 'https://reqres.in/',
});

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error.code === 'ERR_NETWORK') {
            return mockData;
        }
        const errorRes = {};
        if (error.response) {
            errorRes.data = error.response.data;
            errorRes.status = error.response.status;
            errorRes.headers = error.response.headers;
        }
        return errorRes;
    },
);

export default instance;
