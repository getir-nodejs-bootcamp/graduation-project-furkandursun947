const Joi = require("joi");
const errorModel = require("../models/error.model");

/*
* @param: schema => joi validation object 
* @req: Request object
* @res: Response object
* @return If request.body is not valid, returns an error model. If it is valid, then operation continues with next()
*/
const validate = (schema) => (req, res, next) => {

    const {error, value} = schema.validate(req.body);

    if(error){
        const errorResponse = new errorModel("Request's body is not valid.", 400);
        return res.status(errorResponse.status).json({
            error: {
                message: errorResponse.message || "A problem detected."
            }
        });
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate