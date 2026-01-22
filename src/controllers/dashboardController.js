const Box = require('../models/Box');
const Produto = require('../models/Produto');
const User = require('../models/User');
const ListaCompra = require('../models/ListaCompra');

// Retorna todas as métricas do dashboard admin
async function getDashboardMetrics(req, res) {
  try {
    // Feirantes
    const feirantes = await User.find({ tipo: 'feirante' });
    // Boxes agrupados por feirante
    const boxes = await Box.find();
    // Produtos agrupados por box
    const produtos = await Produto.find();
    // Listas de compra (para popularidade)
    const listas = await ListaCompra.find();

    // Métrica: boxes por feirante + contagem de produtos
    const feirantesResumo = feirantes.map(f => {
      const boxesFeirante = boxes.filter(b => String(b.feirante) === String(f._id));
      return {
        _id: f._id,
        nome: f.nome,
        cpf: f.cpf,
        boxes: boxesFeirante.map(b => ({
          _id: b._id,
          nome: b.nome,
          localizacao: b.localizacao,
          descricao: b.descricao,
          produtosCount: produtos.filter(p => String(p.box) === String(b._id)).length
        }))
      };
    });

    // Métrica: produtos mais adicionados em listas
    const produtoContagem = {};
    listas.forEach(lista => {
      lista.produtos.forEach(item => {
        const pid = item.produto;
        produtoContagem[pid] = (produtoContagem[pid] || 0) + (item.quantidade || 1);
      });
    });
    const produtosPopulares = produtos
      .map(p => ({
        _id: p._id,
        nome: p.nome,
        preco: p.preco,
        box: p.box,
        count: produtoContagem[p._id] || 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Métrica: boxes mais populares (produtos mais adicionados)
    const boxContagem = {};
    produtos.forEach(p => {
      boxContagem[p.box] = (boxContagem[p.box] || 0) + (produtoContagem[p._id] || 0);
    });
    const boxesPopulares = boxes
      .map(b => ({
        _id: b._id,
        nome: b.nome,
        localizacao: b.localizacao,
        descricao: b.descricao,
        feirante: b.feirante,
        count: boxContagem[b._id] || 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({
      feirantesResumo,
      produtosPopulares,
      boxesPopulares
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getDashboardMetrics };