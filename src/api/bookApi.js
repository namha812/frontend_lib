import baseApi from './baseApi'

export const fetchBook = () => {
  return baseApi.get('/book');
}

export const addBook = (book) => {
  return baseApi.post('/book', book);
}

export const updateBook = (book) => {
  const { id } = book;
  return baseApi.put(`/book/${id}`, book);
}

export const deleteBook = (bookId) => {
  return baseApi.delete(`/book/${bookId}`);
}