import baseApi from './baseApi'

export const fetchCategoryApi = () => {
    return baseApi.get('/category');
}