import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CLASS_SAGA, ADD_CLASS_SAGA, EDIT_CLASS_SAGA } from './index'
import { fetchClassApi, updateClassApi, createClassApi } from '../../../api/classApi';
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';
import { fetchClass } from './index'
import {getToken} from '../auth/index';
function* fetchClassSaga(action) {
    const token =  yield select(getToken);
    const res =  yield fetchClassApi(token)
    if(res.err){
      const toast = {
        message: "Có lỗi xảy ra",
        action: "Dismiss",
        type: constants.FAILED
      }
      yield put(showToast(toast));
    }
    if(res.data) {
      const classes = res.data.data;
      yield put(fetchClass(classes));
    }
}

function* editClass(action) {
  const token =  yield select(getToken);
  const { classes } = action.payload;
  const res = yield updateClassApi(classes, token);
  if (res.data) {
    const toast = {
      message: "Sửa thông tin lớp thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Sửa thông tin lớp không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchClassSaga();
}

function* addClassSaga(action) {
  const token =  yield select(getToken);
  const { classes } = action.payload;
  const res = yield createClassApi(classes, token);
  if (res.data) {
    const toast = {
      message: "Thêm lớp thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Thêm mới lớp không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchClassSaga();
}

export default function* classSaga() {
  yield all([
    takeEvery(FETCH_CLASS_SAGA, fetchClassSaga),
    takeEvery(ADD_CLASS_SAGA, addClassSaga),
    takeEvery(EDIT_CLASS_SAGA, editClass)
  ])
}