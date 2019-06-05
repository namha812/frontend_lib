import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCH_BOOK_SAGA,
  ADD_BOOK_SAGA,
  EDIT_BOOK_SAGA,
  DELETE_BOOK_SAGA,
  FETCHED_BOOK,
  FETCHING_BOOK,
  FETCH_BOOK,
} from './index'
import {
  addBook as addBookApi,
  updateBook as updateBookApi,
  fetchBook as fetchBookApi,
  deleteBook as deleteBookApi
} from '../../../api/bookApi';
import {
  addBook,
  fetchBook,
  fetchingBook,
  fetchedBook,
  fetchBookError
} from './index'
import bookMock from './books.json'

function* fetchBookSaga(action) {
  yield put(fetchingBook());
  // const res = yield fetchBookApi();
  // if (res.data) {
  //   yield put(fetchBook(res.data.data));
  // }
  yield put(fetchBook(bookMock));
  yield put(fetchedBook())
}

function* addBookSaga(action) {
  const { book } = action.payload;
  yield put(fetchingBook());
  const res = yield addBookApi(book);
  if (res.data) {
    //TODO:
  }
  yield fetchBookSaga();
}

function* editBookSaga(action) {
  const { book } = action.payload;
  yield put(fetchingBook());
  const res = yield updateBookApi(book);
  if (res.data) {
    //TODO:
  }
  yield fetchBookSaga();
}

function* deleteBookSaga(action) {
  const { bookId } = action.payload;
  yield put(fetchingBook());
  const res = yield deleteBookApi(bookId);
  if (res.data) {
    //TODO:
  }
  yield fetchBookSaga();
}

export default function* student() {
  yield all([
    takeEvery(FETCH_BOOK_SAGA, fetchBookSaga),
    takeEvery(ADD_BOOK_SAGA, addBookSaga),
    takeEvery(EDIT_BOOK_SAGA, editBookSaga),
    takeEvery(DELETE_BOOK_SAGA, deleteBookSaga)
  ])
}