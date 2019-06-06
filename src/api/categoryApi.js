import baseApi from './baseApi'

export const fetchCategoryApi = () => {
    return baseApi.get('/category');
}

export const updateCategoryApi = (category) => {
    return baseApi.put('/category/'+ category.id, category);
}

export const createCategoryApi = (category) => {
    return baseApi.post('/category', category);
}