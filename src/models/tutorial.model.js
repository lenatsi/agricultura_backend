const mongoose = require('mongoose')
const SchemaMongo = mongoose.Schema

const Tutorial = new SchemaMongo({
  title: String,
  description: String,
  tags: {
    type: String,
    enum: [
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
    ],
    require: true,
  },
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('tutorial', Tutorial)
