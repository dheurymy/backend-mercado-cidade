const Box = require('../models/Box');
const Produto = require('../models/Produto');

exports.create = async (req, res) => {
  try {
    const { nome, descricao, localizacao, tipoEstabelecimento } = req.body;
    const feirante = req.user.id;
    const box = new Box({ nome, descricao, localizacao, tipoEstabelecimento, feirante });
    await box.save();
    res.status(201).json(box);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar box.', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const boxes = await Box.find().populate('tipoEstabelecimento feirante');
    res.json(boxes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar boxes.', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const box = await Box.findById(req.params.id).populate('tipoEstabelecimento feirante produtos');
    if (!box) return res.status(404).json({ message: 'Box não encontrado.' });
    res.json(box);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar box.', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const box = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!box) return res.status(404).json({ message: 'Box não encontrado.' });
    res.json(box);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar box.', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const box = await Box.findByIdAndDelete(req.params.id);
    if (!box) return res.status(404).json({ message: 'Box não encontrado.' });
    res.json({ message: 'Box removido.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover box.', error: err.message });
  }
};
