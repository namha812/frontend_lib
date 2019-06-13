import baseApi from './baseApi'

export const fetchCategoryApi = (token) => {
    return baseApi(token).get('/category').then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const updateCategoryApi = (category,token) => {
    return baseApi(token).put('/category/' + category.id, category).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const createCategoryApi = (category,token) => {
    return baseApi(token).post('/category', category).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}