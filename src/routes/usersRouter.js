const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

const {checkToken} = require('../middlewares/authMiddleware');

router.get("/profile-me", checkToken, userController.profile);

module.exports = router;
