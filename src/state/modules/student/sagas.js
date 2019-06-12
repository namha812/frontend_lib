import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCH_STUDENT_SAGA,
  ADD_STUDENT_SAGA,
  EDIT_STUDENT_SAGA,
  DELETE_STUDENT_SAGA,

} from './index'
import {
  addStudent as addStudentApi,
  updateStudent as updateStudentApi,
  fetchStudent as fetchStudentApi,
  deleteStudent as deleteStudentApi
} from '../../../api/studentApi';

import {
  fetchStudent,
  fetchingStudent,
  fetchedStudent,
} from './index'
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';
function* fetchStudentSaga(action) {
  yield put(fetchingStudent());
  const res = yield fetchStudentApi();
  if (res.data) {
    yield put(fetchStudent(res.data.data));
  }
  // yield put(fetchStudent(studenmock));
  yield put(fetchedStudent())
}

function* addStudentSaga(action) {
  const { student } = action.payload;
  yield put(fetchingStudent());
  const res = yield addStudentApi(student);
  if (res.data) {
    const toast = {
      message: "Thêm học sinh thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Thêm học sinh không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchStudentSaga();
}

function* editStudentSaga(action) {
  const { student } = action.payload;
  yield put(fetchingStudent());
  const res = yield updateStudentApi(student);
  if (res.data) {
    const toast = {
      message: "Sửa học sinh thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Sửa học sinh không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchStudentSaga();
}

function* deleteStudentSaga(action) {
  const { studentId } = action.payload;
  yield put(fetchingStudent());
  const res = yield deleteStudentApi(studentId);
  if (res.data) {
    //TODO:
  }
  yield fetchStudentSaga();
}

export default function* student() {
  yield all([
    takeEvery(FETCH_STUDENT_SAGA, fetchStudentSaga),
    takeEvery(ADD_STUDENT_SAGA, addStudentSaga),
    takeEvery(EDIT_STUDENT_SAGA, editStudentSaga),
    takeEvery(DELETE_STUDENT_SAGA, deleteStudentSaga)
  ])
}