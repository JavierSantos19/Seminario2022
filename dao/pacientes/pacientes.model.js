const getDb = require('../mongodb');
const ObjectId = require('mongodb').ObjectId
let db = null;
class Pacientes {
    collections = null;
    constructor() {
        getDb()
            .then((database) => {
                db = database;
                this.collections = db.collection('Pacientes');
                if (process.env.MIGRATE === 'true') {

                }
            })
            .catch((err) => { console.error(err) });
    }

    async new(nombre, apellidos, identidad, telefono, email) {
        const newPaciente = {
            nombre,
            apellidos,
            identidad,
            telefono,
            email
        };
        const rslt = await this.collections.insertOne(newPaciente);
        return rslt;
    }
    async getAll() {
        const cursor = this.collections.find({});
        const documents = await cursor.toArray();
        return documents;

    }
    async getFaceted(page, items, filter = {}) {
        const cursor = this.collections.find(filter);
        const totalItems = await cursor.count();
        cursor.skip((page - 1) * items);
        cursor.limit(items);
        const resultados = await cursor.toArray();
        return {
            totalItems,
            page,
            items,
            totalPages: (Math.ceil(totalItems / items)),
            resultados
        };
    }
    async getById(id) {
        const _id = new ObjectId(id);
        const filter = { _id };
        const myDocument = this.collections.findOne(filter);
        return myDocument;
    }

    async updateOne(id, nombre, apellidos, identidad, telefono, email) {
        const filter = { _id: new ObjectId(id) };
        const updateCmd = {
            '$set': {
                nombre,
                apellidos,
                identidad,
                telefono,
                email

            }
        };
        return await this.collections.updateOne(filter, updateCmd);

    }

    async updateAddTag(id, tagEntry) {
        const updateCmd = {
            "$push": {
                tags: tagEntry
            }
        }

        const filter = { _id: new ObjectId(id) };
        return await this.collections.updateOne(filter, updateCmd);
    }

    async updateAddTagSet(id, tagEntry) {
        const updateCmd = {
            "$addToSet": {
                tags: tagEntry
            }
        }

        const filter = { _id: new ObjectId(id) };
        return await this.collections.updateOne(filter, updateCmd);
    }

    async updatePopTag(id, tagEntry) {
        const updateCmd = {
            "$pop": {
                tags: tagEntry
            }
        }

        const filter = { _id: new ObjectId(id) };
        return await this.collections.updateOne(filter, updateCmd);
    }

    async deleteOne(id) {
        const filter = { _id: new ObjectId(id) };

        return await this.collections.deleteOne(filter);
    }
}

module.exports = Pacientes;