import { take, fork, call, put } from 'redux-saga/effects';

import * as productServices from '~/services/productServices';
import { getPublisher, getPublisherSuccess } from '../reducers/publisherSlice';

function* handleGetPublisherData() {
  const result = yield call(productServices.getPublisher);
  console.log(result);
  yield put(getPublisherSuccess(result));
}

export default function* checkoutSaga() {
  while (true) {
    yield take(getPublisher.type);
    yield fork(handleGetPublisherData);
  }
}
