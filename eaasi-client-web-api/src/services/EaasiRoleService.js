import CrudService from "./base/CrudService";

const { EaasiRole } = require("../data_access/models");

export default class EaasiRoleService extends CrudService {
    constructor() {
        super(EaasiRole);
    }
}
