import axiosInstance from './axiosInstance';

const logoutRequest = () => {
    return axiosInstance.post('https://reqres.in/api/logout');
};

// const userLogout = (email, token) => {
//     return axiosInstance.post(
//         'http://localhost:4000/auth/logout',
//         { email: email },
//         {
//             headers: {
//                 authorization: `Bearer ${token}`,
//             },
//         }
//     );
// };

export { logoutRequest };
