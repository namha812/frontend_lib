import axios from 'axios'

const baseApi = axios.create({
        baseURL: 'http://192.168.80.165:3001',
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJIYSBWYW4gTmFtIiwiZW1haWwiOiJuYW1oYTgxMkBnbWFpbC5jb20iLCJpYXQiOjE1NTkyNjk0MTMsImV4cCI6MTU1OTMwNTQxM30.AwC0cWDIZQM15Vg478t6MUrfiBYUnQpp9dOHFZhzFyI"
        }
    })
export default baseApi