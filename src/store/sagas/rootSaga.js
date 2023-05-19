import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import cartSaga from './cartSaga';
import wishlistSaga from './wishlistSaga';
import checkoutSaga from './checkoutSaga';
import publisherSaga from './publisherSaga';

export default function* rootSaga() {
  yield all([userSaga(), cartSaga(), wishlistSaga(), checkoutSaga(), publisherSaga()]);
}
