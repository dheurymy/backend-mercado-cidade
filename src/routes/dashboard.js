const express = require('express');
const router = express.Router();
const { getDashboardMetrics } = require('../controllers/dashboardController');

// Endpoint para métricas do dashboard admin
router.get('/dashboard-metrics', getDashboardMetrics);

module.exports = router;
