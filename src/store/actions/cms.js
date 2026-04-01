import * as actionTypes from "../actionTypes";

// Home
export const getRoomData = (data) => {
  console.log("getRoomData homedata", data);
  return {
    type: actionTypes.GET_ROOM_DATA_START,
    payload: data,
  };
};
export const getRoomDataSuccess = (data) => {
  console.log("getRoomDataSuccess= data ", data);
  return {
    type: actionTypes.GET_ROOM_DATA_SUCCESS,
    payload: data,
  };
};
export const getRoomDataFailure = (data) => {
  return {
    type: actionTypes.GET_ROOM_DATA_FAILURE,
    payload: data,
  };
};

export const submitBooking = (data) => {
  return {
    type: actionTypes.SUBMIT_BOOKING_START,
    payload: data,
  };
};

export const submitBookingSuccess = (data) => {
  console.log("submitBookingSuccess= data ", data);
  return {
    type: actionTypes.SUBMIT_BOOKING_SUCCESS,
    payload: data,
  };
};
export const submitBookingFailure = (data) => {
  return {
    type: actionTypes.SUBMIT_BOOKING_FAILURE,
    payload: data,
  };
};

export const paymentData = (data) => {
  return {
    type: actionTypes.PAYMENT_DATA_START,
    payload: data,
  };
};

export const paymentDataSuccess = (data) => {
  console.log("paymentDataSuccess= data ", data);
  return {
    type: actionTypes.PAYMENT_DATA_SUCCESS,
    payload: data,
  };
};
export const paymentDataFailure = (data) => {
  return {
    type: actionTypes.PAYMENT_DATA_FAILURE,
    payload: data,
  };
};

export const submitContactUs = (data) => {
  console.log("submitContactUs homedata", data);
  return {
    type: actionTypes.SUBMIT_CONTACT_US_START,
    payload: data,
  };
};
export const submitContactUsSuccess = (data) => {
  console.log("submitContactUsSuccess= data ", data);
  return {
    type: actionTypes.SUBMIT_CONTACT_US_SUCCESS,
    payload: data,
  };
};
export const submitContactUsFailure = (data) => {
  return {
    type: actionTypes.SUBMIT_CONTACT_US_FAILURE,
    payload: data,
  };
};

export const roomCatList = (data) => {
  return {
    type: actionTypes.ROOM_CAT_LIST_START,
    payload: data,
  };
};
export const roomCatListSuccess = (data) => {
  return {
    type: actionTypes.ROOM_CAT_LIST_SUCCESS,
    payload: data,
  };
};
export const roomCatListFailure = (data) => {
  return {
    type: actionTypes.ROOM_CAT_LIST_FAILURE,
    payload: data,
  };
};

export const getBannerImage = (data) => {
  return {
    type: actionTypes.GET_BANNER_IMAGE,
    payload: data,
  };
};

export const bannerImageSuccess = (data) => {
  return {
    type: actionTypes.BANNER_IMAGE_SUCCESS,
    payload: data,
  };
};

export const bannerImageFailure = (data) => {
  return {
    type: actionTypes.BANNER_IMAGE_FAILURE,
    payload: data,
  };
};

export const getBlog = (data) => {
  return {
    type: actionTypes.GET_BLOG_START,
    payload: data,
  };
};
export const getBlogSuccess = (data) => {
  return {
    type: actionTypes.GET_BLOG_SUCCESS,
    payload: data,
  };
};
export const getBlogFailure = (data) => {
  return {
    type: actionTypes.GET_BLOG_FAILURE,
    payload: data,
  };
};

export const getBlogData = (data) => {
  return {
    type: actionTypes.GET_BLOG_DATA_START,
    payload: data,
  };
};
export const getBlogDataSuccess = (data) => {
  return {
    type: actionTypes.GET_BLOG_DATA_SUCCESS,
    payload: data,
  };
};
export const getBlogDataFailure = (data) => {
  return {
    type: actionTypes.GET_BLOG_DATA_FAILURE,
    payload: data,
  };
};

export const getUser = (data) => {
  return {
    type: actionTypes.GET_USER_START,
    payload: data,
  };
};
export const getUserSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    payload: data,
  };
};
export const getUserFailure = (data) => {
  return {
    type: actionTypes.GET_USER_FAILURE,
    payload: data,
  };
};

