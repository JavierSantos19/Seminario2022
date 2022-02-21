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
        const row = await expedienteModel.getById(id);
        res.status(200).json({ status: 'OK', expediente: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'EL ID NO EXISTE' });
    }
}); // GET INDIVIDUAL

const allowedItemsNumber = [10, 15, 20];
//facet search
router.get('/facet/:page/:items', async(req, res) => {
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);
    if (allowedItemsNumber.includes(items)) {
        try {
            const pacientes = await expedienteModel.getFaceted(page, items);
            res.status(200).json({ docs: pacientes });
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'failed' });
        }
    } else {
        return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10,15,20)' });
    }

});

router.get('/byname/:ide/:page/:items', async(req, res) => {
    const ide = req.params.ide;
    const page = parseInt(req.params.page, 10);
    const items = parseInt(req.params.items, 10);
    if (allowedItemsNumber.includes(items)) {
        try {
            const expedientes = await expedienteModel.getFaceted(page, items, { identidad: ide });
            res.status(200).json({ docs: expedientes });
        } catch (ex) {
            console.log(ex);
            res.status(500).json({ status: 'failed' });
        }
    } else {
        return res.status(403).json({ status: 'error', msg: 'Not a valid item value (10,15,20)' });
    }

});

router.post('/new', async(req, res) => {
    const {
        identidad,
        fecha,
        descripcion,
        observacion,
        registros,
        ultimaActualizacion
    } = req.body;



    rslt = await expedienteModel.new(identidad, fecha, descripcion, observacion, registros, ultimaActualizacion);

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
            fecha,
            descripcion,
            observacion,
            registros,
            ultimaActualizacion
        } = req.body;

        const { id } = req.params;
        const result = await expedienteModel.updateOne(id, identidad, fecha, descripcion, observacion, registros, ultimaActualizacion);
        res.status(200).json({
            status: 'ok',
            result
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'FAILED' });
    }
});

router.put('/addtag/:id', async(req, res) => {
    try {
        const { tag } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateAddTag(id, tag);
        res.status(200).json({
            status: 'ok',
            result
        })
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'FAILED' });
    }
});

router.put('/addtagset/:id', async(req, res) => {
    try {
        const { tag } = req.body;
        const { id } = req.params;
        const result = await expedienteModel.updateAddTagSet(id, tag);
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