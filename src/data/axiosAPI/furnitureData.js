import axiosInstance from './axiosInstance';

const fetchFurnitureApi = () => {
    return axiosInstance.get('https://fe21-db.vercel.app/furniture');
};

export { fetchFurnitureApi };
