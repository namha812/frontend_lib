import { all, call, delay, fork, takeLatest, put, select, takeEvery, take } from 'redux-saga/effects';
import { FETCH_BORROW_SAGA, BORROW_BOOK_SAGA, PAY_BOOK_SAGA } from './index'
import * as borrowApi from '../../../api/borrowManagementApi';
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';

import {
  fetchBookSaga
} from '../book/index'

// import borrow from './mock.json';

import {
  fetchBorrow
} from './index'

function* fetchBorrowSaga(action) {
  const {data} =  yield borrowApi.fetchBorrowList();
  const borrow = data.data
  yield put(fetchBorrow(borrow));
}

function* borrowBookSaga(action) {
  const res = yield borrowApi.borrowBookApi(action.payload);
  if (res.data) {
    const toast = {
      message: "Mượn sách thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Mượn sách không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield put(fetchBookSaga());
}

function* payBookSaga(actions) {
  const {payload} = actions;
  const res = yield borrowApi.payBookApi(payload);
  if (res.data) {
    const toast = {
      message: "Trả sách thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Trả sách không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchBorrowSaga();
}

export default function* categorySaga() {
  yield all([
    takeEvery(FETCH_BORROW_SAGA, fetchBorrowSaga),
    takeEvery(BORROW_BOOK_SAGA, borrowBookSaga),
    takeEvery(PAY_BOOK_SAGA, payBookSaga)
  ])
}