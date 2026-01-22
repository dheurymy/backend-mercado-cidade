const express = require('express');
const router = express.Router();
const listaCompraController = require('../controllers/listaCompraController');
const auth = require('../middleware/auth');

router.post('/', auth('visitante'), listaCompraController.create);
router.get('/', auth('visitante'), listaCompraController.list);
router.get('/:id', auth('visitante'), listaCompraController.get);

module.exports = router;
