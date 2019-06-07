import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CATEGORY_SAGA, EDIT_CATEGORY_SAGA, ADD_CATEGORY_SAGA } from './index'
import { fetchCategoryApi, updateCategoryApi, createCategoryApi } from '../../../api/categoryApi';

import {
  fetchCategory
} from './index'
import {
  ROUTE_HOME
} from '../routing'

function* fetchCategorySaga(action) {
  const { data } = yield fetchCategoryApi()
  if (data) {
    yield put(fetchCategory(data.data));
  }
}

function* editCategorySaga(action) {
  const { category } = action.payload;
  const res = yield updateCategoryApi(category);
  if (res.data) {
    //TODO:
  }
  yield fetchCategorySaga();
}

function* addCategorySaga(action) {
  const { category } = action.payload;
  const res = yield createCategoryApi(category);
  if (res.data) {
    //TODO:
  }
  yield fetchCategorySaga();
}
export default function* categorySaga() {
  yield all([
    takeEvery(FETCH_CATEGORY_SAGA, fetchCategorySaga),
    takeEvery(EDIT_CATEGORY_SAGA, editCategorySaga),
    takeEvery(ADD_CATEGORY_SAGA, addCategorySaga)
  ])
}