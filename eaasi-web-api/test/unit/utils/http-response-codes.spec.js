import HttpResponseCode from "../../../src/utils/HttpResponseCode";

describe("The HTTP response code", () => {
    it("for 'OK' returns 200", () => {
        const okCode = HttpResponseCode.OK;
        expect(okCode).toBe(200);
    });

    it("for 'CREATED' returns 201", () => {
        const createdCode = HttpResponseCode.CREATED;
        expect(createdCode).toBe(201);
    });

    it("for 'ACCEPTED' returns be 202", () => {
        const acceptedCode = HttpResponseCode.ACCEPTED;
        expect(acceptedCode).toBe(202);
    });

    it("for 'REDIRECT' returns be 302", () => {
        const redirectCode = HttpResponseCode.REDIRECT;
        expect(redirectCode).toBe(302);
    });

    it("for 'BAD_REQUEST' returns 400", () => {
        const badRequestCode = HttpResponseCode.BAD_REQUEST;
        expect(badRequestCode).toBe(400);
    });

    it("for 'UNAUTHORIZED' returns 401", () => {
        const unauthorizedCode = HttpResponseCode.UNAUTHORIZED;
        expect(unauthorizedCode).toBe(401);
    });

    it("for 'FORBIDDEN' returns 403", () => {
        const forbiddenCode = HttpResponseCode.FORBIDDEN;
        expect(forbiddenCode).toBe(403);
    });

    it("for 'NOT_FOUND' returns 404", () => {
        const notFoundCode = HttpResponseCode.NOT_FOUND;
        expect(notFoundCode).toBe(404);
    });

    it("for 'SERVER_ERROR' returns 500", () => {
        const serverErrorCode = HttpResponseCode.SERVER_ERROR;
        expect(serverErrorCode).toBe(500);
    });
});
