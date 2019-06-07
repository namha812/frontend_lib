import axios from 'axios'

const baseApi = axios.create({
        baseURL: 'http://192.168.80.165:3001',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJIw6AgVsSDbiBOYW0gIiwiZW1haWwiOiJuYW1oYTgxMkBnbWFpbC5jb20iLCJyb2xlIjoiMSIsImlhdCI6MTU1OTg5Mjk2NywiZXhwIjoxNTU5OTI4OTY3fQ.z-mKsckmKCC_mdTAdqPF2DlnlGnmvKwOgvrxhNjxkvw"
        }
    })
export default baseApi