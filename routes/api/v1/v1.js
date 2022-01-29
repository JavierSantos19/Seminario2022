const express = require('express');
const router = express.Router();
const PacientesRoutes = require('./pacientes/pacientes');
const ExpedientesRoutes = require('./expedientes/expedientes');

router.use('/pacientes', PacientesRoutes);
router.use('/expedientes', ExpedientesRoutes);

module.exports = router;