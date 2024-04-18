const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
    titulo: String,
    anyo: Number,
    directores: [String],
    actores: [String],
    sinopsis: String,
    duracion: Number
});

module.exports = mongoose.model('Pelicula', peliculaSchema);