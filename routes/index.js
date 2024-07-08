const express = require('express');
const authRoutes = require('./authRoutes');
const dotenv = require('dotenv');
const db = require('../db/db');


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
});
    
