const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, cpf, email, senha, tipo } = req.body;
    if (!nome || !senha || !tipo || (tipo === 'feirante' && !cpf) || (tipo !== 'feirante' && !email)) {
      return res.status(400).json({ message: 'Dados obrigatórios faltando.' });
    }
    const exists = await User.findOne(tipo === 'feirante' ? { cpf } : { email });
    if (exists) return res.status(409).json({ message: 'Usuário já cadastrado.' });
    const hash = await bcrypt.hash(senha, 10);
    const user = new User({ nome, cpf, email, senha: hash, tipo });
    await user.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { cpf, email, senha } = req.body;
    const user = await User.findOne(cpf ? { cpf } : { email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ message: 'Senha inválida.' });
    const token = jwt.sign({ id: user._id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, nome: user.nome, tipo: user.tipo } });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: err.message });
  }
};
