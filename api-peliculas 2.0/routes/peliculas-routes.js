const express = require('express');
const router = express.Router();
const Pelicula = require('../model/Pelicula');
const { validatePelicula } = require('../validations/validations-middleware');

// Obtener todas las películas
router.get('/', async (req, res) => {
    try {
        //const peliculas = await Pelicula.find().populate('actores', 'nombre nacionalidad'); => en caso de querer solo algunos campos
        const peliculas = await Pelicula.find().populate('actores');
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una película por ID
router.get('/:id', async (req, res) => {
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
router.post('/', validatePelicula, async (req, res) => {
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
router.put('/:id', validatePelicula, async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;