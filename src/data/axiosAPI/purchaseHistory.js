import axiosInstance from './axiosInstance';

const putPurchasedHistory = (id, userData, purHis) => {
    return axiosInstance.put(`https://reqres.in/api/users/${id}`, {
        data: {
            userData,
            purchaseHistory: [...purHis],
        },
    });
};

export { putPurchasedHistory };
