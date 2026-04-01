import {all} from "redux-saga/effects";
import {authSaga} from "./authSagas";
import {dashboardSaga} from "./dashboardSagas";
import {userSaga} from "./userSagas";
import {riverflowSaga} from "./riverflowSaga";
import {auctionSaga} from "./auctionSaga";
import {tenderSaga} from "./tenderSaga";
import {cmsSaga} from "./cmsSaga"; 
import {assetSaga} from "./asset.Sagas"
export function* rootSaga(getState) {
  yield all([
    authSaga(),
    dashboardSaga(),
    userSaga(),
    riverflowSaga(),
    auctionSaga(),
    tenderSaga(),
    cmsSaga(), 
    assetSaga()
  ]);
}
