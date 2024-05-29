const db = require('../db');
const Cavaleiro = require('../models/devs/cavaleiro');

exports.getHome = (req, res) => {
    const sql = "SELECT * FROM Cavaleiros";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar cavaleiros');
        }
        res.render('home', { cavaleiros: results });
    });
};
