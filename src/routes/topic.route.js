import express from 'express';
const router = express.Router();
const topicController = require('../controllers/topicController');

router.get('/', topicController.getAllTopics);
// Lấy 1 Topic
router.get('/:slug', topicController.getTopicById);

router.post("/", topicController.createTopic);
router.put("/:id", topicController.updateTopic);
router.delete("/:id", topicController.deleteTopic);

export default router;
