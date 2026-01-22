const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: String,
  tipo: { type: String, enum: ['produto', 'estabelecimento'], required: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Categoria', categoriaSchema);
