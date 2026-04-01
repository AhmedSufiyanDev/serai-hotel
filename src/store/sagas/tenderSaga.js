import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {put, takeEvery, all, fork} from "redux-saga/effects";
import TenderService from '../../services/tender.service'


function* getTenderList(action) {
  try {
    if (action.payload) {
      const page = action.payload?.pageNo;
      const perPage = action.payload?.perPage;
      const type = action.payload?.type;
      const status = 1;
      let params = {page, perPage, type, status};
      const response = yield TenderService.list(params);
      if (response?.data) {
        yield put(actions.getTenderListSuccess(response?.data));
      } else {
        yield put(actions.getTenderListFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.getTenderListFailure(error));
  }
}
function* getTenderListSaga() {
  yield takeEvery(actionsTypes.GET_TENDER_LIST_START, getTenderList);
}

export function* tenderSaga() {
  yield all([
    fork(getTenderListSaga),
  ]);
}
