const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const db = require('../lib/db.js');
const pass = require('../lib/jwt.js')

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

router.get('/patente/:vehi_id', pass, (req, res) => {
    
    const {vehi_id} = req.params;

    const sql = `SELECT * FROM vehiculo WHERE vehi_id= ${vehi_id}` ;

    jwt.verify(req.token, "smvssmvs", (err, authData) => {
        if(err){
            res.send('Token no valido');
        }else{
            db.query(sql, (error, result) => {
                if (error) throw error;
                if (result.length > 0){
                    res.json(result);
                }else{
                    res.status(404).send('Sin Resultados!!!');
                }
                });
        }        

    });

});

module.exports = router;