const authRouter = require("./authRouter")
const usersRouter = require('./usersRouter');
const profileRouter = require('./profileRouter');
const apiRouter = require('./apiRouter');
// toiec
const topicRouter = require('./topicRoutes');
const quizRouter = require('./quizRoutes');
const questionRoutes = require('./questionRoutes');
const resultRouter = require('./resultRoutes');

const routes = (app) => {
    app.use('/auth', authRouter)
    app.use('/user',usersRouter)
    app.use('/profile',profileRouter)
    app.use('/topics', topicRouter)
    app.use('/quizzes',quizRouter)
    app.use('/questions',questionRoutes)
    app.use('/results', resultRouter)
    app.use('/api', apiRouter)
}

module.exports = routes;