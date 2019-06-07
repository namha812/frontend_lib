import baseApi from './baseApi'

export const fetchHistoryInputApi = () => {
    return baseApi.get('/historyInput');
}