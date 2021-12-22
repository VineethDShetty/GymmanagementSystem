const express = require("express");
const router = express.Router();
const authenticate = require("../../Authentication/auth");
const teams = require("../../controllers/Team/teamcontroller");

const { body } = require("express-validator");


router.get('/team', async (req, res) => {

    try {

        const user = await authenticate.auth(req, res);
        // console.log(22, user);

        // if (req.body.type == 'U') {
        const plan = await teams.fetchmember(req, res);
        console.log(221234);
        
        console.log(222, req.body.type);
        res.render('team', { layout: false, list: plan, user_type: req.body.type, name: req.body.name });
        return;
        // }
        // else if (req.body.type == 'A') {
        //     res.send("hello");
        // }


    } catch (err) {
        console.log(err);
    }
});


module.exports = router;