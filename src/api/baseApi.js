import axios from 'axios';

// const token = localStorage.getItem('token');

const baseApi = (token) => axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? token : ""
        }
    })
export default baseApi