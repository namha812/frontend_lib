import baseApi from './baseApi'

export const fetchClassApi = (token) => {
    return baseApi(token).get('/class').then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const updateClassApi = (classes,token) => {
    return baseApi(token).put('/class/' + classes.id, classes).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const createClassApi = (classes,token) => {
    return baseApi(token).post('/class', classes).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}