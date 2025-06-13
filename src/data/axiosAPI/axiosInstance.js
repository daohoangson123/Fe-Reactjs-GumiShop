import axios from 'axios';
//

const instance = axios.create({
    baseURL: 'https://reqres.in/',
    headers: {
        'x-api-key': 'reqres-free-v1',
    },
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return error.response.data;
    }
);

export default instance;
