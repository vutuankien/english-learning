const routers = require('express').Router();

const vocabRouter = require('./vocabRoute');
const authRouter = require('./authRoute');
const courseRouter = require('./courseRoute');
const userRouter = require('./userRoute');
const questionRouter = require('./questionRoute');
const CourseEnrollementRouter = require('./courseEnrollmentRoute');
const speakingRoute = require('./speakingRoute');
function route(app) {
    app.use('/questions', questionRouter);
    app.use('/courses-enrollment', CourseEnrollementRouter);
    app.use('/courses', courseRouter);
    app.use('/user', userRouter);
    app.use('/speaking', speakingRoute);
    app.use('/auth', authRouter);
    app.use('/vocabs', vocabRouter);
    app.use('/', (req, res) => {
        res.send('Hello World from Express!');
    });
}

module.exports = route; 