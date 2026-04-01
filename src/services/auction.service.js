import HttpService from "./http.service";

class AuctionService extends HttpService {
    list = (params) => this.get("auction/search", params);

   

    createAuction = (data) => this.post(`auction?msisdn=${data.msisdn}&tagName=${data.tagName}&bidPrice=${data.bidPrice}`);
}

export default new AuctionService();