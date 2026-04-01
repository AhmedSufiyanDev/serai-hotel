import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  riverflowList: null,
  riverflowListError: null,
  riverflowLoading: false,
  riverflow: null,
  riverflowDataError: null,
  success: null,
  error: null, 
};
export const riverflowReducer = (state = initialState, action) => {
  //console.log(action.type,' contentReducer ',action.payload);
  switch (action.type) { 
    case actionTypes.GET_RIVERFLOWS_PAK_START:
      return { ...state, loading: true, riverflowListError: null, riverflowList: null };
    
    case actionTypes.GET_RIVERFLOW_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        riverflowListError: null,
        riverflowList: action.payload,
      };
    };
    
    case actionTypes.GET_RIVERFLOW_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        riverflowListError: action.payload,
        riverflowList: null,
      };

    case actionTypes.RIVERFLOW_MESSAGE_HANDLER:
      return {
        ...state,
        loading: false,
        riverflowListError: action.payload,
        riverflowDataError: action.payload,
        error: action.payload,
        success: action.payload,
      };

    default:
      return { ...state };
  }
};
