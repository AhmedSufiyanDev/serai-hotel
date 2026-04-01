import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {put, takeEvery, all, fork} from "redux-saga/effects";
import AuctionService from '../../services/auction.service'


function* getAuctionList(action) {
  try {
    if (action.payload) { 
      let searched = action.payload?.searched;
      if(searched == "") searched = null;

      const page = action.payload?.pageNo-1;
      const page_size = action.payload?.pageSize; 
      const tagName = searched;
      let params = {page, page_size, tagName};

      const response = yield AuctionService.list(params); 
      if (response?.data.isSuccess) {
        yield put(actions.getAuctionListSuccess(response));
      } else {
        yield put(actions.getAuctionListFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.getAuctionListFailure(error));
  }
}
function* getAuctionListSaga() {
  yield takeEvery(actionsTypes.GET_AUCTION_LIST_START, getAuctionList);
}



function* createAuction(action) {
  try {
    if (action.payload) {
      const msisdn = action.payload?.mobile_number;
      const bidPrice = action.payload?.bid_amount;
      const tagName = action.payload?.tagName; 
      const otp_code = action.payload?.otp;
      let params = {msisdn, bidPrice, tagName, otp_code};

      
    }
  } catch (err) { 
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.createAuctionFailure(error));
  }
}
function* createAuctionSaga() {
  yield takeEvery(actionsTypes.CREATE_AUCTION_START, createAuction);
}

export function* auctionSaga() {
  yield all([fork(getAuctionListSaga),  fork(createAuctionSaga)]);
}
