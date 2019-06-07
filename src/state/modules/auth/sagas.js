import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { LOGIN_SAGA, CHECK_LOGIN } from './index'
import { loginApi, signupApi } from '../../../api/userApi';
import { fetchStudent } from '../../../api/studentApi';
import { routeType } from '../routing/index'

import {
  loadingLogin,
  loadedLogin,
  errorLogin
} from './index'

import {
  ROUTE_HOME
} from '../routing'

function* loginSaga(action) {
  const { username, password } = action.payload;
  const user = {
    email: username,
    password
  }
  yield put(loadingLogin());
  const res = yield loginApi(user);
  if (res.data) {
    yield put(loadedLogin(res.data));
    yield put({ type: ROUTE_HOME })
  }
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('fullname', res.data.user.fullName);
  localStorage.setItem('email', res.data.user.email);
  localStorage.setItem('id', res.data.user.id);
  localStorage.setItem('role', res.data.user.role);

};

function* checkLoginSaga(action) {
  const token = localStorage.getItem('token');
  const fullName = localStorage.getItem('fullname');
  const email = localStorage.getItem('email');
  const id = localStorage.getItem('id');
  const role = localStorage.getItem('role');
  const data = yield fetchStudent();
  const routeState = yield select(routeType);
  if (!data.err) {
    yield put(loadedLogin({
      token: token,
      user: {
        fullName,
        email,
        id,
        role
      }
    }));
  } else {
    if (routeState !== "route/ROUTE_HOME") {
      yield put({
        type: "route/ROUTE_LOGIN"
      })
    }

  }
}

export default function* auth() {
  yield all([
    takeEvery(LOGIN_SAGA, loginSaga),
    takeEvery(CHECK_LOGIN, checkLoginSaga)
  ])
}