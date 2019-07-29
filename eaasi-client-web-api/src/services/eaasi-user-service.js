import ApiService from "./base/api-service";

const { EaasiUser } = require("../data_access/models");

export default class EaasiUserService extends ApiService {
    constructor() {
        super(EaasiUser);
    }
}
