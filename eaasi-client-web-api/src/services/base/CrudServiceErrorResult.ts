import ICrudServiceResult from "../interfaces/ICrudServiceResult";

/**
 * Default CRUD Service error result object.  CRUD Services should return
 * a CrudServiceErrorResult when a CRUD operation results in an unexpected result
 */
export default class CrudServiceErrorResult implements ICrudServiceResult {
    private error: string;
    constructor(error: string) {
        this.error = error;
    }

    readonly hasError: boolean = true;
}
