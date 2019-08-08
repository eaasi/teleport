import Sequelize from "sequelize";
import ICrudService from "../interfaces/ICrudService";
import ICrudServiceResult from "../interfaces/ICrudServiceResult";
import CrudServiceSuccessResult from "./CrudServiceSuccessResult";
import CrudServiceErrorResult from "./CrudServiceErrorResult";

export default class CrudService implements ICrudService {

    private MAX_GET_ALL_PAGE_SIZE: number;
    private model: any;

    constructor(model: any) {
        this.model = model;
        this.MAX_GET_ALL_PAGE_SIZE = 100;
    }

    /**
     * Sets the upper bound on number of results to return per page when getAll is invoked
     * without an explicit limit.
     * @param max_val
     */
    setMaxPaginationValue(max_val: number) {
        this.MAX_GET_ALL_PAGE_SIZE = max_val;
    }

    /**
     * Gets all model instances. Implements pagination
     * On success, returns object containing results, count, and total pages
     * On error, returns error object
     * @param limit number of results to limit in the response
     * @param page starting page of response results
     * @returns {Promise<{}>}
     */
    async getAll(limit: number, page: number): Promise<ICrudServiceResult> {
        let resultsCountLimit = limit || this.MAX_GET_ALL_PAGE_SIZE;

        let totalResults = await this.model.findAndCountAll()
            .catch((error: string) => {
                return new CrudServiceErrorResult(error);
            });

        if (totalResults.hasError) {
            return totalResults;
        }

        let total_pages = Math.ceil(totalResults.count / resultsCountLimit);

        let offset = resultsCountLimit * (page - 1);

        let results = await this.model
            .findAll({
                limit: resultsCountLimit,
                offset: offset
            })
            .catch((error: string) => {
                return new CrudServiceErrorResult(error);
            });

        if (results.hasError) {
            return results;
        }

        return new CrudServiceSuccessResult({
            result: results,
            count: results.length,
            total_pages: total_pages
        });
    };

/**
 * Gets a model instance by PK
 * On success, returns model data of found resource
 * On error, returns error object
 * @param pk instance primary key
 * @returns {Promise<{}>}
 */
async getByPk(pk: number) : Promise<ICrudServiceResult> {
    return await this.model
        .findByPk(pk)
        .then((result: object) => {
            return new CrudServiceSuccessResult(result);
        })
        .catch((error: string)=> {
            return new CrudServiceErrorResult(error);
        });
}

/**
 * Creates a model instance and persists to database
 * On success, returns model data of created resource
 * On error, returns error object
 * @param modelData model object
 * @returns {Promise<{}>}
 */
async create(modelData: object) : Promise<ICrudServiceResult> {
    return await this.model
        .create(modelData)
        .then((created: object) => {
            return new CrudServiceSuccessResult(created);
        })
        .catch((error: string) => {
            return new CrudServiceErrorResult(error);
        });
}

/**
 * Updates a model instance and persists changes to database
 * On success, returns model data of updated resource
 * On error, returns error object
 * @param pk instance primary key
 * @param modelData model object
 * @returns {Promise<{}>}
 */
async update(pk: number, modelData: any) : Promise<ICrudServiceResult> {
    return await this.model
        .findByPk(pk)
        .then((found: Sequelize.Model) => {
            if (!found) {
                return new CrudServiceErrorResult("notFound");
            }
            return found
                .update(modelData)
                .then(() => {
                    found.save()
                    return new CrudServiceSuccessResult(found);
                })
                .catch((error: string) => {
                    return new CrudServiceErrorResult(error);
                });
        })
        .catch((error: string) => {
            return new CrudServiceErrorResult(error);
        });
}

/**
 * Deletes a model instance and persists changes to database
 * On success, returns PK of deleted resource
 * On error, returns error object
 * @param pk instance primary key
 * @returns {Promise<{}>}
 */
async destroy(pk: number) : Promise<ICrudServiceResult> {
    return await this.model
        .findByPk(pk)
        .then((found: Sequelize.Model) => {
            if (!found) {
                return new CrudServiceErrorResult("notFound");
            }
            return found.destroy()
                .then(() => {
                    return new CrudServiceSuccessResult(pk);
                })
                .catch((error: string) => {
                    return new CrudServiceErrorResult(error);
                });
        })
        .catch((error: string) => {
            return new CrudServiceErrorResult(error);
        });
}
}
