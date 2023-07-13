import axiosInstance from './axiosInstance';

const loginRequest = (username, password) => {
    return axiosInstance.post('https://reqres.in/api/login', {
        username,
        password,
    });
};

export { loginRequest };
