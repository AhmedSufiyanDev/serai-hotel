import * as actionTypes from "../actionTypes";

export const getRiverflowsPak = (data) => {
    return {
        type: actionTypes.GET_RIVERFLOWS_PAK_START,
        payload: data,
    };
};
export const getRiverflowListSuccess = (data) => {
    return {
        type: actionTypes.GET_RIVERFLOW_LIST_SUCCESS,
        payload: data,
    };
};
export const getRiverflowListFailure = (data) => {
    return {
        type: actionTypes.GET_RIVERFLOW_LIST_FAILURE,
        payload: data,
    };
};

export const riverflowMessageHandler = () => {
    return {
        type: actionTypes.RIVERFLOW_MESSAGE_HANDLER,
        payload: null,
    };
};
