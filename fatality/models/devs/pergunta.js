const db = require('../../db');

exports.getAllPerguntas = (callback) => {
    const sql = "SELECT * FROM Perguntas";
    db.query(sql, (err, results) => {
        callback(err, results);
    });
};

exports.createPergunta = (descricao, callback) => {
    const sql = "INSERT INTO Perguntas (descricao) VALUES (?)";
    db.query(sql, [descricao], (err, result) => {
        callback(err, result);
    });
};

exports.removePergunta = (id, callback) => {
    const sql = "DELETE FROM Perguntas WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        callback(err, result);
    });
};

exports.updatePergunta = (id, descricao, callback) => {
    const sql = "UPDATE Perguntas SET descricao = ? WHERE id = ?";
    db.query(sql, [descricao, id], (err, result) => {
        callback(err, result);
    });
};
