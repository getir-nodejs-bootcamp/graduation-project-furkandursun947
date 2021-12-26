

// Response model that we send after a request.
class ResponseModel {
    constructor(code, msg, records){
        this.code = code;
        this.msg = msg;
        this.records = records;
    }
}


module.exports = {ResponseModel};