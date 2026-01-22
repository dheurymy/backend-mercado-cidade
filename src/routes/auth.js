const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

const User = require('../models/User');

// Listar todos os feirantes
router.get('/feirantes', async (req, res) => {
	try {
		const feirantes = await User.find({ tipo: 'feirante' });
		res.json(feirantes);
	} catch (err) {
		res.status(500).json({ message: 'Erro ao buscar feirantes.' });
	}
});

module.exports = router;
