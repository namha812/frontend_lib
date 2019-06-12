import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CATEGORY_SAGA, EDIT_CATEGORY_SAGA, ADD_CATEGORY_SAGA } from './index'
import { fetchCategoryApi, updateCategoryApi, createCategoryApi } from '../../../api/categoryApi';
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';
import {
  fetchCategory
} from './index'

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
    const toast = {
      message: "Sửa danh mục thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Sửa danh mục không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchCategorySaga();
}

function* addCategorySaga(action) {
  const { category } = action.payload;
  const res = yield createCategoryApi(category);
  if (res.data) {
    const toast = {
      message: "Thêm danh mục thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Thêm danh mục không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
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