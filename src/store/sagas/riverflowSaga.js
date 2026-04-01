import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {put, takeEvery, all, fork} from "redux-saga/effects";
import RiverflowService from '../../services/riverflow.service'
 
function* getRiverflowsPak(action) {
  try {
    
    if (action.payload) { 
      const reservoir = action.payload?.type; 
      const status = action.payload?.statusType;
      let params = { reservoir,   status};
      console.log('riverflowsPak sagas============ ',params);
      const response = yield RiverflowService.riverflowsPak(params);
      //console.log('getContentList response userSagas============ ',response);
      if (response?.data) { 
        yield put(actions.getRiverflowListSuccess(response.data));
      } else {
        yield put(actions.getRiverflowListFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) {
      error = 'network error'
    }
    yield put(actions.getRiverflowListFailure(error));
  }
}

function* getRiverflowsPakSaga() {
  yield takeEvery(actionsTypes.GET_RIVERFLOWS_PAK_START, getRiverflowsPak);
}


export function* riverflowSaga() {
  yield all([fork(getRiverflowsPakSaga)]);
}
