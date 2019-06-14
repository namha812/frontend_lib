import baseApi from './baseApi'

export const fetchHistoryInputApi = (token) => {
    return baseApi(token).get('/historyInput').then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}