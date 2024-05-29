const db = require('../../db');

exports.getAllAlternativas = (callback) => {
    const sql = "SELECT * FROM Alternativas";
    db.query(sql, (err, results) => {
        callback(err, results);
    });
};

exports.createAlternativa = (pergunta_id, texto, callback) => {
    const sql = "INSERT INTO Alternativas (pergunta_id, texto) VALUES (?, ?)";
    db.query(sql, [pergunta_id, texto], (err, result) => {
        callback(err, result);
    });
};

exports.removeAlternativa = (id, callback) => {
    const sql = "DELETE FROM Alternativas WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        callback(err, result);
    });
};

exports.updateAlternativa = (id, texto, callback) => {
    const sql = "UPDATE Alternativas SET texto = ? WHERE id = ?";
    db.query(sql, [texto, id], (err, result) => {
        callback(err, result);
    });
};
