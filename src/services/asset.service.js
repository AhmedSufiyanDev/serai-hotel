import HttpService from "./http.service";

class AssetService extends HttpService {
    listFetVidCat = (params) => this.get("asset/get-fetVid-category", params);
    listChildCatagory = (params) => this.get("cms/list-child-categories", params);
    listGallery = (params) => this.get("asset/list-gallery", params);
    videoHit = (params) => this.post("asset/video-hit", params);
}

export default new AssetService();