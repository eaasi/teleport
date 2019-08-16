import express from 'express';

class EaasiAuthController {
    constructor() {}
    /**
     * Logs a user in
     * @param req request
     * @param res response
     */
    async login(req: express.Request, res: express.Response) {
        // TODO
        console.log("Not implemented");
        await res.json({});
    }

    /**
     * Logs a user out
     * @param req request
     * @param res response
     */
    async logout(req: express.Request, res: express.Response) {
        // TODO
        console.log("Not implemented");
        await res.json({});
    }

    /**
     * Renews a JWT
     * @param req request
     * @param res response
     */
    async refresh(req: express.Request, res: express.Response) {
        // TODO
        console.log("Not implemented");
        await res.json({});
    }
}

module.exports = EaasiAuthController;
