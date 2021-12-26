const Joi = require("joi");


const validate = (schema) => (req, res, next) => {
    console.log(schema);

    const {error, value} = schema.validate(req.body);

    if(error){
        return res.status(400).send({error: "Error found in validate"});
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate