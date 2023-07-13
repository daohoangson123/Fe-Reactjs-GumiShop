import axiosInstance from './axiosInstance';

const fetchUserData = (id) => {
    return axiosInstance.get(`https://reqres.in/api/users/${id}`);
};

export { fetchUserData };
