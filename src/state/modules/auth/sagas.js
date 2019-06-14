import { all, put, select, takeEvery } from 'redux-saga/effects';
import { LOGIN_SAGA, CHECK_LOGIN, LOGOUT_SAGA } from './index'
import { loginApi } from '../../../api/userApi';
import { fetchStudent } from '../../../api/studentApi';
import { routeType } from '../routing/index'
import { constants } from '../../../containers/ToastNotification';
import { showToast } from '../notification/index';
import {
  loadingLogin,
  loadedLogin,
  logout
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
  const res = yield loginApi(user);
  if (res.data) {
    const toast = {
      message: "Đăng nhập thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('fullname', res.data.user.fullName);
    localStorage.setItem('email', res.data.user.email);
    localStorage.setItem('id', res.data.user.id);
    localStorage.setItem('role', res.data.user.role);
    yield put(loadedLogin(res.data));
    yield put({ type: ROUTE_HOME });
  }
  if (res.err) {
    const toast = {
      message: "Đăng nhập không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
};

function* checkLoginSaga(action) {
  const tokenLocal = localStorage.getItem('token');
  const fullName = localStorage.getItem('fullname');
  const email = localStorage.getItem('email');
  const id = localStorage.getItem('id');
  const role = localStorage.getItem('role');
  const data = yield fetchStudent(tokenLocal);
  // yield put(loadedLogin({
  //   token: "test",
  //   user: {
  //     fullName: "namhoang",
  //     email: "123456@gmail.com",
  //     id: 1,
  //     role: 1
  //   }
  // }));
  const routeState = yield select(routeType);
  if (!data.err) {
    yield put(loadedLogin({
      token: tokenLocal,
      user: {
        fullName,
        email,
        id,
        role
      }
    }));
    if (routeState === 'route/ROUTE_LOGIN') {
      yield put({
        type: "route/ROUTE_HOME"
      })
    }
  } else {
    if (routeState !== "route/ROUTE_HOME") {
      yield put({
        type: "route/ROUTE_LOGIN"
      })
    }
  }
}

function* logoutSaga(action) {
  localStorage.removeItem('token');
  localStorage.removeItem('fullname');
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('role');
  yield put(logout());
  yield put({
    type: "route/ROUTE_HOME"
  });
}

export default function* auth() {
  yield all([
    takeEvery(LOGIN_SAGA, loginSaga),
    takeEvery(CHECK_LOGIN, checkLoginSaga),
    takeEvery(LOGOUT_SAGA, logoutSaga)
  ])
}