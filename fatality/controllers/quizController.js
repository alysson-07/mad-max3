const quizModel = require('../models/quizModel');

exports.getQuiz = async (req, res) => {
    try {
        if (!req.session.questionIndex) {
            req.session.questionIndex = 0;
            req.session.userAnswers = [];
        }
        const question = await quizModel.getQuestion(req.session.questionIndex);
        if (question) {
            res.render('quiz', { question });
        } else {
            res.send('No questions available');
        }
    } catch (error) {
        console.error('Failed to fetch question:', error);
        res.status(500).send('Error fetching question');
    }
};

exports.submitAnswer = async (req, res) => {
    const { selectedOption } = req.body;
    req.session.userAnswers.push(selectedOption);

    if (req.session.questionIndex < 14) {
        req.session.questionIndex++;
        res.redirect('/quiz');
    } else {
        const finalResult = await quizModel.calculateResult();
        req.session.destroy();
        res.render('result', { finalResult });
    }
};
