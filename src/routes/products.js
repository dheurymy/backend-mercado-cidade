const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const auth = require('../middleware/auth');

router.post('/', auth('feirante'), produtoController.create);
router.get('/', produtoController.list);
router.get('/:id', produtoController.get);
router.put('/:id', auth('feirante'), produtoController.update);
router.delete('/:id', auth('feirante'), produtoController.remove);

module.exports = router;
