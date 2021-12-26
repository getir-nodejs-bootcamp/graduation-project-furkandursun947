const Joi = require("joi");

const RecordsPayload = Joi.object({
    startDate: Joi.string().required().min(10).max(10),
    endDate: Joi.string().required().min(10).max(10),
    minCount: Joi.number(),
    maxCount: Joi.number(),
})

module.exports = RecordsPayload;