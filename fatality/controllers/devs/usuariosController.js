const Usuario = require('../../models/devs/usuario');

exports.getCreateUsuario = (req, res) => {
    Usuario.getAllUsuarios((err, usuarios) => {
        if (err) {
            // Tratar erro
        } else {
            res.render('devs/createUsuario', { usuarios });
        }
    });
};

exports.postCreateUsuario = (req, res) => {
    const { nome, email, senha } = req.body;
    Usuario.createUsuario(nome, email, senha, (err, result) => {
        if (err) return res.status(500).send('Erro ao criar usuário');
        res.redirect('/dev/home');
    });
};

exports.postUpdateUsuario = (req, res) => {
    const { id, nome, email, senha } = req.body;
    Usuario.updateUsuario(id, nome, email, senha, (err, result) => {
        if (err) return res.status(500).send('Erro ao atualizar usuário');
        res.redirect('/dev/usuarios/create');
    });
};

exports.postDeleteUsuario = (req, res) => {
    const { id } = req.body;
    Usuario.removeUsuario(id, (err, result) => {
        if (err) return res.status(500).send('Erro ao remover usuário');
        res.redirect('/dev/usuarios/create');
    });
};
