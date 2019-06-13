import { all, put, takeEvery, select } from 'redux-saga/effects';
import { FETCH_HISTORY_SAGA } from './index'
import { fetchHistoryInputApi } from '../../../api/historyInputApi';
import {getToken} from '../auth/index';
import {constants} from '../../../containers/ToastNotification';
import {showToast} from '../notification/index';
import {
  fetchHistory
} from './index'

function* fetchHistoryInputSaga(action) {
    const token =  yield select(getToken);
    const res =  yield fetchHistoryInputApi(token);
    if(res.err){
      const toast = {
        message: "Có lỗi xảy ra",
        action: "Dismiss",
        type: constants.FAILED
      }
      yield put(showToast(toast));
    }
    if(res.data) {
      const historyInput = res.data.data;
      yield put(fetchHistory(historyInput));
    }
}

export default function* historyInputSaga() {
  yield all([
    takeEvery(FETCH_HISTORY_SAGA, fetchHistoryInputSaga),
  ])
}