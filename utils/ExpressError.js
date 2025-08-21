class ExpressError extends Error {
    constructor(statusCode, messaage) {
        super();
        this.statusCode = statusCode;
        this.message = messaage;
    }
}

module.exports = ExpressError ;