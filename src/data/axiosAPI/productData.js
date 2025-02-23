import axiosInstance from './axiosInstance';

const fetchProductApi = (signal) => {
    return axiosInstance.get('https://fe21-db.vercel.app/gummi', {
        signal,
    });
};

export { fetchProductApi };
