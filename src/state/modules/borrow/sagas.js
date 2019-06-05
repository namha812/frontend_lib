import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_BORROW, FETCH_BORROW_SAGA, BORROW_BOOK_SAGA } from './index'
import * as borrowApi from '../../../api/borrowManagementApi';

import {
  fetchBookSaga
} from '../book/index'

import borrow from './mock.json';

import {
  fetchBorrow
} from './index'

function* fetchBorrowSaga(action) {
  // const {data} =  yield borrowApi.fetchBorrowList();
  // const borrow = data.data
  yield put(fetchBorrow(borrow));
}

function* borrowBookSaga(action) {
  yield borrowApi.borrowBookApi(action.payload);
  yield put(fetchBookSaga());
}

export default function* categorySaga() {
  yield all([
    takeEvery(FETCH_BORROW_SAGA, fetchBorrowSaga),
    takeEvery(BORROW_BOOK_SAGA, borrowBookSaga)
  ])
}