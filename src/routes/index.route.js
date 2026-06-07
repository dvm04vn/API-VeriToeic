import express from 'express';

const router = express.Router();

import authRouter from './auth.route.js';
// import usersRouter from './users.route.js';
// import profileRouter from './profile.route.js';
// import apiRouter from './api.route.js';
// // toiec
// import topicRouter from './topic.route.js';
// import quizRouter from './quiz.route.js';
// import questionRoutes from './question.route.js';
// import resultRouter from './result.route.js';

router.use('/auth', authRouter);
// router.use('/user', usersRouter);
// router.use('/profile', profileRouter);
// router.use('/topics', topicRouter);
// router.use('/quizzes', quizRouter);
// router.use('/questions', questionRoutes);
// router.use('/results', resultRouter);
// router.use('/api', apiRouter);

export default router;
