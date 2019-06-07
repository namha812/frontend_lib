import baseApi from './baseApi'

export const fetchBorrowList = () => {
  return baseApi.get('/borrowPay').then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const fetchBorrowById = (id) => {
  return baseApi.get(`/payment/${id}`).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const borrowBookApi = (payload) => {
  return baseApi.post('/borrowPay/borrow', payload).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const payBookApi = (payload) => {
  const { id, ...remainsProps } = payload;
  return baseApi.put(`/borrowPay/payment/${payload.id}`, { ...remainsProps }).then(res => res).catch(err => ({
    ...err,
    err: true
  }));

}
