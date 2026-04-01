import * as actionTypes from "../actionTypes";
import {setUserDataInLocalStorage} from "../../services/utils";

export const loginStart = (data) => {
  return {
    type: actionTypes.LOGIN_START,
    payload: data,
  };
};
export const loginSuccess = (data) => {
  //console.log('loginSuccess auth.js ',data);
  localStorage.setItem('token', data?.token);
  setUserDataInLocalStorage(data.data);
  let d = {user: null, message: 'Successfully loggedIn '}
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: d,
  };
};
export const loginFailure = (error) => {

  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
};
export const signupStart = (data) => {
  return {
    type: actionTypes.SIGNUP_START,
    payload: data,
  };
};
export const signupSuccess = (data, signup) => {
  localStorage.setItem('token', data?.token);
  setUserDataInLocalStorage(data.data);
  let d = {user: null, message: 'Successfully signedUp '}
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: data,
};
};
export const signupFailure = (error) => {
  return {
    type: actionTypes.SIGNUP_FAILURE,
    payload: error,
  };
};

export const resetEmailSentStart = (data) => {
  return {
    type: actionTypes.RESET_PASSWORD_EMAIL_SENT_START,
    payload: data,
  };
};
export const resetEmailSentSuccess = (data) => {

  return {
    type: actionTypes.RESET_PASSWORD_EMAIL_SENT_SUCCESS,
    payload: data,
  };
};
export const resetEmailSentFailure = (error) => {

  return {
    type: actionTypes.RESET_PASSWORD_EMAIL_SENT_FAILURE,
    payload: error,
  };
};

export const resetPasswordStart = (data) => {
  return {
    type: actionTypes.RESET_PASSWORD_START,
    payload: data,
  };
};
export const resetPasswordSuccess = (data) => {

  return {
    type: actionTypes.RESET_PASSWORD_SUCCESS,
    payload: data,
  };
};
export const resetPasswordFailure = (error) => {

  return {
    type: actionTypes.RESET_PASSWORD_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    payload: null,
  };
};

export const logoutSuccess = () => { 
  localStorage.removeItem('token');
  localStorage.removeItem('guest');

  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload: null,
  };
};

export const errorHandlerSuccess = () => {
  return {
    type: actionTypes.ERROR_HANDLER_SUCCESS,
    payload: null,
  };
};
export const sendOtp = (data) => {
  return {
      type: actionTypes.SEND_OTP_START,
      payload: data,
  };
};
export const sendOtpSuccess = (data) => {
  //console.log('sendOtpSuccess ',data.data);
  return {
      type: actionTypes.SEND_OTP_SUCCESS,
      payload: data.data,

  };
};
export const sendOtpFailure = (data) => {
  return {
      type: actionTypes.SEND_OTP_FAILURE,
      payload: data,
  };
}

export const getConfig = (data) => {
  return {
      type: actionTypes.GET_CONFIG_START,
      payload: data,
  };
};

export const getConfigSuccess = (data) => {
  return {
      type: actionTypes.GET_CONFIG_SUCCESS,
      payload: data,
  };
};

export const getConfigFailure = (data) => {
  return {
      type: actionTypes.GET_CONFIG_FAILURE,
      payload: data,
  };
};

export const getViews = (data) => {
  return {
      type: actionTypes.GET_VIEWS_START,
      payload: data,
  };
};

// export const getViewsSuccess = (data) => {
//   return {
//       type: actionTypes.GET_VIEWS_SUCCESS,
//       payload: data,
//   };
// };

export const getViewsFailure = (data) => {
  return {
      type: actionTypes.GET_VIEWS_FAILURE,
      payload: data,
  };
};


export const addOtp = (data) => {
  return {
      type: actionTypes.ADD_OTP_START,
      payload: data,
  };
};

export const addOtpSuccess = (data) => {
  //console.log('sendOtpSuccess ',data.data);
  return {
      type: actionTypes.ADD_OTP_SUCCESS,
      payload: data,

  };
};
export const addOtpFailure = (data) => {
  return {
      type: actionTypes.ADD_OTP_FAILURE,
      payload: data,
  };
}

export const sendQuery = (data) => {
  return {
      type: actionTypes.SEND_QUERY_START,
      payload: data,
  };
};
export const sendQuerySuccess = (data) => {
  //console.log('sendOtpSuccess ',data.data);
  return {
      type: actionTypes.SEND_QUERY_SUCCESS,
      payload: data.data,

  };
};
export const sendQueryFailure = (data) => {
  return {
      type: actionTypes.SEND_QUERY_FAILURE,
      payload: data,
  };
};