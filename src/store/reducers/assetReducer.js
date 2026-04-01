import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false, 
  error: null,
  success: null,
  vidHit: null,
  fetVidCategoryList: null,
  galleryCategoryList: null,
  galleryList: null,
  childCategoryList: null
};
export const assetReducer = (state = initialState, action) => {
  // console.log("assetReducer action.type ",action.type,' state ',state);
  switch (action.type) {
    case actionTypes.GET_CATEGORY_LIST_START:
      // console.log('assetReducer GET_CATEGORY_LIST_START ',action.payload);
      return { ...state, loading: true, error: null, success: null, fetVidCategoryList: null };

    case actionTypes.GET_CATEGORY_LIST_SUCCESS:
      // console.log('assetReducer GET_CATEGORY_LIST_SUCCESS ',action.payload);
      return {...state, loading: false, error: null, success: true, fetVidCategoryList: action.payload, };
  
    case actionTypes.GET_CATEGORY_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload, success: null, };

    case actionTypes.GET_GALLERY_CATEGORY_LIST_START:
      return { ...state, loading: true, error: null, success: null, galleryCategoryList: null };

    case actionTypes.GET_GALLERY_CATEGORY_LIST_SUCCESS:
      return {...state, loading: false, error: null, success: null, galleryCategoryList: action.payload, };
  
    case actionTypes.GET_GALLERY_CATEGORY_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload, success: null, };


    case actionTypes.GET_GALLERY_LIST_START:
    return { ...state, loading: true, error: null, success: null, galleryList: null, };

    case actionTypes.GET_GALLERY_LIST_SUCCESS:
    return {...state, loading: false, error: null, success: null, galleryList: action.payload, };

    case actionTypes.GET_GALLERY_LIST_FAILURE:
        return { ...state, loading: false, error: action.payload, success: null, };  
    
    case actionTypes.TENDER_MESSAGE_HANDLER:
      return { ...state, loading: false, error: action.payload,  success: action.payload,
    };

    // Video Hits
    case actionTypes.VIDEO_HIT_START:
      return { ...state, loading: true, error: null, success: null, vidHit: null };

    case actionTypes.VIDEO_HIT_SUCCESS:
      return {...state, loading: false, error: null, success: null, vidHit: action.payload, };
  
    case actionTypes.VIDEO_HIT_FAILURE:
      return { ...state, loading: false, error: action.payload, success: null, };
    //

    case actionTypes.GET_CHILD_CATEGORY_LIST_START:
      return { ...state, loading: true, error: null, success: null, childCategoryList: null };

    case actionTypes.GET_CHILD_CATEGORY_LIST_SUCCESS:
      return {...state, loading: false, error: null, success: null, childCategoryList: action.payload, };
  
    case actionTypes.GET_CHILD_CATEGORY_LIST_FAILURE:

    default: 
      return {
        loading: false,
        error: null,
        success: null, 
        vidHit: null,
        fetVidCategoryList: null,
        galleryCategoryList: null,
        galleryList: null,
        childCategoryList: null
      };
  }
};
