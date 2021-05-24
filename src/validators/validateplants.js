const Joi = require('joi')
const schema = Joi.object({
    name:Joi.string().required(),
    irriagation:Joi.string().required(),
    light:Joi.string().required(),
    plantationTip:Joi.string().required(),
    info: Joi.string().required(),
    tip: Joi.string().required()
})

function validate(body){
    return schema.validate({
        name:body.name,
        irriagation:body.irriagation,
        light:body.light,
        plantationTip:body.plantationTip,
        info:body.info,
        tip: body.tip
    },
    {abortEarly:false},)
}

module.exports = {validate}