import axiosInstance from './axiosInstance';

const loginRequest = (username, password) => {
    return axiosInstance.post('https://reqres.in/api/login', {
        username,
        password,
    });
};

// const userLogin = (email, password) => {
//     return axiosInstance.post('http://localhost:4000/auth/login', {
//         email,
//         password,
//     });
// };

export { loginRequest };
