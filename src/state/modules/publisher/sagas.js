import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_PUBLISHER_SAGA, ADD_PUBLISHER_SAGA, EDIT_PUBLISHER_SAGA } from './index'
import { fetchPublisherHouseApi, addPublisherHouseApi, updatePublisherHouseApi } from '../../../api/publisherHouseApi';

import { fetchPublisher } from './index'

function* fetchPublisherSaga(action) {
    const {data} =  yield fetchPublisherHouseApi()
    const publisher = data.data
    yield put(fetchPublisher(publisher));
}

function* addCategorySaga(action) {
  const { publisher } = action.payload;
  const res = yield addPublisherHouseApi(publisher);
  if (res.data) {
    //TODO:
  }
  yield fetchPublisherSaga();
}

function* editCategorySaga(action) {
  const { publisher } = action.payload;
  const res = yield updatePublisherHouseApi(publisher);
  if (res.data) {
    //TODO:
  }
  yield fetchPublisherSaga();
}

export default function* publishSaga() {
  yield all([
    takeEvery(FETCH_PUBLISHER_SAGA, fetchPublisherSaga),
    takeEvery(ADD_PUBLISHER_SAGA, addCategorySaga),
    takeEvery(EDIT_PUBLISHER_SAGA, editCategorySaga)
  ])
}