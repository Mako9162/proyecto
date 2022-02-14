//Archivo Inicial con server

const express = require('express');
const app = express();
// Puerto
const PORT = process.env.PORT || 3000;
app.use(express.json());
// Ruta
const router = require('./routes/router.js');
app.use('/api', router);
// Servidor
app.listen(PORT, () => console.log(`Servidor en linea, puerto ${PORT}!!`));