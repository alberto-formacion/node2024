const { z } = require('zod');

// Esquema de validación para películas
const peliculaSchema = z.object({
    titulo: z.string().min(1),
    anyo: z.number({
        required_error: "El año es obligatorio",
        invalid_type_error: "El año tiene que ser un numero",
      })
      .int({message: "El año tiene que ser un entero"})
      .min(1895, {message: "El año tiene que ser como minimo 1895"}),
    directores: z.array(z.string().min(5)).min(1),
    actores: z.array(z.string().min(5)).min(1),
    sinopsis: z.string().min(20),
    duracion: z.number().int().positive()
});

// Esquema de validación para actores
const actorSchema = z.object({
    nombre: z.string().min(1),
    edad: z.number().int().positive(),
    nacionalidad: z.string().min(1)
});

module.exports = { peliculaSchema, actorSchema };