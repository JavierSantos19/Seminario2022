const getDb = require('../db');
let db = null;
class Expedientes {

    constructor() {
        getDb()
            .then((database) => {
                db = database;
                if (process.env.MIGRATE === 'true') {
                    const createStatement = 'CREATE TABLE IF NOT EXISTS expedientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, fecha TEXT, descripcion TEXT, observacion TEXT, registros INTEGER, ultimaActualizacion TEXT);';
                    db.run(createStatement);
                }
            })
            .catch((err) => { console.error(err) });
    }

    new(identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO expedientes (identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) VALUES (?, ?, ?, ?, ?, ?);', [identidad, fecha, descripcion, observacion, registros, ultimaActualizacion],
                (err, rslt) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    accept(rslt);
                }
            );
        });
    }

    getAll() {
        return new Promise((accept, reject) => {
            db.all('SELECT * from expedientes;', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    accept(rows);
                }
            });
        });
    }

    getById(id) {
        return new Promise((accept, reject) => {
            db.get('SELECT * from expedientes where id=?;', [id],
                (err, row) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        accept(row);
                    }
                });
        });
    }

    updateOne(id, identidad, fecha, descripcion, observacion, registros, ultimaActualizacion) {
        return new Promise(
            (accept, reject) => {
                const sqlUpdate = 'UPDATE expedientes set identidad= ?, fecha= ?, descripcion= ?, observacion= ?, registros= ?, ultimaActualizacion= ? where id= ?;';
                db.run(
                    sqlUpdate, [identidad, fecha, descripcion, observacion, registros, ultimaActualizacion, id],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            accept(this);
                        }
                    }
                );
            }

        );
    }

    deleteOne(id) {
        return new Promise(
            (accept, reject) => {
                const sqlDelete = 'DELETE FROM expedientes where id=?;'
                db.run(
                    sqlDelete, [id],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            accept(this);
                        }
                    }
                );
            }

        );
    }
}

module.exports = Expedientes;