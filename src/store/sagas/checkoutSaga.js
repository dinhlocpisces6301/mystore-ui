import { take, fork, call, put } from 'redux-saga/effects';

import { getCheckout, getCheckoutSuccess } from '../reducers/checkoutSlice';
import * as checkoutServices from '~/services/checkoutServices';
import * as authServices from '~/services/authServices';

function* handleGetCheckoutData() {
  const isLoggedIn = authServices.isLoggedIn();
  if (!isLoggedIn) {
    return;
  }
  const result = yield call(checkoutServices.getCheckout);
  yield put(getCheckoutSuccess(result));
}

export default function* checkoutSaga() {
  while (true) {
    yield take(getCheckout().type);
    yield fork(handleGetCheckoutData);
  }
}
