const express = require("express");
const router = express.Router();
const authenticate = require("../../Authentication/auth");
const attendence=require("../../controllers/dashboard/dashboard")


//Router to fetch attendance page 
router.get('/',async (req, res) => {

    await authenticate.auth(req, res);
    //fetching all the user
    const user = await attendence.fetchuser(req, res);
    console.log(user);
    res.render('attendence.ejs', { layout: false,user_type: req.body.type, name: req.body.name,users:user });

})
// Updating the attendence
router.post('/update', async (req, res) => {

    await authenticate.auth(req, res);
    const user = await attendence.update(req, res);
    console.log(user);
    

})






module.exports = router;