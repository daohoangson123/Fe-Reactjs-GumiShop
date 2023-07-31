import axiosInstance from './axiosInstance';

const fetchReqresProducts = () => {
    return axiosInstance.get('https://reqres.in/api/unknown');
};

export { fetchReqresProducts };
