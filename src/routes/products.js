const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const auth = require('../middleware/auth');

router.post('/', auth('feirante'), produtoController.create);
router.get('/', produtoController.list);
router.get('/:id', produtoController.get);
router.put('/:id', auth('feirante'), produtoController.update);
router.delete('/:id', auth('feirante'), produtoController.remove);


// Produtos mais buscados
router.get('/analytics/mais-buscados', async (req, res) => {
	try {
		const produtos = await require('../models/Produto').find().sort({ buscas: -1 }).limit(10).populate('categoria box');
		res.json(produtos);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao buscar analytics de produtos.' });
	}
});

// Boxes mais acessados
router.get('/analytics/boxes-mais-acessados', async (req, res) => {
	try {
		const boxes = await require('../models/Box').find().sort({ acessos: -1 }).limit(10).populate('feirante tipoEstabelecimento');
		res.json(boxes);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao buscar analytics de boxes.' });
	}
});

module.exports = router;
