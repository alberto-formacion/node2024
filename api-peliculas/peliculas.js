const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/peliculas', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

const peliculaSchema = new mongoose.Schema({
    titulo: String,
    anyo: Number,
    directores: [String],
    actores: [String],
    sinopsis: String,
    duracion: Number
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);

// Obtener todas las películas
app.get('/peliculas', async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una película por ID
app.get('/peliculas/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva película
app.post('/peliculas', async (req, res) => {
    const pelicula = new Pelicula({
        titulo: req.body.titulo,
        anyo: req.body.anyo,
        directores: req.body.directores,
        actores: req.body.actores,
        sinopsis: req.body.sinopsis,
        duracion: req.body.duracion
    });

    try {
        const nuevaPelicula = await pelicula.save();
        res.status(201).json(nuevaPelicula);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una película por ID
app.put('/peliculas/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una película por ID
app.delete('/peliculas/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }
        res.json({ message: 'Pelicula eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Buscar películas por nombre parcial
app.get('/peliculas/buscar/:nombre', async (req, res) => {
    try {
        const regex = new RegExp(req.params.nombre, 'i'); // Expresión regular para búsqueda insensible a mayúsculas y minúsculas
        const peliculas = await Pelicula.find({ titulo: regex });
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
