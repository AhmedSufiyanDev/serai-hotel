import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  paymentData: null,
  paymentDataError: null,
  paymentLoading: false, 
  success: null,
  error: null 
};
export const paymentReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.GET_PAYMENT_DATA_START:
      return { ...state, loading: true, paymentDataError: null, paymentData: null };

    case actionTypes.GET_PAYMENT_DATA_SUCCESS:
      return {...state, loading: false, paymentDataError: null, paymentData: action.payload, };
  
    case actionTypes.GET_PAYMENT_DATA_FAILURE:
      return { ...state, loading: false, paymentDataError: action.payload, paymentData: null, };

    case actionTypes.MESSAGE_HANDLER:
      return { ...state, loading: false, paymentDataError: action.payload,  paymentData: action.payload,
    };

    default:
      return { ...state };
  }
};
