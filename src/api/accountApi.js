import baseApi from './baseApi'

export const fetchAccountApi = () => {
  return baseApi.get('/account');
}

export const addAccountApi = (account) => {
  return baseApi.post('/account', account);
}

export const updateAccountApi = (account) => {
  const { id } = account;
  return baseApi.put(`/account/${id}`, account);
}