const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    nacionalidad: String
});

module.exports = mongoose.model('Actor', actorSchema);