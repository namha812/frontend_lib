import baseApi from './baseApi'

export const fetchBorrowList = () => {
  return baseApi.get('/borrowPay');
}

export const fetchBorrowById = (id) => {
  return baseApi.get(`/payment/${id}`);
}

export const borrowBookApi = (payload) => {
  return baseApi.post('/borrowPay/borrow', payload);
}

export const giveBookBack = (payload) => {
    return baseApi.post('/aaaaa', payload);

}
