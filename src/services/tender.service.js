import HttpService from "./http.service";

class TenderService extends HttpService {
    list = (params) => this.get("cms/list-business", params);
}

export default new TenderService();