export default class HttpResponseCode {
    static OK           :number = 200   // Successful request
    static CREATED      :number = 201   // The specified resource was created
    static ACCEPTED     :number = 202   // The request was accepted
    static REDIRECT     :number = 302   // "Found" - can be used for redirecting a request
    static BAD_REQUEST  :number = 400   // HTTP request sent to server has invalid syntax
    static UNAUTHORIZED :number = 401   // User trying to access the resource is not authenticated
    static FORBIDDEN    :number = 403   // User made a valid request but is unauthorized to access resource
    static NOT_FOUND    :number = 404   // The requested resource is not found
    static SERVER_ERROR :number = 500   // The server cannot handle the request for an unknown reason
}
