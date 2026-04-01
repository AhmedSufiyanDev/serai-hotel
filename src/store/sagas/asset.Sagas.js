import * as actions from "../actions";
import * as actionsTypes from "../actionTypes";
import {put, takeEvery, all, fork} from "redux-saga/effects";
import AssetService from '../../services/asset.service'
import CmsService from '../../services/cms.service'



function* getGalleryCategoryList(action) {
  try {
    if (action.payload) {
      const page = action.payload?.pageNo;
      const perPage = action.payload?.perPage;
      const type = action.payload?.type;

      const status = 1;
      let params = {page, perPage, type, status};
      const response = yield CmsService.listCatagory(params);
      if (response?.data) {
        yield put(actions.getGalleryCategoryListSuccess(response?.data.data));
      } else {
        yield put(actions.getGalleryCategoryListFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.getGalleryCategoryListFailure(error));
  }
}

function* getFetVidCatList(action) {
  try {
    if (action.payload) {
      const page = action.payload?.pageNo;
      const perPage = action.payload?.perPage;
      const type = action.payload?.type;

      const status = 1;
      let params = {page, perPage, type, status};
      console.log('getFetVidCatList params asset sagas',params);
      const response = yield AssetService.listFetVidCat(params);
      if (response?.data) {
        yield put(actions.getFetVidCatListSuccess(response?.data.data));
      } else {
        yield put(actions.getFetVidCatListFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.getFetVidCatListFailure(error));
  }
}

function* getChildCategoryList(action) {
  try {
    if (action.payload) {
      const page = action.payload?.pageNo;
      const perPage = action.payload?.perPage;
      const type = action.payload?.type;
      const category = action.payload?.category;

      const status = 1;
      let params = {page, perPage, type, status,category};
      const response = yield AssetService.listChildCatagory(params);
      if (response?.data) {
        yield put(actions.getChildCategoryListSuccess(response?.data.data));
      } else {
        yield put(actions.getChildCategoryListFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.getChildCategoryListFailure(error));
  }
}

function* getGalleryList(action) {
    try {
      if (action.payload) {
        // const page = action.payload?.pageNo;
        // const perPage = action.payload?.perPage;
        const type = action.payload?.type;
        const category_id = action.payload?.category_id;
        let params = {type, category_id};
        const response = yield AssetService.listGallery(params);
        if (response?.data) {
          yield put(actions.getGalleryListSuccess(response?.data.data));
        } else {
          yield put(actions.getGalleryListFailure("network error"));
        }
      }
    } catch (err) {
      let error = err?.response?.data?.message
      if (!error) error = 'network error'
      
      yield put(actions.getGalleryListFailure(error));
    }
}

function* videoHit(action) {
  try {
    if (action.payload) {
      const id = action.payload?.id;
      let params = { id };
      const response = yield AssetService.videoHit(params);
      if (response?.data) {
        yield put(actions.videoHitSuccess(response?.data));
      } else {
        yield put(actions.videoHitFailure("network error"));
      }
    }
  } catch (err) {
    let error = err?.response?.data?.message
    if (!error) error = 'network error'
    
    yield put(actions.videoHitFailure(error));
  }
}
function* videoHitSaga() {
  yield takeEvery(actionsTypes.VIDEO_HIT_START, videoHit);
}

function* getGalleryCategoryListSaga() {
  yield takeEvery(actionsTypes.GET_GALLERY_CATEGORY_LIST_START, getGalleryCategoryList);
}

function* getCategoryListSaga() {
  yield takeEvery(actionsTypes.GET_CATEGORY_LIST_START, getFetVidCatList);
}

function* getChildCategoryListSaga() {
  yield takeEvery(actionsTypes.GET_CHILD_CATEGORY_LIST_START, getChildCategoryList);
}

function* getGalleryListSaga() {
    yield takeEvery(actionsTypes.GET_GALLERY_LIST_START, getGalleryList);
  }
  

export function* assetSaga() {
  yield all([
    fork(getCategoryListSaga),fork(getGalleryListSaga),fork(getChildCategoryListSaga),fork(getGalleryCategoryListSaga),
    fork(videoHitSaga)
  ]);
}
