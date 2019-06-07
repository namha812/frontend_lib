import { all, put, takeEvery } from 'redux-saga/effects';
import { FETCH_HISTORY_SAGA } from './index'
import { fetchHistoryInputApi } from '../../../api/historyInputApi';

import {
  fetchHistory
} from './index'

function* fetchHistoryInputSaga(action) {
    const {data} =  yield fetchHistoryInputApi();
    console.log(data)
    const historyInput = data.data
    yield put(fetchHistory(historyInput));
}

export default function* historyInputSaga() {
  yield all([
    takeEvery(FETCH_HISTORY_SAGA, fetchHistoryInputSaga),
  ])
}