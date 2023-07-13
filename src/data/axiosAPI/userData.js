import axiosInstance from './axiosInstance';

const userData = (id) => {
    return axiosInstance.get(`https://reqres.in/api/users/${id}`);
};

export { userData };
