import axiosInstance from './axiosInstance';

const logoutRequest = () => {
    return axiosInstance.post('https://reqres.in/api/logout');
};

export { logoutRequest };
