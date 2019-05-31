import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { LOGIN_SAGA } from './index'
import { loginApi, signupApi } from '../../../api/userApi';

import {
  loadingLogin,
  loadedLogin,
  errorLogin
} from './index'

import {
  ROUTE_HOME
} from '../routing'

function* loginSaga(action) {
  console.log(action);
  const { username, password } = action.payload;
  const user = {
    username,
    password
  }
  yield put(loadingLogin());
  const res = yield loginApi(user);
  if(res.data){
    yield put(loadedLogin(res.data));
    yield put( {type: ROUTE_HOME })
  }
  // yield put(loadedLogin())
}

export default function* auth() {
  yield all([
    takeEvery(LOGIN_SAGA, loginSaga)
  ])
}