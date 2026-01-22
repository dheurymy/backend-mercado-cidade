const Categoria = require('../models/Categoria');

exports.create = async (req, res) => {
  try {
    const { nome, descricao, tipo } = req.body;
    const exists = await Categoria.findOne({ nome, tipo });
    if (exists) return res.status(409).json({ message: 'Categoria já existe.' });
    const categoria = new Categoria({ nome, descricao, tipo });
    await categoria.save();
    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar categoria.', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar categorias.', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada.' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar categoria.', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada.' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar categoria.', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada.' });
    res.json({ message: 'Categoria removida.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover categoria.', error: err.message });
  }
};
