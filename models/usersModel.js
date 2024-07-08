const db = require('../db/db');

class Usuario {
  static async create(nombre, email, password) {
    const query = 'INSERT INTO usuarios (nombre, password) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [nombre, password], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }


}

module.exports = Usuario;