const userModel = require('../models/userModel');

const getLogin = (req, res) => {
    res.sendFile('login.html', { root: './views' });
};

exports.getLogin = getLogin;

exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    userModel.authenticate(email, password, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro no servidor');
        }
        if (user) {
            req.session.loggedin = true;
            req.session.username = user.nome;
            res.redirect('/home');
        } else {
            res.send('Usuário e/ou senha incorretos!');
        }
    });
};

exports.getLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

exports.getRegister = (req, res) => {
    res.sendFile('register.html', { root: './views' });
};

exports.postRegister = (req, res) => {
    const { nome, email, password } = req.body;
    userModel.register(nome, email, password, (err, insertId) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Falha ao registrar');
        }
        res.redirect('/login');
    });
};
