require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { nanoid } = require("nanoid");

const Users = require("../../models/User");
const Profile = require("../../models/Profile");

// Helper function
const generateUsername = (profileName = "") => {
  const clean = profileName.replace(/\s+/g, "");
  const token = nanoid(4).toUpperCase();
  return `${clean}${token}`;
};

const saveUser = async ({
  username,
  email,
  provider,
  provider_Id,
  fullname,
}) => {
  const newUser = new Users({
    username,
    email,
    provider,
    provider_Id,
    password: "", // Nếu schema bắt buộc thì để rỗng
    fullname: fullname || "", // Nếu schema bắt buộc thì gán rỗng
  });
  await newUser.save();
  return newUser;
};

const saveProfile = async ({ userID, avatar, first_name, last_name }) => {
  const newProfile = new Profile({
    userID,
    avatar,
    first_name,
    last_name,
  });
  await newProfile.save();
};

const checkProfile = async ({ userID, avatar, first_name, last_name }) => {
  const existing = await Profile.findOne({ userID });
  if (!existing) {
    await saveProfile({ userID, avatar, first_name, last_name });
  }
};

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await Users.findOne({
          $or: [{ email: profile._json.email }, { provider_Id: profile.id }],
        });

        const username = generateUsername(profile._json.name);
        const first_name = profile._json.given_name || "";
        const last_name = profile._json.family_name || "";
        const email = profile._json.email;

        if (!existingUser) {
          const newUser = await saveUser({
            username,
            email,
            provider: profile.provider,
            provider_Id: profile.id,
            fullname: profile._json.name,
          });

          await saveProfile({
            userID: newUser._id,
            avatar: profile._json.picture,
            first_name,
            last_name,
          });

          const { password, ...other } = newUser._doc;
          return cb(null, other);
        }

        await checkProfile({
          userID: existingUser._id,
          avatar: profile._json.picture,
          first_name,
          last_name,
        });

        const { password, ...other } = existingUser._doc;
        return cb(null, other);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "photos", "email", "displayName"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile._json?.email || "";
        const [first_name = "", last_name = ""] =
          profile.displayName?.split(" ") || [];
        const username = generateUsername(profile.displayName);

        const existingUser = await Users.findOne({
          $or: [{ email }, { provider_Id: profile.id }],
        });

        if (!existingUser) {
          const newUser = await saveUser({
            username,
            email,
            provider: "facebook",
            provider_Id: profile.id,
            fullname: profile.displayName,
          });

          await saveProfile({
            userID: newUser._id,
            avatar: profile.photos?.[0]?.value || "",
            first_name,
            last_name,
          });

          const { password, ...other } = newUser._doc;
          return cb(null, other);
        }

        await checkProfile({
          userID: existingUser._id,
          avatar: profile.photos?.[0]?.value || "",
          first_name,
          last_name,
        });

        const { password, ...other } = existingUser._doc;
        return cb(null, other);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
