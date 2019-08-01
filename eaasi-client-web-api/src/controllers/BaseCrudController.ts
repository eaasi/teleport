import express from 'express';
import {areAllValidIntegerParams} from "../utils/validators";
import {build_400_response, build_404_response, build_500_response} from "../utils/error-helpers";
import ICrudController from "./interfaces/ICrudController";
import HttpResponseCode from "../utils/HttpResponseCode";


/**
 * Base class for Controllers that handle CRUD logic
 */
export default class BaseCrudController implements ICrudController {
    private _crudService: any;

    constructor(crudService: any) {
        this._crudService = crudService;
    }

    /**
     * Returns all object instances in paginated form.
     * @param req request
     * @param res response
     */
    async getAll(req: express.Request, res: express.Response) {
        let limit = req.query.limit || 100;
        let page = req.query.page || 1;
        let sortCol = req.query.sortCol;

        // todo: investigate more robust query string validation, add sortCol validation
        if (!areAllValidIntegerParams([limit, page])) {
            return await res
                .status(HttpResponseCode.BAD_REQUEST)
                .send(build_400_response(JSON.stringify(req.query)));
        }

        let response = await this._crudService.getAll(limit, page, sortCol);

        if (response.hasError) {
            return await res
                .status(HttpResponseCode.SERVER_ERROR)
                .send(build_500_response(response.error));
        }

        return await res.send(response.result);
    }

    /**
     * Gets a resource by ID
     * @param req request
     * @param res response
     */
    async get(req: express.Request, res: express.Response) {
        const id = req.params.id;

        if (req.params.id == null) {
            return await res
                .status(HttpResponseCode.BAD_REQUEST)
                .send(build_400_response(req.params));
        }

        let response = await this._crudService.getByPk(id);

        if (response.hasError) {
            return await res
                .status(HttpResponseCode.SERVER_ERROR)
                .send(build_500_response(response.error));
        }

        if (response.result == null) {
            return await res
                .status(HttpResponseCode.NOT_FOUND)
                .send(build_404_response(req.originalUrl));
        }

        return await res.status(HttpResponseCode.OK).send(response.result);
    }

    /**
     * Creates a new resource and persists to database
     * @param req request
     * @param res response
     */
    async create(req: express.Request, res: express.Response) {
        const newObject = req.body;

        if (newObject == null) {
            return await res
                .status(HttpResponseCode.BAD_REQUEST)
                .send(build_400_response(req.body));
        }

        let response = await this._crudService.create(newObject);

        if (response.hasError) {
            return await res
                .status(HttpResponseCode.SERVER_ERROR)
                .send(build_500_response(response.error));
        }

        return await res.status(HttpResponseCode.CREATED).send(response.result);
    }

    /**
     * Updates a resource by ID
     * @param req request
     * @param res response
     */
    async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const updateData = req.body;
        let updateResponse = await this._crudService.update(id, updateData);

        if (updateResponse.hasError) {
            return BaseCrudController._handleUpdateError(req, res, updateResponse);
        }

        return await res.status(HttpResponseCode.OK).send(updateResponse);
    }

    /**
     * Deletes a resource by ID
     * @param req request
     * @param res response
     */
    async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
        let deleteResponse = await this._crudService.destroy(id);

        if (deleteResponse.hasError) {
            return BaseCrudController._handleDeleteError(req, res, deleteResponse);
        }

        return await res.status(HttpResponseCode.OK).send(deleteResponse);
    }

    /**
     * Handles sending an error response for an update action
     * @param req Express req
     * @param res Express res
     * @param updateResponse response object from ApiService
     * @returns {Promise<*>}
     * @private
     */
    static async _handleUpdateError(req: express.Request, res: express.Response, updateResponse: any) {
        if (updateResponse.error === "notFound") {
            return await res
                .status(HttpResponseCode.NOT_FOUND)
                .send(build_404_response(req.originalUrl));
        }

        return await res
            .status(HttpResponseCode.SERVER_ERROR)
            .send(build_500_response(updateResponse.error));
    }

    /**
     * Handles sending an error response for a delete action
     * @param req Express req
     * @param res Express res
     * @param deleteResponse response object from ApiService
     * @returns {Promise<*>}
     * @private
     */
    static async _handleDeleteError(req: express.Request, res: express.Response, deleteResponse: any) {
        if (deleteResponse.error === "notFound") {
            return await res
                .status(HttpResponseCode.NOT_FOUND)
                .send(build_404_response(req.originalUrl));
        }

        return await res
            .status(HttpResponseCode.SERVER_ERROR)
            .send(build_500_response(deleteResponse.error));
    }
}
