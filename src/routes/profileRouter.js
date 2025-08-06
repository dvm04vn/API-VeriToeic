const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profileController");

const { checkToken } = require("../middlewares/authMiddleware");

router.get("/me", checkToken, ProfileController.getProfile);
// [POST]
router.post("/create/:userID", ProfileController.createProfile);

// [PUT]
router.patch("/edit", checkToken, ProfileController.editProfile);
module.exports = router;
