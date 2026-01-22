const express = require('express');
const router = express.Router();
const listaCompraController = require('../controllers/listaCompraController');
const auth = require('../middleware/auth');

router.post('/', listaCompraController.create);
// As rotas abaixo podem ser protegidas ou removidas se não houver login de visitante
// router.get('/', auth('visitante'), listaCompraController.list);
// router.get('/:id', auth('visitante'), listaCompraController.get);

module.exports = router;
