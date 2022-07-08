/**
* @param code the status code of the response
* @param message the message to be sent 
* @param data contains the fetched resources if any
*/

class Response {
    static error(code, message){
        return {
            status: "error",
            code: code,
            message: message
        }
    }

    static success(code, data){
        return data
        ? {
            status: "success",
            code: code,
            data: data
        }
        : {
            status: "success",
            code: code
        }
    }
}

module.exports = Response