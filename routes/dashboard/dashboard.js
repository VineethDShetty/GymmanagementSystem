const express = require("express");
const router = express.Router();
const authenticate = require("../../Authentication/auth");
const dashboard = require("../../controllers/dashboard/dashboard");

const { body } = require("express-validator");
const pool = require("../../utils/db-config");

router.get('/home', async (req, res) => {
    
    try {
    
        const user = await authenticate.auth(req, res);
        // console.log(22, user);

        // if (req.body.type == 'U') {
        const plan = await dashboard.fetchplan(req, res);
        console.log(221234);
        const currentplan = await dashboard.currentplan(req, res);
        console.log(222, req.body.type);
        if (req.body.type == 'U') {
            res.render('dashboard', { layout: false, list: plan, user_type: req.body.type, name: req.body.name, currentplan: currentplan });
            return;
        }
        else if (req.body.type == "A") {

            const trainer = await pool.query("select * from profile where role=$1", ['T']);
            console.log("trai",trainer.rows)
            res.render('dashboard', { layout: false, list: plan, user_type: req.body.type, name: req.body.name, trainer:trainer.rows });
            return;
        }
         else if (req.body.type == 'T') {
            res.render('dashboard', { layout: false, list: plan, user_type: req.body.type, name: req.body.name });
            return;
        }
        // }
        // else if (req.body.type == 'A') {
        //     res.send("hello");
        // }
        

    } catch (err) {
        console.log(err);
    }
});

router.post("/addplan", async (req, res) => {
    try {

        console.log('shssgssgsggs');
        const user = await authenticate.auth(req, res);

        const plan = await dashboard.addplan(req, res);
        res.status(200).json();
    } catch (e) {
        console.log(e);
    }
})


router.post("/planapply", async (req, res) => {
    try {

        console.log('shssgssgsggs');
        const user = await authenticate.auth(req, res);
        if (req.body.type =="U") {

        const plan = await dashboard.planapply(req, res);
        }
        res.status(200).json();
    } catch (e) {
        console.log(e);
    }
})


module.exports = router;