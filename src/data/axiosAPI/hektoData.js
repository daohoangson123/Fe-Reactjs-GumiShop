import axiosInstance from './axiosInstance';

const fetchHektoApi = () => {
    return axiosInstance.get('https://fe21-db.vercel.app/hekto');
};

export { fetchHektoApi };
