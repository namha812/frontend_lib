import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CATEGORY_SAGA } from './index'
// import { fetchCategoryApi } from '../../../api/categoryApi';

import {
    fetchCategory
} from './index'
import category from './category.json';
import {
  ROUTE_HOME
} from '../routing'

function* fetchCategorySaga(action) {
    // const {data} =  yield fetchCategoryApi()
    // const category = data.data
    yield put(fetchCategory(category));
}

export default function* categorySaga() {
  yield all([
    takeEvery(FETCH_CATEGORY_SAGA, fetchCategorySaga)
  ])
}