export const getParam = (data) => {
  return {
    type: actionTypes.GET_PARAMS_START,
    payload: data,
  };
};
export const getParamSuccess = (data) => {
  return {
    type: actionTypes.GET_PARAMS_SUCCESS,
    payload: data,
  };
};
export const getParamFailure = (data) => {
  return {
    type: actionTypes.GET_PARAMS_FAILURE,
    payload: data,
  };
};

export const setParam = (data) => {
  return {
    type: actionTypes.SET_PARAMS_START,
    payload: data,
  };
};
export const setParamSuccess = (data) => {
  return {
    type: actionTypes.SET_PARAMS_SUCCESS,
    payload: data,
  };
};
export const setParamFailure = (data) => {
  return {
    type: actionTypes.SET_PARAMS_FAILURE,
    payload: data,
  };
};

export const roomCategoryData = (data) => {
  return {
    type: actionTypes.ROOM_CATEGORY_DATA_START,
    payload: data,
  };
};
export const roomCategoryDataSuccess = (data) => {
  return {
    type: actionTypes.ROOM_CATEGORY_DATA_SUCCESS,
    payload: data,
  };
};
export const roomCategoryDataFailure = (data) => {
  return {
    type: actionTypes.ROOM_CATEGORY_DATA_FAILURE,
    payload: data,
  };
};

export const submitUserData = (data) => {
  return {
    type: actionTypes.SUBMIT_USER_DATA_START,
    payload: data,
  };
};
export const submitUserDataSuccess = (data) => {
  return {
    type: actionTypes.SUBMIT_USER_DATA_SUCCESS,
    payload: data,
  };
};
export const submitUserDataFailure = (data) => {
  return {
    type: actionTypes.SUBMIT_USER_DATA_FAILURE,
    payload: data,
  };
};

export const userBookingData = (data) => {
  return {
    type: actionTypes.USER_BOOKING_DATA_START,
    payload: data,
  };
};
export const userBookingDataSuccess = (data) => {
  return {
    type: actionTypes.USER_BOOKING_DATA_SUCCESS,
    payload: data,
  };
};
export const userBookingDataFailure = (data) => {
  return {
    type: actionTypes.USER_BOOKING_DATA_FAILURE,
    payload: data,
  };
};

export const getSessionID = (data) => {
  return {
    type: actionTypes.GET_SESSION_ID_START,
    payload: data,
  };
};
export const getSessionIDSuccess = (data) => {
  return {
    type: actionTypes.GET_SESSION_ID_SUCCESS,
    payload: data,
  };
};
export const getSessionIDFailure = (data) => {
  return {
    type: actionTypes.GET_SESSION_ID_FAILURE,
    payload: data,
  };
};

export const getPaymentMethod = (data) => {
  return {
    type: actionTypes.GET_PAYMENT_METHOD_START,
    payload: data,
  };
};
export const getPaymentMethodSuccess = (data) => {
  return {
    type: actionTypes.GET_PAYMENT_METHOD_SUCCESS,
    payload: data,
  };
};
export const getPaymentMethodFailure = (data) => {
  return {
    type: actionTypes.GET_PAYMENT_METHOD_FAILURE,
    payload: data,
  };
};

export const cmsMessageHandler = () => {
  return {
    type: actionTypes.CMS_MESSAGE_HANDLER,
    payload: null,
  };
};

export const getKBData = (data) => {
  return {
    type: actionTypes.GET_KB_DATA_START,
    payload: data,
  };
};

export const getKBDataSuccess = (data) => {
  return {
    type: actionTypes.GET_KB_DATA_SUCCESS,
    payload: data,
  };
};

export const getKBDataFailure = (data) => {
  return {
    type: actionTypes.GET_KB_DATA_FAILURE,
    payload: data,
  };
};

/** List Employee Corner */
export const getListEmpCorner = (data) => {
  return {
    type: actionTypes.GET_LIST_EMP_CORNER_START,
    payload: data,
  };
};
export const getListEmpCornerSuccess = (data) => {
  return {
    type: actionTypes.GET_LIST_EMP_CORNER_SUCCESS,
    payload: data,
  };
};
export const getListEmpCornerFailure = (data) => {
  return {
    type: actionTypes.GET_LIST_EMP_CORNER_FAILURE,
    payload: data,
  };
};

export const cmsHandlerSuccess = () => {
  return {
    type: actionTypes.CMS_HANDLER_SUCCESS,
    payload: null,
  };
};
