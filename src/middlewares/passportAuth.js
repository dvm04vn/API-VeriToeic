const passport = require('passport');
require('dotenv').config();

const PassportProfile = (type) => {
    return (req, res, next) => {
        passport.authenticate(type, (err, profile) => {
            if (err) {
                res.status(500).json({ massage: err });
            }
            req.user = profile;
            next();
        })(req, res, next);
    };
};

const PassportRedirect = (req, res) => {
    try {
        if (req?.user?._id) {
            res.redirect(`${process.env.URL_CLIENT}/success/${req.user?._id}`);
        }
    } catch (err) {
        res.status(500).json({ massage: err });
    }
};

module.exports = { PassportProfile, PassportRedirect };
