const mongoose = require('mongoose');

const listaCompraSchema = new mongoose.Schema({
  visitante: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  produtos: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, default: 1 }
  }],
  roteiro: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Box' }],
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ListaCompra', listaCompraSchema);
