import HttpService from "./http.service";

class RiverflowService extends HttpService {
    //listRiverflow = (params) => this.get("cms/list-flowrate", params); 

    riverflowsPak = (params) => this.get("cms/riverflows-pakistan", params); 
 
}

export default new RiverflowService();
