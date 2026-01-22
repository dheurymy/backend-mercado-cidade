const ListaCompra = require('../models/ListaCompra');
const Produto = require('../models/Produto');
const Box = require('../models/Box');

// Função para gerar roteiro simples agrupando produtos por box
async function gerarRoteiro(produtos) {
  const boxes = {};
  for (const item of produtos) {
    const produto = await Produto.findById(item.produto).populate('box');
    if (produto && produto.box) {
      if (!boxes[produto.box._id]) boxes[produto.box._id] = { box: produto.box, produtos: [] };
      boxes[produto.box._id].produtos.push(produto);
    }
  }
  // Ordenação simples por nome do box (pode ser melhorada)
  return Object.values(boxes).sort((a, b) => a.box.nome.localeCompare(b.box.nome));
}

exports.create = async (req, res) => {
  try {
    const visitante = req.user.id;
    const { produtos } = req.body;
    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({ message: 'Lista de produtos obrigatória.' });
    }
    const roteiro = await gerarRoteiro(produtos);
    const lista = new ListaCompra({ visitante, produtos, roteiro: roteiro.map(r => r.box._id) });
    await lista.save();
    res.status(201).json({ lista, roteiro });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar lista de compras.', error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const listas = await ListaCompra.find({ visitante: req.user.id }).populate('produtos.produto roteiro');
    res.json(listas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar listas de compras.', error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const lista = await ListaCompra.findById(req.params.id).populate('produtos.produto roteiro');
    if (!lista) return res.status(404).json({ message: 'Lista não encontrada.' });
    res.json(lista);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar lista de compras.', error: err.message });
  }
};
