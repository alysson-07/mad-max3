const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const Cavaleiro = require('./models/devs/cavaleiro');

const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        const extensao = file.originalname.split('.').pop();
        const nomeCriptografado = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest('hex');
        const nomeArquivo = `${nomeCriptografado}.${extensao}`;
        cb(null, nomeArquivo);
    },
});

const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false
}));

const { getLogin, postLogin, getLogout, getRegister, postRegister } = require('./controllers/loginController');
const { getDevLogin, postDevLogin, getDevLogout, getDevHome } = require('./controllers/devAuthController');
const { getHome } = require('./controllers/homeController');
const { getQuiz, submitAnswer } = require('./controllers/quizController');
const { ensureDevLoggedIn } = require('./middleware/authMiddleware');
const usuariosController = require('./controllers/devs/usuariosController');
const cavaleirosController = require('./controllers/devs/cavaleirosController');
const perguntasController = require('./controllers/devs/perguntasController');
const alternativasController = require('./controllers/devs/alternativasController');
const ensureLoggedIn = (req, res, next) => {
    if (req.session && req.session.loggedin) {
        return next();
    } else {
        return res.redirect('/login');
    }
};

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', getLogin);
app.post('/login', postLogin);
app.get('/logout', getLogout);

app.get('/register', getRegister);
app.post('/register', postRegister);

app.get('/home', ensureLoggedIn, getHome);

app.get('/quiz', ensureLoggedIn, getQuiz);
app.post('/quiz', ensureLoggedIn, submitAnswer);

app.get('/dev/login', getDevLogin);
app.post('/dev/login', postDevLogin);
app.get('/dev/logout', getDevLogout);
app.get('/dev/home', ensureDevLoggedIn, getDevHome);

// Rotas de usuários
app.get('/dev/usuarios/create', ensureDevLoggedIn, usuariosController.getCreateUsuario);
app.post('/dev/usuarios/create', ensureDevLoggedIn, usuariosController.postCreateUsuario);
app.post('/dev/usuarios/update', ensureDevLoggedIn, usuariosController.postUpdateUsuario);
app.post('/dev/usuarios/delete', ensureDevLoggedIn, usuariosController.postDeleteUsuario);

// Rotas de cavaleiros
app.get('/dev/cavaleiros/create', ensureDevLoggedIn, cavaleirosController.getCreateCavaleiro);
app.post('/dev/cavaleiros/create', ensureDevLoggedIn, upload.single('imagem'), cavaleirosController.postCreateCavaleiro);
app.post('/dev/cavaleiros/update', ensureDevLoggedIn, cavaleirosController.updateCavaleiro);
app.post('/dev/cavaleiros/delete', ensureDevLoggedIn, cavaleirosController.removeCavaleiro);

// Rotas de perguntas
app.get('/dev/perguntas/create', ensureDevLoggedIn, perguntasController.getCreatePergunta);
app.post('/dev/perguntas/create', ensureDevLoggedIn, perguntasController.postCreatePergunta);
app.post('/dev/perguntas/update', ensureDevLoggedIn, perguntasController.updatePergunta);
app.post('/dev/alternativas/create', ensureDevLoggedIn, alternativasController.postCreateAlternativa);

// Rotas de alternativas
app.get('/dev/alternativas/create', ensureDevLoggedIn, alternativasController.getCreateAlternativa);
app.post('/dev/alternativas/create', ensureDevLoggedIn, alternativasController.postCreateAlternativa);
app.post('/dev/alternativas/update', ensureDevLoggedIn, alternativasController.updateAlternativa);
app.post('/dev/alternativas/delete', ensureDevLoggedIn, alternativasController.removeAlternativa);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
