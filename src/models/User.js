const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: function() { return this.tipo === 'feirante'; }, unique: true, sparse: true },
  email: { type: String, required: function() { return this.tipo !== 'feirante'; }, unique: true, sparse: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['feirante', 'visitante', 'admin'], required: true },
  criadoEm: { type: Date, default: Date.now },
  ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);
