const db = require('../../db');

exports.getAllCavaleiros = (callback) => {
    const sql = "SELECT * FROM Cavaleiros";
    db.query(sql, (err, results) => {
        callback(err, results);
    });
};

exports.createCavaleiro = (nome, constelacao, descricao, imagem_url, callback) => {
    const sql = "INSERT INTO Cavaleiros (nome, constelacao, descricao, imagem_url) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, constelacao, descricao, imagem_url], (err, result) => {
        callback(err, result);
    });
};

exports.removeCavaleiro = (id, callback) => {
    const sql = "DELETE FROM Cavaleiros WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        callback(err, result);
    });
};

exports.updateCavaleiro = (id, nome, constelacao, descricao, callback) => {
    const sql = "UPDATE Cavaleiros SET nome = ?, constelacao = ?, descricao = ? WHERE id = ?";
    db.query(sql, [nome, constelacao, descricao, id], (err, result) => {
        callback(err, result);
    });
};
