import axiosInstance from './axiosInstance';

const fetchUserData = (username, password) => {
    return axiosInstance.post('https://reqres.in/api/login', {
        username,
        password,
    });
};

export { fetchUserData };
