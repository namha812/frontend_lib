import { all, put, takeEvery } from 'redux-saga/effects';
import { FETCH_ACCOUNT_SAGA, EDIT_ACCOUNT_SAGA, ADD_ACCOUNT_SAGA } from './index'
import { fetchAccountApi, addAccountApi, updateAccountApi } from '../../../api/accountApi';

import {
  fetchAccount
} from './index';

function* fetchAccountSaga(action) {
  const { data } = yield fetchAccountApi();
  const account = data.data
  yield put(fetchAccount(account));
}

function* editAccountSaga(action) {
  const { account } = action.payload;
  const res = yield updateAccountApi(account);
  if (res.data) {
    //TODO:
  }
  yield fetchAccountSaga();
}

function* addCategorySaga(action) {
  const { account } = action.payload;
  const res = yield addAccountApi(account);
  if (res.data) {
    //TODO:
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