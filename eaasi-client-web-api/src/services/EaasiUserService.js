import CrudService from "./base/CrudService";

const { EaasiUser } = require("../data_access/models");

export default class EaasiUserService extends CrudService {
    constructor() {
        super(EaasiUser);
    }
}
