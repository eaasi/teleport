import EaasiUserService from "../services/eaasi-user-service";
import BaseController from "./base-controller";

class EaasiUserController extends BaseController {
    constructor() {
        super(new EaasiUserService());
    }
}

module.exports = EaasiUserController;
