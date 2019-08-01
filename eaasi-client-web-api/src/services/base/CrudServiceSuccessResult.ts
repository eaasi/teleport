import ICrudServiceResult from "../interfaces/ICrudServiceResult";

/**
 * Default CRUD Service success result object.  CRUD Services should return
 * a CrudServiceSuccessResult when a CRUD operation is successful
 */
export default class CrudServiceSuccessResult implements ICrudServiceResult {
    private result: object | string | number;

    constructor(result: object | string | number) {
        this.result = result;
    }

    readonly hasError: boolean = false;
}