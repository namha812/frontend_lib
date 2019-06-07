import baseApi from './baseApi'

export const fetchBook = () => {
  return baseApi.get('/book').then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const addBook = (book) => {
  return baseApi.post('/book', book).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const updateBook = (book) => {
  const { id } = book;
  return baseApi.put(`/book/${id}`, book).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const deleteBook = (bookId) => {
  return baseApi.delete(`/book/${bookId}`).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}