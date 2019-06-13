import { all, put, takeEvery, select } from 'redux-saga/effects';
import { FETCH_ACCOUNT_SAGA, EDIT_ACCOUNT_SAGA, ADD_ACCOUNT_SAGA } from './index'
import { fetchAccountApi, addAccountApi, updateAccountApi } from '../../../api/accountApi';
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';
import {getToken} from '../auth/index'
import {
  fetchAccount
} from './index';

function* fetchAccountSaga(action) {
  const token =  yield select(getToken);
  const res = yield fetchAccountApi(token);
  if (res.data) {
    const account = res.data.data
    yield put(fetchAccount(account));
  }
  if(res.err){
    const toast = {
      message: "Xảy ra lỗi",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  
}

function* editAccountSaga(action) {
  const token =  yield select(getToken);
  const { account } = action.payload;
  const res = yield updateAccountApi(account, token);
  if (res.data) {
    const toast = {
      message: "Sửa tài khoản thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Sửa tài khoản không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchAccountSaga();
}

function* addCategorySaga(action) {
  const token =  yield select(getToken);
  const { account } = action.payload;
  const res = yield addAccountApi(account, token);
  if (res.data) {
    const toast = {
      message: "Thêm tài khoản thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Thêm tài khoản không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchAccountSaga();
}
export default function* AccountSaga() {
  yield all([
    takeEvery(FETCH_ACCOUNT_SAGA, fetchAccountSaga),
    takeEvery(EDIT_ACCOUNT_SAGA, editAccountSaga),
    takeEvery(ADD_ACCOUNT_SAGA, addCategorySaga),
  ])
}