const express = require('express');
const router = express.Router();

const Expedientes = new require('../../../../dao/expedientes/expedientes.model');
const expedienteModel = new Expedientes();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Expedientes',
        updates: new Date(2022, 0, 19, 18, 41, 00),
        author: 'Javier Eduardo Santos '
    });
});

/*router.post('/new', async(req, res) => {
    const { identidad, fecha, descripcion, observacion, registros, ultimaActualizacion } = req.body;


    res.status(200).json({
        status: 'ok',
        recieved: {
            identidad,
            fecha: new Date(),
            descripcion,
            observacion,
            registros,
            ultimaActualizacion: new Date()
        }
    });
});*/


router.get('/all', async(req, res) => {
    try {
        const rows = await expedienteModel.getAll();
        res.status(200).json({ status: 'OK', Expedientes: rows });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'FAILED' });
    }
}); // GET ALL

router.get('/byid/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const row = await expedienteModel.getById(parseInt(id));
        res.status(200).json({ status: 'OK', expediente: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'EL ID NO EXISTE' });
    }
}); // GET INDIVIDUAL

router.post('/new', async(req, res) => {
    const {
        identidad,
        fecha = new Date(),
        descripcion,
        observacion,
        registros,
        ultimaActualizacion = new Date()
    } = req.body;



    rslt = await expedienteModel.new(identidad, fecha.toISOString(), descripcion, observacion, registros, ultimaActualizacion.toISOString());

    res.status(200).json({
        status: 'OK',
        recieved: {
            identidad,
            fecha,
            descripcion,
            observacion,
            registros,
            ultimaActualizacion
        }
    });
}); //POST /new

router.put('/update/:id', async(req, res) => {
    try {
        const {
            identidad,
            fecha = new Date(),
            descripcion,
            observacion,
            registros,
            ultimaActualizacion = new Date()
        } = req.body;

        const { id } = req.params;
        const result = await expedienteModel.updateOne(id, identidad, fecha.toISOString(), descripcion, observacion, registros, ultimaActualizacion.toISOString());
        res.status(200).json({
            status: 'ok',
            result
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'FAILED' });
    }
});

router.delete('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await expedienteModel.deleteOne(id);
        res.status(200).json({
            status: 'ok',
            result
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'FAILED' });
    }
});

module.exports = router;