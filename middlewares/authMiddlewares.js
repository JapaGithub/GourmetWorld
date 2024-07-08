const jwt = require('jsonwebtoken');

const config = require('../config/config');

module.exports = (req, res, next) =>{
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).send({auth: false, message: 'No se creo el token'});

    const token = authHeader.split(' ')[1];

    if (!token) return res.status(403).send({auth: false, message: 'No se genero el token correctamente'});

    jwt.verify(token,  config.secretKey, (err, decoded) => {

        if(err) return res.status(500).send({auth: false, message: 'Fallo la autenticacion del token'});

        req.id = decoded.id;

        next();
    });

};