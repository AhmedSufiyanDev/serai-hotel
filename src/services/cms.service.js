import HttpService from "./http.service";

class CmsService extends HttpService {
  room = (params) => this.post("hotelsRoomAvailable", params);
  booking = (params) => this.post("submitBooking", params);
  listEmpCorner = (params) => this.get("cms/list-emp-corner", params);
  contactUs = (params) => this.post("guest/submitContactUs", params);
  paymetMethod = (params) => this.get("guest/getPaymentMethod");
  roomList = (params) => this.get("roomCategoryList");
  bannerImage = (params) => this.get("getBannerImage");
  getBlog = (params) => this.get("blog", params);
  getsession = () => this.get("getSessionID");
  getUser = (params) => this.get("guest/userData", params);
  userData = (params) => this.post("guest/updateUser", params);
  getbookingData = (params) => this.get("guest/bookingData", params);
  getRoomCat = (params) => this.get("roomCategoryData", params);
  getBlogData = (params) => this.get("blogData", params);
  getparam = (params) => this.get("getparam", params);
  setParam = (params) => this.post("setparam", params);
  paymentData = (params) => this.get("getUserDetails", params);
}

export default new CmsService();
