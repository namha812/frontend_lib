import axios from 'axios'

const baseApi = axios.create({
        baseURL: 'http://192.168.80.165:3001',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJIw6AgVsSDbiBOYW0gIiwiZW1haWwiOiJuYW1oYTgxMkBnbWFpbC5jb20iLCJyb2xlIjoiMSIsImlhdCI6MTU1OTc5MDEwNSwiZXhwIjoxNTU5ODI2MTA1fQ.Ag-3ExQ6YdRwZwgiW8xLvW5kiey49IHNh2mKMpYWMIQ"
        }
    })
export default baseApi