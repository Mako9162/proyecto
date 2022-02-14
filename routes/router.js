const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const pass = require('../lib/jwt.js');
const vehi = require('../controllers/vehiculos');

//login para generar token
router.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Marco Arancibia',
        email: 'marancibia@outlook.com'
    }

    jwt.sign({user: user}, 'smvssmvs', {expiresIn: '1m'}, (err, token) => {
        res.json({
            token,
        });
    });
});
//prueba para el token
router.post('/post', pass, (req, res) => {
    jwt.verify(req.token, "smvssmvs", (err, authData) => {
        if(err){
            res.send('Token no valido');
        }else{
            res.json({
                message:"Post Data Created...",
                authData
            });
        }   
    });
});

//rutas para vehiculos
router.get('/patente/:vehi_id', pass, vehi.vehiController);
router.post('/ipatente', pass, vehi.vehiiController);


module.exports = router;