const { peliculaSchema, actorSchema } = require('./validations');

// Middleware para validar el cuerpo de la solicitud de películas
const validatePelicula = (req, res, next) => {
    try {
        peliculaSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors });
    }
};

// Middleware para validar el cuerpo de la solicitud de actores
const validateActor = (req, res, next) => {
    try {
        actorSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: error.errors });
    }
};

module.exports = { validatePelicula, validateActor };