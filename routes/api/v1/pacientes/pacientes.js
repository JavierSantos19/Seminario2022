const express = require('express');
const router = express.Router();

const Pacientes = new require('../../../../dao/pacientes/pacientes.model');
const pacienteModel = new Pacientes();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Pacientes',
        updates: new Date(2022, 0, 19, 18, 41, 00),
        author: 'Javier Eduardo Santos'
    });
}); //GET /

router.get('/all', async(req, res) => {
    try {
        const rows = await pacienteModel.getAll();
        res.status(200).json({ status: 'OK', Pacientes: rows });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'FAILED' });
    }
}); // GET ALL

router.get('/byid/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const row = await pacienteModel.getById(parseInt(id));
        res.status(200).json({ status: 'OK', paciente: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'EL ID NO EXISTE' });
    }
}); // GET INDIVIDUAL

router.post('/new', async(req, res) => {
    const {
        nombre,
        apellidos,
        identidad,
        email,
        telefono
    } = req.body;

    rslt = await pacienteModel.new(nombre, apellidos, identidad, telefono, email);

    res.status(200).json({
        status: 'OK',
        recieved: {
            nombre,
            apellidos,
            nombrecompleto: `${nombre} ${apellidos}`,
            identidad,
            email,
            telefono
        }
    });
}); //POST /new

router.put('/update/:id', async(req, res) => {
    try {
        const {
            nombre,
            apellidos,
            identidad,
            email,
            telefono
        } = req.body;

        const { id } = req.params;
        const result = await pacienteModel.updateOne(id, nombre, apellidos, identidad, email, telefono);
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
        const result = await pacienteModel.deleteOne(id);
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