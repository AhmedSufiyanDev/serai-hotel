import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import { put, takeEvery, all, fork } from "redux-saga/effects";
import CmsService from "../../services/cms.service";
import moment from "moment";
import { bannerImageFailure } from "../actions/cms";

/** Home */
function* getRoomData(action) {
  /** News Details */
  try {
    if (action) {
      const address = action.payload?.address;
      const fromDate = moment(action.payload?.fromDate).format("YYYY-MM-DD");
      const toDate = moment(action.payload?.toDate).format("YYYY-MM-DD");
      const RoomCatID = action.payload?.RoomCatID;
      const lowerPriceLimit = action.payload?.lowerPriceLimit;
      const higherPriceLimit = action.payload?.higherPriceLimit;
      const numOfAdults = action.payload?.numOfAdults;
      const numOfChildren = action.payload?.numOfChildren;
      const sessionID = action.payload?.sessionID;
      const sortBy = action.payload?.sortBy;
      let params = {
        address,
        fromDate,
        toDate,
        RoomCatID,
        lowerPriceLimit,
        higherPriceLimit,
        numOfAdults,
        numOfChildren,
        sortBy,
        sessionID,
      };
      const response = yield CmsService.room(params);
      if (response?.data) {
        yield put(actions.getRoomDataSuccess(response?.data));
      } else {
        yield put(actions.getRoomDataFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getRoomDataFailure(error));
  }
}
function* getRoomDataSaga() {
  yield takeEvery(actionsTypes.GET_ROOM_DATA_START, getRoomData);
}

function* submitBookingData(action) {
  /** News Details */
  try {
    if (action) {
      const payload = action.payload;
      const response = yield CmsService.booking(payload);
      if (response?.data.status == 200) {
        yield put(actions.submitBookingSuccess(response?.data));
      } else if (response?.data.status == 202) {
        yield put(actions.submitBookingSuccess(response?.data));
      } else {
        yield put(actions.submitBookingFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getRoomDataFailure(error));
  }
}

function* bookingDataSaga() {
  yield takeEvery(actionsTypes.SUBMIT_BOOKING_START, submitBookingData);
}

function* submitContactUs(action) {
  /** News Details */
  try {
    if (action) {
      const payload = action.payload;
      const response = yield CmsService.contactUs(payload);
      if (response?.data.status == 200) {
        yield put(actions.submitContactUsSuccess(response?.data.message));
      } else {
        yield put(actions.submitContactUsFailure(response?.data.message));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.submitContactUsFailure(error));
  }
}
function* contactUsSaga() {
  yield takeEvery(actionsTypes.SUBMIT_CONTACT_US_START, submitContactUs);
}
function* getPaymentMethodData(action) {
  /** News Details */
  try {
    const response = yield CmsService.paymetMethod();
    if (response?.data) {
      console.log("payment data is", response?.data);
      yield put(actions.getPaymentMethodSuccess(response?.data));
    } else {
      yield put(actions.getPaymentMethodFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getPaymentMethodFailure(error));
  }
}
function* getPaymentMethodSaga() {
  yield takeEvery(actionsTypes.GET_PAYMENT_METHOD_START, getPaymentMethodData);
}

function* getRoomList(action) {
  try {
    const response = yield CmsService.roomList();
    if (response?.data) {
      console.log("data is", response?.data);
      yield put(actions.roomCatListSuccess(response?.data));
    } else {
      yield put(actions.roomCatListFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.roomCatListFailure(error));
  }
}
function* roomDataListSaga() {
  yield takeEvery(actionsTypes.ROOM_CAT_LIST_START, getRoomList);
}
function* getBannerImage(action) {
  try {
    const response = yield CmsService.bannerImage();
    if (response?.data || response?.data == null) {
      console.log("image fetched successfully in saga file");
      yield put(actions.bannerImageSuccess(response?.data));
    } else {
      yield put(actions.bannerImageFailure());
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";
    yield put(actions.bannerImageFailure(error));
  }
}

function* fetchBannerImage() {
  yield takeEvery(actionsTypes.GET_BANNER_IMAGE, getBannerImage);
}

function* getBlogData(action) {
  try {
    const response = yield CmsService.getBlog(action.payload);
    if (response?.data) {
      console.log("data is", response?.data);
      yield put(actions.getBlogSuccess(response?.data));
    } else {
      yield put(actions.getBlogFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getBlogFailure(error));
  }
}
function* getBlogSaga() {
  yield takeEvery(actionsTypes.GET_BLOG_START, getBlogData);
}

function* getsessionID(action) {
  try {
    const response = yield CmsService.getsession();
    if (response?.data) {
      console.log("data is", response?.data);
      localStorage.setItem("sessionId", response?.data);
      yield put(actions.getSessionIDSuccess(response?.data));
    } else {
      yield put(actions.getSessionIDFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getSessionIDFailure(error));
  }
}
function* getSessionIDSaga() {
  yield takeEvery(actionsTypes.GET_SESSION_ID_START, getsessionID);
}

function* getUserData(action) {
  try {
      const response = yield CmsService.getUser(action.payload);
      if (response?.data.coupon) {
        yield put(actions.getUserSuccess(response?.data));
      }else{
        if (response?.data) {
          console.log("user data is",response?.data.data)
          yield put(actions.getUserSuccess(response?.data.data));
        } else {
          yield put(actions.getUserFailure("network error"));
        }
      }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getUserFailure(error));
  }
}
function* getUserSaga() {
  yield takeEvery(actionsTypes.GET_USER_START, getUserData);
}

function* updateUserData(action) {
  /** News Details */
  try {
    if (action) {
      const payload = action.payload;
      const response = yield CmsService.userData(payload);
      if (response?.data.status == 200) {
        yield put(actions.submitUserDataSuccess(response?.data));
      } else {
        yield put(actions.submitUserDataFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.submitUserDataFailure(error));
  }
}

function* submitUserDataSaga() {
  yield takeEvery(actionsTypes.SUBMIT_USER_DATA_START, updateUserData);
}

function* getBookingData(action) {
  try {
    const response = yield CmsService.getbookingData(action.payload);
    if (response?.data) {
      console.log("user data is", response?.data.user);
      yield put(actions.userBookingDataSuccess(response?.data.user));
    } else {
      yield put(actions.userBookingDataFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getUserFailure(error));
  }
}
function* userBookingDataSaga() {
  yield takeEvery(actionsTypes.USER_BOOKING_DATA_START, getBookingData);
}

function* getRoomCatData(action) {
  try {
    const response = yield CmsService.getRoomCat(action.payload);
    if (response?.data) {
      console.log("user data is", response?.data);
      yield put(actions.roomCategoryDataSuccess(response?.data));
    } else {
      yield put(actions.roomCategoryDataFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getUserFailure(error));
  }
}
function* roomCatDataSaga() {
  yield takeEvery(actionsTypes.ROOM_CATEGORY_DATA_START, getRoomCatData);
}

function* getBlog(action) {
  try {
    const response = yield CmsService.getBlogData(action.payload);
    if (response?.data) {
      console.log("data is", response?.data);
      yield put(actions.getBlogDataSuccess(response?.data));
    } else {
      yield put(actions.getBlogDataFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getBlogDataFailure(error));
  }
}
function* getBlogDataSaga() {
  yield takeEvery(actionsTypes.GET_BLOG_DATA_START, getBlog);
}

function* getParamData(action) {
  try {
    const response = yield CmsService.getparam(action.payload);
    if (response?.data) {
      console.log("data is", response?.data);
      yield put(actions.getParamSuccess(response?.data));
    } else {
      yield put(actions.getParamFailure("network error"));
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.getParamFailure(error));
  }
}

function* getParamDataSaga() {
  yield takeEvery(actionsTypes.GET_PARAMS_START, getParamData);
}

function* submitParamData(action) {
  try {
    if (action) {
      const payload = action.payload;
      const response = yield CmsService.setParam(payload);
      if (response?.data) {
        console.log("response.data is", response);
        yield put(actions.setParamSuccess(response?.data));
      } else {
        yield put(actions.setParamFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.setParamFailure(error));
  }
}
function* submitParamDataSaga() {
  yield takeEvery(actionsTypes.SET_PARAMS_START, submitParamData);
}

function* getpaymentData(action) {
  try {
    if (action) {
      const response = yield CmsService.paymentData(action.payload);
      if (response?.data.status == 200) {
        console.log("response.data is", response);
        yield put(actions.paymentDataSuccess(response?.data));
      } else {
        yield put(actions.paymentDataFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message;
    if (!error) error = "network error";

    yield put(actions.paymentDataFailure(error));
  }
}
function* getPaymentDataSaga() {
  yield takeEvery(actionsTypes.PAYMENT_DATA_START, getpaymentData);
}

export function* cmsSaga() {
  yield all([
    fork(getRoomDataSaga),
    fork(bookingDataSaga),
    fork(contactUsSaga),
    fork(getPaymentMethodSaga),
    fork(roomDataListSaga),
    fork(fetchBannerImage),
    //fork(bannerImageFailure),
    fork(getBlogSaga),
    fork(getSessionIDSaga),
    fork(getUserSaga),
    fork(submitUserDataSaga),
    fork(userBookingDataSaga),
    fork(roomCatDataSaga),
    fork(getBlogDataSaga),
    fork(getParamDataSaga),
    fork(submitParamDataSaga),
    fork(getPaymentDataSaga),
  ]);
}
