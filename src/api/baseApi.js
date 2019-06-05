import axios from 'axios'

const baseApi = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJIw6AgVsSDbiBOYW0gIiwiZW1haWwiOiJuYW1oYTgxMkBnbWFpbC5jb20iLCJpYXQiOjE1NTk3MjYwODMsImV4cCI6MTU1OTc2MjA4M30.qQZMWUnU1adMhcAtC5He1C847p6jjowSqiqYaS0v_UI"
        }
    })
export default baseApi