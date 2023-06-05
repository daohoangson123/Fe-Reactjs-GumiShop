import axiosInstance from './axiosInstance';

const fetchProductApi = () => {
    return axiosInstance.get('https://fe21-db.vercel.app/gummi');
};

export { fetchProductApi };
