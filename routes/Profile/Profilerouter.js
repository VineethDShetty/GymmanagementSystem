const express = require("express");
const router = express.Router()
const authenticate = require("../../Authentication/auth")
const Profile=require("../../controllers/Profile/profilecontroller")
//Fetching the profile page 
router.get('/', async(req, res) => {

    await authenticate.auth(req, res);
  const profile= await Profile.fetch(req, res);
  res.render('profile', { layout: false, profile: profile, user_type: req.body.type, name: req.body.name })
});
//Updating the profile
router.post('/update', async (req, res) => {

    await authenticate.auth(req, res);
    const profile = await Profile.update(req, res);
  
});


module.exports = router;
