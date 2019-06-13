import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CATEGORY_SAGA, EDIT_CATEGORY_SAGA, ADD_CATEGORY_SAGA } from './index'
import { fetchCategoryApi, updateCategoryApi, createCategoryApi } from '../../../api/categoryApi';
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';
import {
  fetchCategory
} from './index'
import {getToken} from '../auth/index';

function* fetchCategorySaga(action) {
  const token =  yield select(getToken);
  const res = yield fetchCategoryApi(token);
  if(res.err){
    const toast = {
      message: "Có lỗi xảy ra",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  if(res.data) {
    const category = res.data.data;
    yield put(fetchCategory(category));
  }
}

function* editCategorySaga(action) {
  const token =  yield select(getToken);
  const { category } = action.payload;
  const res = yield updateCategoryApi(category, token);
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
  const token =  yield select(getToken);
  const { category } = action.payload;
  const res = yield createCategoryApi(category, token);
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