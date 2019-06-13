import baseApi from './baseApi'

export const fetchPublisherHouseApi = (token) => {
    return baseApi(token).get('/publisherHouse').then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const updatePublisherHouseApi = (publisher,token) => {
    return baseApi(token).put('/publisherHouse/'+ publisher.id, publisher).then(res => res).catch(err => ({
        ...err,
        err: true
    }));
}

export const addPublisherHouseApi = (publisher,token) => {
    return baseApi(token).post('/publisherHouse', publisher);
}