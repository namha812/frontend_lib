import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCH_STUDENT_SAGA,
  ADD_STUDENT_SAGA,
  EDIT_STUDENT_SAGA,
  DELETE_STUDENT_SAGA,
  FETCHED_STUDENT,
  FETCHING_STUDENT,
  FETCH_STUDENT,

} from './index'
import {
  addStudent as addStudentApi,
  updateStudent as updateStudentApi,
  fetchStudent as fetchStudentApi,
  deleteStudent as deleteStudentApi
} from '../../../api/studentApi';

import {
  addStudent,
  fetchStudent,
  fetchingStudent,
  fetchedStudent,
  fetchStudentError
} from './index'

function* fetchStudentSaga(action) {
  yield put(fetchingStudent());
  const res = yield fetchStudentApi();
  console.log(res);
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
    //TODO:
  }
  yield fetchStudentSaga();
}

function* editStudentSaga(action) {
  console.log(action);
  const { student } = action.payload;
  yield put(fetchingStudent());
  const res = yield updateStudentApi(student);
  if (res.data) {
    //TODO:
  }
  yield fetchStudentSaga();
}

function* deleteStudentSaga(action) {
  const { studentId } = action.payload;
  console.log(action);
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