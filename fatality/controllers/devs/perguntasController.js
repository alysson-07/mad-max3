const Pergunta = require('../../models/devs/pergunta');

exports.getCreatePergunta = (req, res) => {
    Pergunta.getAllPerguntas((err, perguntas) => {
        if (err) {
            // Tratar erro
        } else {
            res.render('devs/createPergunta', { perguntas });
        }
    });
};

exports.postCreatePergunta = (req, res) => {
    const { descricao } = req.body;
    Pergunta.createPergunta(descricao, (err, result) => {
        if (err) return res.status(500).send('Erro ao criar pergunta');
        res.redirect('/dev/home');
    });
};

exports.removePergunta = (req, res) => {
    const { id } = req.params;
    Pergunta.removePergunta(id, (err, result) => {
        if (err) return res.status(500).send('Erro ao remover pergunta');
        res.redirect('/dev/perguntas/create');
    });
};

exports.updatePergunta = (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;
    Pergunta.updatePergunta(id, descricao, (err, result) => {
        if (err) return res.status(500).send('Erro ao atualizar pergunta');
        res.redirect('/dev/perguntas/create');
    });
};
