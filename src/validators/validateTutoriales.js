const Joi = require('joi')
const schema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.string()
    .required()
    .valid(
      'Cosecha',
      'Riego',
      'Siembra',
      'Plantas aromáticas',
      'Terreno',
      'Tierra',
      'Sol',
      'Árboles',
      'Frutas',
      'Bayas',
      'Verduras',
      'Legumbres',
      'Tubérculos',
      'Coles',
      'Abonado',
      'Herramientas',
      'Invernadero',
    ),
})

function validate(body) {
  return schema.validate(
    {
      title: body.title,
      description: body.description,
      tags: body.tags,
      link: body.link
    },
    { abortEarly: false },
  )
}

module.exports = { validate }
