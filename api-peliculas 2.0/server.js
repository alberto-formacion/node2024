const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const peliculasRoutes = require('./routes/peliculas-routes');
const actoresRoutes = require('./routes/actores-routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

mongoose.connect('mongodb://localhost:27017/peliculas', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use('/peliculas', peliculasRoutes);
app.use('/actores', actoresRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});