import baseApi from './baseApi'

export const fetchBook = (token) => {
  return baseApi(token).get('/book').then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const addBook = (book, token) => {
  return baseApi(token).post('/book', book).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const updateBook = (book, token) => {
  const { id } = book;
  return baseApi(token).put(`/book/${id}`, book).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}

export const deleteBook = (bookId, token) => {
  return baseApi(token).delete(`/book/${bookId}`).then(res => res).catch(err => ({
    ...err,
    err: true
  }));
}