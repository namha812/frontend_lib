import baseApi from './baseApi'

export const fetchBook = () => {
  return baseApi.get('/Book');
}

export const addBook = (book) => {
  return baseApi.post('/book', book);
}

export const updateBook = (book) => {
  const { id } = book;
  return baseApi.put(`/Book/${id}`, book);
}

export const deleteBook = (bookId) => {
  return baseApi.delete(`/Book/${bookId}`);
}