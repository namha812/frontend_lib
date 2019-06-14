import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCH_BOOK_SAGA,
  ADD_BOOK_SAGA,
  EDIT_BOOK_SAGA,
  DELETE_BOOK_SAGA,
} from './index'
import {
  addBook as addBookApi,
  updateBook as updateBookApi,
  fetchBook as fetchBookApi,
  deleteBook as deleteBookApi
} from '../../../api/bookApi';
import {
  fetchBook,
} from './index'
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';
import {getToken} from '../auth/index'

function* fetchBookSaga(action) {
  const token =  yield select(getToken);
  const res = yield fetchBookApi(token);
  if(res.err){
    const toast = {
      message: "Sảy ra lỗi",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  if (res.data) {
    yield put(fetchBook(res.data.data));
  }
}

function* addBookSaga(action) {
  const { book } = action.payload;
  const token =  yield(select(getToken));
  const res = yield addBookApi(book,token);
  if (res.data) {
    const toast = {
      message: "Thêm sách thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Thêm sách không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchBookSaga();
}

function* editBookSaga(action) {
  const { book } = action.payload;
  const token =  yield select(getToken);
  const res = yield updateBookApi(book,token);
  if (res.data) {
    const toast = {
      message: "Sửa thông tin sách thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  yield fetchBookSaga();
}

function* deleteBookSaga(action) {
  const { bookId } = action.payload;
  const token =  yield select(getToken);
  const res = yield deleteBookApi(bookId, token);
  if (res.data) {
    const toast = {
      message: "Xóa thông tin sách thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
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