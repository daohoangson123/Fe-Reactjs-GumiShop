import axiosInstance from './axiosInstance';

const fetchUserList = (number) => {
    return axiosInstance.get(`https://reqres.in/api/users?page=${number}`);
};

export { fetchUserList };
