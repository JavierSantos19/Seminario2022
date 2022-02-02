const express = require('express');
const router = express.Router();
const PacientesRoutes = require('./pacientes/pacientes');
const ExpedientesRoutes = require('./expedientes/expedientes');
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
//const midlewares=require('./headerVerifyMiddleware');

router.use('/pacientes',
    verifyApiHeaderToken,
    PacientesRoutes
);
router.use('/expedientes', verifyApiHeaderToken, ExpedientesRoutes);

module.exports = router;