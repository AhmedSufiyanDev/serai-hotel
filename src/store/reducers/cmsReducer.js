import * as actionTypes from "../actionTypes";

const initialState = {
  loading: false,
  roomData: null,
  KBData: null,
  empCornerData: null,
  data: null,
  error: null,
  success: null,
  successBooking: null,
  successContactUs: null,
  guestName: null,
  guestEmail: null,
  guestPhone: null,
  bookingData: null,
  paymentData: null,
  successpaymentData: null,
  loadingPaymentData: null,
  roomList: null,
  loadingRoomList: null,
  bannerImage: null,
  loadingBannerImage: null,
  blog: null,
  successBlog: null,
  sessionID: null,
  successUser: null,
  userData: null,
  submitSuccessUser: null,
  submitData: null,
  userBookingData: null,
  bookingDataSuccess: null,
  paymentInfo: null,
  categoryData: null,
  successRoomCatData: null,
  successBlogData: null,
  blogData: null,
  paramData: null,
  successParam: null,
  paramSetData: null,
  successSetParam: null,
  loadingParam: null,
  loadingCategory: null,
  getParamLoading: null,
  message: null,
  paymentUrl: null,
};
export const cmsReducer = (state = initialState, action) => {
  // console.log("action.payload",action.payload)
  switch (action.type) {
    /** Home */
    case actionTypes.GET_ROOM_DATA_START:
      return { ...state, loading: true, error: null, successRoom: null };

    case actionTypes.GET_ROOM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successRoom: true,
        roomData: action.payload,
      };

    case actionTypes.GET_ROOM_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successRoom: null,
      };

    case actionTypes.SUBMIT_BOOKING_START:
      return {
        ...state,
        loading: action.payload.cart == 1 ? false : true,
        error: null,
        paymentUrl: null,
        successBooking: null,
        guestName: null,
        guestEmail: null,
        guestPhone: null,
        bookingData: null,
      };

    case actionTypes.SUBMIT_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successBooking:
          action.payload.cart == 1
            ? (action.payload.status = 201)
            : action.payload.status,
        paymentUrl: action.payload.paymentUrl,
        bookingData: action.payload.bookingData,
      };

    case actionTypes.SUBMIT_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paymentUrl: null,
        successBooking: action.payload.status,
        guestName: null,
        guestEmail: null,
        guestPhone: null,
        bookingData: null,
      };

    case actionTypes.SUBMIT_CONTACT_US_START:
      return { ...state, loading: true, error: null, successContactUs: null };

    case actionTypes.SUBMIT_CONTACT_US_SUCCESS:
      return { ...state, loading: false, error: null, successContactUs: true };

    case actionTypes.SUBMIT_CONTACT_US_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successContactUs: null,
      };

    case actionTypes.ROOM_CAT_LIST_START:
      return {
        ...state,
        loadingRoomList: true,
        error: null,
        roomList: null,
        success: null,
      };

    case actionTypes.ROOM_CAT_LIST_SUCCESS:
      return {
        ...state,
        loadingRoomList: false,
        error: null,
        roomList: action.payload,
        success: true,
      };

    case actionTypes.ROOM_CAT_LIST_FAILURE:
      return {
        ...state,
        loadingRoomList: false,
        error: action.payload,
        roomList: null,
        success: false,
      };

    case actionTypes.GET_BANNER_IMAGE:
      return {
        ...state,
        loadingBannerImage: true,
        error: null,
        bannerImage: null,
        success: null,
      };

    case actionTypes.BANNER_IMAGE_SUCCESS:
      return {
        ...state,
        loadingBannerImage: false,
        error: null,
        bannerImage: action.payload,
        success: true,
      };

    case actionTypes.BANNER_IMAGE_FAILURE:
      return {
        ...state,
        loadingBannerImage: false,
        error: action.payload,
        bannerImage: null,
        success: false,
      };

    case actionTypes.GET_BLOG_START:
      return {
        ...state,
        loading: true,
        error: null,
        blog: null,
        successBlog: null,
      };

    case actionTypes.GET_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        blog: action.payload,
        successBlog: true,
      };

    case actionTypes.GET_BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        blog: null,
        successBlog: false,
      };

    case actionTypes.GET_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
        userData: null,
        successUser: null,
      };

    case actionTypes.GET_BLOG_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
        blogData: null,
        successBlogData: null,
      };

    case actionTypes.GET_BLOG_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        blogData: action.payload,
        successBlogData: true,
      };

    case actionTypes.GET_BLOG_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        blogData: null,
        successBlogData: false,
      };

    case actionTypes.GET_USER_START:
      return {
        ...state,
        loading: true,
        error: null,
        userData: null,
        successUser: null,
      };

    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userData: action.payload,
        successUser: true,
      };

    case actionTypes.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userData: null,
        successUser: false,
      };

    case actionTypes.SUBMIT_USER_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
        submitData: null,
        submitSuccessUser: null,
      };

    case actionTypes.SUBMIT_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        submitData: action.payload.user,
        submitSuccessUser: true,
      };

    case actionTypes.SUBMIT_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        submitData: null,
        submitSuccessUser: false,
      };

    case actionTypes.USER_BOOKING_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
        userBookingData: null,
        bookingDataSuccess: null,
      };

    case actionTypes.USER_BOOKING_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userBookingData: action.payload,
        bookingDataSuccess: true,
      };

    case actionTypes.USER_BOOKING_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userBookingData: null,
        bookingDataSuccess: false,
      };

    case actionTypes.PAYMENT_DATA_START:
      return {
        ...state,
        loadingPaymentData: true,
        error: null,
        paymentInfo: null,
        successPayment: null,
      };

    case actionTypes.PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        loadingPaymentData: false,
        error: null,
        paymentInfo: action.payload.data,
        successPayment: true,
      };

    case actionTypes.PAYMENT_DATA_FAILURE:
      return {
        ...state,
        loadingPaymentData: false,
        error: action.payload,
        paymentInfo: null,
        successPayment: false,
      };

    case actionTypes.ROOM_CATEGORY_DATA_START:
      return {
        ...state,
        loadingCategory: true,
        error: null,
        categoryData: null,
        successRoomCatData: null,
      };

    case actionTypes.ROOM_CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        loadingCategory: false,
        error: null,
        categoryData: action.payload,
        successRoomCatData: true,
      };

    case actionTypes.ROOM_CATEGORY_DATA_FAILURE:
      return {
        ...state,
        loadingCategory: false,
        error: action.payload,
        categoryData: null,
        successRoomCatData: false,
      };

    case actionTypes.GET_SESSION_ID_START:
      return {
        ...state,
        loading: true,
        error: null,
        sessionID: null,
        success: null,
      };

    case actionTypes.GET_SESSION_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        sessionID: action.payload,
        success: true,
      };

    case actionTypes.GET_SESSION_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        sessionID: null,
        success: false,
      };

    case actionTypes.GET_PAYMENT_METHOD_START:
      return { ...state, loading: true, error: null, successpaymentData: null };

    case actionTypes.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        successpaymentData: true,
        paymentData: action.payload,
      };

    case actionTypes.GET_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successpaymentData: null,
      };

    case actionTypes.GET_PARAMS_START:
      return {
        ...state,
        getParamLoading: true,
        error: null,
        successParam: false,
        paramData: null,
      };

    case actionTypes.GET_PARAMS_SUCCESS:
      return {
        ...state,
        getParamLoading: false,
        error: null,
        successParam: true,
        paramData: action.payload,
      };

    case actionTypes.GET_PARAMS_FAILURE:
      return {
        ...state,
        getParamLoading: false,
        error: action.payload,
        successParam: false,
      };

    case actionTypes.SET_PARAMS_START:
      return {
        ...state,
        loadingParam: true,
        error: null,
        successSetParam: null,
        paramSetData: null,
      };

    case actionTypes.SET_PARAMS_SUCCESS:
      return {
        ...state,
        loadingParam: false,
        error: null,
        successSetParam: true,
        paramSetData: action.payload,
      };

    case actionTypes.SET_PARAMS_FAILURE:
      return {
        ...state,
        loadingParam: false,
        error: action.payload,
        successSetParam: null,
        paramSetData: null,
      };

    /** List Emp Corner */
    case actionTypes.GET_LIST_EMP_CORNER_START:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        empCornerData: null,
      };

    case actionTypes.GET_LIST_EMP_CORNER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        empCornerData: action.payload,
      };

    case actionTypes.GET_LIST_EMP_CORNER_FAILURE:
      return { ...state, loading: false, error: action.payload, success: null };
    // End

    case actionTypes.CMS_MESSAGE_HANDLER:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: action.payload,
      };

    case actionTypes.CMS_HANDLER_SUCCESS:
      return {
        ...state,
        paymentUrl: null,
        loading: false,
        error: false,
        successContactUs: false,
        successSetParam: false,
        successParam: false,
        paramData: null,
        categoryData: null,
        successRoomCatData: false,
      };

    default:
      return {
        loading: false,
        // relProjectData: null,
        // relNewsData:null,
        empCornerData: null,
        error: null,
        success: null,
        successBooking: null,
        guestData: null,
        bookingData: null,
        paymentData: null,
        successpaymentData: null,
        successPayment: null,
        roomList: null,
        loadingRoomList: null,
        loadingBannerImage: null,
        blog: null,
        successUser: null,
        userData: null,
        successBlog: null,
        submitSuccessUser: null,
        submitData: null,
        bookingData: null,
        bookingDataSuccess: null,
        paymentInfo: null,
        categoryData: null,
        successRoomCatData: null,
        successBlogData: null,
        blogData: null,
        paramData: null,
        successParam: null,
        getParamLoading: null,
        paramSetData: null,
        successSetParam: null,
        successPayment: null,
        loadingPaymentData: null,
        loadingParam: null,
        loadingCategory: null,
        message: null,
        paymentUrl: null,
      };
  }
};
