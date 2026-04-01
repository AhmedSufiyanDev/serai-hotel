import HttpService from "./http.service";

class AuthService extends HttpService {
    login = (data) => this.post("guest/login", data);

    signup = (data) => this.post(`guest/signup`, data);

    resetEmailSend = (data) => this.post(`guest/reset-pass-email`, data);

    resetPassword = (data) => this.post(`guest/reset-pass`, data);

    logout = (data) => this.get("logout");

    sendOtp = (data) => this.post(`auth/login`,data);

    sendQuery = (data) => this.post(`public/auth/manageQueries`,data);

    verifyOtp = (data) => this.post(`auth/verify-otp`,data);

    addOtp = (data) => this.post(`auth/add-otp`,data);

    getConfig = (data) => this.get(`public/auth/get-config`, data);

    getViews = (data) => this.get(`public/auth/get-views`, data);


}

export default new AuthService();
