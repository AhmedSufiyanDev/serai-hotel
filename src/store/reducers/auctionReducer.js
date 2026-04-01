import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  auctionList: null,
  auctionListError: null,
  auctionLoading: false,
  auction: null,
  auctionDataError: null,
  
  createAuctionData: null,
  createAuctionError: null,
  success: null,
  error: null 
};
export const auctionReducer = (state = initialState, action) => { 
  switch (action.type) {
    case actionTypes.GET_AUCTION_LIST_START:
      return { ...state, loading: true, auctionListError: null, auctionList: null };

    case actionTypes.GET_AUCTION_LIST_SUCCESS:
      return {...state, loading: false, auctionListError: null, auctionList: action.payload, };
  
    case actionTypes.GET_AUCTION_LIST_FAILURE:
      return { ...state, loading: false, auctionListError: action.payload, auctionList: null, };

    case actionTypes.GET_AUCTION_DATA_START:
      return { ...state, auctionLoading: true, auctionDataError: null, auction: null };

    case actionTypes.GET_AUCTION_DATA_SUCCESS:
      return {  ...state, auctionLoading: false, auctionDataError: null, auction: action.payload, };

    case actionTypes.GET_AUCTION_DATA_FAILURE:
      return { ...state, auctionLoading: false, auctionDataError: action.payload, auction: null, };

     
    /** CREATE AUCTION START */
    case actionTypes.CREATE_AUCTION_START:
      return { ...state, auctionLoading: true, sendOtpError: null, createAuctionError: null, createAuctionData: null };

    case actionTypes.CREATE_AUCTION_SUCCESS:
      return {  ...state, auctionLoading: false, sendOtpError: null, sendOtpData: null, createAuctionError: null, createAuctionData: action.payload, };

    case actionTypes.CREATE_AUCTION_FAILURE:
      return { ...state, auctionLoading: false, sendOtpError: null, createAuctionError: action.payload, createAuctionData: null, };
    /** END */
    
    case actionTypes.MESSAGE_HANDLER:
      return { ...state, loading: false, auctionListError: action.payload,  success: action.payload,
    };

    default: 
      return {
        loading: false,
        auctionList: null,
        auctionListError: null,
        auctionLoading: false,
        auction: null,
        auctionDataError: null, 
        createAuctionData: null,
        createAuctionError: null,
        success: null,
        error: null 
      };
  }
};
