const Joi = require("joi");

// Joi validation object for validating the payload
const RecordsPayload = Joi.object({
    startDate: Joi.string().required().min(10).max(10),
    endDate: Joi.string().required().min(10).max(10),
    minCount: Joi.number(),
    maxCount: Joi.number(),
})

module.exports = RecordsPayload;