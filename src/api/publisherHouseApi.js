import baseApi from './baseApi'

export const fetchPublisherHouseApi = () => {
    return baseApi.get('/publisherHouse');
}

export const updatePublisherHouseApi = (publisher) => {
    return baseApi.put('/publisherHouse/'+ publisher.id, publisher);
}

export const addPublisherHouseApi = (publisher) => {
    return baseApi.post('/publisherHouse', publisher);
}