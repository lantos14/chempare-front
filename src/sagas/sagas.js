import "regenerator-runtime/runtime";
import { takeEvery, put, call } from 'redux-saga/effects';
import * as API from '../services/api';

function* getCompundResult(action) {
  try {
    const url = `${process.env.SERVER_DEV}/chemaxon`;
    const compoundName = action.payload;

    const data = yield call(API.getData, url, compoundName);
    yield put({
      type: 'COMPOUND_RESULT_SUCCEEDED',
      payload: {
        'name': compoundName,
        data,
      }
    });
  } catch (error) {
    console.log(error); //eslint-disable-line
  }
}

export default function* rootSaga() {
  yield takeEvery('COMPOUND_RESULT_REQUESTED', getCompundResult);
}