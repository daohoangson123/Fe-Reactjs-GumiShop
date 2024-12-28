import axiosInstance from './axiosInstance';

const fetchUserList = (number) => {
    return axiosInstance.get(`https://reqres.in/api/users?page=${number}`);
};

// const userList = (token) => {
//     return axiosInstance.get('http://localhost:4000/api/users/fetch', {
//         headers: {
//             authorization: `Bearer ${token}`,
//         },
//     });
// };

export { fetchUserList };
