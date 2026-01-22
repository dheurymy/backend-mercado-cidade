const Produto = require('../models/Produto');
const Box = require('../models/Box');

exports.create = async (req, res) => {
  try {
    const { nome, descricao, preco, foto, categoria, box } = req.body;
    const produto = new Produto({ nome, descricao, preco, foto, categoria, box });
    await produto.save();
    // Adiciona produto ao box
    await Box.findByIdAndUpdate(box, { $push: { produtos: produto._id } });
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar produto.', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const produtos = await Produto.find().populate('categoria box');
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar produtos.', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id).populate('categoria box');
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produto.', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto.', error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });
    // Remove produto do box
    await Box.findByIdAndUpdate(produto.box, { $pull: { produtos: produto._id } });
    res.json({ message: 'Produto removido.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover produto.', error: err.message });
  }
};
