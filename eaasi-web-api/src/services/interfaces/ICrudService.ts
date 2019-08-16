import ICrudServiceResult from "./ICrudServiceResult";

/**
 * Behavior of a CRUD Service
 */
export default interface ICrudService {
    setMaxPaginationValue(maxVal: number) : void
    getAll(limit: number, page: number)   : Promise<ICrudServiceResult>
    getByPk(pk: number)                   : Promise<ICrudServiceResult>
    create(modelData: object)             : Promise<ICrudServiceResult>
    update(pk: number, modelData: object) : Promise<ICrudServiceResult>
    destroy(pk: number)                   : Promise<ICrudServiceResult>
}