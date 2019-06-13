import { all, call, delay, fork, takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_PUBLISHER_SAGA, ADD_PUBLISHER_SAGA, EDIT_PUBLISHER_SAGA } from './index'
import { fetchPublisherHouseApi, addPublisherHouseApi, updatePublisherHouseApi } from '../../../api/publisherHouseApi';
import { constants } from '../../../containers/ToastNotification';
import { showToast } from '../notification/index';
import { fetchPublisher } from './index'
import {getToken} from '../auth/index';
function* fetchPublisherSaga(action) {
  const token =  yield select(getToken);
  const res =  yield fetchPublisherHouseApi(token);
  if(res.data){
    const publisher = res.data.data;
    yield put(fetchPublisher(publisher));
  }
  if(res.err){
    const toast = {
      message: "Có lỗi xảy ra",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
}

function* addPublisherHouseSaga(action) {
  const token =  yield select(getToken);
  const { publisher } = action.payload;
  const res = yield addPublisherHouseApi(publisher, token);
  if (res.data) {
    const toast = {
      message: "Thêm nhà xuất bản thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Thêm nhà sản xuất không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchPublisherSaga();
}

function* editPublisherHouseSaga(action) {
  const token =  yield select(getToken);
  const { publisher } = action.payload;
  const res = yield updatePublisherHouseApi(publisher, token);
  if (res.data) {
    const toast = {
      message: "Sửa nhà xuất bản thành công",
      action: "Dismiss",
      type: constants.SUCCESS
    }
    yield put(showToast(toast));
  }
  if(res.err){
    const toast = {
      message: "Sửa nhà sản xuất không thành công",
      action: "Dismiss",
      type: constants.FAILED
    }
    yield put(showToast(toast));
  }
  yield fetchPublisherSaga();
}

export default function* publishSaga() {
  yield all([
    takeEvery(FETCH_PUBLISHER_SAGA, fetchPublisherSaga),
    takeEvery(ADD_PUBLISHER_SAGA, addPublisherHouseSaga),
    takeEvery(EDIT_PUBLISHER_SAGA, editPublisherHouseSaga)
  ])
}