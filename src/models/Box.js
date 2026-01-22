const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  localizacao: String,
  tipoEstabelecimento: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  feirante: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto' }],
  criadoEm: { type: Date, default: Date.now },
  ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Box', boxSchema);
