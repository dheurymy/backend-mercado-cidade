const express = require('express');
const router = express.Router();
const boxController = require('../controllers/boxController');
const auth = require('../middleware/auth');

router.post('/', auth('feirante'), boxController.create);
router.get('/', boxController.list);
router.get('/:id', boxController.get);
router.put('/:id', auth('feirante'), boxController.update);
router.delete('/:id', auth('feirante'), boxController.remove);

module.exports = router;
