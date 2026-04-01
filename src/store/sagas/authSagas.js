import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {all, fork, put, takeEvery} from "redux-saga/effects";
import AuthService from "../../services/auth.service";
import HttpService from "../../services/http.service";

function* loginStart(action) {
  try {
    const response = yield AuthService.login({
      Email: action.payload.Email,
      Password: action.payload.Password,
    });
  
    if (response.data.token) {
      HttpService.setToken(response.data.token);//set token in header
      let guest = response?.data?.data || {}; 
      HttpService.setUser(guest.id);// set userId and role in header
      //console.log('storing in localstorage ',user);
      localStorage.setItem('guest', JSON.stringify(guest)); 
      yield put(actions.loginSuccess(response.data));
    } else {
      yield put(actions.loginFailure("Invalid Credentials"));
    }
  } catch (err) { 
    let error = err?.response?.data?.message;

    if (!error) {
      error = err?.response?.message || "Network error";
    }
    yield put(actions.loginFailure(error));
  }
}

function* loginStartSaga() {
  yield takeEvery(actionsTypes.LOGIN_START, loginStart);
}

function* signUpStart(action) {
  try { 
    let payload = action.payload; 
    // console.log('employee_corner payload',payload);
    let response = yield AuthService.signup(payload);
    // console.log('authSagas signUpStart ',response);

    if (response?.data.token) {
      let guest = response?.data?.data || {}; 
      localStorage.setItem('guest', JSON.stringify(guest)); 
      yield put(actions.signupSuccess(response.data));
    } else {
      yield put(actions.signupFailure(response?.data));
    }
 
  } catch (err) { 
    let error = err?.response?.data?.errors ? err?.response?.data?.errors[0]?.message: err?.response?.data?.message;
    if (!error) {
      error = "network error"
    }
    yield put(actions.signupFailure(error));
  }
}

function* signupStartSaga() {
  yield takeEvery(actionsTypes.SIGNUP_START, signUpStart);
}

function* resetEmailSentStart(action) {
  try {
    const response = yield AuthService.resetEmailSend({
      Email: action.payload.Email
    });
  
    if (response.data.status == 200) {
      yield put(actions.resetEmailSentSuccess(response.data.message));
    } else {
      yield put(actions.resetEmailSentFailure(response.data.message));
    }
  } catch (err) { 
    let error = err?.response?.data?.message;

    if (!error) {
      error = err?.response?.message || "Network error";
    }
    yield put(actions.resetEmailSentFailure(error));
  }
}

function* resetEmailSentStartSaga() {
  yield takeEvery(actionsTypes.RESET_PASSWORD_EMAIL_SENT_START, resetEmailSentStart);
}

function* resetPasswordStart(action) {
  try {
    const response = yield AuthService.resetPassword({
      token: action.payload.token,
      Password: action.payload.Password
    });
  
    if (response.data.status == 200) {
      yield put(actions.resetPasswordSuccess(response.data.message));
    } else {
      yield put(actions.resetPasswordFailure(response.data.message));
    }
  } catch (err) { 
    let error = err?.response?.data?.message;

    if (!error) {
      error = err?.response?.message || "Network error";
    }
    yield put(actions.resetPasswordFailure(error));
  }
}

function* resetPasswordStartSaga() {
  yield takeEvery(actionsTypes.RESET_PASSWORD_START, resetPasswordStart);
}

function* sendOtp(action) {
  try { 
    if (action.payload) {
      
      const response = yield AuthService.sendOtp({
        Email: action.payload.Email,
        rememberMe: true,
      }); 
      // console.log('sendOtp resp',response)
      if (response?.data.statusCode==200) {
        yield put(actions.sendOtpSuccess(response));
      } else {
        yield put(actions.sendOtpFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.sendOtpFailure(error));
  }
}

function* sendOtpSaga() {
  yield takeEvery(actionsTypes.SEND_OTP_START, sendOtp);
}


function* addOtp(action) {
  try { 
    if (action.payload) {
      
      const response = yield AuthService.addOtp({
        email: action.payload.email,
        otp: action.payload.otp,
        name: action.payload.name,
      }); 
  
      if (response?.data.statusCode==201 || response?.data.statusCode==200) {
        console.log('sendOtp resp',response)
        yield put(actions.addOtpSuccess(response?.data));
      } else {
        yield put(actions.addOtpFailure(response?.data?.message ? 'Error: invalid data entered.':'Otp verification failed'));
      }
    }
  } catch (err) {
    let error = 'Error: invalid data entered.';
    if (!error) error = 'network error'
    
    yield put(actions.addOtpFailure(error));
  }
}

function* addOtpSaga() {
  yield takeEvery(actionsTypes.ADD_OTP_START, addOtp);
}



function* sendQuery(action) {
  try { 
    if (action.payload) {
      
      const response = yield AuthService.sendQuery(action.payload); 
      // console.log('sendOtp resp',response)
      if (response?.data?.statusCode==200) {
        yield put(actions.sendQuerySuccess(response));
      } else {
        yield put(actions.sendQueryFailure(response?.data));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.sendQueryFailure(error));
  }
}

function* sendQuerySaga() {
  yield takeEvery(actionsTypes.SEND_QUERY_START, sendQuery);
}

function* getConfig(action){
  try {
    let response = yield AuthService.getConfig();
    //console.log('Submit resposne response config ============ ',response);
    if (response?.data.statusCode === 200) {
      //console.log('response.data GallerySagas ',response.data);
      yield put(actions.getConfigSuccess(response.data));
    } else {
      yield put(actions.getConfigFailure("network error"));
    }
  } catch (err) {
    // console.log('er ', err)
    let error = err?.response?.data?.message;
    if (!error) {
      error = "network error"
    }
    yield put(actions.getConfigFailure(error));
  }
}

function* getConfigSaga() {
  yield takeEvery(actionsTypes.GET_CONFIG_START, getConfig);
}


function* getViews(action){
  try {
    let response = yield AuthService.getViews();
    
  } catch (err) {
    // console.log('er ', err)
    let error = err?.response?.data?.message;
    if (!error) {
      error = "network error"
    }
    yield put(actions.getViewsFailure(error));
  }
}

function* getViewsSaga() {
  yield takeEvery(actionsTypes.GET_VIEWS_START, getViews);
}

export function* authSaga() {
  yield all([fork(loginStartSaga),fork(sendOtpSaga), fork(signupStartSaga), fork(resetEmailSentStartSaga), fork(resetPasswordStartSaga), fork(sendQuerySaga), fork(addOtpSaga), fork(getConfigSaga),fork(getViewsSaga)]);
}
