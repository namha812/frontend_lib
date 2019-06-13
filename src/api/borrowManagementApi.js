import baseApi from './baseApi'

export const fetchBorrowList = (token) => {
  return baseApi(token).get('/borrowPay').then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const fetchBorrowById = (id,token) => {
  return baseApi(token).get(`/payment/${id}`).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const borrowBookApi = (payload,token) => {
  return baseApi(token).post('/borrowPay/borrow', payload).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const payBookApi = (payload,token) => {
  const { id, ...remainsProps } = payload;
  return baseApi(token).put(`/borrowPay/payment/${payload.id}`, { ...remainsProps }).then(res => res).catch(err => ({
    ...err,
    err: true
  }));

}
