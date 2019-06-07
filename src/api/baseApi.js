import axios from 'axios';

const token = localStorage.getItem('token');

const baseApi = axios.create({
        baseURL: 'http://192.168.80.165:3001',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? token : ""
        }
    })
export default baseApi