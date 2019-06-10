import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_CLASS_SAGA, ADD_CLASS_SAGA, EDIT_CLASS_SAGA } from './index'
import { fetchClassApi, updateClassApi, createClassApi } from '../../../api/classApi';

import { fetchClass } from './index'

function* fetchClassSaga(action) {
    const {data} =  yield fetchClassApi()
    const classes = data.data
    yield put(fetchClass(classes));
}

function* editClass(action) {
  const { classes } = action.payload;
  const res = yield updateClassApi(classes);
  if (res.data) {
    //TODO:
  }
  yield fetchClassSaga();
}

function* addCategorySaga(action) {
  const { classes } = action.payload;
  const res = yield createClassApi(classes);
  if (res.data) {
    //TODO:
  }
  yield fetchClassSaga();
}

export default function* classSaga() {
  yield all([
    takeEvery(FETCH_CLASS_SAGA, fetchClassSaga),
    takeEvery(ADD_CLASS_SAGA, addCategorySaga),
    takeEvery(EDIT_CLASS_SAGA, editClass)
  ])
}