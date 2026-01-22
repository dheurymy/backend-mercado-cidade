const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middleware/auth');

router.post('/', auth('admin'), categoriaController.create);
router.get('/', categoriaController.list);
router.get('/:id', categoriaController.get);
router.put('/:id', auth('admin'), categoriaController.update);
router.delete('/:id', auth('admin'), categoriaController.remove);

module.exports = router;
