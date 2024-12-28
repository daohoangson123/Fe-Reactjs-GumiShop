import axiosInstance from './axiosInstance';

const fetchGumiApi = (token) => {
    return axiosInstance.get('http://localhost:4000/api/products/fetch', {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};

const fetchGumiProduct = (id) => {
    return axiosInstance.post(`http://localhost:4000/api/products/fetch/${id}`);
};

export { fetchGumiApi, fetchGumiProduct };
