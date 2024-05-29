exports.ensureDevLoggedIn = (req, res, next) => {
    if (req.session.dev) {
        return next();
    }
    res.redirect('/dev/login');
};
