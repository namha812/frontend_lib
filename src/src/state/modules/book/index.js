import { createReducer } from '../../reducers/helper'

export const FETCH_BOOK = 'fetch BOOK';
export const FETCHING_BOOK = 'fetching BOOK';
export const FETCHED_BOOK = 'fetched BOOK';
export const FETCH_BOOK_SAGA = 'fetch BOOK saga';
export const ADD_BOOK = 'add BOOK';
export const ADD_BOOK_SAGA = 'add BOOK saga';
export const EDIT_BOOK = 'EDIT BOOK';
export const EDIT_BOOK_SAGA = 'EDIT BOOK saga';
export const DELETE_BOOK = 'DELETE BOOK';
export const DELETE_BOOK_SAGA = 'DELETE BOOK saga';
export const FETCHED_BOOK_ERROR = 'fetch BOOK error';

const defaultState = {
  fetched: false,
  fetching: false,
  error: null,
  books: []
}
const bookReducer = createReducer(defaultState, {
  [FETCHING_BOOK]: (state, action) => ({
    ...state,
    fetching: true,
    fetched: false
  }),
  [FETCHED_BOOK]: (state, action) => ({
    ...state,
    fetching: false,
    fetched: true
  }),
  [FETCH_BOOK]: (state, action) => {
    return  {
      ...state,
      books: action.payload.books
    }
  },
  [FETCHED_BOOK_ERROR]: (state, action) => ({
    ...state,
    fetching: false,
    fetched: true,
    books: [],
    error: action.payload.message
  }),
})

export const fetchBook = (books) => ({
  type: FETCH_BOOK,
  payload: {
    books
  }
})
export const fetchBookSaga = (payload) => ({
  type: FETCH_BOOK_SAGA,
})

export const fetchingBook = () => ({
  type: FETCHING_BOOK
})
export const fetchedBook = () => ({
  type: FETCHED_BOOK
})
export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: {
    book
  }
})
export const addBookSaga = (book) => ({
  type: ADD_BOOK_SAGA,
  payload: {
    book
  }
})
export const editBook = (book) => ({
  type: EDIT_BOOK,
  payload: {
    book
  }
})
export const editBookSaga = (book) => ({
  type: EDIT_BOOK_SAGA,
  payload: {
    book
  }
})
export const deleteBook = (book) => ({
  type: DELETE_BOOK,
  payload: {
    book
  }
})
export const deleteBookSaga = (bookId) => ({
  type: DELETE_BOOK_SAGA,
  payload:{
    bookId
  }
})
export const fetchBookError = (message) => ({
  type: FETCHED_BOOK_ERROR,
  payload:{
    message
  }
})

export const getBook = (state) => state.book;

export default bookReducer;