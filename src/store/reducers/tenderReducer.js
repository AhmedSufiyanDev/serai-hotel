import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  tenderList: null,
  error: null,
  success: null
};
export const tenderReducer = (state = initialState, action) => { 
  switch (action.type) {
    case actionTypes.GET_TENDER_LIST_START:
      return { ...state, loading: true, error: null, success: null, tenderList: null };

    case actionTypes.GET_TENDER_LIST_SUCCESS:
      return {...state, loading: false, error: null, success: null, tenderList: action.payload, };
  
    case actionTypes.GET_TENDER_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload, success: null, };
    
    case actionTypes.TENDER_MESSAGE_HANDLER:
      return { ...state, loading: false, error: action.payload,  success: action.payload,
    };

    default: 
      return {
        loading: false,
        tenderList: null,
        error: null,
        success: null
      };
  }
};
