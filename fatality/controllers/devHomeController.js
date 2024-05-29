const db = require('../db');

exports.getDevHome = (req, res) => {
    res.render('devHome', { dev: req.session.dev });
};
