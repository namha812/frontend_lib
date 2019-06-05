import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_PUBLISHING_SAGA } from './index'
// import { fetchCategoryApi } from '../../../api/categoryApi';

import { fetchPublishing } from './index'
import publishmock from './publisingCompany.json';

function* fetchPublishingSaga(action) {
    // const {data} =  yield fetchClassApi()
    // const category = data.data
    yield put(fetchPublishing(publishmock));
}

export default function* publishSaga() {
  yield all([
    takeEvery(FETCH_PUBLISHING_SAGA, fetchPublishingSaga)
  ])
}