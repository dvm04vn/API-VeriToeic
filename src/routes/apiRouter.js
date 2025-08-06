const express = require("express");
const passport = require("passport");
const router = express.Router();

const jwt = require("jsonwebtoken");
const Users = require("../models/User");
// const ApiController = require('../app/controller/ApiController');
const {
  PassportProfile,
  PassportRedirect,
} = require("../middlewares/passportAuth");
const apiController = require("../controllers/apiController");

// [GET]
// -- Google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/auth/google/callback",
  PassportProfile("google"),
  PassportRedirect
);
// -- facebook
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["email"],
  })
);
router.get(
  "/auth/facebook/callback",
  PassportProfile("facebook"),
  PassportRedirect
);

router.post("/auth/success", apiController.authSuccess);

// router.post('/auth/success', async (req, res) => {
//     const { _id } = req.body;
//     if (!_id) return res.status(400).json({ message: 'Missing user id' });

//     try {
//         const user = await Users.findById(_id).select('-password');
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: '7d',
//         });

//         return res.status(200).json({
//             status: 'success',
//             meta: { token },
//             data: user,
//         });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error', error });
//     }
// });

module.exports = router;
