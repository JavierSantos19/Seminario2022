require('dotenv').config();
const getDb = require('../dao/mongodb');
console.log(process.env.MONGOURI);

const descript = [
    'Dolor de Estomago',
    'Dolor de Cabeza',
    'Dolor de cuerpo',
    'Gripe',
    'COVID',
    'Denge',
    'Dolor de Espalda'
];

const observ = [
    'Prueba de Expedientes'
];

const date = [
    '2022-02-20',
    '2022-01-19',
    '2022-02-05',
    '2022-01-11'
];

const dateres = [
    '2022-02-20',
    '2022-01-19',
    '2022-02-05',
    '2022-01-11'
];

const expedientes = 50;
const expedientesArr = [];
var hasta = 50;
var desde = 1;


for (var i = 0; i < expedientes; i++) {
    const anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random() * 99999)).padStart(5, '0');
    const descripcion = descript[Math.floor(Math.random() * 7)];
    const observacion = observ[Math.floor(Math.random() * 1)];
    const fecha = new Date(); //date[Math.floor(Math.random() * 4)];
    const ultimaActualizacion = new Date(); //dateres[Math.floor(Math.random() * 4)];
    const registros = Math.floor(Math.random() * (hasta - (desde - 0))) + desde;

    const doc = {
        identidad: `0801${anio}${secuencia}`,
        fecha,
        descripcion,
        observacion,
        registros,
        ultimaActualizacion
    }


    expedientesArr.push(doc);
}

getDb().then(
    (db) => {
        const expedientes = db.collection('Expedientes');
        expedientes.insertMany(expedientesArr, (err, rslts) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(rslts);
            return;
        });
    }
);