import baseApi from './baseApi'

export const fetchClassApi = () => {
    return baseApi.get('/class').then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const updateClassApi = (classes) => {
    return baseApi.put('/class/' + classes.id, classes).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const createClassApi = (classes) => {
    return baseApi.post('/class', classes).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}