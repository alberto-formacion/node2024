const express = require('express');
const router = express.Router();
const Actor = require('../model/Actor');
const { validateActor } = require('../validations/validations-middleware');

// Obtener todos los actores
router.get('/', async (req, res) => {
    try {
        const actores = await Actor.find();
        res.json(actores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un actor por ID
router.get('/:id', async (req, res) => {
    try {
        const actor = await Actor.findById(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }
        res.json(actor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo actor
router.post('/', validateActor, async (req, res) => {
    const actor = new Actor({
        nombre: req.body.nombre,
        edad: req.body.edad,
        nacionalidad: req.body.nacionalidad
    });

    try {
        const nuevoActor = await actor.save();
        res.status(201).json(nuevoActor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un actor por ID
router.put('/:id',validateActor, async (req, res) => {
    try {
        const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actor) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }
        res.json(actor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un actor por ID
router.delete('/:id', async (req, res) => {
    try {
        const actor = await Actor.findByIdAndDelete(req.params.id);
        if (!actor) {
            return res.status(404).json({ message: 'Actor no encontrado' });
        }
        res.json({ message: 'Actor eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
