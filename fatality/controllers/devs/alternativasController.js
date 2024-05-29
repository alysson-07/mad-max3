const Alternativa = require('../../models/devs/alternativa');

exports.getCreateAlternativa = (req, res) => {
    Alternativa.getAllAlternativas((err, alternativas) => {
        if (err) {
            // Tratar erro
        } else {
            res.render('devs/createAlternativa', { alternativas });
        }
    });
};

exports.postCreateAlternativa = (req, res) => {
    const { pergunta_id, texto } = req.body;
    Alternativa.createAlternativa(pergunta_id, texto, (err, result) => {
        if (err) return res.status(500).send('Erro ao criar alternativa');
        res.redirect('/dev/home');
    });
};

exports.removeAlternativa = (req, res) => {
    const { id } = req.params;
    Alternativa.removeAlternativa(id, (err, result) => {
        if (err) return res.status(500).send('Erro ao remover alternativa');
        res.redirect('/dev/alternativas/create');
    });
};

exports.updateAlternativa = (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;
    Alternativa.updateAlternativa(id, texto, (err, result) => {
        if (err) return res.status(500).send('Erro ao atualizar alternativa');
        res.redirect('/dev/alternativas/create');
    });
};
