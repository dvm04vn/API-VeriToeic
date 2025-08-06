const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// Lấy danh sách câu hỏi theo topic
// router.get("/topic/:slug", questionController.getQuestionsByTopic); // tôi thấy cái này giống với "/:slug" quá

// Lấy các Question thuộc Topic
router.get("/:slug", questionController.getQuestionById);

// CRUD
router.post("/", questionController.createQuestion);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);

const multer = require("multer");
const upload = multer(); // hoặc multer({ storage: ... })

// router.post("/questions", upload.fields([{ name: "image" }, { name: "audio" }]), createQuestion);

module.exports = router;
