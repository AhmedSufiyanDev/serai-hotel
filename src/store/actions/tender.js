import * as actionTypes from "../actionTypes";

export const getTenderList = (data) => { 
    return {
        type: actionTypes.GET_TENDER_LIST_START,
        payload: data,
    };
};
export const getTenderListSuccess = (data) => {
    return {
        type: actionTypes.GET_TENDER_LIST_SUCCESS,
        payload: data,
    };
};
export const getTenderListFailure = (data) => {
    return {
        type: actionTypes.GET_TENDER_LIST_FAILURE,
        payload: data,
    };
};

export const tenderMessageHandler = () => { 
    return {
        type: actionTypes.TENDER_MESSAGE_HANDLER,
        payload: null,
    };
};
