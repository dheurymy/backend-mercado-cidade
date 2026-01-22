const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  foto: String,
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  box: { type: mongoose.Schema.Types.ObjectId, ref: 'Box', required: true },
  disponivel: { type: Boolean, default: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produto', produtoSchema);
