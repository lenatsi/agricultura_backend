const Joi = require('joi')
const schema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required()
})

function validate(body){
    return schema.validate({
        name:body.name,
        email:body.email,
        password: body.password
    },
    {abortEarly:false},)
}

module.exports = {validate}