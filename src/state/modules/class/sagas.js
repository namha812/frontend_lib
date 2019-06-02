import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CLASS_SAGA } from './index'
// import { fetchCategoryApi } from '../../../api/categoryApi';

import { fetchClass } from './index'
import classMock from './class.json';
import {
  ROUTE_HOME
} from '../routing'

function* fetchClassSaga(action) {
    // const {data} =  yield fetchClassApi()
    // const category = data.data
    yield put(fetchClass(classMock));
}

export default function* classSaga() {
  yield all([
    takeEvery(FETCH_CLASS_SAGA, fetchClassSaga)
  ])
}