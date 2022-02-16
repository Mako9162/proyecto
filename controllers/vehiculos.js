const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');

function vehiController(req, res) {
    
    const {vehi_id} = req.params;

    const sql = `SELECT * FROM vehiculo WHERE vehi_id= ${vehi_id}` ;

    jwt.verify(req.token, "smvssmvs", (err) => {
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

};

function vehidController(req, res) {
    
    const {vehi_id} = req.params;

    const sql = `DELETE FROM vehiculo WHERE vehi_id= ${vehi_id}` ;

    jwt.verify(req.token, "smvssmvs", (err) => {
        if(err){
            res.send('Token no valido');
        }else{
            db.query(sql, (error, result) => {
                if (error) throw error;
                res.status(200).send('Eliminado correctamente !');
            });
        }        

    });

};

function vehiiController( req, res) {
    
    const sql = 'INSERT INTO vehiculo SET ?';

    const customerObj = {
        vehi_patente: req.body.vehi_patente,
        vehi_nombre: req.body.vehi_nombre,
        vehi_visible: req.body.vehi_visible,
        vehi_empr_id: req.body.vehi_empr_id,
        vehi_tica_id: req.body.vehi_tica_id,
        vehi_tive_id: req.body.vehi_tive_id,
        vehi_equi_id: req.body.vehi_equi_id,
        vehi_regi_id: req.body.vehi_regi_id
    };

    jwt.verify(req.token, "smvssmvs", (err) => {
        if(err){
            res.send('Token no valido');
        }else{
            db.query(sql, customerObj, error => {
                if (error) throw error; 
               // console.log(customerObj);
                res.status(200).send('Guardado correctamente !');
            });
        }
    });
    
};

module.exports = {
    vehiController,
    vehiiController,
    vehidController
};

