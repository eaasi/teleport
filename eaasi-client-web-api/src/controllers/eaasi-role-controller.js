import EaasiRoleService from "../services/eaasi-role-service";
import BaseController from "./base-controller";

class EaasiRoleController extends BaseController {
    constructor() {
        super(new EaasiRoleService());
    }
}

module.exports = EaasiRoleController;
