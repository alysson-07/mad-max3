const db = require('../db');

exports.getQuestion = (index) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT p.descricao AS question, a.id, a.texto 
                     FROM Perguntas p
                     JOIN Alternativas a ON p.id = a.pergunta_id
                     WHERE p.id = ?`;
        db.query(sql, [index + 1], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                const question = {
                    question: results[0].question,
                    options: results.map(option => ({
                        id: option.id,
                        texto: option.texto
                    }))
                };
                resolve(question);
            } else {
                resolve(null);
            }
        });
    });
};

exports.calculateResult = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, nome, constelacao, descricao, imagem_url FROM Cavaleiros ORDER BY RAND() LIMIT 1`;
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};
