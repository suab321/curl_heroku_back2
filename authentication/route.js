require('dotenv').config();

const router = require('express').Router();
const passport = require('passport');

const frontURL = process.env.front_url;


router.get("/google_login", passport.authenticate('google', {scope:['profile','email'],failureRedirect: `${frontURL}`}));

router.get("/google_redirect", passport.authenticate('google',{failureRedirect: `${frontURL}`}), async(req,res)=>{
    req.session.user = req.user;
    res.redirect(`${frontURL}/profile`);
});

module.exports={
    authentication:router
}