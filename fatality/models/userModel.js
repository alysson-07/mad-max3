const db = require('../db');

exports.register = (nome, email, senha, callback) => {
    const sql = "INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        if (!result) {
            return callback(new Error('No result from database'), null);
        }
        callback(null, result.insertId);
    });
};

exports.authenticate = (email, senha, callback) => {
    const sql = "SELECT * FROM Usuarios WHERE email = ? AND senha = ?";
    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length > 0) {
            return callback(null, results[0]);
        }
        callback(null, null);
    });
};
