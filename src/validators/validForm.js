const Joi = require('joi')
const schema = Joi.object({
    width:Joi.number(),
    larger: Joi.number(),
    sunOrient: Joi.boolean(),
    shadowPercentage: Joi.string().valid('0', '25', '50', '75'),
    urban:Joi.boolean(),
    aroma: Joi.boolean()
})

function validate(body){
    return schema.validate({
        width: body.width,
        larger: body.larger,
        sunOrient: body.sunOrient,
        shadowPercentage: body.shadowPercentage,
        urban: body.urban,
        aroma: body.aroma
    },
    {abortEarly:false},)
}

module.exports = {validate}