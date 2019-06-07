import baseApi from './baseApi'

export const fetchCategoryApi = () => {
    return baseApi.get('/category').then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const updateCategoryApi = (category) => {
    return baseApi.put('/category/' + category.id, category).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const createCategoryApi = (category) => {
    return baseApi.post('/category', category).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}