class AppError extends Error {
    public statusCode: number;
    // when we will call class using new -> from the constructor thing will come 
    constructor(statusCode: number, message: string, stack = "") {
        super(message) // js Error ke call kora 
        // throw new Error -> Error er part tuku supper theke hobe

        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default AppError; 