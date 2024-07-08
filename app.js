const express = require('express');
const mysql = require('mysql2');
const app = express();
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const db = require('./db/db');


// Rutas
const indexRouter = require('./routes/index');
 
app.use(express.json());

app.use('/auth', authRoutes);

// const PORT = process.env.PORT || 3006;
// app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
