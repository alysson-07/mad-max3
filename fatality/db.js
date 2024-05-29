const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', // Host do banco de dados
    user: 'root', // Usuário do banco de dados
    password: '', // Senha do banco de dados
    database: 'mad_max3' // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Exemplo de consulta
    connection.query('SELECT * FROM Usuarios', (error, results, fields) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            return;
        }
        console.log('Resultados da consulta:', results);
    });
});

// Exportar a conexão para uso em outros módulos
module.exports = connection;
