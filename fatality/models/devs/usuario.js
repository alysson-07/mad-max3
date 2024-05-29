const db = require('../../db');

exports.getAllUsuarios = (callback) => {
    const sql = "SELECT * FROM Usuarios";
    db.query(sql, (err, results) => {
        callback(err, results);
    });
};

exports.createUsuario = (nome, email, senha, callback) => {
    const sql = "INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senha], (err, result) => {
        callback(err, result);
    });
};

exports.removeUsuario = (id, callback) => {
    const sql = "DELETE FROM Usuarios WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        callback(err, result);
    });
};

exports.updateUsuario = (id, nome, email, senha, callback) => {
    const sql = "UPDATE Usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?";
    db.query(sql, [nome, email, senha, id], (err, result) => {
        callback(err, result);
    });
};
