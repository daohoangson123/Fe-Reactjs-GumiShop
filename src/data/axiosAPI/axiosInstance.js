import axios from 'axios';
//

const instance = axios.create({
    baseURL: 'https://reqres.in/',
});

instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // setTimeout(() => window.location.reload(), 1500);
        const errorRes = {};
        if (error.response) {
            errorRes.data = error.response.data;
            errorRes.status = error.response.status;
            errorRes.headers = error.response.headers;
        }
        return errorRes;
        // return Promise.reject(error);
    },
);

export default instance;
