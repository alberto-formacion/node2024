const { z } = require('zod');

// Esquema de validación para películas
const peliculaSchema = z.object({
    titulo: z.string().min(1),
    anyo: z.number().int().positive(),
    directores: z.array(z.string()).min(1),
    actores: z.array(z.string()).min(1),
    sinopsis: z.string().min(1),
    duracion: z.number().int().positive()
});

// Esquema de validación para actores
const actorSchema = z.object({
    nombre: z.string().min(1),
    edad: z.number().int().positive(),
    nacionalidad: z.string().min(1)
});

module.exports = { peliculaSchema, actorSchema };