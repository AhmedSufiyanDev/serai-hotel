import * as actionTypes from "../actionTypes";

export const getFetVidCatList = (data) => { 
    
    return {
        type: actionTypes.GET_CATEGORY_LIST_START,
        payload: data,
    };
};

export const getFetVidCatListSuccess = (data) => {
    console.log('asset getFetVidCatListSuccess ',data);
    return {
        type: actionTypes.GET_CATEGORY_LIST_SUCCESS,
        payload: data,
    };
};

export const getFetVidCatListFailure = (data) => {
    return {
        type: actionTypes.GET_CATEGORY_LIST_FAILURE,
        payload: data,
    };
};


export const getGalleryCategoryList = (data) => { 
    return {
        type: actionTypes.GET_GALLERY_CATEGORY_LIST_START,
        payload: data,
    };
};

export const getGalleryCategoryListSuccess = (data) => {
    return {
        type: actionTypes.GET_GALLERY_CATEGORY_LIST_SUCCESS,
        payload: data,
    };
};

export const getGalleryCategoryListFailure = (data) => {
    return {
        type: actionTypes.GET_GALLERY_CATEGORY_LIST_FAILURE,
        payload: data,
    };
};

export const getChildCategoryList = (data) => { 
    return {
        type: actionTypes.GET_CHILD_CATEGORY_LIST_START,
        payload: data,
    };
};

export const getChildCategoryListSuccess = (data) => {
    return {
        type: actionTypes.GET_CHILD_CATEGORY_LIST_SUCCESS,
        payload: data,
    };
};

export const getChildCategoryListFailure = (data) => {
    return {
        type: actionTypes.GET_CHILD_CATEGORY_LIST_FAILURE,
        payload: data,
    };
};

export const getGalleryList = (data) => { 
    return {
        type: actionTypes.GET_GALLERY_LIST_START,
        payload: data,
    };
};

export const getGalleryListSuccess = (data) => {
    return {
        type: actionTypes.GET_GALLERY_LIST_SUCCESS,
        payload: data,
    };
};

export const getGalleryListFailure = (data) => {
    return {
        type: actionTypes.GET_GALLERY_LIST_FAILURE,
        payload: data,
    };
};

export const videoHit = (data) => { 
    return {
        type: actionTypes.VIDEO_HIT_START,
        payload: data,
    };
};
export const videoHitSuccess = (data) => {
    return {
        type: actionTypes.VIDEO_HIT_SUCCESS,
        payload: data,
    };
};
export const videoHitFailure = (data) => {
    return {
        type: actionTypes.VIDEO_HIT_FAILURE,
        payload: data,
    };
};

export const categoryMessageHandler = () => { 
    return {
        type: actionTypes.CATEGORY_MESSAGE_HANDLER,
        payload: null,
    };
};

