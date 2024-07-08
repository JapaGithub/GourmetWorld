const jwt = require('jsonwebtoken') 
const bcrypt = require('bcryptjs')
const usuarios = require('../models/usersModel')
const config = require('../config/config')  


// --------- REGISTER ---------------------
exports.register = (req, res) => {

    const {nombre, email, password} = req.body;
    
    const hashedPassword = bcrypt.hashSync(password,8);

    const nuevoUsuario = {id: usuarios.length + 1, nombre, email, password: hashedPassword};
    // usuarios.push(nuevoUsuario);
        router.post('/registre', (req, res) => {
            db.query('INSERT INTO Usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, password], (err, results) => {
            res.status(201).json({ id: results.insertId, nombre, email });
        });
    });

    const token = jwt.sign({id: nuevoUsuario.id}, config.secretKey, {expiresIn: config.tokenExpiresIn});
    res.status(201).send({auth: true, token});

};

// --------- LOGIN ---------------------
exports.login = (req, res) => {

    const {nombre, password} = req.body;

    const usuario = usuarios.find(u => u.nombre === nombre  );

    if (!usuario) return res.status('404').send('Usuario no encontrado');
        
    const passwordIsValid = bcrypt.compareSync(password, usuario.password);

    if (!passwordIsValid) return res.status('401').send({auth: false, token:null});

    const token = jwt.sign({id: usuario.id}, config.secretKey, {expiresIn: config.tokenExpiresIn});
    res.status(200).send({auth: true, token});

};

