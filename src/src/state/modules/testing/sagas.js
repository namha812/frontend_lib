import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { TESTING_SAGA, TESTING } from './index'
// import { fetchCategoryApi } from '../../../api/categoryApi';

import {
    test, testSaga
} from './index'

function* fetchTestSaga(action) {
    // const {data} =  yield fetchCategoryApi()
    // const category = data.data
    yield put(test("testing something"));
}

export default function* categorySaga() {
  yield all([
    takeEvery(TESTING_SAGA, fetchTestSaga)
  ])
}