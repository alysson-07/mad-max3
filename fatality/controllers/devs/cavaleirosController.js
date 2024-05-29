const Cavaleiro = require('../../models/devs/cavaleiro');

exports.getCreateCavaleiro = (req, res) => {
    Cavaleiro.getAllCavaleiros((err, cavaleiros) => {
        if (err) {
            // Tratar erro
        } else {
            res.render('devs/createCavaleiro', { cavaleiros });
        }
    });
};

exports.postCreateCavaleiro = (req, res) => {
    const { nome, constelacao, descricao } = req.body;
    const imagem_url = req.file ? req.file.filename : '';

    Cavaleiro.createCavaleiro(nome, constelacao, descricao, imagem_url, (err, result) => {
        if (err) return res.status(500).send('Erro ao criar cavaleiro');
        res.redirect('/dev/home');
    });
};

exports.removeCavaleiro = (req, res) => {
    const { id } = req.params;
    Cavaleiro.removeCavaleiro(id, (err, result) => {
        if (err) return res.status(500).send('Erro ao remover cavaleiro');
        res.redirect('/dev/cavaleiros/create');
    });
};

exports.updateCavaleiro = (req, res) => {
    const { id } = req.params;
    const { nome, constelacao, descricao } = req.body;
    Cavaleiro.updateCavaleiro(id, nome, constelacao, descricao, (err, result) => {
        if (err) return res.status(500).send('Erro ao atualizar cavaleiro');
        res.redirect('/dev/cavaleiros/create');
    });
};
