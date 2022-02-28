const express = require('express');
const router = express.Router();
const PacientesRoutes = require('./pacientes/pacientes');
const ExpedientesRoutes = require('./expedientes/expedientes');
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
//const midlewares=require('./headerVerifyMiddleware');
const seguridadRoutes = require('./seguridad/seguridad');
const { passport, jwtMiddleware } = require('./seguridad/jwtHelper');

router.use(passport.initialize());

//public
router.use('/seguridad', verifyApiHeaderToken, seguridadRoutes);

//middleware
router.use('/pacientes',
    verifyApiHeaderToken,
    jwtMiddleware,
    PacientesRoutes
);
router.use('/expedientes', verifyApiHeaderToken, ExpedientesRoutes);

module.exports = router;