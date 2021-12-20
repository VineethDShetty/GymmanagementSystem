const express = require("express");
const router = express.Router()
const authenticate = require("../../Authentication/auth")
const Profile=require("../../controllers/Profile/profilecontroller")

router.get('/', async(req, res) => {

    await authenticate.auth(req, res);
  const profile=  await Profile.fetch(req, res);
    res.render('profile', { layout: false,profile:profile })
});

router.post('/update', async (req, res) => {

    await authenticate.auth(req, res);
    const profile = await Profile.update(req, res);
    res.render('profile', { layout: false, profile: profile })
});


module.exports = router;
