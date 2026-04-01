import * as actionTypes from "../actionTypes";

export const getAuctionList = (data) => { 
    return {
        type: actionTypes.GET_AUCTION_LIST_START,
        payload: data,
    };
};
export const getAuctionListSuccess = (data) => {
    return {
        type: actionTypes.GET_AUCTION_LIST_SUCCESS,
        payload: data.data,
    };
};
export const getAuctionListFailure = (data) => {
    return {
        type: actionTypes.GET_AUCTION_LIST_FAILURE,
        payload: data,
    };
};

export const getAuctionData = (data) => {
    return {
        type: actionTypes.GET_AUCTION_DATA_START,
        payload: data,
    };
};
export const getAuctionDataSuccess = (data) => {
    return {
        type: actionTypes.GET_AUCTION_DATA_SUCCESS,
        payload: data,

    };
};
export const getAuctionDataFailure = (data) => {
    return {
        type: actionTypes.GET_AUCTION_DATA_FAILURE,
        payload: data,
    };
};



export const createAuction = (data) => {
    return {
        type: actionTypes.CREATE_AUCTION_START,
        payload: data,
    };
};
export const createAuctionSuccess = (data) => {
    return {
        type: actionTypes.CREATE_AUCTION_SUCCESS,
        payload: data,

    };
};
export const createAuctionFailure = (data) => {
    return {
        type: actionTypes.CREATE_AUCTION_FAILURE,
        payload: data,
    };
};


export const messageHandler = () => { 
    return {
        type: actionTypes.MESSAGE_HANDLER,
        payload: null,
    };
};
