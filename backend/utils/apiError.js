class ApiError extends Error{                   //class is a blueprint for creating objects
    constructor(
        statusCode,             // not present in built in error that's why  it extends
        message="Something went wrong", //default message
        errors = [],
        stack = ""
    ){
        super(message)                  // call parent (Error) constructor with message
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack          //stack trace is the list of events that occured before the error
        }else{
            Error.captureStackTrace(
                this, this.constructor  //auto-generates a clean stack trace
            )
        }
    }
}

export{ApiError}