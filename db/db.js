const mysql = require('mysql2');
const dotenv = require('dotenv');


dotenv.config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

connection.query('CREATE DATABASE IF NOT EXISTS gourmet_world', (err, results) => {
  if (err) {
    console.log('Error creating database:', err );
    return;
  }
  console.log('Database ensured');

  connection.changeUser({ database : 'gourmet_world'}, (err) => {
      if (err) {
        console.log('Error switchig to gourmet_world:', err);
        return;
      }

      const createTableQuery = `
            CREATE TABLE IF NOT EXISTS Usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Crear la tabla Categorias
        CREATE TABLE IF NOT EXISTS Categorias (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT
        );

        -- Crear la tabla Recetas
        CREATE TABLE IF NOT EXISTS Recetas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(100) NOT NULL,
            descripcion TEXT,
            ingredientes TEXT,
            instrucciones TEXT,
            imagen_url VARCHAR(255),
            categoria_id INT,
            FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
        );

        -- Crear la tabla Cocteles
        CREATE TABLE IF NOT EXISTS Cocteles (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            titulo VARCHAR(100) NOT NULL,
            descripcion TEXT,
            ingredientes TEXT,
            instrucciones TEXT,
            imagen_url VARCHAR(255),
            categoria_id INT,
            FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
        );

        -- Crear la tabla Comentarios
        CREATE TABLE IF NOT EXISTS Comentarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT,
            receta_id INT,
            coctel_id INT,
            texto TEXT,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
            FOREIGN KEY (receta_id) REFERENCES Recetas(id),
            FOREIGN KEY (coctel_id) REFERENCES Cocteles(id)
        );

        -- Crear la tabla Favoritos
        CREATE TABLE IF NOT EXISTS Favoritos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT,
            receta_id INT,
            coctel_id INT,
            FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
            FOREIGN KEY (receta_id) REFERENCES Recetas(id),
            FOREIGN KEY (coctel_id) REFERENCES Cocteles(id)
        );
    
      `;
    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error creado las tablas', err);
        return;
      }
    }); 

  });

});


module.exports = connection;

