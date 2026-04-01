import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  user: null,
  error: null,
  success: null,
  sendOtpData: null,
  sendOtpError: null,

  addOtpError: null, 
  addOtpData:null,

  sendQueryData: null,
  sendQueryError: null,

  loggedInSuccess:false,
  loggedInError:false,

  signUpSuccess:false,
  signUpError:false,

  resetEmailSentSuccess:false,
  resetEmailSentError:false,

  resetPasswordSuccess:false,
  resetPasswordError:false,

  successGetConfig:null, 
  totalViews:null
};

export const authReducer = (state = initialState, action) => {
  // console.log('authReducer ',' action.payload ',action);
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {...state, loading: true, loggedInError: false, success: null, user: null};
    case actionTypes.LOGIN_SUCCESS:
      return {...state, loading: false, loggedInError: false, success: action.payload.message,loggedInSuccess:true};
    case actionTypes.LOGIN_FAILURE:
      return {...state, loading: false, loggedInError: true,success:null, user: null,loggedInSuccess:false};

    case actionTypes.SIGNUP_START:
      return {...state, loading: true, signUpError: false, signUpSuccess: false};
    case actionTypes.SIGNUP_SUCCESS:
      return {...state, loading: false, signUpError: false, signUpSuccess: true};
    case actionTypes.SIGNUP_FAILURE:
      return {...state, loading: false,error: action.payload, signUpError: true, signUpSuccess: false};

    case actionTypes.RESET_PASSWORD_EMAIL_SENT_START:
      return {...state, loading: true, resetEmailSentError: false, resetEmailSentSuccess: false};
    case actionTypes.RESET_PASSWORD_EMAIL_SENT_SUCCESS:
      return {...state, loading: false, message:action.payload, resetEmailSentError: false, resetEmailSentSuccess: true};
    case actionTypes.RESET_PASSWORD_EMAIL_SENT_FAILURE:
      return {...state, loading: false, error: action.payload, resetEmailSentError: true, resetEmailSentSuccess: false};

    case actionTypes.RESET_PASSWORD_START:
      return {...state, loading: true, resetPasswordError: false, resetPasswordSuccess: false};
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {...state, loading: false, message:action.payload, resetPasswordError: false, resetPasswordSuccess: true};
    case actionTypes.RESET_PASSWORD_FAILURE:
      return {...state, loading: false, error: action.payload, resetPasswordError: true, resetPasswordSuccess: false};

    /** SEND OTP START */
    case actionTypes.SEND_OTP_START:
      return { ...state, loading: true, sendOtpError: null, sendOtpData: null };

    case actionTypes.SEND_OTP_SUCCESS:
      return {  ...state, loading: false, sendOtpError: null, sendOtpData: action.payload, };

    case actionTypes.SEND_OTP_FAILURE:
      return { ...state, loading: false, sendOtpError: action.payload, sendOtpData: null, };
    /** END */

    /** ADD OTP START */
    case actionTypes.ADD_OTP_START:
      return { ...state, loading: true, addOtpError: null, addOtpData: null };

    case actionTypes.ADD_OTP_SUCCESS:
      return {  ...state, loading: false, addOtpError: null, addOtpData: action.payload, };

    case actionTypes.ADD_OTP_FAILURE:
      return { ...state, loading: false, addOtpError: action.payload||null, addOtpData: null, };
    /** END */

    /** SEND QUERY START */
    case actionTypes.SEND_QUERY_START:
      return { ...state, loading: true, sendQueryError: null, sendQueryData: null };

    case actionTypes.SEND_QUERY_SUCCESS:
      return {  ...state, loading: false, sendQueryError: null, sendQueryData: action.payload, };

    case actionTypes.SEND_QUERY_FAILURE:
      return { ...state, loading: false, sendQueryError: action.payload, sendQueryData: null, };
    /** END */

    case actionTypes.LOGOUT:
      return {...state, loading: true, error: null, success: null, user: {}, loggedInSuccess:false};
    case actionTypes.LOGOUT_SUCCESS:
      return {...state, loading: false, error: null, success: null, user: null};

    case actionTypes.GET_CONFIG_START:
      return {...state, loading: true, error: null, successGetConfig: null,dataGetConfig:null};
    case actionTypes.GET_CONFIG_SUCCESS:
      return {...state, loading: false, error: null, successGetConfig: action.payload.success,dataGetConfig:action.payload};
    case actionTypes.GET_CONFIG_FAILURE:  
      return {...state, loading: false, error: action.payload,message:null,};

    // case actionTypes.GET_VIEWS_START:
    //   return {...state, loading: true, error: null, successViews: null,totalViews:null};
    // case actionTypes.GET_VIEWS_SUCCESS:
    //   return {...state, loading: false, error: null, successViews: action.payload,totalViews:action.payload};
    case actionTypes.GET_VIEWS_FAILURE:  
      return {...state, loading: false, error: action.payload,message:null,};  

    case actionTypes.ERROR_HANDLER_SUCCESS:
      return {...state,successContactUs:false};

    default:
      return {
        ...state, 
        loggedInSuccess:false,
        loggedInError: false, 
        signUpSuccess:false,
        signUpError:false,
        sendOtpData: null,
        sendOtpError:null,
        error:null, 
        loading: false,
        successGetConfig:null,
        successViews:null,
        totalViews:null
      };
  }
};
