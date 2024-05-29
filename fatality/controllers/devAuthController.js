const db = require('../db');

function getDevLogin(req, res) {
    res.render('devLogin');
}

function postDevLogin(req, res) {
    const { email, password } = req.body;
    db.query('SELECT * FROM Desenvolvedores WHERE email = ? AND senha = ?', [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao consultar banco de dados');
        }
        if (results.length > 0) {
            req.session.dev = results[0];
            return res.redirect('/dev/home');
        } else {
            res.send('Email ou senha incorretos');
        }
    });
}

function getDevLogout(req, res) {
    req.session.destroy(() => {
        res.redirect('/dev/login');
    });
}

function getDevHome(req, res) {
    res.render('devHome', { dev: req.session.dev });
}

module.exports = {
    getDevLogin,
    postDevLogin,
    getDevLogout,
    getDevHome
};
